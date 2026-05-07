const voiceDnaForm = document.querySelector("#voiceDnaForm");
const samples = document.querySelector("#samples");
const audience = document.querySelector("#audience");
const contextField = document.querySelector("#context");
const avoid = document.querySelector("#avoid");
const dnaStatus = document.querySelector("#dnaStatus");
const dnaResult = document.querySelector("#dnaResult");
const outputPlaceholder = document.querySelector("#outputPlaceholder");
const outputHeading = document.querySelector("#output-heading");
const outputState = document.querySelector("#outputState");
const loadingCard = document.querySelector("#loadingCard");
const nextSteps = document.querySelector("#nextSteps");
const copyDna = document.querySelector("#copyDna");
const downloadDna = document.querySelector("#downloadDna");
const clearDraft = document.querySelector("#clearDraft");
const generateButton = document.querySelector("#generateButton");
const wordCount = document.querySelector("#wordCount");
const readinessLabel = document.querySelector("#readinessLabel");
const readinessBar = document.querySelector("#readinessBar");
const precisionDetail = document.querySelector("#precisionDetail");

const STORAGE_KEY = "builderz.voiceDnaDraft.v1";
let currentDna = "";
let autosaveTimer;

function getWords(value) {
  return value.trim().split(/\s+/).filter(Boolean);
}

function getReadiness(words, chars) {
  if (chars < 500) {
    return {
      label: "Not enough signal",
      detail: "Paste more real writing to unlock the generator.",
      percent: Math.min(18, chars / 500 * 18),
      level: "low",
      canSubmit: false,
    };
  }

  if (words < 3000) {
    return {
      label: "Starter precision",
      detail: "Enough to run. Add more examples for a sharper read.",
      percent: 26 + Math.min(32, words / 3000 * 32),
      level: "preliminary",
      canSubmit: true,
    };
  }

  if (words < 10000) {
    return {
      label: "Sharp precision",
      detail: "Strong enough for a useful Voice DNA.",
      percent: 60 + Math.min(28, (words - 3000) / 7000 * 28),
      level: "standard",
      canSubmit: true,
    };
  }

  return {
    label: "Deep read unlocked",
    detail: "Excellent signal. The system can find subtle patterns now.",
    percent: 100,
    level: "forensic",
    canSubmit: true,
  };
}

function setStatus(message, tone = "neutral") {
  if (!dnaStatus) return;
  dnaStatus.textContent = message;
  dnaStatus.dataset.tone = tone;
}

function setOutputState(label) {
  if (outputState) outputState.textContent = label;
}

function updateReadiness() {
  if (!samples) return;
  const text = samples.value;
  const words = getWords(text);
  const readiness = getReadiness(words.length, text.trim().length);

  if (wordCount) wordCount.textContent = `${words.length.toLocaleString()} words`;
  if (readinessLabel) readinessLabel.textContent = readiness.label;
  if (precisionDetail) precisionDetail.textContent = readiness.detail;
  if (readinessBar) {
    readinessBar.style.width = `${readiness.percent}%`;
    readinessBar.dataset.level = readiness.level;
  }
  if (generateButton) generateButton.disabled = !readiness.canSubmit;

  return readiness;
}

function saveDraft() {
  if (!voiceDnaForm) return;
  const data = Object.fromEntries(new FormData(voiceDnaForm));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function scheduleAutosave() {
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(saveDraft, 350);
}

function restoreDraft() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw || !voiceDnaForm) return;

  try {
    const data = JSON.parse(raw);
    Object.entries(data).forEach(([key, value]) => {
      const field = voiceDnaForm.elements[key];
      if (!field) return;

      if (field instanceof RadioNodeList) {
        const option = [...field].find((item) => item.value === value);
        if (option) option.checked = true;
        return;
      }

      field.value = value;
    });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function stripMarkdownSyntax(value) {
  return value
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`{1,3}([^`]+)`{1,3}/g, "$1")
    .trim();
}

function getSummaryFromDna(markdown) {
  const simpleSection = markdown.match(/(?:^|\n)(?:#{1,3}\s*)?(?:\*\*)?Simple summary(?:\*\*)?\s*\n+([\s\S]*?)(?=\n\s*(?:---|#{1,3}\s|\*\*Thorough Voice DNA Profile\*\*|Thorough Voice DNA Profile|```|$))/i);
  if (simpleSection?.[1]?.trim()) {
    return stripMarkdownSyntax(simpleSection[1]);
  }

  const firstParagraph = markdown
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n{2,}/)
    .map((item) => stripMarkdownSyntax(item))
    .find((item) => item && !/^simple summary$/i.test(item));

  return firstParagraph || "Your Voice DNA is ready. The full profile is available to copy or download below.";
}

function getSummaryParts(summary) {
  const sentences = summary
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return [
    {
      label: "Voice",
      icon: "voice",
      text: sentences.slice(0, 2).join(" ") || summary,
    },
    {
      label: "Rhythm",
      icon: "rhythm",
      text: sentences.find((item) => /sentence|rhythm|pace|short|long|punch|direct|plain/i.test(item)) || sentences[2] || "The full DNA captures sentence rhythm, pacing, and how ideas are usually shaped.",
    },
    {
      label: "Rules",
      icon: "rules",
      text: sentences.find((item) => /avoid|never|hype|corporate|buzzword|shallow|generic/i.test(item)) || "The full DNA includes what to avoid so future drafts do not drift into generic AI writing.",
    },
  ];
}

function getSummaryIcon(name) {
  const icons = {
    voice: '<path d="M5 9v6h4l5 4V5L9 9H5Z"/><path d="M17 9.5a4 4 0 0 1 0 5"/>',
    rhythm: '<path d="M4 18c3-9 5-9 8 0s5 9 8 0"/><path d="M4 6h16"/>',
    rules: '<path d="M6 4h12v16H6z"/><path d="M9 9h6M9 13h4"/>',
  };

  return `<svg class="summary-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
}

function renderVisibleSummary(markdown) {
  if (!dnaResult) return;
  const summary = getSummaryFromDna(markdown);

  dnaResult.replaceChildren();
  const title = document.createElement("h3");
  title.textContent = "How you sound";

  const intro = document.createElement("p");
  intro.className = "dna-result__intro";
  intro.textContent = "Here is the readable version. The detailed Voice DNA stays packaged in the background for copy and download.";

  const grid = document.createElement("div");
  grid.className = "summary-grid";

  getSummaryParts(summary).forEach((part) => {
    const card = document.createElement("section");
    card.className = "summary-card";
    card.innerHTML = `${getSummaryIcon(part.icon)}<div><strong>${part.label}</strong><p></p></div>`;
    card.querySelector("p").textContent = part.text;
    grid.append(card);
  });

  const note = document.createElement("p");
  note.className = "dna-result__note";
  note.textContent = "The full Voice DNA is ready in the background. Copy it or download the Markdown file below and attach it the next time you use AI.";

  dnaResult.append(title, intro, grid, note);
}

function setResult(markdown) {
  currentDna = markdown;
  if (loadingCard) loadingCard.hidden = true;
  if (outputPlaceholder) outputPlaceholder.hidden = true;
  if (dnaResult) {
    dnaResult.hidden = false;
    renderVisibleSummary(markdown);
  }
  if (nextSteps) nextSteps.hidden = false;
  if (outputHeading) outputHeading.textContent = "Voice DNA ready";
  if (copyDna) copyDna.disabled = !markdown;
  if (downloadDna) downloadDna.disabled = !markdown;
  setOutputState("Complete");
}

function resetResult() {
  currentDna = "";
  if (loadingCard) loadingCard.hidden = true;
  if (outputPlaceholder) outputPlaceholder.hidden = false;
  if (dnaResult) {
    dnaResult.hidden = true;
    dnaResult.textContent = "";
  }
  if (nextSteps) nextSteps.hidden = true;
  if (outputHeading) outputHeading.textContent = "Your file appears here";
  if (copyDna) copyDna.disabled = true;
  if (downloadDna) downloadDna.disabled = true;
  setOutputState("Waiting");
}

function downloadMarkdown() {
  if (!currentDna) return;
  const blob = new Blob([currentDna], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "voice-dna-profile.md";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

restoreDraft();
updateReadiness();

[samples, audience, contextField, avoid].forEach((field) => {
  if (!field) return;
  field.addEventListener("input", () => {
    if (field === samples) {
      updateReadiness();
    }
    scheduleAutosave();
  });
});

voiceDnaForm?.addEventListener("change", scheduleAutosave);

if (voiceDnaForm) {
  voiceDnaForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const readiness = updateReadiness();

    if (!readiness?.canSubmit) {
      samples?.focus();
      setStatus("Add more writing before generating. Your input is preserved.", "error");
      return;
    }

    const formData = Object.fromEntries(new FormData(voiceDnaForm));
    formData.depth = "deep";

    voiceDnaForm.classList.add("is-loading");
    if (loadingCard) loadingCard.hidden = false;
    if (outputPlaceholder) outputPlaceholder.hidden = true;
    if (nextSteps) nextSteps.hidden = true;
    if (dnaResult) dnaResult.hidden = true;
    if (generateButton) generateButton.textContent = "Building your Voice DNA...";
    if (outputHeading) outputHeading.textContent = "Reading your voice patterns now.";
    setOutputState("Running");
    setStatus("Building your Voice DNA. This can take a little while.", "neutral");

    try {
      const response = await fetch("/api/generate-voice-dna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Voice DNA generation is not connected yet.");
      }

      setResult(data.voiceDna);
      setStatus("Voice DNA ready. Copy it, download it, or attach the .md file next time you use AI.", "success");
      saveDraft();
    } catch (error) {
      if (loadingCard) loadingCard.hidden = true;
      if (!currentDna && outputPlaceholder) outputPlaceholder.hidden = false;
      setOutputState("Needs attention");
      setStatus(error.message, "error");
    } finally {
      voiceDnaForm.classList.remove("is-loading");
      if (generateButton) generateButton.textContent = "Generate my Voice DNA";
    }
  });
}

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    voiceDnaForm?.requestSubmit();
  }
});

if (copyDna) {
  copyDna.addEventListener("click", async () => {
    if (!currentDna) return;
    await navigator.clipboard.writeText(currentDna);
    setStatus("Copied to clipboard.", "success");
  });
}

downloadDna?.addEventListener("click", () => {
  downloadMarkdown();
  setStatus("Downloaded as Markdown.", "success");
});

clearDraft?.addEventListener("click", () => {
  voiceDnaForm?.reset();
  localStorage.removeItem(STORAGE_KEY);
  resetResult();
  updateReadiness();
});
