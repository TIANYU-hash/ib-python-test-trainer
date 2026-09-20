/**
 * MCQ mock test — configurable count and unit filters.
 * @typedef {{ id: string, unit: number, q: string, choices: string[], answer: number, explain: string }} McqItem
 */

const MCQ_STORAGE = "ib-python-test-trainer-mcq-prefs";

/** @type {McqItem[]} — 45 questions · CodeHS Units 1–9 (5 per unit) */
const MCQ_BANK = [
  // Unit 1 · Computational thinking & efficiency
  { id: "u1-1", unit: 1, q: "Big O notation mainly describes…", choices: ["Exact operation count", "How work grows as input size grows", "Lines of code", "Seconds on one computer"], answer: 1, explain: "Big O is about growth rate as n gets large, ignoring constants." },
  { id: "u1-2", unit: 1, q: "Binary search on 1,000,000 sorted items needs about ___ comparisons in the worst case.", choices: ["About 20", "1,000,000", "500,000", "About 1000"], answer: 0, explain: "log₂(1,000,000) ≈ 20 — halving each step." },
  { id: "u1-3", unit: 1, q: "Linear search through a list of size n is", choices: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2, explain: "You may scan every element once." },
  { id: "u1-4", unit: 1, q: "Breaking a big problem into smaller steps is called", choices: ["Decomposition", "Compilation", "Debugging", "Concatenation"], answer: 0, explain: "Computational thinking uses decomposition to manage complexity." },
  { id: "u1-5", unit: 1, q: "Nested loops that each run n times (same n) are often", choices: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 2, explain: "n × n iterations → quadratic growth." },

  // Unit 2 · Basic Python & console
  { id: "u2-1", unit: 2, q: "What does float(\"3.5\") produce?", choices: ["The number 3.5 for arithmetic", "The whole number 3", "An error because of the dot", "The text \"3.5\""], answer: 0, explain: "float() converts a numeric string to a float value." },
  { id: "u2-2", unit: 2, q: "What is printed? print(10 % 3, 10 / 5)", choices: ["3.33 2", "1 2", "1.0 2.0", "1 2.0"], answer: 3, explain: "% → 1; / in Python 3 → 2.0." },
  { id: "u2-3", unit: 2, q: "input() always returns a", choices: ["int", "float", "str", "bool"], answer: 2, explain: "Always a string until you convert." },
  { id: "u2-4", unit: 2, q: "Which causes a TypeError?", choices: ["\"7\" + 3", "int(\"7\") + 3", "7 / 2", "7 // 2"], answer: 0, explain: "Cannot add str and int without conversion." },
  { id: "u2-5", unit: 2, q: "float(\"cat\") or int(\"3.9\") on bad strings typically raises", choices: ["SyntaxError", "ValueError", "TypeError", "IndexError"], answer: 1, explain: "Wrong content for conversion → ValueError." },

  // Unit 3 · Conditionals
  { id: "u3-1", unit: 3, q: "In if / elif / else, how many branches run?", choices: ["All true ones", "At most one", "Always two", "Every elif"], answer: 1, explain: "First match wins; rest of chain skipped." },
  { id: "u3-2", unit: 3, q: "What is printed? print(5 != 5, 5 >= 4)", choices: ["True False", "False False", "True True", "False True"], answer: 3, explain: "5!=5 is False; 5>=4 is True." },
  { id: "u3-3", unit: 3, q: "Fix float compare: total = 0.1 + 0.2. Best test for “≈ 0.3”:", choices: ["round(total, 2) == 0.3", "total = 0.3", "int(total) == 0.3", "total == \"0.3\""], answer: 0, explain: "Float storage is inexact; round before compare." },
  { id: "u3-4", unit: 3, q: "Compare safely: if x is 3 or 5", choices: ["if x == 3 or 5:", "if x == 3 or x == 5:", "if x = 3 or 5:", "if x === 3 or x === 5:"], answer: 1, explain: "Each side of or needs a full comparison." },
  { id: "u3-5", unit: 3, q: "13 <= age <= 19 means age is", choices: ["Exactly 13 or 19", "From 13 through 19 inclusive", "Outside that range", "Invalid syntax"], answer: 1, explain: "Chained comparisons: both must hold." },

  // Unit 4 · Looping
  { id: "u4-1", unit: 4, q: "list(range(2, 11, 3)) is", choices: ["[2,5,8]", "[2,5,8,11]", "[2,3,4,...,10]", "[3,6,9]"], answer: 0, explain: "Start 2, step 3, stop before 11." },
  { id: "u4-2", unit: 4, q: "After: for i in range(2,11,3): count+=1 — count is", choices: ["2", "3", "4", "8"], answer: 1, explain: "Values 2,5,8 → three iterations." },
  { id: "u4-3", unit: 4, q: "n=27; while n>1: n=n//2; steps+=1. Final steps?", choices: ["13", "5", "4", "3"], answer: 2, explain: "27→13→6→3→1 is four halvings." },
  { id: "u4-4", unit: 4, q: "while i <= len(items): print(items[i]) on a 3-item list", choices: ["Prints a,b,c", "Prints a,b,c then IndexError", "Infinite loop", "Prints nothing"], answer: 1, explain: "Valid indices 0–2; i=3 crashes." },
  { id: "u4-5", unit: 4, q: "A for loop can iterate directly over… (select best single answer)", choices: ["An int like 5", "A list and a string and range()", "Only range()", "Only lists"], answer: 1, explain: "Lists, strings, range, etc. — not bare ints." },

  // Unit 5 · Functions & exceptions
  { id: "u5-1", unit: 5, q: "def f(): print(1) — calling f returns", choices: ["1", "True", "None", "Error"], answer: 2, explain: "No return → None." },
  { id: "u5-2", unit: 5, q: "def divide(a,b): return a//b, a%b — then q,r = divide(17,5); print(r,q) prints", choices: ["3.4 2", "3 2", "17 5", "2 3"], answer: 3, explain: "q=3, r=2; print order swaps to 2 3." },
  { id: "u5-3", unit: 5, q: "A function can return multiple values by", choices: ["Using commas in return", "Using two def lines", "Only with global", "It cannot"], answer: 0, explain: "return a, b packs a tuple." },
  { id: "u5-4", unit: 5, q: "Variables created inside a function are", choices: ["Global", "Local to that function", "Always shared", "SyntaxError"], answer: 1, explain: "Local scope unless global/nonlocal." },
  { id: "u5-5", unit: 5, q: "try/except: the except block runs when", choices: ["Always", "An exception occurs in try", "return runs", "Never"], answer: 1, explain: "Handles errors in the try block." },

  // Unit 6 · Strings
  { id: "u6-1", unit: 6, q: "s=\"Hello World\"; print(s.lower().find(\"world\")) prints", choices: ["-1", "6", "0", "5"], answer: 1, explain: "lower → \"hello world\"; \"world\" starts at index 6." },
  { id: "u6-2", unit: 6, q: "Capitalize first letter only (keep rest): word = \"hello\"", choices: ["word[0] = word[0].upper()", "word = word[0].upper() + word[1:]", "word = word.upper()[0]", "word[0].upper() alone"], answer: 1, explain: "Strings immutable — build a new string." },
  { id: "u6-3", unit: 6, q: "Check if \"cat\" appears anywhere in phrase", choices: ["phrase == \"cat\"", "\"cat\" in phrase", "phrase.find(\"cat\") > 0", "phrase[0:3]==\"cat\" only"], answer: 1, explain: "in tests substring; find>0 misses index 0." },
  { id: "u6-4", unit: 6, q: "nums=[1,2,3,4,5]; print(nums[1:4], nums[-2:])", choices: ["[1,2,3] [5]", "[2,3,4] [4,5]", "[2,3,4,5] [4,5]", "[2,3] [4,5]"], answer: 1, explain: "Slice 1:4 → 2,3,4; last two → 4,5." },
  { id: "u6-5", unit: 6, q: "Strings are", choices: ["Mutable like lists", "Immutable", "Always ints", "Cannot slice"], answer: 1, explain: "s[i]='x' is TypeError." },

  // Unit 7 · Lists & tuples
  { id: "u7-1", unit: 7, q: "items=[\"a\",\"b\"]; items.extend([\"c\",\"d\"]); items.remove(\"b\") → items is", choices: ["['a',['c','d']]", "['c','d']", "['a','b','c','d']", "['a','c','d']"], answer: 3, explain: "extend adds c,d; remove b." },
  { id: "u7-2", unit: 7, q: "Which give len of [1,2,3]? (best single answer)", choices: ["len(nums) only if nums defined", "len([1,2,3])", "nums.count()", "nums.len()"], answer: 1, explain: "len(list) works; count needs an argument; no .len()." },
  { id: "u7-3", unit: 7, q: "[1,2].append([3,4]) gives", choices: ["[1,2,3,4]", "[1,2,[3,4]]", "Error", "[3,4,1,2]"], answer: 1, explain: "append adds one element (the list object)." },
  { id: "u7-4", unit: 7, q: "A one-element tuple is written", choices: ["(5)", "(5,)", "[5]", "tuple(5)"], answer: 1, explain: "Trailing comma makes a tuple." },
  { id: "u7-5", unit: 7, q: "Which is mutable?", choices: ["tuple", "str", "list", "int"], answer: 2, explain: "Lists change in place." },

  // Unit 8 · Dicts & 2D lists
  { id: "u8-1", unit: 8, q: "stock={\"pen\":4}; item=\"pad\"; if item in stock: print(stock[item]) else: print(0) →", choices: ["KeyError", "4", "pad", "0"], answer: 3, explain: "\"pad\" not a key → else branch." },
  { id: "u8-2", unit: 8, q: "for key in prices: the loop variable is each", choices: ["Value", "Key", "Pair tuple", "Index"], answer: 1, explain: "Iterating a dict yields keys." },
  { id: "u8-3", unit: 8, q: "A dictionary value can be", choices: ["Only strings", "Only numbers", "Any type, including a list", "Only bool"], answer: 2, explain: "Values can be any object." },
  { id: "u8-4", unit: 8, q: "grid[1][2] means", choices: ["Column 1, row 2", "Row 1, column 2", "Cell (2,1) reversed only", "Syntax error"], answer: 1, explain: "Row first, then column." },
  { id: "u8-5", unit: 8, q: "grid = [[0]*3]*3 is risky because", choices: ["Too slow", "All rows alias the same inner list", "Cannot index", "Only for strings"], answer: 1, explain: "Changing one row can change all rows." },

  // Unit 9 · Algorithms (search & sort)
  { id: "u9-1", unit: 9, q: "Binary search requires the data to be", choices: ["Sorted", "A dictionary", "Exactly 100 items", "All unique strings"], answer: 0, explain: "Needs order to discard half each step." },
  { id: "u9-2", unit: 9, q: "One loop over n items, if inside → Big O is", choices: ["O(n²)", "O(n)", "O(log n)", "O(1)"], answer: 1, explain: "if per iteration is still O(n)." },
  { id: "u9-3", unit: 9, q: "Selection sort: each outer pass places the next", choices: ["Random element", "Minimum of the unsorted tail", "Maximum only if descending", "First element"], answer: 1, explain: "Find min in rest, swap to cur_index." },
  { id: "u9-4", unit: 9, q: "Linear search returns -1 when", choices: ["List is empty only", "Target not found (by convention)", "Index is 0", "Always"], answer: 1, explain: "Common sentinel for “not found”." },
  { id: "u9-5", unit: 9, q: "Bubble sort inner range n-i-1 because", choices: ["i is random", "Last i elements are already sorted", "Python requires it", "Fewer prints"], answer: 1, explain: "Each pass fixes one more at the end." },
];

const MCQ_FILTER_UNITS = [
  { n: 1, label: "U1 · Computational thinking" },
  { n: 2, label: "U2 · Python basics" },
  { n: 3, label: "U3 · Conditionals" },
  { n: 4, label: "U4 · Looping" },
  { n: 5, label: "U5 · Functions" },
  { n: 6, label: "U6 · Strings" },
  { n: 7, label: "U7 · Lists & tuples" },
  { n: 8, label: "U8 · Dicts & 2D lists" },
  { n: 9, label: "U9 · Algorithms" },
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
      count: Math.min(45, Math.max(5, raw.count ?? 45)),
      units: Array.isArray(raw.units) ? raw.units : MCQ_FILTER_UNITS.map((u) => u.n),
    };
  } catch {
    return { count: 45, units: MCQ_FILTER_UNITS.map((u) => u.n) };
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
        <h2>Practice Test #3 style (Units 1–9)</h2>
        <p class="mcq-lead">Bank of <strong>${bankTotal}</strong> questions (5 per unit). Default <strong>45</strong> = full mock. Shuffle, filter units, or retry missed topics.</p>

        <div class="mcq-options">
          <label class="mcq-field">
            <span>Number of questions</span>
            <input type="number" id="mcqCount" min="5" max="45" value="${prefs.count}" />
          </label>
          <p class="mcq-hint" id="mcqPoolHint">Available from selected units: <strong>${poolSize}</strong> (we shuffle; if you ask for more than available, some may repeat).</p>
        </div>

        <fieldset class="mcq-units">
          <legend>Include units</legend>
          ${unitChecks}
        </fieldset>

        <div class="actions">
          <button type="button" class="primary" id="mcqStartBtn">Generate quiz</button>
          <button type="button" class="ghost" id="mcqQuick30">Quick: full 45-question mock</button>
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
      if (countEl) countEl.value = "45";
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
    const safeCount = Math.min(45, Math.max(5, count));
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
