---
name: voice-dna-extractor
description: >
  Forensic Voice DNA extraction and voice cloning for ghostwriting. Use this skill whenever the user wants to:
  create a voice profile, voice clone, or voice DNA for a client or person; analyze someone's writing or speaking
  style for replication; build a style guide or tone profile from transcripts, posts, emails, or other text;
  ghostwrite content that sounds like a specific person; clone how someone talks or writes; capture someone's
  authentic voice for AI-generated content; create a persona prompt or voice prompt for an LLM; or review
  whether generated text matches a client's voice. Also trigger when the user mentions "voice DNA," "voice
  profile," "voice clone," "idiolect," "style transfer," "voice extraction," or "ghostwriting voice match."
  This skill replaces subjective tone descriptors with forensic-level linguistic analysis.
---

# Voice DNA Extractor — Consolidated Skill

A forensic-grade system for extracting and replicating the authentic voice of any individual. This skill turns raw language data into a machine-readable Voice DNA Profile that enables an LLM to write indistinguishably in that person's voice.

---

## Core Philosophy

Subjective tone labels ("witty," "professional," "thought-provoking") are meaningless to an LLM's predictive architecture. This skill replaces them with **measurable linguistic vectors**: how someone structures sentences, which invisible function words they over- or under-use, how they evaluate the world psychologically, what they never say, and how they want to appear versus how they actually talk.

The gap between amateur pastiche and indistinguishable ghostwriting is bridged by three sciences: **computational stylometry** (the math of how they write), **cognitive linguistics** (the psychology of why they write that way), and **negative space analysis** (what they never do).

---

## Modes & Routing

This skill operates in four modes.

**EXTRACTION** — User provides raw text (single corpus type) and wants a Voice DNA Profile built.
→ Read Part II: Extraction Protocol. Contains both the analytical framework (Sections 1–8) and **Template E: The Extractor** (Section 9) — a ready-to-execute prompt.

**FUSION** — User provides **both spoken and written** material and wants a Voice DNA Profile optimized for written output.
→ Read Part III: Fusion Protocol and Part II: Extraction Protocol. The fusion protocol runs the five extraction protocols on both corpora separately, computes the delta between spoken and written voice, and merges them with explicit per-field weighting rules. The principle: "Personality from speech, self-concept from prose." Produces a profile calibrated for written content generation with an evidence-based editorial filter derived from the observed spoken→written transformation.

**GENERATION** — User has a Voice DNA Profile and wants content written in that voice.
→ Read Part V: Generation Guide. Contains five ready-to-use templates: Drafter (A), Drafter Continuation (A.1), Drafter Revision (A.2), Editor (B), and Judge (C), plus the stateless generation workflow. Works identically with both standard-extracted and fusion-extracted profiles.

**REVIEW** — User wants to verify whether generated text matches a client's voice.
→ Read Part V: Generation Guide, specifically Template C: The Judge.

For schema details and a fully worked example profile, consult Part IV: Voice Profile Schema.

---

## The Extraction Workflow

When a user provides text and asks for voice extraction:

### Step 1 — Validate the Input Corpus

The user must provide a **Minimum Viable Dataset (MVD)** of at least 3,000–5,000 words. Below 2,500 words, false attribution rates exceed 60%. For high confidence, aim for 10,000+ words across 3–5 content types.

**Ideal sources (ranked by data purity):**
- Raw, unedited transcripts of the person speaking freely
- Voice memos or unscripted interview recordings (transcribed)
- Rapid-fire emails, Slack messages, WhatsApp messages
- First-draft LinkedIn posts or texts before editorial polish
- Impromptu meeting notes or stream-of-consciousness writing

**Sources to deprioritize:**
- Committee-reviewed white papers or corporate blogs (editor's voice, not the person's)
- Heavily polished published articles (editorial taste, not generative voice)
- Formal presentations with speechwriter involvement

If the user provides fewer than 3,000 words, flag this and explain accuracy implications. If the user provides both raw and polished material, separate them: raw for stylometric extraction (Protocols 1–3), polished for editorial taste (Protocol 5).

**Routing to FUSION mode:** If the user provides both spoken material (transcripts, voice memos) **and** written material (LinkedIn posts, emails, articles), recommend FUSION mode instead of standard EXTRACTION. Fusion produces a profile optimized for written output with an evidence-based editorial filter. See Part III: Fusion Protocol.

### Step 2 — Execute the Five Extraction Protocols

Read Part II: Extraction Protocol for the complete analytical framework, then use **Template E** (Section 9) as the operational prompt.

**Protocol 1 — Forensic Stylometry** (the structural skeleton)
Estimate cadence, rhythm, sentence variance, punctuation habits, lexical richness, paragraph structure, sentence-starting patterns, and function word bigrams. Use scratchpad sampling or code execution.

**Protocol 2 — Appraisal & Cognitive Vectoring** (the psychological engine)
Map attitude preference, engagement stance, graduation profile, hedge-to-booster ratio, and self-mention patterns.

**Protocol 3 — Conceptual Metaphor Mapping** (the deep cognitive frame)
Identify dominant and avoided source domains, metaphor density, and metaphor novelty.

**Protocol 4 — Architecture of Absence** (the negative space)
Build the lexical blacklist, AI-tell suppression array, structural prohibitions, rhetorical red lines, and cognitive hesitation rules. The most critical constraint.

**Protocol 5 — Dual-Voice Deconstruction** (generative vs. editorial)
Assign the macro-archetype, separate generative voice from editorial taste, build the editorial filter.

### Step 3 — Compile the Three Output Deliverables

Every extraction produces three output artifacts, written to disk:

**Artifact 1: `master-voice-schema.json`** — The complete JSON profile. Write to the client's output directory.

**Artifact 2: `few-shot-anchors.md`** — 7–10 passages (minimum 5) with five-axis deconstruction. Write to the same directory.

**Artifact 3: `style-seed.md`** — The most characteristic 200–500 word excerpt. Write to the same directory.

**Orchestration:** In Claude Code, produce all three artifacts autonomously in sequence — do not pause or ask the user to say "continue" between blocks. Write each artifact to disk as it is completed. If output length limits force a split, continue generating into the same file across multiple turns without user prompting.

**In a chat UI (Claude.ai, ChatGPT):** If operating without filesystem access, use `<BLOCK_1_COMPLETE>` and `<BLOCK_2_COMPLETE>` handshake tokens between blocks and wait for the user to say "continue."

### Step 4 — Present to the User

Deliver:
- A plain-language summary explaining the key findings
- The file paths to all three artifacts
- Deployment guidance: how to use the profile with the five templates in Part V: Generation Guide

---

## Critical Principles

**Estimate, don't hallucinate.** LLMs cannot reliably count across a large corpus. Use scratchpad sampling or code execution. Report numbers as calibrated estimates, not false precision.

**The voice is defined by absence.** What someone never says is as diagnostic as what they always say. The Architecture of Absence is non-negotiable.

**Generative voice ≠ editorial taste.** Capture both how they talk and how they want to appear, then apply them in strict sequence (Drafter → Editor). The Drafter must never see the editorial filter.

**Zero-shot fails.** Style descriptions alone achieve below 7% accuracy. The measured profile + few-shot anchors + anti-examples + style seed reach 67–95% fidelity.

**Voice decays.** Over long outputs, the LLM drifts to its default. Generation happens in controlled chunks with aggressive re-anchoring and rolling argument summaries.

---
---

# PART II — EXTRACTION PROTOCOL

This part contains the full forensic extraction methodology (Sections 1–8) and the ready-to-execute **Template E: The Extractor** (Section 9). Read Sections 1–8 to understand what you're measuring and why. Use Template E as the actual operational prompt.

---

## 1. Input Validation & The MVD

Before extraction begins, validate the Minimum Viable Dataset.

**Quantitative thresholds:**
- Minimum: 3,000 words (acceptable for a preliminary profile)
- Target: 5,000 words across 3–5 content types (standard confidence)
- Ideal: 10,000+ words (forensic confidence)
- Below 2,500 words: false attribution rates exceed 60% — flag this to the user

**Data purity requirements:**
The MVD must consist of **raw thought-capture** — language produced under minimal editorial pressure. The person's subconscious syntactic habits, hesitation markers, and genuine evaluative expressions only survive in unpolished material.

Priority ranking of source material:
1. **Unedited transcripts** of live speaking (interviews, meetings, calls, podcasts)
2. **Voice memos** and audio notes (transcribed)
3. **Rapid-fire written communication** (emails, Slack, WhatsApp sent without deliberation)
4. **First drafts** of any written content before editing
5. **Published posts** the person wrote themselves (usable but diluted by self-editing)
6. **Polished corporate content** (avoid — reflects editor's voice, not the person's)

**The Translator interview protocol:**
If the user needs to gather new material from the client, advise them to use the "Translator" archetype: act as a curious, slightly skeptical bridge who asks "dumb questions" to force the client out of rehearsed talking points. This bypasses media training and reveals the true idiolectal baseline.

**Handling mixed-quality input:**
If the user provides a mix of raw and polished material, separate them. Use raw material for stylometric extraction (Protocols 1–3) and polished material to inform the editorial taste filter (Protocol 5). Note which sources informed which parts of the profile.

---

## 2. Protocol 1: Forensic Stylometry Mapping

This protocol quantifies the subconscious, topic-independent structural markers of the person's language.

### CRITICAL: Quantitative Metrics Must Be Computed, Not Estimated

**LLMs cannot reliably perform corpus-wide arithmetic.** An LLM processes sub-word tokens, not words or sentences, and lacks the working memory to count across thousands of words. If asked to "calculate the MSL of this corpus," it will produce a confident-looking number that may be entirely fabricated.

This matters because the entire downstream system depends on these numbers: the Drafter targets them, the Judge verifies against them. Hallucinated metrics propagate through every stage.

**Mandatory: Use Python for all quantitative metrics.** Write and execute a script to compute MSL, standard deviation, comma-to-period ratio, and sentence count. Do not attempt to count manually or estimate from reading. Set `estimation_method` to `"computed via code execution"`.

```python
# Stylometric computation — run on the full corpus
import re

text = """[corpus text]"""

sentences = re.split(r'[.!?]+', text)
sentences = [s.strip() for s in sentences if s.strip()]
words_per_sentence = [len(s.split()) for s in sentences]

msl = sum(words_per_sentence) / len(words_per_sentence)
std_dev = (sum((w - msl)**2 for w in words_per_sentence) / len(words_per_sentence))**0.5
commas = text.count(',')
periods = text.count('.')
cpr = commas / periods if periods > 0 else 0

print(f"MSL: {msl:.1f}")
print(f"Std Dev: {std_dev:.1f}")
print(f"Comma-to-Period Ratio: {cpr:.2f}")
print(f"Total sentences: {len(sentences)}")
print(f"Min sentence: {min(words_per_sentence)} words")
print(f"Max sentence: {max(words_per_sentence)} words")
```

**Fallback (chat UI only):** If operating in a chat interface without code execution (Claude.ai, ChatGPT), use scratchpad sampling: select three non-adjacent passages of ~150 words, count words per sentence manually, and derive estimated metrics. Report as `"estimated from 3-passage scratchpad sampling"` so the downstream system uses wider tolerances (±3 MSL instead of ±2).

### Cadence & Rhythmic Signature

**Mean Sentence Length (MSL):**
Total words divided by total sentences. Report as a specific number (e.g., ~14 words). Via Path B, report as "estimated ~14 words (sampled)."

**Sentence Length Variance:**
Standard deviation of sentence lengths, or classify as:
- **High variance** — alternates between long multi-clause sentences (20+ words) and short declarations (3–7 words)
- **Medium variance** — moderate mixing, no extreme swings
- **Low variance** — consistently similar sentence lengths

Describe the specific alternation pattern.

**Comma-to-Period Ratio:**
Total commas divided by total periods:
- Ratio > 2.0 = long, clause-heavy, flowing sentences
- Ratio < 1.0 = short, direct, punchy sentences
- Ratio 1.0–2.0 = moderate complexity

### Punctuation Sequencing

Map specific punctuation habits. For each, note **frequency** (heavy/moderate/rare/absent) and **function**:
- **Em-dashes** — parenthetical thoughts? Dramatic breaks? Mid-sentence pivots?
- **Semicolons** — present or completely absent?
- **Ellipses** — trailing thoughts? Dramatic pauses? Only informal?
- **Exclamation marks** — frequency and context?
- **Rhetorical questions** — frequency and function?
- **Parenthetical asides** — frequent or rare?

### Sentence-Starting Patterns

Extract the approximate distribution of how sentences begin:
- **Coordinating conjunction** ("But," "And," "So," "Yet") — estimate percentage
- **Subject-first declarative** ("The problem is," "We need to") — estimate percentage
- **Subordinate clause** ("When you consider," "If the market") — estimate percentage
- **Rhetorical question** ("What if," "Why would") — estimate percentage
- **Fragment for emphasis** ("Exactly." "Not even close.") — estimate percentage
- **Other** — estimate remainder

Via Path A, count programmatically. Via Path B, sample 50 sentences and classify them.

### Paragraph Structure

Describe the typical paragraph shape:
- Average sentences per paragraph
- Single-sentence paragraphs for emphasis?
- Fragments as standalone paragraphs?
- Consistent or variable paragraph length?
- How pieces typically open and close

### Lexical Richness

**Vocabulary Grade Level:** Estimate the reading level. 8 = accessible. 12 = advanced. 14+ = academic.

**Type-Token Ratio (TTR):** Ratio of unique words to total words. Via Path A, compute directly. Via Path B, estimate qualitatively.

**Yule's K Value:** If computable via Path A, include. Otherwise skip or estimate.

### Function Word Distribution & Bigrams

Function words are topic-independent, unconsciously chosen, and the most reliable authorship markers.

**What to extract:**
- Unusual over- or under-use of specific structural words
- **Function word bigrams** — sequential pairings: "But if," "And yet," "So when"
- **Characteristic sentence-opening phrases** — the 3–5 structural starts that recur most

---

## 3. Protocol 2: Appraisal & Cognitive Vectoring

### Attitude Preference (The Evaluative Core)

Determine which evaluation system the person defaults to:

**Affect** — personal emotional states: "I'm thrilled," "We were devastated"
**Judgment** — evaluating human behavior/capacity: "highly competent," "reckless decision"
**Appreciation** — aesthetic/functional value: "elegant framework," "fundamentally broken"

**Inscribed vs. Invoked:**
- **Inscribed** — explicitly stated: "brilliant strategy"
- **Invoked** — implied through fact selection

**Polarity:** Positive-dominant, negative-dominant, or balanced.
**Grammatical hierarchy:** Which part of speech carries the most evaluative weight.

### Engagement Stance (Dialogic Positioning)

**Monoglossic** — authoritative: "This is how it works."
**Heteroglossic** — dialogic: "Perhaps the better approach..."

**Hyland's Metadiscourse Markers:**
- **Hedges** — "perhaps," "arguably," "might"
- **Boosters** — "undeniably," "clearly," "always"
- **Self-mentions** — "I" vs. "we" vs. passive
- **Engagement markers** — rhetorical questions, direct reader address

**The Hedge-to-Booster Ratio:** Estimate from the corpus. Report as a ratio (e.g., "2.7:1 hedge-dominant").

Extract the person's **actual** hedge and booster words from the corpus.

### Graduation (Force & Focus)

**Force:** Maximizer vs. Minimizer. Extract characteristic intensifiers and downtoners.
**Focus:** Sharpener vs. Softener.

### Voice Review Extraction Technique

If the corpus doesn't reveal Appraisal preferences clearly, advise recording the client giving voice-over critiques of industry content.

---

## 4. Protocol 3: Conceptual Metaphor Mapping

**Test for these source domains:**
- **Architecture/Engineering** — "building foundations," "structural integrity," "stress-testing"
- **Organic/Gardening** — "cultivating talent," "pruning dead weight"
- **War/Combat** — "front lines," "collateral damage," "tactical maneuvers"
- **Journey/Navigation** — "roadmap," "milestones," "uncharted territory"
- **Machine/Mechanical** — "levers," "gears," "engine," "fine-tuning"
- **Family/Relationship** — "nurturing," "sibling rivalry"
- **Sports/Competition** — "game plan," "level playing field"
- **Water/Flow** — "pipeline," "stream," "channels"

**Record:** dominant frames, secondary frame, avoided frames, metaphor density, metaphor novelty.

---

## 5. Protocol 4: Architecture of Absence

The most critical extraction protocol.

### The Lexical Blacklist

Scan for transitional crutches absent from the corpus: "Furthermore," "Moreover," "In conclusion," "Additionally," "It is important to note," "That being said," "Needless to say," "At the end of the day," "Moving forward," "Having said that." If absent, ban them.

**Client interview shortcut:** Ask the client: "What words or phrases would you never, ever say?"

### AI-Tell Suppression Array

Always ban unless they genuinely appear in the corpus: "delve into," "navigate," "testament to," "in the realm of," "a tapestry of," "it's worth noting," "at its core," "the landscape of," "underscores," "multifaceted," "nuanced" (as empty intensifier), "robust" (outside technical contexts), "holistic," "leverage" (non-financial), "pivotal," "foster" (outside childcare), "harness," "embark," "unpack," "unravel"

**Structural tells:** Perfectly balanced three-part lists, neat summative conclusions, hyper-consistent paragraph lengths, dense noun-heavy openings, "In today's fast-paced world," "In an era of..."

### Structural Prohibitions

Map formatting and grammatical avoidances: semicolons, bullet points, paragraph constraints, headers, numbered lists, ending patterns.

### Rhetorical Red Lines (Ethical Negation)

Topics, stances, and emotional registers the person never enters. Document as explicit constraints.

### Cognitive Hesitation Rules

How the person handles uncertainty and weak conceptual bridges. Each rule as a separate, concrete, actionable instruction.

### TICL Anti-Examples

Build 2–3 contrastive negative examples. **Critical framing:**

> Write a highly polished, standard AI-generated response to a topic from this corpus that sounds "good" but mathematically fails this specific Voice DNA profile. The anti-example should be plausible and well-written — the kind of text that would pass a casual read but fail a forensic audit.

Cartoon-bad anti-examples only teach the model to avoid extremes. Subtle, polished near-misses teach it to avoid the **drift zone**.

---

## 6. Protocol 5: Dual-Voice Deconstruction

Every person brings five voices (Barry Fox's "Five-Voice Problem"):
1. **In-person voice** — unreliable on the page
2. **Perceived voice** — how they think they sound
3. **Aspirational voice** — how they wish they sounded
4. **Transcript voice** — raw, flat, unreadable
5. **Writer's voice** — the crafted ideal that feels "just right"

### Macro-Archetype Assignment

Assign from this closed set:

| Archetype | Core Behavior |
|---|---|
| **The Translator** | Curious bridge. Dismantles complexity through questions and analogies. |
| **The Commander** | Authoritative, directive. Minimal hedging. |
| **The Storyteller** | Narrative-driven. Stories before principles. |
| **The Analyst** | Data-first. Evidence before conclusions. |
| **The Provocateur** | Contrarian. Questions assumptions. |
| **The Coach** | Supportive, developmental. Reader growth. |
| **The Insider** | Exclusive knowledge. Intimacy through access. |

If the person blends two, assign primary and note secondary.

### Separating Generative Voice from Editorial Taste

**Generative voice** (from raw material): authentic markers, structural breaks, function word habits.

**Editorial taste** (from polished material): how the final output should look. Document as rules in `editorial_filter`.

**Critical downstream rule:** The `editorial_filter` is used ONLY by the Editor pass. The Drafter must never see it.

---

## 7. Compiling Few-Shot Anchors

Choose 7–10 passages from the MVD (minimum 5 if token budget is constrained). They must be diverse, medium-length (3–8 sentences), high-density, and representative. More anchors produce better downstream fidelity; fewer than 5 significantly degrades style transfer accuracy.

### Mandatory Five-Axis Deconstruction

```
Anchor [N] — [Context label]

Text: "[Exact passage from the corpus]"

Deconstruction:
- Cadence: [MSL of this passage, variance pattern, paragraph structure]
- Metaphor: [Cognitive frame used, or notable absence of figurative language]
- Appraisal: [Attitude system, engagement stance, graduation shown]
- Function Bigrams: [Syntactic markers, sentence-starting patterns, structural words]
- Absence: [What is notably omitted — no banned transitions, no AI-tells, hesitation visible]
```

---

## 8. Autonomous Style Seed Extraction

**Do not ask the user to select this.** Identify it autonomously.

**Selection criteria:**
- 200–500 words of continuous prose
- Maximizes density of diagnostic features
- Represents the person at their most natural
- Is not the most polished piece, but the most *them* piece

```
<style_seed>
[The 200–500 word excerpt]

Selection rationale: This passage was chosen because it demonstrates [specific profile features].
</style_seed>
```

---

## 9. Template E: The Extractor

This is the operational prompt. In Claude Code, execute it directly against the corpus files. In a chat UI, copy-paste it alongside the corpus text.

```
ROLE: You are a forensic linguist specializing in computational stylometry and voice
cloning for ghostwriting. You will analyze the corpus below and produce a machine-readable
Voice DNA Profile that captures every measurable dimension of this person's authentic voice.

OUTPUT MODE:
- If you have filesystem access (Claude Code, API with tools): Write each output
  artifact to disk as a separate file. Proceed through all three blocks autonomously
  without pausing. Do not ask the user to say "continue."
- If you are in a chat UI without filesystem access: Output three blocks separated
  by <BLOCK_1_COMPLETE> and <BLOCK_2_COMPLETE> handshake tokens. Stop after each
  token and wait for "continue."

CORPUS:
[Paste or read the person's raw text. If you have both raw and polished material,
separate them with labels: <raw_corpus>...</raw_corpus> and
<polished_corpus>...</polished_corpus>. In Claude Code, read the corpus from the
file path the user provides.]

====================================================================
EXTRACTION PROCEDURE
====================================================================

STEP 1 — STYLOMETRIC COMPUTATION

Before analyzing anything, you must ground your quantitative metrics in hard numbers.

Write and execute a Python script to compute metrics across the full corpus:
- Mean Sentence Length (MSL)
- Sentence length standard deviation
- Comma-to-Period Ratio (CPR)
- Total sentence count, min/max sentence lengths

Use the computed numbers for all downstream profile fields.
Set estimation_method to "computed via code execution."

FALLBACK (chat UI only): If you cannot execute code, use scratchpad sampling —
select three non-adjacent passages of ~150 words, count manually, and set
estimation_method to "estimated from 3-passage scratchpad sampling."

STEP 2 — FULL FIVE-PROTOCOL ANALYSIS

Using the stylometric grounding from Step 1, analyze the corpus across all five dimensions:

Protocol 1 — FORENSIC STYLOMETRY: Cadence (MSL, variance, variance_pattern),
comma-to-period ratio, punctuation sequencing (em-dashes, semicolons, ellipses,
exclamation marks, rhetorical questions, parenthetical asides), sentence-starting
patterns with estimated percentages, paragraph structure, reading grade level,
type-token ratio, dominant function bigrams, characteristic sentence-opening phrases.

Protocol 2 — APPRAISAL & COGNITIVE VECTORING: Attitude (primary system: Affect/
Judgment/Appreciation, secondary system, inscribed vs. invoked, polarity, grammatical
weight). Engagement (stance: Monoglossic/Heteroglossic, hedge frequency, booster
frequency, hedge-to-booster ratio, self-mention pattern, engagement markers,
characteristic hedges array, characteristic boosters array). Graduation (force profile:
Maximizer/Minimizer, focus profile: Sharpener/Softener, characteristic intensifiers,
characteristic downtoners).

Protocol 3 — CONCEPTUAL METAPHOR MAPPING: Dominant frame with corpus examples,
secondary frame, avoided frames, metaphor density (high/moderate/low), metaphor
novelty (novel/conventional/mixed).

Protocol 4 — ARCHITECTURE OF ABSENCE: Banned transitions (scan corpus for absence of
standard transitional phrases), banned vocabulary (person-specific), AI-tells to suppress
(start with default list, remove any the person actually uses, add person-specific
additions), structural prohibitions, rhetorical red lines, cognitive hesitation rules
(as an array of separate actionable instructions).

Protocol 5 — DUAL-VOICE DECONSTRUCTION: Assign macro-archetype from EXACTLY this set:
Translator, Commander, Storyteller, Analyst, Provocateur, Coach, Insider. Write a 1-2
sentence archetype_description specific to this person. Separate generative voice from
editorial taste. Build the editorial_filter with specific_rules array. If both raw and
polished material were provided, derive the editorial filter by comparing the two.

STEP 3 — TICL ANTI-EXAMPLES

Write 2-3 contrastive negative examples. CRITICAL: These must be highly polished,
plausible text that sounds "good" but mathematically fails this specific profile.
Do NOT write cartoon-bad text stuffed with AI-tells. Write text that would pass a casual
read but fail a forensic audit. For each, cite the specific profile fields violated.

====================================================================
OUTPUT FORMAT — THREE BLOCKS WITH HANDSHAKE TOKENS
====================================================================

STEP 4 — PRE-GENERATION AUDIT

Before outputting ANY JSON, commit to your key findings in a <pre_generation_audit>
scratchpad. You must provide EVIDENCE, not yes/no assertions. If you cannot answer
any item with specific data, go back to the corpus and fix the gap before proceeding.

<pre_generation_audit>
=== CADENCE & STRUCTURE ===
1. MSL: State the exact number you will use: [number]
2. Variance pattern: Describe the specific alternation: [e.g., "22-28 word setups → 3-6 word punches"]
3. CPR: State the comma-to-period ratio: [number]
4. Paragraph structure: State typical sentences per paragraph and single-sentence paragraph usage: [description]
5. Sentence-starting pattern: State top 3 openers with estimated percentages: [patterns + %]

=== PSYCHOLOGICAL ENGINE ===
6. Attitude primary system: State system with one corpus example that proves it: [system + quote]
7. Attitude polarity: State polarity with evidence: [polarity + example]
8. H:B ratio: State the hedge-to-booster ratio: [ratio]
9. Top 3 characteristic hedges (from corpus): [words]
10. Top 3 characteristic boosters (from corpus): [words]
11. Self-mention pattern: [pattern description]

=== COGNITIVE LAYER ===
12. Dominant metaphor frame with 2 corpus examples: [frame + quotes]
13. Macro-archetype from the closed set: [archetype name]

=== NEGATIVE SPACE ===
14. List 3+ person-specific banned words/transitions (beyond defaults): [words]
15. List 2+ structural prohibitions: [prohibitions]
16. List 2+ cognitive hesitation rules: [rules]

=== EDITORIAL FILTER ===
17. List 2+ specific_rules for the editorial_filter: [rules]

=== ANTI-EXAMPLES ===
18. Write the first TICL anti-example — must be polished and plausible: [2-3 sentences]
19. State which profile fields it violates: [fields]
</pre_generation_audit>

Only after completing all items with specific evidence, proceed to output.

OUTPUT BLOCK 1:

**If you have filesystem access (Claude Code, Cursor, agentic IDE):**
Write the JSON profile to `master-voice-schema.json` in the working directory.
Print a brief plain-language summary (3-5 sentences) of the key voice findings
to the console, then proceed directly to Block 2 — do NOT stop or wait.

**If you are in a chat UI without filesystem access:**
Begin with a brief plain-language summary (3-5 sentences) of the key voice findings
for the human reader. Then output the complete JSON profile inside XML tags:

<master_voice_schema>
{
  "voice_identity": {
    "macro_archetype": "...",
    "archetype_description": "...",
    "core_editorial_taste": "..."
  },
  "stylometric_fingerprint": {
    "mean_sentence_length": 0,
    "sentence_length_std_dev": 0,
    "sentence_length_variance": "...",
    "variance_pattern": "...",
    "estimation_method": "...",
    "comma_to_period_ratio": 0,
    "punctuation_sequencing": {
      "em_dashes": "...", "semicolons": "...", "ellipses": "...",
      "exclamation_marks": "...", "rhetorical_questions": "...",
      "parenthetical_asides": "..."
    },
    "reading_grade_level": 0,
    "type_token_ratio": "...",
    "yules_k": "...",
    "dominant_function_bigrams": [],
    "sentence_starting_patterns": [],
    "paragraph_structure": "..."
  },
  "appraisal_and_metadiscourse": {
    "attitude": {
      "primary_system": "...", "secondary_system": "...",
      "inscribed_vs_invoked": "...", "polarity": "...",
      "grammatical_weight": "..."
    },
    "engagement": {
      "stance": "...", "hedge_frequency": "...", "booster_frequency": "...",
      "hedge_to_booster_ratio": "...", "self_mention_pattern": "...",
      "engagement_markers": "...",
      "characteristic_hedges": [], "characteristic_boosters": []
    },
    "graduation": {
      "force_profile": "...", "focus_profile": "...",
      "characteristic_intensifiers": [], "characteristic_downtoners": []
    }
  },
  "cognitive_metaphors": {
    "dominant_frame": "...", "secondary_frame": "...",
    "avoided_frames": [],
    "metaphor_density": "...", "metaphor_novelty": "..."
  },
  "architecture_of_absence": {
    "banned_transitions": [],
    "banned_vocabulary": [],
    "ai_tells_to_suppress": ["delve", "navigate", "testament to",
      "in the realm of", "a tapestry of", "it's worth noting", "at its core",
      "the landscape of", "underscores", "multifaceted", "robust", "holistic",
      "leverage", "pivotal", "foster", "harness", "embark", "unpack",
      "in today's fast-paced world", "in an era of"],
    "structural_prohibitions": [],
    "rhetorical_red_lines": [],
    "cognitive_hesitation_rules": []
  },
  "ticl_anti_examples": [
    {"bad_output": "...", "why_it_fails": "..."},
    {"bad_output": "...", "why_it_fails": "..."}
  ],
  "editorial_filter": {
    "voice_gap_notes": "...", "active_passive_preference": "...",
    "adverb_policy": "...", "formality_shift": "...",
    "structural_preferences": "...", "length_preferences": "...",
    "specific_rules": []
  }
}

Fill every "..." with specific corpus evidence. Fill every [] with corpus-specific arrays.
Remove any ai_tells_to_suppress entries that genuinely appear in the person's corpus.
Add person-specific additions to all arrays.
cognitive_hesitation_rules must be an array of separate actionable instructions.
ticl_anti_examples must be polished near-misses, not strawmen.
</master_voice_schema>

**Filesystem mode:** Proceed directly to Block 2. No stop token needed.
**Chat UI mode:** Output exactly this line and STOP generating:
<BLOCK_1_COMPLETE>

====================================================================

OUTPUT BLOCK 2:
(Filesystem mode: proceed automatically. Chat UI: wait for user to say "continue.")

**If you have filesystem access:** Write the anchors to `few-shot-anchors.md`.
**If you are in a chat UI:** Output inside XML tags.

<deconstructed_few_shot_anchors>

Select 7-10 passages from the corpus (minimum 5 if context budget is constrained).
Each must cover a DIFFERENT context (explaining, criticizing, storytelling, prescribing,
reflecting, persuading, analyzing, etc.). More anchors = better downstream fidelity.

For EACH anchor, use this exact format:

Anchor [N] — [Context label]

Text: "[Exact passage from the corpus]"

Deconstruction:
- Cadence: [MSL of this passage, variance pattern, paragraph structure]
- Metaphor: [Cognitive frame used, or notable absence of figurative language]
- Appraisal: [Attitude system, engagement stance, graduation shown]
- Function Bigrams: [Syntactic markers, sentence-starting patterns, structural words]
- Absence: [What is notably omitted — banned transitions absent, no AI-tells,
  hesitation rules visible]

</deconstructed_few_shot_anchors>

**Filesystem mode:** Proceed directly to Block 3. No stop token needed.
**Chat UI mode:** Output exactly this line and STOP generating:
<BLOCK_2_COMPLETE>

====================================================================

OUTPUT BLOCK 3:
(Filesystem mode: proceed automatically. Chat UI: wait for user to say "continue.")

Autonomously identify the single most characteristic 200-500 word passage in the corpus.
This is the passage that maximizes the density of diagnostic features from the profile.
Do NOT ask the user to select it.

CRITICAL: You must extract this passage VERBATIM from the corpus. Do not paraphrase,
summarize, clean up grammar, or alter a single word or punctuation mark. The style seed's
value depends on exact transcript fidelity — any modification corrupts the mathematical
baseline for downstream generation.

**If you have filesystem access:** Write the style seed to `style-seed.md`.
**If you are in a chat UI:** Output inside XML tags.

<style_seed>
[The 200-500 word excerpt]

Selection rationale: This passage was chosen because it demonstrates [list the specific
profile features concentrated here].
</style_seed>

End with brief deployment guidance: how to use this profile with the Drafter, Editor,
and Judge templates for content generation.
```

### How to use Template E

**In Claude Code / agentic IDE (preferred):**
1. Provide Template E + corpus
2. The agent runs Python for metrics, writes all three artifacts to disk autonomously (`master-voice-schema.json`, `few-shot-anchors.md`, `style-seed.md`)
3. No "continue" prompts needed — runs to completion

**In a chat interface (Claude.ai, ChatGPT, etc.):**
1. Copy Template E above into the message
2. Replace `[Paste the person's raw text here]` with the actual corpus
3. Send. The LLM outputs Block 1, then stops at `<BLOCK_1_COMPLETE>`
4. Reply "continue" to get Block 2
5. Reply "continue" again to get Block 3

**In an API / orchestrator workflow:**
1. Send Template E + corpus as the user message
2. When the response contains `<BLOCK_1_COMPLETE>`, parse Block 1
3. Send "continue" as the next user message to get Block 2, then again for Block 3
4. Parse the three XML-tagged blocks and store them

### Quality Gate

After all three blocks are delivered, verify:
- [ ] Quantitative metrics were grounded through scratchpad or code, not guessed
- [ ] Every JSON field contains corpus-specific evidence
- [ ] The TICL anti-examples are polished near-misses, not cartoon-bad
- [ ] The few-shot anchors are diverse (no two cover the same context)
- [ ] The style seed is genuinely characteristic
- [ ] The editorial_filter.specific_rules are actionable

---
---

# PART III — FUSION PROTOCOL

This part contains the methodology for extracting a Voice DNA Profile from **two corpora simultaneously** — spoken and written — to produce a profile optimized for written output that retains authentic personality markers from speech. It builds on the five extraction protocols defined in Part II.

---

## 1. The Fusion Principle

**Personality from speech, self-concept from prose.**

Every person has two distinct linguistic systems:

- **Spoken voice** — spontaneous, unfiltered, structurally loose. Reveals authentic reasoning patterns, genuine evaluative reflexes, spontaneous metaphor systems, and unconscious habits. High authenticity, low polish. This is who they *are*.
- **Written voice** — deliberate, self-edited, structurally shaped. Reveals not just editorial judgment and sentence architecture, but the person's **self-concept** — the polished, literary ideal of how they believe they sound. This is who they *want to be*.

A profile built from speech alone produces text that reads like a transcript — too many hedges, loose syntax, incomplete thoughts. A profile built from writing alone captures the self-concept but misses the authentic person underneath.

The written corpus is not merely "polished speech." It is the client's aspirational identity in action — every editorial choice they made (cutting a hedge, tightening a sentence, shifting from inscribed to invoked evaluation) is a data point about who they believe they are when they sit down to write. The fusion protocol treats these choices as **self-concept evidence**, not surface formatting.

The fusion protocol extracts from both and merges them with explicit rules:

| Voice Layer | Source | Why |
|---|---|---|
| Deep personality markers | Spoken | Speech bypasses self-editing; reveals authentic cognitive patterns |
| Self-concept & structural markers | Written | Writing reveals the aspirational identity and target output format |
| Metaphor systems | Spoken | Spontaneous metaphors are more authentic than deliberate ones |
| Hedge/booster calibration | Written | Spoken hedge frequency would massively over-hedge written output |
| Editorial filter | Comparative delta | The gap between spoken and written IS the editorial filter |
| Few-shot anchors | Written (primary) + Spoken (calibration) | Anchors should model the target output modality |
| Style seed | Written | The seed calibrates generation toward written output |

The fusion profile uses the same JSON schema as a standard extraction. Downstream templates (Drafter, Editor, Judge) work identically. The difference is precision — every field is sourced from whichever modality provides the most reliable signal for written content generation.

---

## 2. Input Validation — Dual Corpus Requirements

### Spoken Corpus (Corpus S)

Same requirements as standard extraction (Part II, Section 1).

**Minimum:** 3,000 words of raw, unedited spoken material.
**Ideal:** 5,000–10,000+ words across multiple contexts (meetings, interviews, calls, voice memos).

Priority ranking:
1. Unedited transcripts of live speaking
2. Voice memos and audio notes (transcribed)
3. Rapid-fire messaging (Slack, WhatsApp) — spoken-register writing

### Written Corpus (Corpus W)

**Minimum:** 1,500 words across at least 3 pieces of self-authored written content.
**Target:** 3,000+ words across 5+ pieces and 2+ content types.
**Ideal:** 5,000+ words with diverse formats.

Priority ranking (by data purity for written voice):
1. **LinkedIn posts, tweets, or social media the person wrote themselves** — the most common written output format; high self-editing, authentic choices
2. **Professional emails the person composed** (not templates or forwards) — natural written register under time pressure
3. **Blog posts, articles, or newsletter editions** they authored solo — longer-form written voice
4. **First-person published content** they wrote without a ghostwriter — direct written voice evidence
5. **Comments, replies, forum posts** — short-form written voice under social pressure

**Sources to exclude from Corpus W:**
- Content a ghostwriter or copywriter wrote for them (that's someone else's voice)
- Committee-authored documents where their individual voice is diluted
- Content they wrote under heavy editorial oversight (editor's voice, not theirs)
- Automated or template-based emails (no voice signal)

### Handling ambiguous material

Some material sits between spoken and written:
- **Rapid-fire Slack messages** — assign to Corpus S (spoken register, minimal self-editing)
- **Carefully composed emails** — assign to Corpus W (written register, deliberate choices)
- **Transcripts of rehearsed talks** — assign to Corpus S but flag as "filtered spoken" (rehearsal reduces authenticity)
- **Lightly edited LinkedIn posts** — assign to Corpus W (the light editing IS their editorial filter)

When unsure, ask: "Did the person have time to think about word choice before producing this?" If yes → Corpus W. If no → Corpus S.

### Minimum viable fusion dataset

Both corpora must meet their individual minimums. If you have abundant spoken material but insufficient written material (or vice versa), flag this to the user:

- **Abundant S, insufficient W:** You can run a standard single-corpus extraction on Corpus S and note that the editorial filter is inferred, not observed. Add whatever written samples exist as editorial calibration evidence.
- **Abundant W, insufficient S:** You can run a standard single-corpus extraction on Corpus W. The profile will be well-calibrated for written output but may miss deep personality markers that only surface in spontaneous speech.
- **Both sufficient:** Run the full fusion protocol.

---

## 3. Phase 1: Parallel Protocol Execution

Run all five extraction protocols (from Part II) on **each corpus separately**. You are not yet merging — you are building two parallel analyses.

### For each protocol, produce dual observations:

**Protocol 1 — Forensic Stylometry:**
- Corpus S metrics: MSL(S), variance(S), CPR(S), punctuation(S), sentence-starting patterns(S), paragraph structure(S), function bigrams(S)
- Corpus W metrics: MSL(W), variance(W), CPR(W), punctuation(W), sentence-starting patterns(W), paragraph structure(W), function bigrams(W)

**Protocol 2 — Appraisal & Cognitive Vectoring:**
- Corpus S: attitude(S), engagement(S), graduation(S), hedges(S), boosters(S), H:B ratio(S)
- Corpus W: attitude(W), engagement(W), graduation(W), hedges(W), boosters(W), H:B ratio(W)

**Protocol 3 — Conceptual Metaphor Mapping:**
- Corpus S: dominant frame(S), secondary frame(S), avoided frames(S), density(S), novelty(S)
- Corpus W: dominant frame(W), secondary frame(W), avoided frames(W), density(W), novelty(W)

**Protocol 4 — Architecture of Absence:**
- Corpus S: banned transitions(S), banned vocabulary(S), structural prohibitions(S), red lines(S), hesitation rules(S)
- Corpus W: banned transitions(W), banned vocabulary(W), structural prohibitions(W), red lines(W), hesitation rules(W)

**Protocol 5 — Dual-Voice Deconstruction:**
- In fusion mode, this protocol is superseded by Phase 2 (the delta analysis IS the dual-voice deconstruction, but with actual evidence instead of inference).

### Quantitative estimation

Use the same estimation methods as standard extraction (Path A code execution or Path B scratchpad sampling). Apply them to each corpus independently. For scratchpad sampling: select 3 passages from Corpus S and 3 passages from Corpus W.

---

## 4. Phase 2: Comparative Delta Analysis

After parallel extraction, systematically compare the two profiles. The delta between spoken and written is the most valuable output of fusion extraction — it reveals the person's **natural editorial filter** through direct evidence.

### The Delta Report

For each major profile dimension, document:

1. **The spoken value** — what they do when speaking
2. **The written value** — what they do when writing
3. **The delta** — the specific transformation that occurs
4. **The implication** — what this means for the merged profile

### Key deltas to document

**Structural delta:**
- MSL(S) vs MSL(W) — how much do sentences tighten when writing?
- CPR(S) vs CPR(W) — do clause chains simplify?
- Variance pattern — does the rhythm change?
- Paragraph structure — spoken may have no paragraph structure; written reveals their natural paragraph shape

**Hedging delta (critical):**
- H:B ratio(S) vs H:B ratio(W) — this is often the largest delta. A person who hedges 4:1 in speech may hedge 1.5:1 in writing.
- Which hedges survive? Some spoken hedges persist in writing (signature hedges). Others disappear (verbal fillers). The survivors are the ones to keep in the profile.
- Which boosters appear? Some people boost more in writing than speech (compensating for the absence of vocal emphasis).

**Formality delta:**
- Self-mention shift — does "ich" frequency drop? Does "wir" increase?
- Register shift — do they shift from casual to professional vocabulary?
- Filler elimination — which spoken fillers (ähm, also, quasi) vanish completely in writing?

**Evaluative delta (self-concept layer):**
These shifts reveal the person's aspirational identity — the gap between who they are (speech) and who they believe they are (writing):
- Does the attitude system shift? (e.g., more inscribed in speech, more invoked in writing — suggesting a self-concept as someone who "shows, doesn't tell")
- Does polarity shift? (e.g., more negative in speech, more balanced in writing — suggesting a self-concept as constructive rather than critical)
- Does graduation shift? (e.g., more extreme in speech, more calibrated in writing — suggesting a self-concept as measured and precise)
- Does engagement stance shift? (e.g., more heteroglossic in speech, more monoglossic in writing — suggesting a self-concept as authoritative rather than tentative)

**Metaphor delta:**
- Same dominant frame? — Usually yes. Metaphor systems are deep and stable across modalities.
- Density change? — Often lower in writing (metaphors become more deliberate, less frequent).
- Novelty change? — Spontaneous novel metaphors in speech may become conventional in writing.

### Recording the delta

Document the delta in a `<fusion_delta>` scratchpad. This scratchpad feeds directly into the fusion merge decisions and becomes the evidence base for the `editorial_filter`.

```
<fusion_delta>
STRUCTURAL:
- MSL: spoken ~27 → written ~18 (Δ = -9, significant tightening)
- CPR: spoken 2.3 → written 1.6 (Δ = -0.7, clause simplification)
- Variance: spoken high (9-59) → written medium-high (8-35)

HEDGING:
- H:B ratio: spoken 4:1 → written 2:1 (Δ = -2, substantial hedge reduction)
- Surviving hedges: "ich glaube" (reduced frequency), "vielleicht"
- Eliminated hedges: "sozusagen", "quasi", "irgendwie"
- Written-only boosters: [none / list]

FORMALITY:
- Self-mention: spoken heavy "ich" → written moderate, more "wir" and "man"
- Fillers eliminated: "ähm", "also" (as filler), "genau"
- Register: casual → professional-accessible

EVALUATIVE (SELF-CONCEPT LAYER):
- Attitude: Judgment-primary stable across both
- Polarity: spoken negative-leading → written balanced
  → Self-concept: sees themselves as constructive, not critical
- Graduation: spoken minimizer → written moderate minimizer
- Stance: spoken [X] → written [Y]
  → Self-concept: sees themselves as [authoritative/measured/tentative]

METAPHOR:
- Dominant frame stable: [frame] in both
- Density: spoken moderate → written low-moderate
- Novel metaphors: spoken spontaneous → written conventional

EVIDENCE-BASED EDITORIAL RULES (derived from delta):
1. [specific transformation observed]
2. [specific transformation observed]
3. [specific transformation observed]
</fusion_delta>
```

---

## 5. Phase 3: Fusion Merge Rules

Apply these rules field-by-field to produce the merged profile. Every rule states which corpus is the **source** and why.

### voice_identity

| Field | Source | Rule |
|---|---|---|
| `macro_archetype` | Spoken | The archetype is a personality marker. Speech reveals the unmasked behavioral pattern. |
| `archetype_description` | Blend | Start with the spoken behavioral pattern, then note how it manifests in writing. |
| `core_editorial_taste` | Written | This IS editorial taste — take it directly from written evidence. |

### stylometric_fingerprint

| Field | Source | Rule |
|---|---|---|
| `mean_sentence_length` | Written | The output is written content. Use the MSL they actually produce when writing. |
| `sentence_length_std_dev` | Written | Same rationale. |
| `sentence_length_variance` | Written | Same rationale. |
| `variance_pattern` | Written | Their written rhythm, not their spoken rhythm. |
| `estimation_method` | Note both | Report as "dual-corpus fusion: spoken MSL ~X, written MSL ~Y, profile targets written." |
| `comma_to_period_ratio` | Written | Spoken CPR is often a transcription artifact. Written CPR reflects actual punctuation choices. |
| `punctuation_sequencing` | Written | Spoken punctuation is transcriber interpretation. Written punctuation is the person's actual choice. |
| `reading_grade_level` | Written | Target output register. |
| `type_token_ratio` | Written | Written vocabulary range is the generation target. |
| `yules_k` | Written | Same rationale. |
| `dominant_function_bigrams` | Intersection | Include bigrams present in **both** corpora (stable markers). Note spoken-only bigrams as secondary. If a bigram appears heavily in speech but never in writing, it should not drive generation. |
| `sentence_starting_patterns` | Written | Patterns shift significantly between modalities. Use written distribution. |
| `paragraph_structure` | Written | Spoken material often lacks paragraph structure entirely. Written structure is the target. |

### appraisal_and_metadiscourse

| Field | Source | Rule |
|---|---|---|
| `attitude.primary_system` | Spoken | The evaluative core is a deep personality marker. Speech reveals the authentic default. |
| `attitude.secondary_system` | Spoken | Same rationale. |
| `attitude.inscribed_vs_invoked` | Written (self-concept) | The shift from inscribed to invoked reveals aspirational identity — a person who evaluates directly in speech but through evidence in writing sees themselves as someone who "shows, doesn't tell." Honor that self-concept. |
| `attitude.polarity` | Written (self-concept) | Polarity shift reveals aspirational emotional register. A person negative-leading in speech but balanced in writing sees themselves as constructive. The written polarity IS the person they want to be on the page. |
| `attitude.grammatical_weight` | Written | May shift between modalities. Use written pattern. |
| `engagement.stance` | Written (self-concept) | A person tentative in speech but authoritative in writing has a self-concept as a confident voice. A person authoritative in speech but hedging in writing has a self-concept as thoughtful and measured. Either way, the written stance is the aspirational target. |
| `engagement.hedge_frequency` | Written | **Critical.** Spoken hedge frequency would massively over-hedge written output. Use written frequency. |
| `engagement.booster_frequency` | Written | Same rationale. |
| `engagement.hedge_to_booster_ratio` | Written | **The single most important field to source from writing.** This ratio determines the confidence texture of the output. |
| `engagement.self_mention_pattern` | Written | Self-mention patterns change between modalities. Use written pattern. |
| `engagement.engagement_markers` | Written | Reader-address habits in writing, not in speech. |
| `engagement.characteristic_hedges` | Intersection | **Only include hedges that appear in both corpora.** These are the signature hedges that survive self-editing. Hedges that appear only in speech are verbal fillers, not written voice markers. If the intersection is too sparse (fewer than 3), supplement with the most frequent written-corpus hedges. |
| `engagement.characteristic_boosters` | Intersection | Same logic. Include boosters present in both corpora, supplemented by written-only boosters if needed. |
| `graduation.force_profile` | Written | Graduation often moderates in writing. Use written pattern. |
| `graduation.focus_profile` | Written | Same rationale. |
| `graduation.characteristic_intensifiers` | Intersection | Stable intensifiers across both modalities. Supplement with written-only if intersection is sparse. |
| `graduation.characteristic_downtoners` | Intersection | Same logic. |

### cognitive_metaphors

| Field | Source | Rule |
|---|---|---|
| `dominant_frame` | Spoken | Metaphor systems are deep cognitive structures. Spontaneous speech reveals authentic frames. Cross-check: does the same frame appear in writing? If yes, high confidence. If the written frame differs, note both and use the frame that appears in both. |
| `secondary_frame` | Spoken | Same logic. |
| `avoided_frames` | Union | Combine avoided frames from both corpora. If a frame never appears in either modality, ban it. |
| `metaphor_density` | Written | Target output density. People typically use fewer metaphors when writing. |
| `metaphor_novelty` | Written | Novel spoken metaphors often become conventional in writing. Use written novelty level. |

### architecture_of_absence

| Field | Source | Rule |
|---|---|---|
| `banned_transitions` | Written | What they avoid when writing is what matters. Some spoken "transitions" are just filler words, not meaningful absences. |
| `banned_vocabulary` | Union | Combine banned vocabulary from both corpora. If a word never appears in either modality, ban it. |
| `ai_tells_to_suppress` | Default list, calibrated against Written | Start with the default AI-tell list. Remove any items that genuinely appear in the person's **written** corpus. Add person-specific items from written analysis. |
| `structural_prohibitions` | Written | Written structural habits are the target constraint. |
| `rhetorical_red_lines` | Union | Combine red lines from both corpora. A topic they avoid in either modality stays avoided. |
| `cognitive_hesitation_rules` | Written | **How they bridge ideas when writing, not when speaking.** Spoken hesitation is often "ähm" or restarts. Written hesitation reveals their deliberate bridging strategy. |

### ticl_anti_examples

Source = Written-calibrated. Build anti-examples that fail the **written-output profile** specifically. The anti-examples should sound like polished writing but fail the fusion profile's written metrics (MSL, hedge ratio, metaphor frame, etc.).

### editorial_filter

Source = **Derived from the comparative delta.** This is where fusion extraction produces its most valuable output.

See Phase 4 below.

---

## 6. Phase 4: Evidence-Based Editorial Filter

In standard single-corpus extraction, the `editorial_filter` is inferred — the extractor guesses how the person would want to appear based on their raw material. In fusion extraction, the editorial filter is **observed** — derived from the actual delta between spoken and written voice.

### Building the evidence-based filter

For each `editorial_filter` field, the rule is: **observe the transformation that occurred between Corpus S and Corpus W, then codify it.**

**`voice_gap_notes`:** Describe the measured gap. Not "Raw transcripts more fragmented than published voice" (a guess), but "MSL drops from ~27 (spoken) to ~18 (written). Hedge ratio halves from 4:1 to 2:1. Self-mention frequency drops 40%. Fillers 'ähm', 'also', 'sozusagen' eliminated entirely." This is evidence.

**`active_passive_preference`:** Compare passive construction frequency in Corpus S vs. Corpus W. If they use more active voice in writing, codify: "Convert passive to active — observed 70% active in speech rising to 90% active in writing."

**`adverb_policy`:** Compare adverb frequency. If they use fewer adverbs in writing, codify with specifics: "Reduce adverbs — observed from ~X per paragraph (spoken) to ~Y per paragraph (written). Retained adverbs: [list those that survive]."

**`formality_shift`:** Describe the observed register change. Not "moderate upward" but "Spoken register is peer-casual with frequent fillers and first-name references. Written register is professional-accessible: fillers eliminated, sentence structure tightened, but personal anecdotes and direct address preserved."

**`structural_preferences`:** Based on how the person structures their written pieces (openings, closings, paragraph rhythm). Direct evidence, not inference.

**`length_preferences`:** Based on observed written output lengths. "LinkedIn posts: 100–200 words (observed range across 8 posts). Professional emails: 50–150 words."

**`specific_rules`:** Each rule must cite the delta evidence:

```json
[
  "Reduce 'ich glaube' from spoken frequency (~4 per 500 words) to written frequency (~1 per 500 words). Retain in reflective contexts where genuine uncertainty is expressed.",
  "Eliminate verbal fillers entirely: 'ähm', 'also' (as filler), 'sozusagen', 'quasi', 'irgendwie'. None of these appear in Corpus W.",
  "Tighten run-on sentences: spoken corpus shows frequent 40+ word sentences. Written corpus caps at ~30 words. Split or restructure any sentence exceeding 35 words.",
  "Preserve setup-example rhythm: both corpora show claim → concrete example pattern. This is a deep voice marker, not a speech artifact.",
  "Shift from inscribed to invoked evaluation: spoken corpus uses direct judgments ('das ist schlecht'). Written corpus uses implied evaluation through example selection. Apply the same pattern."
]
```

---

## 7. Compiling Fusion Few-Shot Anchors

Fusion extraction produces a modified anchor set:

### Primary anchors (5–7): From Corpus W

Select 5–7 passages from the **written** corpus. These are the primary generation targets — they show the LLM what the output should look like. Same diversity requirements as standard extraction: cover different contexts (explaining, persuading, reflecting, prescribing, analyzing, etc.).

Apply the standard five-axis deconstruction to each.

### Personality calibration anchors (2–3): From Corpus S

Select 2–3 passages from the **spoken** corpus. Label them explicitly as `[PERSONALITY CALIBRATION — spoken voice]`. These show the Drafter the authentic personality underneath the written polish.

Purpose: The spoken anchors prevent the Drafter from producing generic professional content that matches the written metrics but lacks the person's distinctive cognitive signature. They serve as a "personality North Star."

Five-axis deconstruction applies, but add a sixth axis:

```
- Written delta: [How this spoken pattern manifests differently in writing —
  e.g., "The hedging density here (~4:1) reduces to ~2:1 in her written voice,
  but the underlying setup-elaboration rhythm persists."]
```

### Anchor ordering

Present written anchors first (1–7), then spoken calibration anchors (8–10), clearly separated:

```
=== PRIMARY ANCHORS (Written Voice — Generation Targets) ===

Anchor 1 — [Context]
...

=== PERSONALITY CALIBRATION ANCHORS (Spoken Voice — Authenticity Reference) ===

Anchor 8 — [Context] [SPOKEN VOICE]
...
```

---

## 8. Fusion Style Seed Selection

The style seed must come from **Corpus W** (written). The seed is the final calibration signal before generation — it must model the target output modality.

**Selection criteria (same as standard, applied to written corpus):**
- 200–500 words of continuous written prose
- Maximizes density of diagnostic features from the **fused profile**
- Represents the person at their most natural **in writing**
- Is not their most polished piece, but the most *characteristically them* piece of writing

If the written corpus contains only short-form content (e.g., LinkedIn posts under 200 words), concatenate 2–3 thematically related pieces as the style seed, separated by `---`. Note this in the selection rationale.

**Selection rationale must reference the fusion:**

```
<style_seed>
[The 200–500 word excerpt from Corpus W]

Selection rationale: This passage was chosen because it demonstrates [specific fused profile
features]. Key fusion markers visible: [list features that show the spoken personality
surviving into written form — e.g., "the setup-elaboration rhythm from her spoken voice
persists here, but sentences are tighter (MSL ~17 vs. spoken ~27) and hedging is
calibrated to her written ratio (~2:1 vs. spoken ~4:1)."]
</style_seed>
```

---

## 9. Template F: The Fusion Extractor

This is the operational prompt. Use this alongside both corpora to execute the fusion extraction. It follows the same three-block output structure as Template E.

**When to use Template F vs. Template E:**
- Both corpora fit in context window → Use Template F (single-pass fusion)
- Corpora too large for single context → Run Template E separately on each corpus, then use Template F.merge (Section 9.2) to fuse the two profiles

```
ROLE: You are a forensic linguist specializing in computational stylometry and voice
cloning for ghostwriting. You will analyze TWO corpora — spoken and written — from the
same person and produce a single machine-readable Voice DNA Profile optimized for
written content generation.

The fusion principle: "Personality from speech, self-concept from prose." Deep markers
(metaphor systems, evaluative reflexes, reasoning patterns, what they avoid) are sourced
from spoken material — this is who they ARE. Surface markers and evaluative calibration
(sentence length, structure, hedge ratio, polarity, stance, formality) are sourced from
written material — this is who they BELIEVE THEY ARE when they write. The written corpus
captures the client's aspirational literary identity. The gap between spoken and written
IS the editorial filter — observed, not guessed.

You will output THREE structured blocks.

**If you have filesystem access (Claude Code, Cursor, agentic IDE):** Write each block
to its respective file (`master-voice-schema.json`, `few-shot-anchors.md`,
`style-seed.md`) and proceed automatically through all three blocks without stopping.
Use Python for all metric computation.

**If you are in a chat UI without filesystem access:** Output blocks separated by
handshake tokens. After completing each block, output the token and STOP generating.
Wait for the user to say "continue" before producing the next block.

SPOKEN CORPUS (Corpus S):
<spoken_corpus>
[Paste the person's raw spoken material here — transcripts, voice memos,
rapid-fire messages]
</spoken_corpus>

WRITTEN CORPUS (Corpus W):
<written_corpus>
[Paste the person's self-authored written material here — LinkedIn posts,
emails, articles, blog posts]
</written_corpus>

====================================================================
FUSION EXTRACTION PROCEDURE
====================================================================

STEP 1 — DUAL STYLOMETRIC ESTIMATION

Ground your quantitative metrics in evidence from BOTH corpora.

**Mandatory (Python / code execution available):** Run scripts on each corpus
independently. Produce MSL(S), CPR(S), variance(S), MSL(W), CPR(W), variance(W).
Compute the delta. Set estimation_method to
"dual-corpus fusion: computed via code execution."

**Fallback (chat UI without code execution):** Execute scratchpad sampling on
each corpus independently:
<scratchpad_dual_stylometry>
=== CORPUS S (Spoken) ===
Select three non-adjacent passages of ~150 words each from Corpus S.
For EACH passage:
  a) Write out each sentence on its own line
  b) Count the words in each sentence
  c) Count commas and periods
Calculate: MSL(S), variance(S), CPR(S)

=== CORPUS W (Written) ===
Select three non-adjacent passages of ~150 words each from Corpus W.
For EACH passage:
  a) Write out each sentence on its own line
  b) Count the words in each sentence
  c) Count commas and periods
Calculate: MSL(W), variance(W), CPR(W)

=== DELTA ===
Report: MSL delta, CPR delta, variance delta.
Set estimation_method to "dual-corpus fusion: estimated from 3-passage
scratchpad sampling per corpus."
</scratchpad_dual_stylometry>

STEP 2 — PARALLEL FIVE-PROTOCOL ANALYSIS

Analyze BOTH corpora across all five dimensions. For each protocol, produce
observations from Corpus S and Corpus W separately, then note the delta.

Protocol 1 — FORENSIC STYLOMETRY:
- Corpus S: cadence, CPR, punctuation, sentence-starting patterns, paragraph
  structure, reading grade, TTR, function bigrams, characteristic openers
- Corpus W: same metrics
- Delta: where do they diverge?

Protocol 2 — APPRAISAL & COGNITIVE VECTORING:
- Corpus S: attitude, engagement stance, hedges, boosters, H:B ratio,
  self-mention, graduation
- Corpus W: same dimensions
- Delta: how does hedging change? Does polarity shift? Does stance shift?
- CRITICAL: Identify which hedges SURVIVE from speech to writing (signature
  hedges) and which VANISH (verbal fillers).

Protocol 3 — CONCEPTUAL METAPHOR MAPPING:
- Corpus S: dominant frame, secondary frame, avoided frames, density, novelty
- Corpus W: same dimensions
- Delta: do the same frames appear? Does density or novelty change?

Protocol 4 — ARCHITECTURE OF ABSENCE:
- Corpus S: banned transitions, banned vocabulary, structural prohibitions,
  red lines, hesitation rules
- Corpus W: same dimensions
- Delta: what's absent in both? What's absent in writing but present in speech?

Protocol 5 — DUAL-VOICE DECONSTRUCTION:
In fusion mode, this protocol is replaced by the comparative delta analysis.
The spoken→written transformation IS the dual-voice deconstruction, with
direct evidence instead of inference. Assign the macro-archetype from the
spoken corpus (the unmasked personality).

STEP 3 — FUSION DELTA REPORT

Before merging, compile a <fusion_delta> scratchpad documenting all key
deltas. This is MANDATORY — it feeds the merge decisions and the
evidence-based editorial filter.

<fusion_delta>
STRUCTURAL:
- MSL: spoken ~[X] → written ~[Y] (Δ = [Z])
- CPR: spoken [X] → written [Y] (Δ = [Z])
- Variance: spoken [pattern] → written [pattern]
- Paragraph structure: spoken [description] → written [description]

HEDGING:
- H:B ratio: spoken [X]:1 → written [Y]:1 (Δ = [Z])
- Surviving hedges: [list hedges present in both corpora]
- Eliminated hedges/fillers: [list hedges/fillers present only in speech]
- Written-only hedges: [list any hedges that appear only in writing]

FORMALITY:
- Self-mention: spoken [pattern] → written [pattern]
- Fillers eliminated: [list]
- Register shift: [description]

EVALUATIVE (SELF-CONCEPT LAYER):
- Attitude system: stable or shifted? [details]
- Polarity: [spoken] → [written]
  → Self-concept implication: [what does this shift reveal about who they
     believe they are?]
- Stance: [spoken] → [written]
  → Self-concept implication: [authoritative? measured? tentative?]
- Graduation: [spoken] → [written]

METAPHOR:
- Frame stability: [same or different across corpora]
- Density: spoken [level] → written [level]
- Novelty: spoken [level] → written [level]

DERIVED EDITORIAL RULES:
1. [specific transformation observed in the data]
2. [specific transformation observed in the data]
3. [specific transformation observed in the data]
</fusion_delta>

STEP 4 — FUSION MERGE

Apply these source rules to populate each profile field:

VOICE IDENTITY:
- macro_archetype → from Corpus S (unmasked personality)
- archetype_description → blend (spoken behavior + written expression)
- core_editorial_taste → from Corpus W (direct evidence)

STYLOMETRIC FINGERPRINT (all from Corpus W — target output format):
- MSL, std_dev, variance, variance_pattern → Corpus W values
- estimation_method → "dual-corpus fusion" + method used
- CPR → Corpus W
- punctuation_sequencing → Corpus W (spoken punctuation is transcriber artifact)
- reading_grade_level, TTR, yules_k → Corpus W
- dominant_function_bigrams → INTERSECTION of both corpora (stable markers).
  Note spoken-only bigrams as secondary reference.
- sentence_starting_patterns → Corpus W
- paragraph_structure → Corpus W

APPRAISAL & METADISCOURSE:
- attitude.primary_system, secondary_system → Corpus S (authentic evaluative core)
- attitude.inscribed_vs_invoked → Corpus W
- attitude.polarity → Corpus W
- attitude.grammatical_weight → Corpus W
- engagement (all fields) → Corpus W values for frequency/ratio/stance
- characteristic_hedges → INTERSECTION (hedges present in BOTH corpora)
  If intersection < 3, supplement with most frequent written hedges.
- characteristic_boosters → same intersection logic
- graduation → Corpus W
- characteristic_intensifiers, downtoners → INTERSECTION, supplemented by
  written-only items if sparse

COGNITIVE METAPHORS:
- dominant_frame, secondary_frame → Corpus S (spontaneous = authentic)
  Cross-check: does same frame appear in Corpus W? If yes, high confidence.
  If different frame dominates in writing, note both.
- avoided_frames → UNION of both corpora
- metaphor_density → Corpus W
- metaphor_novelty → Corpus W

ARCHITECTURE OF ABSENCE:
- banned_transitions → Corpus W (written avoidances are what matters)
- banned_vocabulary → UNION
- ai_tells_to_suppress → defaults calibrated against Corpus W
- structural_prohibitions → Corpus W
- rhetorical_red_lines → UNION
- cognitive_hesitation_rules → Corpus W (written bridging strategy)

TICL ANTI-EXAMPLES:
- Calibrate against the WRITTEN-output profile. Anti-examples must fail the
  fused profile's written metrics.

EDITORIAL FILTER:
- ENTIRELY derived from the fusion delta. See Phase 4 instructions.
- voice_gap_notes → cite measured deltas with numbers
- specific_rules → each rule cites the observed spoken→written transformation

STEP 5 — TICL ANTI-EXAMPLES

Write 2-3 contrastive negative examples. CRITICAL: These must be polished,
plausible WRITTEN text that sounds "good" but mathematically fails the fused
profile. Common fusion-specific failure modes to demonstrate:

1. "Transcript voice" — text that matches spoken metrics (too many hedges,
   too-long sentences, fillers) instead of written metrics
2. "Generic professional" — text that matches written metrics but lacks the
   person's distinctive personality markers from speech (wrong metaphor frame,
   wrong evaluative core, missing cognitive signature)
3. "AI polish" — text that is neither spoken nor authentically written, using
   AI-default patterns

For each anti-example, cite the specific profile fields violated.

STEP 6 — PRE-GENERATION AUDIT

Before outputting ANY JSON, commit to key findings in a <pre_generation_audit>
scratchpad. Provide EVIDENCE, not assertions.

<pre_generation_audit>
=== CADENCE & STRUCTURE (sourced from Corpus W) ===
1. Written MSL: [number]. Spoken MSL for comparison: [number]. Delta: [Δ]
2. Written variance pattern: [e.g., "15-25 word setups → 5-10 word closers"]
3. Written CPR: [number]. Spoken CPR for comparison: [number]. Delta: [Δ]
4. Written paragraph structure: [sentences per paragraph, single-sentence usage]
5. Written sentence-starting patterns — top 3 with estimated %: [patterns]

=== PSYCHOLOGICAL ENGINE ===
6. Attitude primary system (from Corpus S) with corpus example: [system + quote]
7. Attitude polarity (from Corpus W — self-concept): [polarity].
   Spoken polarity for comparison: [polarity]. Self-concept implication: [description]
8. Written H:B ratio: [ratio]. Spoken H:B ratio: [ratio]. Delta: [Δ]
9. SURVIVING hedges (present in BOTH corpora): [words]
10. ELIMINATED fillers (present only in speech): [words]
11. Written self-mention pattern: [pattern]. Spoken pattern for comparison: [pattern]
12. Engagement stance (from Corpus W — self-concept): [stance].
    Spoken stance: [stance]. Self-concept implication: [description]

=== COGNITIVE LAYER ===
13. Dominant metaphor frame (from Corpus S) with 2 examples: [frame + quotes]
    Cross-check: same frame in Corpus W? [yes/no + evidence]
14. Macro-archetype (from Corpus S): [archetype name]

=== NEGATIVE SPACE ===
15. List 3+ banned words/transitions from Corpus W (beyond defaults): [words]
16. List 2+ structural prohibitions from Corpus W: [prohibitions]
17. List 2+ cognitive hesitation rules from Corpus W: [rules]

=== EVIDENCE-BASED EDITORIAL FILTER ===
18. List 3+ specific_rules derived from the fusion delta, each citing the
    observed spoken→written transformation: [rules with evidence]

=== ANTI-EXAMPLES ===
19. Write a "transcript voice" anti-example — matches spoken metrics, fails
    written: [2-3 sentences + violated fields]
20. Write a "generic professional" anti-example — matches written metrics,
    lacks spoken personality: [2-3 sentences + violated fields]
</pre_generation_audit>

Only after completing all items with evidence, proceed to output.

====================================================================
OUTPUT FORMAT — THREE BLOCKS
====================================================================

OUTPUT BLOCK 1:

**Filesystem mode:** Write the JSON profile to `master-voice-schema.json`.
Print a brief summary (3-5 sentences) of key fusion findings and deltas
to the console, then proceed directly to Block 2.

**Chat UI mode:** Begin with a brief plain-language summary (3-5 sentences)
of key fusion findings. Highlight the most important deltas between spoken
and written voice. Then output the complete JSON profile inside XML tags.

The JSON follows the exact same schema as a standard extraction, with one
addition — a fusion_metadata object:

<master_voice_schema>
{
  "fusion_metadata": {
    "extraction_mode": "dual_corpus_fusion",
    "spoken_corpus_size": "~X words across Y sources",
    "written_corpus_size": "~X words across Y sources",
    "key_deltas": [
      "MSL: spoken ~X → written ~Y",
      "H:B ratio: spoken X:1 → written Y:1",
      "[other significant deltas]"
    ],
    "surviving_markers": [
      "[deep markers that persist across both modalities]"
    ],
    "eliminated_markers": [
      "[spoken markers that vanish in writing]"
    ]
  },
  "voice_identity": { ... },
  "stylometric_fingerprint": { ... },
  "appraisal_and_metadiscourse": { ... },
  "cognitive_metaphors": { ... },
  "architecture_of_absence": { ... },
  "ticl_anti_examples": [ ... ],
  "editorial_filter": { ... }
}

Fill every field with corpus-specific evidence, sourced per the fusion rules.
The editorial_filter.specific_rules must each cite the observed delta.
</master_voice_schema>

**Filesystem mode:** Proceed directly to Block 2.
**Chat UI mode:** Output exactly this line and STOP generating:
<BLOCK_1_COMPLETE>

====================================================================

OUTPUT BLOCK 2:
(Filesystem mode: proceed automatically. Chat UI: wait for user to say "continue.")

**Filesystem mode:** Write the anchors to `few-shot-anchors.md`.
**Chat UI mode:** Output inside XML tags.

<deconstructed_few_shot_anchors>

=== PRIMARY ANCHORS (Written Voice — Generation Targets) ===

Select 5-7 passages from Corpus W. Each must cover a DIFFERENT context.
Apply standard five-axis deconstruction.

=== PERSONALITY CALIBRATION ANCHORS (Spoken Voice — Authenticity Reference) ===

Select 2-3 passages from Corpus S. Label each as [SPOKEN VOICE].
Apply five-axis deconstruction PLUS a sixth axis:
- Written delta: [How this spoken pattern manifests differently in writing]

</deconstructed_few_shot_anchors>

**Filesystem mode:** Proceed directly to Block 3.
**Chat UI mode:** Output exactly this line and STOP generating:
<BLOCK_2_COMPLETE>

====================================================================

OUTPUT BLOCK 3:
(Filesystem mode: proceed automatically. Chat UI: wait for user to say "continue.")

Autonomously identify the single most characteristic 200-500 word passage
from Corpus W (written). This passage must maximize diagnostic feature density
from the FUSED profile — showing the spoken personality surviving into
written form.

CRITICAL: Extract the passage VERBATIM from Corpus W. Do not alter any word.

If Corpus W contains only short-form content (under 200 words per piece),
concatenate 2-3 thematically related pieces separated by ---. Note this in
the rationale.

**Filesystem mode:** Write the style seed to `style-seed.md`.
**Chat UI mode:** Output inside XML tags.

<style_seed>
[The 200-500 word excerpt from Corpus W]

Selection rationale: This passage was chosen because it demonstrates [list
specific fused profile features]. Key fusion markers visible: [features
showing spoken personality surviving into written form, e.g., "the
setup-elaboration rhythm from speech persists, but MSL tightens from ~27
to ~18 and hedging calibrates to written ratio ~2:1"].
</style_seed>

End with deployment guidance: how to use this fusion profile with the Drafter,
Editor, and Judge templates. Note that the fusion-extracted editorial filter is
evidence-based and higher-confidence than inferred filters.
```

---

## 9.2 Template F.merge — Sequential Fusion (for large corpora)

When both corpora cannot fit in a single context window, use this sequential approach:

1. **Session 1:** Run Template E on Corpus S → produces Spoken Profile (3 blocks)
2. **Session 2:** Run Template E on Corpus W → produces Written Profile (3 blocks)
3. **Session 3:** Run Template F.merge (below) on both profiles → produces Fused Profile

```
ROLE: You are a forensic linguist performing a dual-corpus Voice DNA fusion.
You have two independently extracted Voice DNA Profiles for the same person —
one from their spoken material and one from their written material. Your job
is to merge them into a single profile optimized for written content generation.

The fusion principle: "Personality from speech, self-concept from prose."
The spoken profile reveals who they ARE. The written profile reveals who they
BELIEVE THEY ARE — their aspirational literary identity. Evaluative shifts
between the two (polarity, stance, graduation) are self-concept evidence.

SPOKEN PROFILE:
<spoken_profile>
[Paste the complete Block 1 JSON from the spoken extraction]
</spoken_profile>

SPOKEN ANCHORS:
<spoken_anchors>
[Paste Block 2 from the spoken extraction]
</spoken_anchors>

WRITTEN PROFILE:
<written_profile>
[Paste the complete Block 1 JSON from the written extraction]
</written_profile>

WRITTEN ANCHORS:
<written_anchors>
[Paste Block 2 from the written extraction]
</written_anchors>

====================================================================
FUSION MERGE PROCEDURE
====================================================================

STEP 1 — COMPARATIVE DELTA ANALYSIS

Compare the two profiles field by field. Compile a <fusion_delta> scratchpad
documenting all significant deltas between spoken and written profiles.

Focus on:
- MSL delta (how much sentences tighten)
- H:B ratio delta (how much hedging reduces)
- Which hedges/boosters survive across both profiles (intersection)
- Attitude system stability or shift
- Metaphor frame stability or shift
- Formality and register differences

STEP 2 — APPLY FUSION MERGE RULES

Use the field-by-field merge rules:
- voice_identity: archetype from spoken, editorial taste from written
- stylometric_fingerprint: ALL metrics from written profile
- dominant_function_bigrams: intersection of both profiles
- appraisal: attitude system from spoken, all frequencies/ratios from written
- characteristic_hedges/boosters: intersection (present in both)
- cognitive_metaphors: frames from spoken, density/novelty from written
- architecture_of_absence: transitions/prohibitions from written,
  red lines/vocabulary as union
- editorial_filter: derived from the measured delta

STEP 3 — BUILD EVIDENCE-BASED EDITORIAL FILTER

Every specific_rule must cite the observed delta:
"[spoken pattern] → [written pattern], therefore [rule]"

STEP 4 — BUILD FUSION-SPECIFIC ANTI-EXAMPLES

Two failure modes unique to fusion:
1. "Transcript voice" — matches spoken metrics instead of written
2. "Generic professional" — matches written metrics but lacks spoken personality

====================================================================
OUTPUT
====================================================================

**Filesystem mode:** Write each block to its respective file and proceed
automatically through all three blocks. No stop tokens needed.
**Chat UI mode:** Output blocks with handshake tokens, stopping after each.

BLOCK 1: Fused Master Voice Schema JSON (with fusion_metadata)
→ Filesystem: write to `master-voice-schema.json`
**Chat UI:** <BLOCK_1_COMPLETE>

BLOCK 2: Fusion anchors — 5-7 from written profile (primary) + 2-3 from
spoken profile (personality calibration, with written-delta axis added)
→ Filesystem: write to `few-shot-anchors.md`
**Chat UI:** <BLOCK_2_COMPLETE>

BLOCK 3: Style seed from written profile + deployment guidance
→ Filesystem: write to `style-seed.md`
```

---

## Quality Gate — Fusion-Specific Checks

After all three blocks are delivered, verify:

- [ ] Dual stylometric estimation was performed on both corpora independently
- [ ] The fusion delta was documented with specific numbers, not vague descriptions
- [ ] Every JSON field cites its source corpus (spoken, written, intersection, or union)
- [ ] MSL, CPR, and variance in the profile match the **written** corpus metrics
- [ ] H:B ratio in the profile matches the **written** corpus ratio
- [ ] characteristic_hedges contains only hedges present in **both** corpora (or supplemented with written-only if intersection was sparse)
- [ ] The editorial_filter.specific_rules each cite observed spoken→written transformations
- [ ] TICL anti-examples include at least one "transcript voice" failure and one "generic professional" failure
- [ ] Primary few-shot anchors are from Corpus W; personality calibration anchors are from Corpus S
- [ ] Style seed is from Corpus W
- [ ] fusion_metadata accurately reports corpus sizes and key deltas

---
---

# PART IV — VOICE PROFILE SCHEMA

The machine-readable schema template, field-by-field guide, and a fully worked example profile.

---

## The Schema Template

Every extraction must output this exact structure inside `<master_voice_schema>` XML tags. Every field populated with specific corpus evidence.

For **fusion extractions** (dual-corpus spoken + written), include the `fusion_metadata` object at the top of the schema. For **standard extractions** (single-corpus), omit it.

```json
{
  "fusion_metadata": {
    "extraction_mode": "dual_corpus_fusion",
    "spoken_corpus_size": "",
    "written_corpus_size": "",
    "key_deltas": [],
    "surviving_markers": [],
    "eliminated_markers": []
  },

  "voice_identity": {
    "macro_archetype": "",
    "archetype_description": "",
    "core_editorial_taste": ""
  },

  "stylometric_fingerprint": {
    "mean_sentence_length": 0,
    "sentence_length_std_dev": 0,
    "sentence_length_variance": "",
    "variance_pattern": "",
    "estimation_method": "",
    "comma_to_period_ratio": 0,
    "punctuation_sequencing": {
      "em_dashes": "",
      "semicolons": "",
      "ellipses": "",
      "exclamation_marks": "",
      "rhetorical_questions": "",
      "parenthetical_asides": ""
    },
    "reading_grade_level": 0,
    "type_token_ratio": "",
    "yules_k": "",
    "dominant_function_bigrams": [],
    "sentence_starting_patterns": [],
    "paragraph_structure": ""
  },

  "appraisal_and_metadiscourse": {
    "attitude": {
      "primary_system": "",
      "secondary_system": "",
      "inscribed_vs_invoked": "",
      "polarity": "",
      "grammatical_weight": ""
    },
    "engagement": {
      "stance": "",
      "hedge_frequency": "",
      "booster_frequency": "",
      "hedge_to_booster_ratio": "",
      "self_mention_pattern": "",
      "engagement_markers": "",
      "characteristic_hedges": [],
      "characteristic_boosters": []
    },
    "graduation": {
      "force_profile": "",
      "focus_profile": "",
      "characteristic_intensifiers": [],
      "characteristic_downtoners": []
    }
  },

  "cognitive_metaphors": {
    "dominant_frame": "",
    "secondary_frame": "",
    "avoided_frames": [],
    "metaphor_density": "",
    "metaphor_novelty": ""
  },

  "architecture_of_absence": {
    "banned_transitions": [],
    "banned_vocabulary": [],
    "ai_tells_to_suppress": [
      "delve", "delve into", "navigate", "testament to",
      "in the realm of", "a tapestry of", "it's worth noting",
      "at its core", "the landscape of", "underscores",
      "multifaceted", "robust", "holistic", "leverage",
      "pivotal", "foster", "harness", "embark", "unpack",
      "in today's fast-paced world", "in an era of"
    ],
    "structural_prohibitions": [],
    "rhetorical_red_lines": [],
    "cognitive_hesitation_rules": []
  },

  "ticl_anti_examples": [
    {
      "bad_output": "",
      "why_it_fails": ""
    },
    {
      "bad_output": "",
      "why_it_fails": ""
    }
  ],

  "editorial_filter": {
    "voice_gap_notes": "",
    "active_passive_preference": "",
    "adverb_policy": "",
    "formality_shift": "",
    "structural_preferences": "",
    "length_preferences": "",
    "specific_rules": []
  }
}
```

---

## Field-by-Field Guide

### fusion_metadata (fusion extractions only)

**extraction_mode** — Always `"dual_corpus_fusion"` for fusion-extracted profiles. Omit this entire object for standard single-corpus extractions.

**spoken_corpus_size** — Approximate word count and source count. Example: `"~12,000 words across 4 transcript sessions"`

**written_corpus_size** — Same format. Example: `"~3,500 words across 12 LinkedIn posts and 8 emails"`

**key_deltas** — Array of the most significant differences between spoken and written voice. Each entry states the metric, spoken value, written value. Example: `"MSL: spoken ~27 → written ~18"`, `"H:B ratio: spoken 4:1 → written 1.5:1"`

**surviving_markers** — Array of deep personality markers that persist across both modalities. These are the highest-confidence voice features. Example: `"setup-elaboration rhythm"`, `"Bridge/Translation metaphor frame"`, `"Judgment-primary appraisal"`

**eliminated_markers** — Array of spoken markers that vanish in writing. These are explicitly excluded from the generation profile. Example: `"ähm (filler)"`, `"sozusagen (verbal hedge)"`, `"40+ word run-on sentences"`

### voice_identity

**macro_archetype** — Select from this closed set:

| Archetype | Core Behavior |
|---|---|
| The Translator | Curious bridge between expertise and lay audience. |
| The Commander | Authoritative, directive. Minimal hedging. |
| The Storyteller | Narrative-driven. Stories before principles. |
| The Analyst | Data-first, systematic. Evidence before conclusions. |
| The Provocateur | Contrarian. Questions assumptions. |
| The Coach | Supportive, developmental. Reader growth. |
| The Insider | Exclusive knowledge. Intimacy through access. |

**archetype_description** — 1–2 sentence behavioral description specific to this person.

**core_editorial_taste** — Primary editorial preferences as specific rules.

### stylometric_fingerprint

**mean_sentence_length** — Specific number. Example: 14.2. If estimated: "~14 (estimated)."

**sentence_length_std_dev** — Numeric if computed, otherwise "high"/"medium"/"low."

**sentence_length_variance** — "high" / "medium" / "low"

**variance_pattern** — Specific rhythm described concretely. Example: "Alternates between 22–28 word complex sentences and 3–6 word punches. Short always follows long."

**estimation_method** — "computed via code execution" or "estimated from 3-passage scratchpad sampling." This field determines tolerances downstream: the Judge uses ±2 MSL for computed values, ±3 for estimated. Always populate this field.

**comma_to_period_ratio** — Specific number.

**punctuation_sequencing** — Each sub-field: **frequency** + **function**.

**reading_grade_level** — US grade level number.

**type_token_ratio** — "high" / "moderate" / "low."

**yules_k** — Numeric if computed, otherwise skip or estimate.

**dominant_function_bigrams** — Array of 3–5 actual pairings from corpus.

**sentence_starting_patterns** — Array with estimated percentages summing to ~100%.

**paragraph_structure** — Concrete description.

### appraisal_and_metadiscourse

**attitude.primary_system** — "Affect" / "Judgment" / "Appreciation" with qualifier.

**attitude.secondary_system** — Similarly qualified.

**attitude.inscribed_vs_invoked** — With pattern note.

**attitude.polarity** — "Positive-dominant" / "Negative-dominant" / "Balanced."

**attitude.grammatical_weight** — Which part of speech carries evaluative force.

**engagement.stance** — With behavioral description.

**engagement.hedge_frequency** — Qualitative or per-1,000-words.

**engagement.booster_frequency** — Qualitative or per-1,000-words.

**engagement.hedge_to_booster_ratio** — Ratio. Example: "2.7:1 hedge-dominant."

**engagement.self_mention_pattern** — Specific pattern.

**engagement.engagement_markers** — Reader-address habits.

**engagement.characteristic_hedges** — Array of actual words from corpus.

**engagement.characteristic_boosters** — Array of actual words from corpus.

**graduation.force_profile** — "Maximizer" / "Minimizer" with description.

**graduation.focus_profile** — "Sharpener" / "Softener" with description.

**graduation.characteristic_intensifiers** — Array of actual words.

**graduation.characteristic_downtoners** — Array of actual words.

### cognitive_metaphors

**dominant_frame** — Primary domain with 2–3 corpus examples.

**secondary_frame** — If present.

**avoided_frames** — Array of clashing domains. The Drafter must never use these.

**metaphor_density** — "high" / "moderate" / "low."

**metaphor_novelty** — "novel" / "conventional" / "mixed."

### architecture_of_absence

**banned_transitions** — Array of absent transitional phrases.

**banned_vocabulary** — Person-specific avoided words.

**ai_tells_to_suppress** — Pre-populated defaults. Remove any the person uses. Add person-specific additions.

**structural_prohibitions** — Array of banned structural habits.

**rhetorical_red_lines** — Array of off-limit topics, stances, emotions.

**cognitive_hesitation_rules** — **Array** of separate, concrete, actionable instructions. Each independently parseable. Example:
```json
[
  "When bridging loosely connected ideas, use a terse fragment or rhetorical question",
  "Never fabricate a smooth transition between weakly related concepts",
  "Abrupt topic shifts are acceptable and characteristic",
  "Use 'Look.' or 'Here's the thing.' as pivot devices"
]
```

### ticl_anti_examples

Array of 2–3 objects. **Critical:** Must be polished, plausible text that sounds "good" but mathematically fails this specific profile — not cartoon-bad generic text. Each must cite specific violated profile fields.

### editorial_filter

**Downstream usage rule:** This section is injected ONLY into Template B (Editor) and Template C (Judge). It must be **physically removed** from the JSON before injection into Template A (Drafter) or Template A.1/A.2. This separation is structural, not optional.

**voice_gap_notes** — Gap between raw and published voice.

**active_passive_preference** — Editor rule.

**adverb_policy** — Editor rule.

**formality_shift** — Editor rule.

**structural_preferences** — Editor rule. Note: the Editor's Anti-Smoothing Directive means structural changes are limited to what this field explicitly permits. The Editor cannot restructure sentences beyond what is listed here.

**length_preferences** — Length/density rules.

**specific_rules** — Array of concrete transformation instructions.

---

## Worked Example Profile

A completed profile for a hypothetical B2B executive — direct, analytical, architecture-minded:

```json
{
  "voice_identity": {
    "macro_archetype": "The Translator",
    "archetype_description": "Acts as a curious, slightly skeptical bridge between complex operational knowledge and a business audience. Dismantles jargon through rhetorical questions and concrete analogies.",
    "core_editorial_taste": "Ruthlessly cut adverbs. Favor active voice. Keep paragraphs to 2–3 sentences. End with provocation, never summary."
  },

  "stylometric_fingerprint": {
    "mean_sentence_length": 14.2,
    "sentence_length_std_dev": 8.7,
    "sentence_length_variance": "high",
    "variance_pattern": "Alternates between flowing 22–28 word multi-clause structures and punchy 3–6 word declarative sentences. Short follows long, creating setup-punch rhythm.",
    "estimation_method": "computed via code execution",
    "comma_to_period_ratio": 1.5,
    "punctuation_sequencing": {
      "em_dashes": "heavy — parenthetical thoughts and mid-sentence pivots",
      "semicolons": "absent — never used",
      "ellipses": "rare — informal messages only",
      "exclamation_marks": "absent in professional content",
      "rhetorical_questions": "frequent — ~1 per 200 words, dismantles assumptions",
      "parenthetical_asides": "moderate — self-aware commentary"
    },
    "reading_grade_level": 10,
    "type_token_ratio": "moderate",
    "yules_k": 110,
    "dominant_function_bigrams": ["But if", "And yet", "So when", "The problem", "What if"],
    "sentence_starting_patterns": [
      "Coordinating conjunction (~30%) — 'But,' 'And,' 'So'",
      "Subject-first declarative (~35%)",
      "Rhetorical question (~15%)",
      "Subordinate clause (~12%)",
      "Fragment for emphasis (~8%)"
    ],
    "paragraph_structure": "Short — 2–3 sentences. Rarely exceeds 4. Single-sentence paragraphs for emphasis."
  },

  "appraisal_and_metadiscourse": {
    "attitude": {
      "primary_system": "Judgment — evaluates human capacity and competence",
      "secondary_system": "Appreciation — evaluates systems functionally",
      "inscribed_vs_invoked": "Mixed — inscribed for negative judgments, invoked for positive",
      "polarity": "Negative-dominant — leads with what's broken, pivots to solutions",
      "grammatical_weight": "Adjective phrases dominant"
    },
    "engagement": {
      "stance": "Heteroglossic — acknowledges alternatives before asserting",
      "hedge_frequency": "moderate — ~8 per 1,000 words",
      "booster_frequency": "low — ~3 per 1,000 words",
      "hedge_to_booster_ratio": "2.7:1 hedge-dominant",
      "self_mention_pattern": "'I' for opinions, 'we' for prescriptions, avoids passive",
      "engagement_markers": "Rhetorical questions to dismantle assumptions. Direct 'you' in prescriptive sections.",
      "characteristic_hedges": ["arguably", "in most cases", "tends to", "my read is"],
      "characteristic_boosters": ["clearly", "the reality is", "without question"]
    },
    "graduation": {
      "force_profile": "Minimizer — avoids superlatives, understated delivery. Extreme intensifiers reserved for rare genuine emphasis.",
      "focus_profile": "Sharpener — 'a real problem,' 'the actual issue,' 'genuine expertise'",
      "characteristic_intensifiers": ["genuinely", "the actual", "real"],
      "characteristic_downtoners": ["somewhat", "decent enough", "not entirely wrong", "arguably"]
    }
  },

  "cognitive_metaphors": {
    "dominant_frame": "Architecture/Engineering — 'building foundations,' 'structural integrity,' 'stress-testing,' 'blueprints'",
    "secondary_frame": "Mechanical/Systems — 'levers,' 'gears,' 'engine,' 'friction'",
    "avoided_frames": ["war/combat", "organic/gardening", "sports/competition"],
    "metaphor_density": "moderate — ~1 in 4 paragraphs",
    "metaphor_novelty": "mixed — primarily conventional with occasional originals"
  },

  "architecture_of_absence": {
    "banned_transitions": [
      "Furthermore", "Moreover", "In conclusion", "Additionally",
      "It is important to note", "That being said", "Needless to say",
      "At the end of the day", "Moving forward", "Having said that"
    ],
    "banned_vocabulary": [
      "synergy", "circle back", "deep dive", "thought leader",
      "game changer", "disruptive", "innovative (as empty modifier)",
      "stakeholder alignment", "value proposition"
    ],
    "ai_tells_to_suppress": [
      "delve", "delve into", "navigate", "testament to",
      "in the realm of", "a tapestry of", "it's worth noting",
      "at its core", "the landscape of", "underscores",
      "multifaceted", "robust", "holistic", "leverage",
      "pivotal", "foster", "harness", "embark", "unpack",
      "in today's fast-paced world", "in an era of"
    ],
    "structural_prohibitions": [
      "semicolons",
      "bullet points in published content",
      "perfectly balanced three-part summative conclusions",
      "neat wrap-up paragraphs",
      "uniform paragraph lengths",
      "dense noun-heavy opening sentences"
    ],
    "rhetorical_red_lines": [
      "Never attacks competitors by name",
      "Never expresses personal vulnerability publicly",
      "Never uses inspirational platitudes or motivational language"
    ],
    "cognitive_hesitation_rules": [
      "When bridging loosely connected ideas, use a terse fragment or rhetorical question as pivot",
      "Never fabricate a smooth transition between weakly related concepts",
      "Abrupt topic shifts are acceptable and characteristic",
      "Use 'Look.' or 'Here's the thing.' as natural pivot devices",
      "When uncertain about a claim, state it directly rather than hedging with filler"
    ]
  },

  "ticl_anti_examples": [
    {
      "bad_output": "The real question isn't whether your operations team can handle the load — it's whether they've been set up to succeed in the first place. Most organizations invest heavily in tools but underinvest in the connective tissue between departments, leaving capable people stranded in workflows that quietly work against them.",
      "why_it_fails": "Polished and plausible but fails on three axes: (1) uses organic metaphor ('connective tissue') instead of architectural dominant frame, (2) graduation too amplified for minimizer profile ('quietly work against them' is dramatic, not understated), (3) second sentence is 28 words with no variance — missing setup-punch rhythm."
    },
    {
      "bad_output": "Process improvement demands honest assessment. You can pour resources into optimization frameworks, but if nobody's willing to name the actual bottleneck — usually a leadership gap, not a systems gap — you're essentially renovating a house with a cracked foundation.",
      "why_it_fails": "Closer but fails on: (1) 'demands' is maximizer language violating minimizer graduation, (2) extended metaphor ('renovating a house with a cracked foundation') — target uses architectural metaphors fragmentarily, not as extended analogies, (3) 'essentially' is a hedge absent from the person's characteristic_hedges array — their hedges are 'arguably,' 'in most cases,' 'my read is.'"
    }
  ],

  "editorial_filter": {
    "voice_gap_notes": "Raw transcripts more fragmented than published voice. Client self-concept: sharp, precise analyst.",
    "active_passive_preference": "Strong active voice — convert passive constructions",
    "adverb_policy": "Cut most adverbs. Retain only when they modify meaning, not intensity.",
    "formality_shift": "Moderate upward — remove filler and false starts, retain fragments and abrupt endings",
    "structural_preferences": "Restructure only meandering multi-sentence tangents into setup-punch pairs. Do not merge fragments or smooth abrupt transitions.",
    "length_preferences": "LinkedIn posts: 150–250 words. Articles: 800–1,200 words.",
    "specific_rules": [
      "Convert 'I think' to direct assertion or 'My read is'",
      "Remove throat-clearing openings — start with the point",
      "End pieces with a provocative question or blunt statement, never a summary"
    ]
  }
}
```

**Example deconstructed anchor:**

```
Anchor 1 — Informal Explanation

Text: "Most marketing teams build bridges to nowhere. They measure the concrete, sure.
But they completely ignore whether anyone actually wants to cross."

Deconstruction:
- Cadence: MSL ~10 with high variance (15, 7, 12). Setup-punch rhythm.
- Metaphor: Architectural frame ("bridges," "concrete") — dominant frame.
- Appraisal: Negative Judgment ("completely ignore") — inscribed. Minimizer graduation.
- Function Bigrams: "But they" — coordinating conjunction start (~30%).
- Absence: Zero transitions. No AI-tells. Ends abruptly with image, no wrap-up.
```

---
---

# PART V — GENERATION GUIDE

How to use a completed Voice DNA Profile to generate content, prevent voice decay, verify fidelity, and manage multi-client workflows. This part contains five ready-to-use injection templates.

---

## 1. The Stateless Generation Workflow

When generating content using a Voice DNA Profile, follow this exact sequence.

**Agent mode (Claude Code, Cursor, agentic IDE):** Execute this entire workflow autonomously. Read profile artifacts from disk (`master-voice-schema.json`, `few-shot-anchors.md`, `style-seed.md`), run all steps without human intervention, and write the final output to disk. Use Python for any metric verification.

**Chat UI mode:** Execute step-by-step with the user providing materials.

### Step 1 — Context Purge
Start with a completely clean context. New conversation in a chat interface. Fresh request via API. The generation context must contain nothing except the materials listed below. Cross-client contamination is fatal.

### Step 2 — Inject the Drafter Profile
Use Template A (Section 7). Load:
1. The Drafter role instruction
2. The Master Voice Schema — **with the `editorial_filter` section removed** (see Section 3 for why)
3. The Deconstructed Few-Shot Anchors
4. The Style Seed
5. The Content Brief

### Step 3 — Generate in Controlled Chunks
Never generate the full piece in one pass. Template A instructs the LLM to produce only the first 400–500 tokens. This is Generative Chunking — the primary defense against voice decay.

### Step 4 — Re-Anchor and Continue
After each chunk, use **Template A.1** (Section 8) to request the next chunk. This template requires:

1. **A rolling argument summary** — a 2–4 sentence summary of what has been argued so far, so the Drafter doesn't repeat points or lose the thread
2. **The last 2–3 sentences** of the previous chunk for stylistic continuity
3. **Critical profile constraints** re-injected: the `architecture_of_absence`, cadence metrics, `appraisal_and_metadiscourse` stance, and `cognitive_hesitation_rules`

The rolling summary prevents argumentative drift. The re-anchored constraints prevent voice decay. Together they maintain both coherence and fidelity across chunks.

**Agent mode:** The agent assembles each continuation call automatically, extracting the rolling summary and last sentences from the previous chunk programmatically.

### Step 5 — Apply the Editorial Filter
Once the raw draft is complete, run it through **Template B** (Section 10). This is a **separate pass** with a separate prompt. The Editor transforms generative voice into published voice.

### Step 6 — Run the Fidelity Check
Use **Template C** (Section 11) to verify each chunk against the profile. **Run the Judge on individual chunks (400–500 tokens each), not the fully assembled document.** The Judge's per-sentence math audit requires manageable chunk sizes; running it on a 2,000-word assembled piece would exceed practical output limits and degrade accuracy. The Editor (Step 5) handles the full assembled text; the Judge handles chunks.

### Step 7 — Handle Failures
If the Judge returns `<FAIL>`, use **Template A.2** (Section 9) to regenerate only the failed chunk with targeted fix instructions. Do not regenerate from scratch.

**Critical loop closure:** Template A.2 outputs raw generative voice (no editorial polish). After A.2 revision, you must pass the revised chunk through **Template B (Editor) again**, then **Template C (Judge) again** before integrating it into the final piece. The full recovery loop is: A.2 Revision → Editor → Judge. Skipping the re-edit will leave an unpolished chunk inside a polished document.

**Agent mode:** The agent executes the full A.2 → B → C recovery loop automatically on any failed chunk, up to 2 retries before escalating to the user.

---

## 2. Voice Decay & Mitigation

**Voice Decay** (Persona Drift / Context Rot) is a predictable degradation where the LLM abandons injected style constraints and reverts to its default helpful-assistant voice. Persona self-consistency degrades by more than 30% after 8–12 dialogue turns (~2,000 tokens).

### Why it happens
The attention mechanism exponentially decays focus on distant tokens. Style instructions become progressively less influential. Output starts dynamic and characteristic, then morphs into dense, generic prose.

### The five defenses

**1. Generative Chunking (primary):**
Restrict all generation to 400–1,000 token chunks. Generation completes before attention drifts.

**2. Aggressive Prompt Re-Anchoring:**
Between every chunk, re-assert critical constraints via Template A.1: banned transitions, AI tells, cadence metrics, appraisal vectors, hesitation rules.

**3. Rolling Argument Summaries:**
Provide a 2–4 sentence summary of the arguments made so far with each continuation request. This prevents the Drafter from repeating itself or losing the logical thread across chunks.

**4. Prefilled Stylistic Seeds:**
Never let the LLM start a new chunk from scratch. Provide the last 1–2 sentences of the previous chunk.

**5. Context Window Management:**
For long pieces (2,000+ words), keep only:
- The Voice DNA Profile (always)
- The rolling argument summary (updated each chunk)
- The most recent chunk's last sentences (for continuity)
- The content brief for the next section

---

## 3. The Dual-Pass Editorial Process

This solves the Five-Voice Problem — the gap between how someone naturally talks and how they want to appear in print.

### Why the passes must be strictly separated

The `editorial_filter` section of the Voice DNA Profile contains rules like "ruthlessly cut adverbs" and "favor active voice." If the Drafter sees these rules in its context, its attention mechanism will apply them during generation. This collapses the two passes into one and destroys the raw, authentic generative output that the system depends on.

**The rule is structural:** When assembling the Drafter's prompt, physically remove the `editorial_filter` object from the JSON schema before injection. The Editor receives it in a separate pass.

### Pass 1 — The Drafter (Template A)
Generates raw text anchored to the person's **generative voice**. Uses everything in the profile except `editorial_filter`. Priorities:
- Adherence to `stylometric_fingerprint` (cadence, rhythm, punctuation)
- Adherence to `appraisal_and_metadiscourse` (attitude, engagement, graduation)
- Adherence to `architecture_of_absence` (everything they don't do)
- Use of correct `cognitive_metaphors` frames
- Following `cognitive_hesitation_rules` at transitions
- Natural imperfections that mirror human thought

### Pass 2 — The Editor (Template B)
Receives the Drafter's raw output plus ONLY the `editorial_filter` and `architecture_of_absence` sections. The Editor applies editorial rules but is **strictly forbidden** from altering the Drafter's sentence structure, MSL, or paragraph rhythm. See the Anti-Smoothing Directive in Template B.

### When to use a single pass
For short-form content (under 300 words — a LinkedIn post, a comment), a single pass with the full profile is usually sufficient. The separation adds most value for long-form content.

---

## 4. LLM-as-a-Judge Verification

A secondary evaluation pass that replaces subjective review with an automated forensic audit. Use Template C (Section 11).

### The Judge receives:
1. The generated text (post-Editor)
2. The complete `<master_voice_schema>` (as the scoring rubric)
3. Instructions to perform a scratchpad audit and binary feature check

### The Scratchpad Audit

The Judge must show its work in a `<scratchpad>` before rendering verdict:
1. List each sentence with its word count. Calculate approximate MSL.
2. List every transition word and cross-reference against `banned_transitions`
3. Scan for any vocabulary in `ai_tells_to_suppress` or `banned_vocabulary`
4. Identify the dominant appraisal instances and classify them
5. Note metaphor frames used
6. Check each `cognitive_hesitation_rule` at transition points

### Binary Feature Audit

After the scratchpad, answer each with PASS or FAIL:

**Cadence:** MSL within tolerance of target? Variance pattern matches?
**Negative Space:** Any banned transition, AI-tell, or banned vocabulary present? Structural prohibitions violated?
**Appraisal:** Correct attitude system, engagement stance, graduation?
**Metaphor:** Correct dominant frame? No avoided frames?
**Hesitation:** cognitive_hesitation_rules followed at transitions?
**Red Lines:** Any rhetorical_red_lines crossed?

### Verdict

**PASS** — Clear for production.
**FAIL** — Includes specific failure notes with exact violations, affected profile fields, and targeted regeneration guidance for Template A.2.

**Automatic fail triggers (zero-tolerance):**
- Any banned AI-tell or transition present
- MSL deviation beyond tolerance (±2 for computed metrics, ±3 for estimated)
- Deliberate or extended use of an avoided metaphor frame (dead/conventionalized metaphors are flagged but tolerated)
- Primary appraisal system absent or clearly subordinate (secondary system appearances are expected when chunk topic pulls toward them)
- 2+ structural prohibitions violated (1 minor violation is flagged but tolerated)
- Any rhetorical red line crossed

**Tolerances applied to non-zero-tolerance checks:**
- CPR: ±0.3 of target
- H:B ratio: ±0.5 of target ratio
- Sentence-starting pattern distribution: ±10 percentage points per category
- Variance pattern: directional match required, not exact word counts
- Hesitation rules: only evaluated at actual topic transitions within the chunk

### The Target Metric
**Edit distance < 8%** — the final human editor changes fewer than 8% of words.

---

## 5. Multi-Client Contamination Shielding

### API-based workflows (recommended)
Stateless calls. Each request contains only the target client's profile, anchors, seed, and brief.

### Chat-based workflows
Start a **new conversation** for each client. Never switch clients within the same conversation.

### Agent-based workflows
The ghostwriter agent receives only one client's profile per task. The orchestrator ensures strict session isolation.

---

## 6. Calibration & Longitudinal Monitoring

### Initial Calibration (Three-Round Protocol)

**Round 1 — Blind Test:** Generate 200–300 words. Present to client without revealing it's AI-generated.

**Round 2 — Feature Audit:** Run the Judge (Template C) on Round 1 output. Adjust profile.

**Round 3 — Production Pilot:** Generate 3–5 pieces. Track edit distance. Target: < 8%.

### Living Document Maintenance

**Monthly taxonomy audits:** Check `ai_tells_to_suppress` for new model defaults.
**Client evolution:** Every 3–6 months, ingest new raw material and compare.
**Canary prompts:** Weekly regression tests on known topics.

### Feedback Integration
After every human review: document changes, whether they reflect profile inaccuracy or editorial preference. Feed back into `architecture_of_absence` and `editorial_filter`.

---

## 7. Template A: The Drafter

Use this template for the **first chunk** of a generation pass. **Remove the `editorial_filter` object from the JSON before injecting.**

```
ROLE: You are a master ghostwriter. The Voice DNA Profile below is an absolute
mathematical rubric — not a creative suggestion, not a mood board, not a set of
flexible guidelines. It contains hard numerical targets, banned-word arrays, and
structural constraints that function as pass/fail criteria. A forensic auditor
(Template C) will verify your output against every field in this profile. Treat
each constraint as a measurable specification you must hit.

Your single objective is to write raw, authentic content that satisfies every
measurable dimension of this profile simultaneously.

You are generating the RAW GENERATIVE VOICE — how this person naturally produces language.
Do NOT polish, smooth, or editorially refine. Preserve the authentic rhythm, including
fragments, abrupt transitions, and characteristic imperfections.

HARD CONSTRAINTS (zero-tolerance — any single violation is a critical failure):
1. Never use ANY word or phrase in "banned_transitions," "banned_vocabulary," or
   "ai_tells_to_suppress."
2. Never use metaphors from "avoided_frames."
3. Do not generate summative conclusions, three-part balanced structures, or any pattern
   in "structural_prohibitions."
4. ANTI-CONCLUSION RULE: You are generating only a CHUNK of a larger piece. Do NOT wrap
   up, conclude, or tie a bow at the end of your output. Stop mid-thought or mid-paragraph
   if necessary. The piece continues in the next chunk.

TARGET CONSTRAINTS (tolerance-banded — aim to hit, Judge allows narrow deviation):
5. Sentence rhythm must match "variance_pattern." Alternate between long and short
   lengths. Target MSL within ±2 words of profile value. Do not fall into uniform lengths.
6. Evaluative stance must match "appraisal_and_metadiscourse." Primary attitude system
   must be dominant; secondary may appear. H:B ratio within ±0.5 of target.
7. Metaphors must come from "dominant_frame." Dead/conventional metaphors are tolerated;
   deliberate extended metaphors from non-dominant frames are not.
8. At conceptual transitions, follow "cognitive_hesitation_rules." Hesitations only at
   genuine topic shifts, not as generic filler.
9. Sentence-starting pattern distribution within ±10 percentage points per category.

VOICE DNA PROFILE:
[Paste <master_voice_schema> here — with the "editorial_filter" section REMOVED]

ANCHOR EXAMPLES:
[Paste <deconstructed_few_shot_anchors> here]

STYLE SEED — Read this passage to calibrate your voice before generating:
[Paste <style_seed> here]

CONTENT BRIEF:
[Topic, argument, key points, target length, structure outline if applicable]

GENERATE the first 400–500 tokens only. Do NOT conclude the piece. Stop mid-flow.
```

---

## 8. Template A.1: Drafter Continuation

Use this template for **every chunk after the first.** It re-anchors the voice constraints and provides argumentative context to prevent both voice decay and logical drift.

```
ROLE: You are continuing a piece as the same master ghostwriter. The Voice DNA Profile
remains an absolute mathematical rubric — every constraint is a pass/fail specification,
not a suggestion. Maintain strict adherence. You are still generating RAW GENERATIVE VOICE.

HARD CONSTRAINTS (re-anchored — zero-tolerance):
1. Never use ANY word or phrase in "banned_transitions," "banned_vocabulary," or
   "ai_tells_to_suppress."
2. Never use metaphors from "avoided_frames."
3. No summative conclusions, balanced structures, or "structural_prohibitions."
4. ANTI-CONCLUSION RULE: Do NOT wrap up or conclude. Stop mid-thought if necessary.
   [REMOVE this rule ONLY for the final chunk, when you want the piece to end.]
5. MID-PARAGRAPH RULE: If the continuation point below ends mid-paragraph (the last
   paragraph is incomplete), continue that paragraph seamlessly WITHOUT inserting a
   line break. Do not start a new paragraph until the current one is naturally complete.

TARGET CONSTRAINTS (re-anchored — tolerance-banded):
6. Sentence rhythm must match "variance_pattern." Target MSL ±2 words.
7. Evaluative stance must match "appraisal_and_metadiscourse." H:B ratio ±0.5.
8. Metaphors from "dominant_frame." Dead metaphors tolerated.
9. Follow "cognitive_hesitation_rules" at genuine topic transitions.
10. Sentence-starting patterns ±10 percentage points per category.

CRITICAL CONSTRAINTS (re-injected):
[Paste "architecture_of_absence" JSON object here]
[Paste "cognitive_hesitation_rules" array here]
[Paste cadence metrics: MSL, variance_pattern, comma_to_period_ratio]
[Paste "appraisal_and_metadiscourse" JSON object here]

OVERALL CONTENT BRIEF (your final destination — read-only, do not restate):
[Paste the original content brief: topic, argument, key points, target length]

CURRENT CHUNK FOCUS:
[What this specific chunk should cover — e.g., "Develop the second argument about
operational inefficiency. Introduce the counterargument."]

ROLLING ARGUMENT SUMMARY — What has been argued so far:
[Write 2-4 sentences summarizing the logical progression of the piece to this point.
What claims have been made? What evidence has been presented? What comes next?]

CONTINUATION POINT — Last paragraph of previous chunk:
[Paste the ENTIRE last paragraph of the previous chunk here — whether complete or
incomplete. This gives the Drafter paragraph-level context, not just sentence-level.]

Continue from where the previous chunk left off. Generate 400-500 tokens.
Maintain the voice. Do not repeat arguments from the rolling summary.

CRITICAL: Do NOT retype, echo, or repeat any part of the CONTINUATION POINT text.
Begin generating seamlessly with the exact next word. Duplicating the last sentence
to "get a running start" is a critical failure.
```

**Usage notes:**
- Update the rolling summary after each chunk — it grows as the piece develops
- For the **final chunk** of a piece, remove Rule 4 (anti-conclusion) and add: "This is the final chunk. End the piece in a manner consistent with the person's typical closing pattern (see paragraph_structure and editorial_filter)."
- If the piece has a planned structure, include the relevant section heading in the continuation prompt

---

## 9. Template A.2: Drafter Revision

Use this template when the Judge (Template C) returns a `<FAIL>` verdict. This template targets **only the specific violations** without regenerating from scratch. It preserves everything that was correct.

```
ROLE: You are revising a specific chunk that failed a forensic voice audit against a
mathematical rubric. The Judge identified exact specification violations. Your job is
to fix EXACTLY those violations while preserving everything that passed. Do not rewrite
from scratch. Do not apologize. Do not explain your changes.

THE ORIGINAL CHUNK:
[Paste the chunk that failed the Judge audit]

JUDGE'S FAILURE REPORT:
[Paste the <FAIL> block from Template C, including failed checks, specific violations,
and regeneration guidance]

VOICE DNA PROFILE (for reference):
[Paste <master_voice_schema> here — without editorial_filter]

OVERALL CONTENT BRIEF (read-only context — do not restate, just use for direction):
[Paste the original content brief so the Reviser doesn't drift the argument]

REVISION RULES:
1. Fix ONLY the specific violations identified in the Judge's failure report.
2. Preserve all voice markers that PASSED the audit. Do not alter correct cadence,
   correct metaphors, correct appraisal stance, or correct structural patterns.
3. Prioritize hard constraint violations (banned words, AI-tells, avoided frames,
   structural prohibitions) — these are zero-tolerance and must be fully resolved.
4. For target constraint violations (MSL, H:B ratio, sentence-starting patterns),
   adjust toward the target but don't destroy content or argument flow to hit exact
   numbers. The Judge applies tolerance bands.
5. If the Judge flagged a banned word or AI-tell, replace it with vocabulary consistent
   with the profile's register and the person's characteristic word choices.
6. If the Judge flagged a wrong metaphor frame, replace metaphors with ones from
   "dominant_frame."
7. Maintain the same argument progression and content — change only the stylistic surface.

OUTPUT the revised chunk only. No commentary. No explanations.
```

**Usage notes:**
- After revision, run Template C (Judge) again on the revised chunk
- If it fails a second time on the same violations, the profile may need adjustment rather than the text
- This template prevents the common failure mode where the LLM "apologizes and starts over," losing all correct voice markers in the process

---

## 10. Template B: The Editor

Use this template for the editorial polish pass. Feed it the complete raw draft (all chunks assembled).

```
ROLE: You are an editorial filter for a specific author's voice. You have received raw,
authentic text that captures this person's natural speech patterns. Your job is to apply
their specific editorial preferences to polish it for publication — and NOTHING more.

CRITICAL CONSTRAINTS:
- You must PRESERVE the core voice characteristics: the sentence rhythm, the appraisal
  stance, the metaphor frames, and the overall cadence. These are non-negotiable.
- You must ONLY apply the editorial rules listed below. Do not impose your own idea of
  "good writing."
- ANTI-SMOOTHING DIRECTIVE: You are strictly forbidden from merging, splitting, or
  restructuring sentences to "improve flow." You must NOT alter the Drafter's underlying
  Mean Sentence Length (MSL), sentence variance pattern, or paragraph structure. If a
  sentence is a deliberate fragment, leave it as a fragment. If a transition is abrupt,
  leave it abrupt. If an editorial rule conflicts with the Drafter's cadence or structure,
  PRESERVE THE CADENCE. The Drafter's rhythm is the voice. Your job is word-level and
  phrase-level polish, not structural renovation.
- You must SCRUB any remaining AI-tells by cross-referencing the "ai_tells_to_suppress"
  array inside the ARCHITECTURE OF ABSENCE block below. Replace any flagged terms with
  phrasing consistent with the author's voice. Do NOT introduce any word from that array
  during your edits.
- Over-editing kills authenticity. When in doubt, preserve the rough edge.

EDITORIAL FILTER RULES:
[Paste ONLY the "editorial_filter" JSON object here, including specific_rules array]

ARCHITECTURE OF ABSENCE (for reference — do not introduce anything from these lists):
[Paste the "architecture_of_absence" JSON object here]

RAW TEXT TO EDIT:
[Paste the complete assembled Drafter output here]

OUTPUT the editorially polished text. Preserve the voice. Apply only the listed rules.
Do not explain your changes — just output the revised text.
```

---

## 11. Template C: The Judge

Use this template for automated fidelity verification. **Run on individual chunks (400–500 tokens), not fully assembled documents.** The per-sentence audit requires manageable text sizes. Feed it each chunk (post-Editor) plus the full profile.

```
ROLE: You are a forensic linguistic auditor. Your job is to verify whether a text sample
matches a specific Voice DNA Profile. You will perform a rigorous, mathematical audit —
not a subjective impression.

You must show your work in a <scratchpad> before rendering your verdict.

THE VOICE DNA PROFILE (your scoring rubric):
[Paste the complete <master_voice_schema> JSON here — including editorial_filter]

ESTIMATION METHOD NOTE: Check the "estimation_method" field in the profile.
If "computed via code execution" — use tight tolerances (MSL ±2 words).
If "estimated from sampling" — use wider tolerances (MSL ±3 words).

TOLERANCE FRAMEWORK — apply these bands before rendering any FAIL verdict:

- MSL: ±2 words (computed) or ±3 words (estimated). A 400-word chunk has
  natural variance; measure across the full chunk, not per-sentence.
- CPR: ±0.3 of target. Punctuation ratios fluctuate in short samples.
- Variance pattern: The long-short alternation must be PRESENT and
  DIRECTIONAL (the described rhythm is recognizable). Exact word counts
  per sentence are not required — the pattern is the target, not the
  precise numbers. A chunk that trends toward uniform sentence lengths
  is a fail; a chunk that shows the right rhythm with slightly different
  ranges is a pass.
- H:B ratio: ±0.5 of target ratio. A profile targeting 2.7:1 passes at
  2.2:1–3.2:1. A 400-word chunk may contain few hedge/booster instances,
  so small samples can skew the ratio — use judgment on chunks with
  fewer than 4 total hedges+boosters.
- Appraisal system: The PRIMARY system must be dominant across the chunk,
  but secondary system appearances are expected and normal. A chunk
  discussing a system/product may naturally pull toward Appreciation even
  in a Judgment-primary profile. Fail only if the primary system is
  ABSENT or clearly subordinate.
- Metaphor frames: Deliberate or extended use of an avoided frame = fail.
  Conventionalized dead metaphors ("level playing field," "building on")
  that happen to belong to an avoided domain = flag in scratchpad but
  do NOT auto-fail. The test is: would the reader consciously register
  this as a metaphor from the avoided domain?
- Sentence-starting patterns: ±10 percentage points per category. These
  are directional distributions, not exact targets. A profile showing
  ~30% coordinating conjunctions passes at 20–40%.
- Hesitation rules: Only evaluated at actual topic transitions within
  the chunk. A chunk that stays on a single topic with no transitions
  gets an automatic PASS on this check.
- Structural prohibitions: 1 minor violation = flag in scratchpad but
  pass. 2+ violations = fail. (Exception: banned AI-tells and banned
  transitions remain zero-tolerance.)

THE TEXT TO AUDIT:
[Paste the generated text here]

AUDIT PROCEDURE:

Step 1 — SCRATCHPAD ANALYSIS (show your work):
<scratchpad>
A. SENTENCE ANALYSIS: List each sentence with its word count. Calculate approximate MSL.
   Compare against the profile's mean_sentence_length target.
B. VARIANCE CHECK: Note the shortest and longest sentences. Does the variance pattern
   match the profile's variance_pattern description?
C. TRANSITION SCAN: List every transitional word/phrase found. Cross-reference against
   "banned_transitions" and "ai_tells_to_suppress" arrays. Flag any matches.
D. VOCABULARY SCAN: Check for any word in "banned_vocabulary" or "ai_tells_to_suppress."
E. APPRAISAL CLASSIFICATION: Identify the 3 strongest evaluative statements. Classify
   each as Affect, Judgment, or Appreciation. Note if inscribed or invoked. Compare
   against profile's attitude.primary_system.
F. METAPHOR CHECK: List all figurative language. Identify source domains. Compare
   against "dominant_frame" and "avoided_frames."
G. GRADUATION CHECK: Identify intensifiers and downtoners. Classify as maximizer or
   minimizer behavior. Compare against graduation.force_profile.
H. HESITATION CHECK: At each major topic transition, note the bridging technique used.
   Compare against each rule in "cognitive_hesitation_rules" array.
I. STRUCTURAL CHECK: Note paragraph lengths, sentence-starting patterns, punctuation
   usage. Compare against "structural_prohibitions."
J. EDITORIAL CHECK: Verify that editorial_filter.specific_rules have been applied.
</scratchpad>

Step 2 — BINARY FEATURE AUDIT:
For each, answer PASS or FAIL with a one-line justification.
Apply the TOLERANCE FRAMEWORK above — do not fail on borderline cases.

1. CADENCE: MSL within tolerance band (±2 or ±3)? Variance pattern
   directionally present? CPR within ±0.3?
2. BANNED TRANSITIONS: Zero banned transitions present? (zero-tolerance)
3. AI-TELLS: Zero AI-tells present? (zero-tolerance)
4. BANNED VOCABULARY: Zero banned vocabulary present? (zero-tolerance)
5. STRUCTURAL PROHIBITIONS: Fewer than 2 violations?
6. APPRAISAL SYSTEM: Primary system dominant? Secondary appearances
   acceptable if chunk topic naturally pulls toward them.
7. METAPHOR FRAME: Dominant frame present? No deliberate/extended use
   of avoided frames? (Dead metaphors flagged but not auto-failed.)
8. HESITATION RULES: Followed at topic transitions? (Auto-pass if chunk
   contains no topic transitions.)
9. RHETORICAL RED LINES: None crossed? (zero-tolerance)
10. EDITORIAL COMPLIANCE: Editorial filter rules applied correctly?

Step 3 — VERDICT:
Output exactly one of:

<PASS>
All checks passed. Text is cleared for production.
</PASS>

OR:

<FAIL>
Failed checks: [list the failed check numbers]
Specific violations: [for each failure, state the EXACT word, phrase, or structure that
violated and the specific profile field it violates]
Regeneration guidance: [specific, actionable instructions for Template A.2 to fix each
violation — e.g., "Replace 'navigate' on line 3 with vocabulary from the person's
register," "Sentence 7 is 28 words — split into a setup-punch pair matching the
variance_pattern," etc.]
</FAIL>
```
