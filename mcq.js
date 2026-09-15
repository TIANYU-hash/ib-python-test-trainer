/**
 * MCQ mock test — configurable count and unit filters.
 * @typedef {{ id: string, unit: number, q: string, choices: string[], answer: number, explain: string }} McqItem
 */

const MCQ_STORAGE = "ib-python-test-trainer-mcq-prefs";

/** @type {McqItem[]} */
const MCQ_BANK = [
  // Unit 3
  { id: "m3-1", unit: 3, q: "What is the type of the literal 3.0 in Python?", choices: ["int", "float", "str", "bool"], answer: 1, explain: "Any number with a decimal point is a float, even 3.0." },
  { id: "m3-2", unit: 3, q: "What does 7 / 2 evaluate to in Python 3?", choices: ["3", "3.5", "3.0", "1"], answer: 1, explain: "/ always produces a float in Python 3." },
  { id: "m3-3", unit: 3, q: "What does 7 // 2 evaluate to?", choices: ["3.5", "3", "4", "1"], answer: 1, explain: "// is integer (floor) division — remainder discarded." },
  { id: "m3-4", unit: 3, q: "What does 7 % 2 evaluate to?", choices: ["3", "3.5", "1", "0"], answer: 2, explain: "% is the remainder. 7 = 3×2 + 1." },
  { id: "m3-5", unit: 3, q: "input() always returns which type?", choices: ["int", "float", "str", "depends on what the user typed"], answer: 2, explain: "input() always returns a string — you must convert." },
  { id: "m3-6", unit: 3, q: "What does int(\"3.9\") produce?", choices: ["3", "4", "3.9", "ValueError"], answer: 3, explain: "int() only accepts integer strings. int(3.9) is 3, but int(\"3.9\") raises ValueError." },
  { id: "m3-7", unit: 3, q: "Which expression causes a TypeError?", choices: ['\"7\" + 3', "7 + 3", "int(\"7\") + 3", "7 // 2"], answer: 0, explain: "You cannot add str and int without converting." },
  { id: "m3-8", unit: 3, q: "What does 2 ** 4 equal?", choices: ["6", "8", "16", "32"], answer: 2, explain: "** is exponentiation: 2⁴ = 16." },

  // Unit 5
  { id: "m5-1", unit: 5, q: "In an if / elif / else chain, how many branches can run?", choices: ["All that are true", "At most one", "Exactly two", "Only the first true and all else"], answer: 1, explain: "Once a branch matches, the rest of the chain is skipped." },
  { id: "m5-2", unit: 5, q: "Which is a valid comparison for equality?", choices: ["if x = 3:", "if x == 3:", "if x === 3:", "if x eq 3:"], answer: 1, explain: "== compares; = assigns." },
  { id: "m5-3", unit: 5, q: "not (True and False) equals", choices: ["True", "False", "None", "Error"], answer: 0, explain: "True and False → False; not False → True." },
  { id: "m5-4", unit: 5, q: "De Morgan: not (a and b) is the same as", choices: ["(not a) and (not b)", "(not a) or (not b)", "not a and b", "a or not b"], answer: 1, explain: "NOT both → at least one is false." },
  { id: "m5-5", unit: 5, q: "With short-circuit and, if the left side is False", choices: ["The right side is still evaluated", "The right side is skipped", "Both sides always run", "Python raises an error"], answer: 1, explain: "and stops when the result is already False." },
  { id: "m5-6", unit: 5, q: "if x == 3 or 5: — why is this wrong?", choices: ["or needs two comparisons", "5 is always True in boolean context", "Both A and B", "It is actually correct"], answer: 2, explain: "You need x == 3 or x == 5; the literal 5 is truthy." },
  { id: "m5-7", unit: 5, q: "13 <= age <= 19 means", choices: ["age is 13 or 19 only", "age from 13 through 19 inclusive", "age outside 13–19", "syntax error"], answer: 1, explain: "Chained comparisons: both conditions must hold." },

  // Unit 7
  { id: "m7-1", unit: 7, q: "list(range(5)) produces", choices: ["[1,2,3,4,5]", "[0,1,2,3,4]", "[0,1,2,3,4,5]", "[5]"], answer: 1, explain: "range(5) is 0 up to but not including 5." },
  { id: "m7-2", unit: 7, q: "list(range(2, 6)) produces", choices: ["[2,3,4,5,6]", "[2,3,4,5]", "[2,3,4,5,6,7]", "[6,5,4,3,2]"], answer: 1, explain: "Stop value 6 is excluded." },
  { id: "m7-3", unit: 7, q: "list(range(0, 10, 3)) produces", choices: ["[0,3,6,9]", "[0,3,6,9,12]", "[3,6,9]", "[0,1,2,...,9]"], answer: 0, explain: "Start 0, step 3, stop before 10." },
  { id: "m7-4", unit: 7, q: "break in a loop", choices: ["Skips to next iteration", "Exits the loop entirely", "Restarts the loop", "Pauses the program"], answer: 1, explain: "break leaves the innermost loop." },
  { id: "m7-5", unit: 7, q: "continue in a loop", choices: ["Exits the loop", "Skips rest of this iteration", "Runs else on the loop", "Same as break"], answer: 1, explain: "continue jumps to the next iteration." },
  { id: "m7-6", unit: 7, q: "Nested loops: for i in range(3): for j in range(4): — inner body runs how many times?", choices: ["7", "12", "3", "4"], answer: 1, explain: "3 × 4 = 12 total inner executions." },
  { id: "m7-7", unit: 7, q: "A while loop runs while its condition is", choices: ["True", "False", "None", "Zero only"], answer: 0, explain: "Condition must become False eventually or loop is infinite." },
  { id: "m7-8", unit: 7, q: "Where should an accumulator (e.g. total = 0) be set?", choices: ["Inside the loop each time", "Before the loop", "After the loop", "Inside if only"], answer: 1, explain: "Resetting inside the loop wipes progress each pass." },

  // Unit 9
  { id: "m9-1", unit: 9, q: "A function with no return statement returns", choices: ["0", "False", "None", "Empty string"], answer: 2, explain: "Default return value is None." },
  { id: "m9-2", unit: 9, q: "print() inside a function instead of return means", choices: ["Caller gets the printed value", "Caller gets None", "SyntaxError", "Function cannot be called"], answer: 1, explain: "print shows output; it does not send a value back." },
  { id: "m9-3", unit: 9, q: "A variable created inside a function is", choices: ["Global always", "Local to that function", "Shared by all functions", "Deleted before the function runs"], answer: 1, explain: "Local scope — not visible outside unless returned/global." },
  { id: "m9-4", unit: 9, q: "int(\"cat\") raises which exception?", choices: ["TypeError", "ValueError", "NameError", "SyntaxError"], answer: 1, explain: "Wrong value for conversion — ValueError." },
  { id: "m9-5", unit: 9, q: "try / except runs the except block when", choices: ["Always", "Never", "An exception occurs in try", "return is used"], answer: 2, explain: "except handles failures in the try block." },
  { id: "m9-6", unit: 9, q: "Code after return in the same block", choices: ["Always runs", "Never runs", "Runs only if no arguments", "Runs in a loop only"], answer: 1, explain: "return ends the function immediately." },

  // Unit 10
  { id: "m10-1", unit: 10, q: "For s = \"PYTHON\", s[0] is", choices: ["P", "Y", "H", "IndexError"], answer: 0, explain: "Indexing starts at 0." },
  { id: "m10-2", unit: 10, q: "For s = \"PYTHON\", s[-1] is", choices: ["P", "O", "N", "Y"], answer: 2, explain: "-1 is the last character." },
  { id: "m10-3", unit: 10, q: "s[1:4] on \"PYTHON\" gives", choices: ["PYT", "YTH", "YTHO", "PYTHON"], answer: 1, explain: "Slice stop index 4 is excluded → indices 1,2,3." },
  { id: "m10-4", unit: 10, q: "Strings in Python are", choices: ["Mutable", "Immutable", "Always lowercase", "Only ASCII"], answer: 1, explain: "s[0] = 'x' is TypeError — build a new string instead." },
  { id: "m10-5", unit: 10, q: "\"  hi  \".strip() returns", choices: ["\"  hi  \"", "\"hi\"", "\" hi\"", "Error"], answer: 1, explain: "strip removes leading/trailing whitespace." },
  { id: "m10-6", unit: 10, q: "\"a b c\".split() returns", choices: ['[\"a\",\"b\",\"c\"]', "[\"a b c\"]", "[\"a\", \"b\", \"c\"]", "3"], answer: 2, explain: "Default split breaks on whitespace into a list of words." },
  { id: "m10-7", unit: 10, q: "Last valid index of a string of length 6 is", choices: ["6", "5", "7", "0"], answer: 1, explain: "Indices 0..len-1." },

  // Unit 12
  { id: "m12-1", unit: 12, q: "Which is mutable?", choices: ["tuple", "list", "str", "int"], answer: 1, explain: "Lists can be changed in place." },
  { id: "m12-2", unit: 12, q: "nums.append([3,4]) on [1,2] gives", choices: ["[1,2,3,4]", "[1,2,[3,4]]", "Error", "[3,4,1,2]"], answer: 1, explain: "append adds one object — here one nested list." },
  { id: "m12-3", unit: 12, q: "nums.sort() returns", choices: ["The sorted list", "None", "True", "A new copy"], answer: 1, explain: ".sort() sorts in place and returns None." },
  { id: "m12-4", unit: 12, q: "x, y = (3, 7) is called", choices: ["Slicing", "Unpacking", "Appending", "Indexing"], answer: 1, explain: "Tuple unpacking into two variables." },
  { id: "m12-5", unit: 12, q: "A one-element tuple is written", choices: ["(5)", "(5,)", "[5]", "tuple(5)"], answer: 1, explain: "(5) is just int grouping; trailing comma makes a tuple." },
  { id: "m12-6", unit: 12, q: "3 in [1,2,3] evaluates to", choices: ["True", "False", "1", "Index 2"], answer: 0, explain: "in tests membership." },

  // Unit 13
  { id: "m13-1", unit: 13, q: "grid[1][2] means", choices: ["Column 1, row 2", "Row 1, column 2", "Second grid", "Syntax error"], answer: 1, explain: "Row index first, then column." },
  { id: "m13-2", unit: 13, q: "len(grid) on a 2D list usually gives", choices: ["Total cells", "Number of rows", "Number of columns", "Always 9"], answer: 1, explain: "Outer list length = row count." },
  { id: "m13-3", unit: 13, q: "grid = [[0]*3]*3 is dangerous because", choices: ["Too slow", "All rows share the same list", "Cannot index it", "Only works for strings"], answer: 1, explain: "Multiplying the inner list aliases one row three times." },
  { id: "m13-4", unit: 13, q: "To total every cell in a grid, you typically use", choices: ["One loop only", "Nested loops", "No loops", "sort()"], answer: 1, explain: "Row loop + column/value loop." },
  { id: "m13-5", unit: 13, q: "For grid with 3 rows and 4 columns, inner loop body runs per full traversal", choices: ["7 times", "12 times", "3 times", "4 times"], answer: 1, explain: "3 × 4 = 12." },

  // Mixed / exam technique
  { id: "mx-1", unit: 5, q: "If score >= 70 is checked before score >= 90, a score of 95 might print", choices: ["A", "B", "C", "Depends on else"], answer: 2, explain: "Wrong elif order catches 95 at the first matching branch." },
  { id: "mx-2", unit: 9, q: "Using bonus outside a function where bonus was only assigned inside causes", choices: ["NameError", "ValueError", "It prints 5", "SyntaxError"], answer: 0, explain: "Local variable not visible outside the function." },
  { id: "mx-3", unit: 10, q: "name.upper() alone without assignment", choices: ["Changes name forever", "Returns new string; name unchanged", "Clears name", "TypeError"], answer: 1, explain: "Methods return new strings; immutability." },
  { id: "mx-4", unit: 7, q: "range(1, 11) in a sum loop 1..10 is correct because", choices: ["11 is included", "Stop 11 is excluded", "range is inclusive both ends", "It only has 10 steps starting at 0"], answer: 1, explain: "Stop value is never included — 1..10 needs stop 11." },
];

const MCQ_FILTER_UNITS = [
  { n: 3, label: "Unit 3" },
  { n: 5, label: "Unit 5" },
  { n: 7, label: "Unit 7" },
  { n: 9, label: "Unit 9" },
  { n: 10, label: "Unit 10" },
  { n: 12, label: "Unit 12" },
  { n: 13, label: "Unit 13" },
];

function mcqEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadMcqPrefs() {
  try {
    const raw = JSON.parse(localStorage.getItem(MCQ_STORAGE) || "{}");
    return {
      count: Math.min(50, Math.max(5, raw.count ?? 30)),
      units: Array.isArray(raw.units) ? raw.units : MCQ_FILTER_UNITS.map((u) => u.n),
    };
  } catch {
    return { count: 30, units: MCQ_FILTER_UNITS.map((u) => u.n) };
  }
}

function saveMcqPrefs(prefs) {
  localStorage.setItem(MCQ_STORAGE, JSON.stringify(prefs));
}

const Mcq = {
  root: null,
  active: false,
  /** @type {McqItem[]} */
  quiz: [],
  /** @type {(number|null)[]} */
  answers: [],
  index: 0,
  phase: "setup",

  init() {
    this.root = document.getElementById("mcqRoot");
    if (!this.root) return;
    this.renderSetup();
  },

  closeToLesson() {
    this.active = false;
  },

  getFilteredPool(units) {
    const set = new Set(units);
    return MCQ_BANK.filter((q) => set.has(q.unit));
  },

  buildQuiz(count, units) {
    const pool = shuffleArray(this.getFilteredPool(units));
    const n = Math.min(count, pool.length);
    if (n === 0) return [];
    if (pool.length >= count) return pool.slice(0, count);
    const extra = [];
    while (extra.length + pool.length < count) {
      extra.push(...shuffleArray(pool));
    }
    return [...pool, ...extra].slice(0, count);
  },

  renderSetup() {
    this.phase = "setup";
    const prefs = loadMcqPrefs();
    const poolSize = this.getFilteredPool(prefs.units).length;
    const bankTotal = MCQ_BANK.length;

    let unitChecks = "";
    for (const u of MCQ_FILTER_UNITS) {
      const on = prefs.units.includes(u.n);
      unitChecks += `<label class="mcq-check"><input type="checkbox" data-unit="${u.n}" ${on ? "checked" : ""} /> ${mcqEscape(u.label)}</label>`;
    }

    this.root.innerHTML = `
      <div class="mcq-setup">
        <div class="lesson-meta"><span class="chip">MCQ</span><span>Mock test builder</span></div>
        <h2>30-question MCQ practice</h2>
        <p class="mcq-lead">Build a random set from <strong>${bankTotal}</strong> questions (Units 3, 5, 7, 9, 10, 12, 13). Change count and units, then generate a new quiz — same idea as a shuffled test.</p>

        <div class="mcq-options">
          <label class="mcq-field">
            <span>Number of questions</span>
            <input type="number" id="mcqCount" min="5" max="50" value="${prefs.count}" />
          </label>
          <p class="mcq-hint" id="mcqPoolHint">Available from selected units: <strong>${poolSize}</strong> (we shuffle; if you ask for more than available, some may repeat).</p>
        </div>

        <fieldset class="mcq-units">
          <legend>Include units</legend>
          ${unitChecks}
        </fieldset>

        <div class="actions">
          <button type="button" class="primary" id="mcqStartBtn">Generate quiz</button>
          <button type="button" class="ghost" id="mcqQuick30">Quick: 30 from all units</button>
        </div>
      </div>`;

    const updateHint = () => {
      const units = this.readUnitsFromDom();
      const count = parseInt(document.getElementById("mcqCount")?.value || "30", 10);
      const avail = this.getFilteredPool(units).length;
      const hint = document.getElementById("mcqPoolHint");
      if (hint) {
        hint.innerHTML = `Available from selected units: <strong>${avail}</strong>. Quiz length: <strong>${count}</strong>.`;
      }
    };

    this.root.querySelectorAll('input[type="checkbox"][data-unit]').forEach((cb) => {
      cb.addEventListener("change", updateHint);
    });
    document.getElementById("mcqCount")?.addEventListener("input", updateHint);

    document.getElementById("mcqStartBtn")?.addEventListener("click", () => this.startFromSetup());
    document.getElementById("mcqQuick30")?.addEventListener("click", () => {
      this.root.querySelectorAll('input[type="checkbox"][data-unit]').forEach((cb) => {
        cb.checked = true;
      });
      const countEl = document.getElementById("mcqCount");
      if (countEl) countEl.value = "30";
      this.startFromSetup();
    });
  },

  readUnitsFromDom() {
    const units = [];
    this.root.querySelectorAll('input[type="checkbox"][data-unit]:checked').forEach((cb) => {
      units.push(parseInt(cb.dataset.unit, 10));
    });
    return units.length ? units : MCQ_FILTER_UNITS.map((u) => u.n);
  },

  startFromSetup() {
    const count = parseInt(document.getElementById("mcqCount")?.value || "30", 10);
    const units = this.readUnitsFromDom();
    const safeCount = Math.min(50, Math.max(5, count));
    saveMcqPrefs({ count: safeCount, units });

    this.quiz = this.buildQuiz(safeCount, units);
    if (!this.quiz.length) {
      alert("Select at least one unit with questions.");
      return;
    }
    this.answers = this.quiz.map(() => null);
    this.index = 0;
    this.phase = "quiz";
    this.renderQuestion();
  },

  renderQuestion() {
    const item = this.quiz[this.index];
    const total = this.quiz.length;
    const chosen = this.answers[this.index];

    let choicesHtml = "";
    item.choices.forEach((text, i) => {
      const sel = chosen === i ? " selected" : "";
      choicesHtml += `<button type="button" class="mcq-choice${sel}" data-i="${i}">${mcqEscape(text)}</button>`;
    });

    const answered = this.answers.filter((a) => a !== null).length;

    this.root.innerHTML = `
      <div class="mcq-quiz">
        <div class="lesson-meta">
          <span class="chip">MCQ</span>
          <span>Question ${this.index + 1} of ${total} · ${answered}/${total} answered</span>
        </div>
        <h2 class="mcq-q">${mcqEscape(item.q)}</h2>
        <p class="mcq-unit-tag">Unit ${item.unit}</p>
        <div class="mcq-choices">${choicesHtml}</div>
        <div class="mcq-nav actions">
          <button type="button" class="ghost" id="mcqPrev" ${this.index === 0 ? "disabled" : ""}>← Previous</button>
          <button type="button" class="secondary" id="mcqSetup">New setup</button>
          ${this.index < total - 1
            ? '<button type="button" class="primary" id="mcqNext">Next →</button>'
            : '<button type="button" class="primary" id="mcqFinish">Submit quiz</button>'}
        </div>
      </div>`;

    this.root.querySelectorAll(".mcq-choice").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.i, 10);
        this.answers[this.index] = i;
        this.root.querySelectorAll(".mcq-choice").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });

    document.getElementById("mcqPrev")?.addEventListener("click", () => {
      if (this.index > 0) {
        this.index--;
        this.renderQuestion();
      }
    });
    document.getElementById("mcqNext")?.addEventListener("click", () => {
      if (this.index < total - 1) {
        this.index++;
        this.renderQuestion();
      }
    });
    document.getElementById("mcqFinish")?.addEventListener("click", () => this.renderResults());
    document.getElementById("mcqSetup")?.addEventListener("click", () => this.renderSetup());
  },

  renderResults() {
    this.phase = "results";
    let correct = 0;
    let review = "";

    this.quiz.forEach((item, i) => {
      const pick = this.answers[i];
      const ok = pick === item.answer;
      if (ok) correct++;
      if (!ok) {
        review += `<div class="mcq-review-item fail">
          <strong>Q${i + 1}.</strong> ${mcqEscape(item.q)}<br/>
          <span class="mcq-wrong">Your answer: ${pick === null ? "(skipped)" : mcqEscape(item.choices[pick])}</span><br/>
          <span class="mcq-right">Correct: ${mcqEscape(item.choices[item.answer])}</span>
          <p class="mcq-explain">${mcqEscape(item.explain)}</p>
        </div>`;
      }
    });

    const pct = Math.round((correct / this.quiz.length) * 100);

    this.root.innerHTML = `
      <div class="mcq-results">
        <div class="lesson-meta"><span class="chip">MCQ</span><span>Results</span></div>
        <h2>${correct} / ${this.quiz.length} correct (${pct}%)</h2>
        <p class="mcq-lead">${pct >= 80 ? "Strong — review any misses below." : "Review the explanations and retry with a new random set."}</p>
        <div class="actions">
          <button type="button" class="primary" id="mcqRetry">New random quiz (same settings)</button>
          <button type="button" class="secondary" id="mcqBackSetup">Change settings</button>
        </div>
        ${review ? `<h3>Review misses</h3><div class="mcq-review">${review}</div>` : "<p class=\"mcq-lead\">Perfect score — generate another set to keep sharp.</p>"}
      </div>`;

    document.getElementById("mcqRetry")?.addEventListener("click", () => {
      const prefs = loadMcqPrefs();
      this.quiz = this.buildQuiz(prefs.count, prefs.units);
      this.answers = this.quiz.map(() => null);
      this.index = 0;
      this.phase = "quiz";
      this.renderQuestion();
    });
    document.getElementById("mcqBackSetup")?.addEventListener("click", () => this.renderSetup());
  },
};

window.MCQ_BANK = MCQ_BANK;
window.Mcq = Mcq;
