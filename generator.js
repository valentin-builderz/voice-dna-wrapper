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
const copyDna = document.querySelector("#copyDna");
const downloadDna = document.querySelector("#downloadDna");
const clearDraft = document.querySelector("#clearDraft");
const generateButton = document.querySelector("#generateButton");
const wordCount = document.querySelector("#wordCount");
const readinessLabel = document.querySelector("#readinessLabel");
const readinessBar = document.querySelector("#readinessBar");
const processSteps = [...document.querySelectorAll(".process-step")];
const stepSections = [...document.querySelectorAll("[data-step-section]:not([data-step-section='output'])")];

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
      detail: "Paste more of your real writing before generating.",
      percent: Math.min(18, chars / 500 * 18),
      level: "low",
      canSubmit: false,
    };
  }

  if (words < 3000) {
    return {
      label: "Preliminary signal",
      detail: "Enough to run. Add more samples if you want a sharper read.",
      percent: 26 + Math.min(32, words / 3000 * 32),
      level: "preliminary",
      canSubmit: true,
    };
  }

  if (words < 10000) {
    return {
      label: "Standard confidence",
      detail: "Good corpus for a practical Voice DNA.",
      percent: 60 + Math.min(28, (words - 3000) / 7000 * 28),
      level: "standard",
      canSubmit: true,
    };
  }

  return {
    label: "Forensic confidence",
    detail: "Strong corpus. The extraction has room to find real patterns.",
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

function setActiveStep(step) {
  processSteps.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.step === step);
  });
}

function updateReadiness() {
  if (!samples) return;
  const text = samples.value;
  const words = getWords(text);
  const readiness = getReadiness(words.length, text.trim().length);

  if (wordCount) wordCount.textContent = `${words.length.toLocaleString()} words`;
  if (readinessLabel) readinessLabel.textContent = readiness.label;
  if (readinessBar) {
    readinessBar.style.width = `${readiness.percent}%`;
    readinessBar.dataset.level = readiness.level;
  }
  if (generateButton) generateButton.disabled = !readiness.canSubmit;

  setStatus(readiness.detail, readiness.canSubmit ? "neutral" : "warning");
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

function setResult(markdown) {
  currentDna = markdown;
  if (outputPlaceholder) outputPlaceholder.hidden = true;
  if (dnaResult) {
    dnaResult.hidden = false;
    dnaResult.textContent = markdown;
  }
  if (outputHeading) outputHeading.textContent = "Voice DNA generated.";
  if (copyDna) copyDna.disabled = !markdown;
  if (downloadDna) downloadDna.disabled = !markdown;
  setOutputState("Complete");
  setActiveStep("output");
}

function resetResult() {
  currentDna = "";
  if (outputPlaceholder) outputPlaceholder.hidden = false;
  if (dnaResult) {
    dnaResult.hidden = true;
    dnaResult.textContent = "";
  }
  if (outputHeading) outputHeading.textContent = "Your Voice DNA will appear here.";
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
      setActiveStep("corpus");
    } else if (field === audience || field === contextField) {
      setActiveStep("context");
    } else if (field === avoid) {
      setActiveStep("boundaries");
    }
    scheduleAutosave();
  });
});

if ("IntersectionObserver" in window && stepSections.length) {
  const visibleSections = new Map();
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleSections.set(entry.target.dataset.stepSection, entry.intersectionRatio);
      } else {
        visibleSections.delete(entry.target.dataset.stepSection);
      }
    });

    const [activeStep] = [...visibleSections.entries()]
      .sort((a, b) => b[1] - a[1])[0] || [];

    if (activeStep) setActiveStep(activeStep);
  }, {
    rootMargin: "-28% 0px -46% 0px",
    threshold: [0.1, 0.25, 0.5, 0.75],
  });

  stepSections.forEach((section) => stepObserver.observe(section));
}

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
    if (generateButton) generateButton.textContent = "Extracting signal...";
    setOutputState("Running");
    setActiveStep("output");
    setStatus("Running the full Voice DNA extraction. This can take a little while.", "neutral");

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
      setStatus("Voice DNA generated. Review it, then copy or download the profile.", "success");
      saveDraft();
    } catch (error) {
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
  setActiveStep("corpus");
});
