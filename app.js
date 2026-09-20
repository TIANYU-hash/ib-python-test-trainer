const STORAGE_KEY = "ib-python-test-trainer-v1";

const lessonList = window.LESSONS;

let pythonReady = false;
let currentId = null;

const el = (id) => document.getElementById(id);

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveProgress(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function normalizeStdout(text) {
  if (text == null) return "";
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trimEnd();
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function setPythonStatus(text, ready) {
  const badge = el("pyStatus");
  badge.textContent = text;
  badge.classList.toggle("ready", !!ready);
}

function initPythonEngine() {
  if (typeof Sk === "undefined") {
    setPythonStatus("Python engine blocked — use http://localhost", false);
    return false;
  }
  pythonReady = true;
  setPythonStatus("Python ready", true);
  el("runBtn").disabled = false;
  el("checkBtn").disabled = false;
  return true;
}

/**
 * Run Python source; returns stdout string. Throws Error with message on failure.
 */
function runPythonSource(fullSource) {
  if (!pythonReady) {
    throw new Error(
      "Python is not loaded. Open this site via http://localhost (see README), not as a raw file, and check your internet once."
    );
  }

  let stdout = "";
  function outf(text) {
    stdout += text;
  }
  function builtinRead(x) {
    if (
      Sk.builtinFiles === undefined ||
      Sk.builtinFiles.files === undefined ||
      Sk.builtinFiles.files[x] === undefined
    ) {
      throw new Error("File not found: '" + x + "'");
    }
    return Sk.builtinFiles.files[x];
  }

  Sk.configure({
    output: outf,
    read: builtinRead,
    __future__: Sk.python3,
    execLimit: 10000,
  });

  try {
    Sk.importMainWithBody("<stdin>", false, fullSource, true);
  } catch (e) {
    throw new Error(formatSkulptError(e));
  }

  return stdout;
}

function formatSkulptError(e) {
  if (!e) return "Unknown error";
  if (typeof e === "string") return e;
  if (e.args && e.args.v && e.args.v[0]) {
    const part = e.args.v[0].v;
    if (part) return String(part);
  }
  if (e.message) return String(e.message);
  return String(e);
}

/** Run assert with clearer “expected vs got” (and print-vs-return hint). */
function runAssertTest(userCode, assertLine, customTitle) {
  const eq = assertLine.match(/^assert\s+(.+?)\s*==\s*(.+)$/);
  if (!eq) {
    runPythonSource(userCode + "\n" + assertLine + "\n");
    return;
  }
  const expr = eq[1].trim();
  const expectedRaw = eq[2].trim();
  const printHint = /\bprint\s*\(/.test(userCode)
    ? '\\nHint: use return, not print — print shows on screen but the function still returns None.'
    : '';
  const harness = `
${userCode}
__expected = ${expectedRaw}
__got = ${expr}
if __got != __expected:
    __msg = "Expected " + ${JSON.stringify(expr)} + " to be " + repr(__expected) + ", but got " + repr(__got) + "${printHint}"
    raise AssertionError(__msg)
`;
  try {
    runPythonSource(harness);
  } catch (e) {
    if (customTitle && e.message && !e.message.includes(customTitle)) {
      throw new Error(customTitle + "\n" + e.message);
    }
    throw e;
  }
}

/** @param {'coding'|'mcq'|'trace'} mode */
function setViewMode(mode) {
  el("lessonPanel").classList.toggle("hidden", mode !== "coding");
  el("mcqPanel").classList.toggle("hidden", mode !== "mcq");
  el("traceGuidePanel").classList.toggle("hidden", mode !== "trace");
  el("coachPanel").classList.toggle("hidden", mode !== "coding");
}

window.setViewMode = setViewMode;

function openMcq() {
  currentId = null;
  el("welcome").classList.add("hidden");
  setViewMode("mcq");
  document.querySelectorAll(".lesson-link").forEach((b) => b.classList.remove("active"));
  const mcqBtn = document.querySelector(".lesson-link[data-mcq]");
  if (mcqBtn) mcqBtn.classList.add("active");
  if (window.Mcq) {
    window.Mcq.active = true;
    if (window.Mcq.phase === "setup" || !window.Mcq.quiz.length) window.Mcq.renderSetup();
    else window.Mcq.renderQuestion();
  }
}

function openTraceGuide(lessonId) {
  currentId = null;
  el("welcome").classList.add("hidden");
  setViewMode("trace");
  if (window.Mcq) window.Mcq.closeToLesson();
  document.querySelectorAll(".lesson-link").forEach((b) => b.classList.remove("active"));
  const btn = document.querySelector(`.lesson-link[data-trace="${lessonId}"]`);
  if (btn) btn.classList.add("active");
  if (window.TraceGuide) window.TraceGuide.open(lessonId);
}

window.onTraceGuideOpen = (lessonId) => {
  document.querySelectorAll(".lesson-link").forEach((b) => {
    b.classList.toggle("active", b.dataset.trace === lessonId);
  });
};

window.rebuildTrainerNav = buildNav;

function buildNav() {
  const nav = el("unitNav");
  nav.innerHTML = "";
  const progress = loadProgress();
  let traceProgress = {};
  try {
    traceProgress = JSON.parse(localStorage.getItem("ib-python-test-trainer-trace-progress") || "{}");
  } catch {
    traceProgress = {};
  }

  if (window.TRACE_GUIDE && window.TRACE_GUIDE.length) {
    const traceBlock = document.createElement("div");
    traceBlock.className = "unit-block";
    const traceLabel = document.createElement("div");
    traceLabel.className = "unit-label";
    traceLabel.textContent = "Trace · Read & identify";
    traceBlock.appendChild(traceLabel);
    for (const tl of window.TRACE_GUIDE) {
      const tbtn = document.createElement("button");
      tbtn.type = "button";
      tbtn.className = "lesson-link";
      tbtn.dataset.trace = tl.id;
      tbtn.textContent = tl.title;
      if (traceProgress[tl.id]) tbtn.classList.add("done");
      tbtn.addEventListener("click", () => openTraceGuide(tl.id));
      traceBlock.appendChild(tbtn);
    }
    nav.appendChild(traceBlock);
  }

  const mcqBlock = document.createElement("div");
  mcqBlock.className = "unit-block";
  const mcqLabel = document.createElement("div");
  mcqLabel.className = "unit-label";
  mcqLabel.textContent = "MCQ · Mock test";
  mcqBlock.appendChild(mcqLabel);
  const mcqBtn = document.createElement("button");
  mcqBtn.type = "button";
  mcqBtn.className = "lesson-link";
  mcqBtn.dataset.mcq = "1";
  mcqBtn.textContent = "MCQ mock · Units 1–9 (45 Q)";
  mcqBtn.addEventListener("click", () => openMcq());
  mcqBlock.appendChild(mcqBtn);
  nav.appendChild(mcqBlock);

  for (const u of window.UNITS) {
    const block = document.createElement("div");
    block.className = "unit-block";
    const label = document.createElement("div");
    label.className = "unit-label";
    label.textContent = u.label;
    block.appendChild(label);

    for (const lesson of lessonList.filter((l) => l.unit === u.n)) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lesson-link";
      btn.dataset.id = lesson.id;
      btn.textContent = lesson.title;
      if (progress[lesson.id]) btn.classList.add("done");
      btn.addEventListener("click", () => openLesson(lesson.id));
      block.appendChild(btn);
    }
    nav.appendChild(block);
  }
}

function openLesson(id) {
  currentId = id;
  const lesson = lessonList.find((l) => l.id === id);
  if (!lesson) return;

  if (window.Mcq) window.Mcq.closeToLesson();
  setViewMode("coding");

  el("welcome").classList.add("hidden");

  el("lessonUnit").textContent = lesson.unitName;
  el("lessonTitle").textContent = lesson.title;
  el("lessonInstructions").innerHTML = lesson.html;

  const draftKey = `${STORAGE_KEY}-draft-${id}`;
  const draft = localStorage.getItem(draftKey);
  el("editor").value = draft ?? lesson.starter;

  const saved = loadProgress();
  const idx = lessonList.findIndex((l) => l.id === id);
  const done = Object.keys(saved).filter((k) => saved[k]).length;
  el("lessonProgress").textContent = `Lesson ${idx + 1} of ${lessonList.length} · ${done} completed`;

  document.querySelectorAll(".lesson-link").forEach((b) => {
    b.classList.toggle("active", b.dataset.id === id);
  });

  el("feedback").classList.add("hidden");
  el("outputPanel").classList.add("hidden");
  el("prevBtn").disabled = idx <= 0;
  el("nextBtn").disabled = idx >= lessonList.length - 1;

  if (window.Coach) window.Coach.onLessonOpen(lesson);
}

function requireLesson() {
  if (!currentId) {
    showFeedback(
      false,
      "Pick a lesson first",
      "Click any exercise in the left sidebar, then Run or Check."
    );
    return false;
  }
  return true;
}

async function onRun() {
  if (!requireLesson()) return;

  const code = el("editor").value;
  localStorage.setItem(`${STORAGE_KEY}-draft-${currentId}`, code);

  el("outputPanel").classList.remove("hidden");
  el("runOutput").textContent = "Running…";
  el("feedback").classList.add("hidden");

  try {
    const stdout = runPythonSource(code);
    el("runOutput").textContent = stdout || "(no output)";
  } catch (e) {
    el("runOutput").textContent = "";
    showFeedback(false, "Runtime error", escapeHtml(e.message || String(e)));
  }
}

async function onCheck() {
  if (!requireLesson()) return;

  const lesson = lessonList.find((l) => l.id === currentId);
  if (!lesson) return;

  const code = el("editor").value;
  localStorage.setItem(`${STORAGE_KEY}-draft-${currentId}`, code);

  el("feedback").classList.remove("hidden");
  el("runBtn").disabled = true;
  el("checkBtn").disabled = true;

  const failures = [];

  try {
    for (let i = 0; i < lesson.tests.length; i++) {
      const t = lesson.tests[i];
      if (t.kind === "stdout") {
        const setup = t.setup || "";
        let stdout;
        try {
          stdout = runPythonSource(setup + code);
        } catch (e) {
          failures.push({
            title: `Output test ${i + 1} — code error`,
            detail: e.message || String(e),
          });
          continue;
        }
        const got = normalizeStdout(stdout);
        const want = normalizeStdout(t.expected);
        if (got !== want) {
          failures.push({
            title: `Output test ${i + 1}`,
            detail: `Expected:\n${want || "(empty)"}\n\nGot:\n${got || "(empty)"}`,
          });
        }
      } else if (t.kind === "assert") {
        try {
          runAssertTest(code, t.code, t.message);
        } catch (e) {
          failures.push({
            title: t.message || `Test ${i + 1} failed`,
            detail: e.message || String(e),
          });
        }
      }
    }

    if (failures.length === 0) {
      const prog = loadProgress();
      prog[currentId] = true;
      saveProgress(prog);
      buildNav();
      openLesson(currentId);
      showFeedback(true, "Correct — nice work.", "All tests passed.");
      if (window.Coach) window.Coach.onCheckResult(true, code, [], lesson);
    } else {
      showFeedback(
        false,
        `Not quite — ${failures.length} issue(s).`,
        failures
          .map(
            (f) =>
              `<strong>${escapeHtml(f.title)}</strong><pre>${escapeHtml(f.detail)}</pre>`
          )
          .join("")
      );
      if (window.Coach) window.Coach.onCheckResult(false, code, failures, lesson);
    }
  } catch (e) {
    showFeedback(false, "Could not run your code", escapeHtml(e.message || String(e)));
  } finally {
    el("runBtn").disabled = !pythonReady;
    el("checkBtn").disabled = !pythonReady;
  }
}

function showFeedback(pass, title, bodyHtml) {
  const fb = el("feedback");
  fb.classList.remove("hidden", "pass", "fail");
  fb.classList.add(pass ? "pass" : "fail");
  if (pass) {
    fb.innerHTML = `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(bodyHtml)}</p>`;
  } else {
    fb.innerHTML = `<h3>${escapeHtml(title)}</h3><div>${bodyHtml}</div>`;
  }
}

function onReset() {
  if (!currentId) return;
  const lesson = lessonList.find((l) => l.id === currentId);
  if (lesson) el("editor").value = lesson.starter;
}

const INDENT = "    ";

function stripComment(line) {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === "#" && !inSingle && !inDouble) return line.slice(0, i).trimEnd();
  }
  return line.trimEnd();
}

function isBlockHeaderLine(line) {
  const s = stripComment(line).trim();
  if (!s.endsWith(":")) return false;
  const head = s.slice(0, -1).trim();
  if (head === "else" || head === "finally") return true;
  if (/^except\b/.test(head)) return true;
  return /^(if|elif|for|while|def|class|with|try)\b/.test(head);
}

function lineIndent(line) {
  const m = line.match(/^(\s*)/);
  return m ? m[1] : "";
}

function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);
  textarea.value = before + text + after;
  const pos = start + text.length;
  textarea.selectionStart = pos;
  textarea.selectionEnd = pos;
}

function getSelectedLineRange(textarea) {
  const val = textarea.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const lineStart = val.lastIndexOf("\n", start - 1) + 1;
  let lineEnd = val.indexOf("\n", end);
  if (lineEnd === -1) lineEnd = val.length;
  return { val, lineStart, lineEnd, start, end };
}

function setupEditorKeys() {
  const textarea = el("editor");
  if (!textarea) return;

  textarea.addEventListener("keydown", (e) => {
    const { val, lineStart, lineEnd, start, end } = getSelectedLineRange(textarea);
    const currentLine = val.slice(lineStart, lineEnd);

    if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        if (start !== end) {
          const block = val.slice(lineStart, lineEnd);
          const lines = block.split("\n");
          const out = lines
            .map((ln) => (ln.startsWith(INDENT) ? ln.slice(INDENT.length) : ln.replace(/^\s{1,4}/, "")))
            .join("\n");
          textarea.value = val.slice(0, lineStart) + out + val.slice(lineEnd);
          textarea.selectionStart = lineStart;
          textarea.selectionEnd = lineStart + out.length;
        } else {
          const col = start - lineStart;
          const indent = lineIndent(currentLine);
          if (indent.length >= INDENT.length) {
            const newLine = indent.slice(INDENT.length) + currentLine.slice(indent.length);
            textarea.value = val.slice(0, lineStart) + newLine + val.slice(lineEnd);
            const newStart = lineStart + Math.max(0, col - INDENT.length);
            textarea.selectionStart = newStart;
            textarea.selectionEnd = newStart;
          }
        }
      } else if (start !== end) {
        const block = val.slice(lineStart, lineEnd);
        const out = block
          .split("\n")
          .map((ln) => INDENT + ln)
          .join("\n");
        textarea.value = val.slice(0, lineStart) + out + val.slice(lineEnd);
        textarea.selectionStart = lineStart;
        textarea.selectionEnd = lineStart + out.length;
      } else {
        insertAtCursor(textarea, INDENT);
      }
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const base = lineIndent(currentLine);
      const extra = isBlockHeaderLine(currentLine) ? INDENT : "";
      const insert = "\n" + base + extra;
      insertAtCursor(textarea, insert);
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
}

function init() {
  if (!lessonList || !window.UNITS) {
    setPythonStatus("lessons.js failed to load", false);
    return;
  }

  buildNav();
  el("runBtn").disabled = true;
  el("checkBtn").disabled = true;

  el("runBtn").addEventListener("click", () => onRun());
  el("checkBtn").addEventListener("click", () => onCheck());
  el("resetBtn").addEventListener("click", onReset);
  el("prevBtn").addEventListener("click", () => {
    const idx = lessonList.findIndex((l) => l.id === currentId);
    if (idx > 0) openLesson(lessonList[idx - 1].id);
  });
  el("nextBtn").addEventListener("click", () => {
    const idx = lessonList.findIndex((l) => l.id === currentId);
    if (idx < lessonList.length - 1) openLesson(lessonList[idx + 1].id);
  });

  el("editor").addEventListener("input", () => {
    if (currentId) {
      localStorage.setItem(`${STORAGE_KEY}-draft-${currentId}`, el("editor").value);
    }
  });

  setupEditorKeys();

  if (window.Coach) window.Coach.init();
  if (window.TraceGuide) window.TraceGuide.init();
  if (window.Mcq) window.Mcq.init();

  initPythonEngine();

  if (lessonList.length > 0) {
    openLesson(lessonList[0].id);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
