/**
 * Read · trace · identify — lesson-by-lesson guide + CFU (application MCQs).
 * @typedef {{ q: string, choices: string[], answer: number, explain: string }} CfuItem
 * @typedef {{ id: string, title: string, html: string, cfu: CfuItem[] }} TraceLesson
 */

const TRACE_STORAGE = "ib-python-test-trainer-trace-progress";

/** @type {TraceLesson[]} */
const TRACE_GUIDE = [
  {
    id: "trace-01",
    title: "1 · The trace recipe",
    html: `<p>On every trace question, use the same steps so you never skip a loop or a mutation.</p>
<ol>
<li><strong>Inputs</strong> — list, string, <code>n</code>, starting variables.</li>
<li><strong>Table</strong> — line / variables / condition true or false / notes.</li>
<li><strong>One line at a time</strong> — only change what that line changes.</li>
<li><strong>Stop rules</strong> — when does <code>while</code> fail? <code>return</code>? <code>break</code>?</li>
<li><strong>Answer</strong> — final <code>print</code>, return value, or list after all mutations.</li>
</ol>
<p><strong>Identify vs trace:</strong> “What algorithm?” → match loop shape first. “What prints?” → full trace.</p>`,
    cfu: [
      {
        q: "A loop runs while i < len(a). On the last iteration i equals len(a)-1. After the body runs, i becomes i+1. What happens next?",
        choices: [
          "The loop runs one more time with i == len(a)",
          "The condition i < len(a) is false and the loop stops",
          "Python raises IndexError automatically",
          "i resets to 0",
        ],
        answer: 1,
        explain: "After i becomes len(a), i < len(a) is false — exit before another body run.",
      },
      {
        q: "You need the value of L after a function returns. The lesson text only shows print() inside the function. What do you trace?",
        choices: [
          "Whatever print shows — that is always the return value",
          "The return expression (or None if there is no return)",
          "The first variable assigned in the function",
          "The last line of source code in the file",
        ],
        answer: 1,
        explain: "print displays output; return (or implicit None) is what callers receive.",
      },
      {
        q: "Question asks how many times the inner loop runs, not the final list. Fastest reliable approach?",
        choices: [
          "Memorize a formula from the lesson title",
          "Match keywords like 'bubble' in the code",
          "Track the inner index bounds each outer step",
          "Only trace the last two iterations",
        ],
        answer: 2,
        explain: "Count from loop bounds; names alone do not tell you pass counts.",
      },
    ],
  },
  {
    id: "trace-02",
    title: "2 · Evaluation order & types",
    html: `<p><strong>Precedence (high → low):</strong> parentheses → <code>**</code> → <code>*</code> / <code>//</code> / <code>%</code> → <code>+</code> / <code>-</code> → comparisons → <code>not</code> → <code>and</code> → <code>or</code>.</p>
<p><strong>Python 3 traps:</strong> <code>/</code> is float (<code>10/5</code> → <code>2.0</code>). <code>//</code> floors. <code>%</code> is remainder.</p>
<p><strong>Short-circuit:</strong> <code>False and f()</code> never calls <code>f()</code>. <code>True or f()</code> never calls <code>f()</code>.</p>
<p><strong>Truthiness:</strong> <code>0</code>, <code>""</code>, <code>[]</code>, <code>{}</code> are falsy; <code>[0]</code> is truthy.</p>`,
    cfu: [
      {
        q: "What is printed? print(17 // 5, 17 % 5, 17 / 5)",
        choices: ["3 2 3.4", "3 2 3", "3.4 2 3.4", "4 2 3.4"],
        answer: 0,
        explain: "// → 3, % → 2, / → 3.4 (float).",
      },
      {
        q: "x = 0\nflag = x or len('hi')\nprint(flag)",
        choices: ["0", "2", "True", "hi"],
        answer: 1,
        explain: "0 is falsy, so or evaluates len('hi') → 2.",
      },
      {
        q: "Which value is falsy in an if test?",
        choices: ["[0]", "'False'", "None", "3.0"],
        answer: 2,
        explain: "None is falsy; non-empty list [0] is truthy.",
      },
    ],
  },
  {
    id: "trace-03",
    title: "3 · Assignment vs mutation",
    html: `<p><strong>Rebind:</strong> <code>x = x + 1</code> makes a new int; other names still point at old objects unless they share the object.</p>
<p><strong>Alias:</strong> <code>b = a</code> for a list — same list object. <code>b.append(1)</code> changes <code>a</code> too.</p>
<p><strong>Fresh list:</strong> <code>b = a + [1]</code> or <code>a.copy()</code> — new object.</p>
<p>Ask: “Does this line change the object everyone shares, or point the name somewhere new?”</p>`,
    cfu: [
      {
        q: "a = [1, 2]; b = a; b.append(3); print(a, b)",
        choices: ["[1, 2] [1, 2, 3]", "[1, 2, 3] [1, 2, 3]", "[1, 2] [1, 2]", "Error"],
        answer: 1,
        explain: "Same list object; append mutates once, both names see it.",
      },
      {
        q: "a = [1, 2]; b = a + [3]; b.append(4); print(len(a), len(b))",
        choices: ["2 3", "2 4", "3 4", "4 4"],
        answer: 1,
        explain: "a unchanged length 2; b is new list [1,2,3,4] after append.",
      },
      {
        q: "def f(L): L = L + [9]; return L\nx = [1]; y = f(x); print(x, y)",
        choices: ["[1, 9] [1, 9]", "[1] [1, 9]", "[1] [1]", "[9] [1, 9]"],
        answer: 1,
        explain: "L = L + [9] rebinds local L; x still [1]. Return is new list.",
      },
    ],
  },
  {
    id: "trace-04",
    title: "4 · Indexing & slicing",
    html: `<p>Indices start at <strong>0</strong>. Last item: <code>-1</code> or <code>len(s)-1</code>.</p>
<p><code>s[i:j]</code> includes <code>i</code>, excludes <code>j</code>. <code>s[99:]</code> on short string → <code>""</code> (no error).</p>
<p><code>lst[i][key]</code> — index container first, then key (lists of dicts).</p>
<p>Dict: <code>d[k]</code> missing key → KeyError; <code>d.get(k, default)</code> safe.</p>`,
    cfu: [
      {
        q: "w = 'PYTHON'; print(w[1:4], w[-2:])",
        choices: ["PYT ON", "YTH ON", "YTH TH", "PYT TH"],
        answer: 1,
        explain: "1:4 → YTH; -2: end → ON.",
      },
      {
        q: "items = [{'n': 2}, {'n': 5}]; print(items[1]['n'] + items[0]['n'])",
        choices: ["7", "25", "Error on [1]", "52"],
        answer: 0,
        explain: "5 + 2 = 7 — not string concat.",
      },
      {
        q: "L = [10, 20, 30]; print(L[1:10])",
        choices: ["[20, 30]", "[20, 30] then IndexError", "Error at L[1:10]", "[10, 20]"],
        answer: 0,
        explain: "Slice past end is OK; gives [20, 30].",
      },
    ],
  },
  {
    id: "trace-05",
    title: "5 · if, while, for, range",
    html: `<p><code>if / elif</code> — first true branch only.</p>
<p><code>while</code> — test before each iteration.</p>
<p><code>range(2, 8, 2)</code> → 2, 4, 6. <code>range(3, 0, -1)</code> → 3, 2, 1.</p>
<p><code>break</code> exits loop; <code>continue</code> skips to next iteration.</p>
<p><code>for x in lst</code> — <code>x</code> is each value, not index (unless you use <code>range(len(lst))</code>).</p>`,
    cfu: [
      {
        q: "n = 12\nwhile n > 0:\n    n = n - 5\nprint(n)",
        choices: ["2", "-3", "0", "12"],
        answer: 1,
        explain: "12→7→2→-3; after n becomes -3, condition fails; print -3.",
      },
      {
        q: "total = 0\nfor k in range(1, 4):\n    if k == 2:\n        continue\n    total += k\nprint(total)",
        choices: ["3", "4", "6", "1"],
        answer: 1,
        explain: "k=1 adds 1; k=2 skipped; k=3 adds 3 → total 4.",
      },
      {
        q: "x = 15\nif x > 20:\n    msg = 'A'\nelif x > 10:\n    msg = 'B'\nelse:\n    msg = 'C'\nprint(msg)",
        choices: ["A", "B", "C", "Error — msg undefined"],
        answer: 1,
        explain: "First false, elif x>10 true → B.",
      },
    ],
  },
  {
    id: "trace-06",
    title: "6 · List methods",
    html: `<p><strong>Mutate, return None:</strong> <code>append</code>, <code>extend</code>, <code>insert</code>, <code>pop</code>, <code>sort</code>.</p>
<p><code>append(x)</code> — one element (even if x is a list). <code>extend(iterable)</code> — many elements.</p>
<p><code>pop()</code> last; <code>pop(i)</code> by index — not by name.</p>
<p><code>sorted(L)</code> new list; <code>L.sort()</code> mutates, returns <code>None</code>.</p>`,
    cfu: [
      {
        q: "bag = [1, 2]; bag.append([3]); print(len(bag), bag[-1])",
        choices: ["3 3", "3 [3]", "2 [3]", "4 [3]"],
        answer: 1,
        explain: "append adds one item (the list [3]); len 3; last element is [3].",
      },
      {
        q: "nums = [3, 1, 2]; t = nums.sort(); print(t, nums[0])",
        choices: ["None 1", "[1, 2, 3] 1", "None 3", "[1, 2, 3] 3"],
        answer: 0,
        explain: "sort() returns None; nums is [1,2,3].",
      },
      {
        q: "a = [10, 20, 30]; b = a.pop(1); print(b, a)",
        choices: ["20 [10, 30]", "30 [10, 20]", "1 [10, 30]", "20 [20, 30]"],
        answer: 0,
        explain: "pop(1) removes 20 at index 1.",
      },
    ],
  },
  {
    id: "trace-07",
    title: "7 · Strings",
    html: `<p>Strings are <strong>immutable</strong> — build new strings for changes.</p>
<p><code>capitalize()</code> — first char upper, rest lower. <code>title()</code> — each word capitalized.</p>
<p><code>s[i] = 'x'</code> → TypeError. Use slicing: <code>s[:1] + s[1:].upper()</code> patterns on tests.</p>`,
    cfu: [
      {
        q: "s = 'eLEPHANT'; print(s.capitalize(), len(s.title()))",
        choices: ["Elephant 8", "ELEPHANT 8", "Elephant 7", "elephant 8"],
        answer: 0,
        explain: "capitalize → Elephant; title keeps length 8.",
      },
      {
        q: "name = 'anna kline'; display = name.title(); print(display.split()[1][0])",
        choices: ["a", "K", "k", "n"],
        answer: 1,
        explain: "title → 'Anna Kline'; second word 'Kline'; first letter K.",
      },
      {
        q: "tag = '  hi  '; print(len(tag.strip()), tag.strip()[0])",
        choices: ["2 h", "5 h", "2 ' '", "4 h"],
        answer: 0,
        explain: "strip → 'hi'; len 2; [0] is h.",
      },
    ],
  },
  {
    id: "trace-08",
    title: "8 · Functions & return",
    html: `<p>Arguments evaluate left to right. <code>return</code> exits immediately — code below it in the same function does not run.</p>
<p>No return → <code>None</code>. Do not confuse <code>print</code> in autograders with return value.</p>
<p><strong>Accumulator:</strong> one variable updated in a loop (sum, count, running max).</p>`,
    cfu: [
      {
        q: "def twice(n):\n    print(n * 2)\n    return n + 1\nx = twice(4)\nprint(x)",
        choices: ["8", "5", "None", "4"],
        answer: 1,
        explain: "twice prints 8; return 5; final print(x) is 5.",
      },
      {
        q: "def total(width, height):\n    return width * height\nareas = []\nfor w in [2, 3]:\n    areas.append(total(w, 4))\nprint(sum(areas))",
        choices: ["20", "14", "12", "24"],
        answer: 0,
        explain: "8 + 12 = 20 — list of areas, not one running total variable.",
      },
      {
        q: "def f():\n    return\n    return 3\nprint(f())",
        choices: ["3", "None", "0", "Error"],
        answer: 1,
        explain: "Bare return → None; second return unreachable.",
      },
    ],
  },
  {
    id: "trace-09",
    title: "9 · Linear search",
    html: `<p>Scan indices 0 … len−1 (or each value in <code>for x in data</code>). Compare to target; return index or −1 / None.</p>
<p><strong>Requires:</strong> no order assumption. <strong>Time:</strong> O(n) worst case.</p>
<p>Identify: single loop, equality test each step, no halving of range.</p>`,
    cfu: [
      {
        q: "def find_pos(a, t):\n    for i in range(len(a)):\n        if a[i] >= t:\n            return i\n    return -1\nprint(find_pos([3, 5, 8], 6))",
        choices: ["1", "2", "-1", "0"],
        answer: 1,
        explain: "Index 0: 3>=6 false; index 1: 5>=6 false; index 2: 8>=6 true → 2.",
      },
      {
        q: "Same list [3,5,8] unsorted. Can you use standard binary search on it without sorting first?",
        choices: [
          "Yes — mid still splits the list",
          "No — binary search needs sorted order",
          "Yes — if target is in the middle index",
          "Only when len is odd",
        ],
        answer: 1,
        explain: "Binary search relies on order to discard half.",
      },
    ],
  },
  {
    id: "trace-10",
    title: "10 · Binary search",
    html: `<p><code>low</code> and <code>high</code> are <strong>indices</strong>, not values.</p>
<p><code>mid = (low + high) // 2</code>. If target &lt; a[mid] → <code>high = mid - 1</code>; if greater → <code>low = mid + 1</code>.</p>
<p>Loop while <code>low &lt;= high</code> (common pattern). Sorted data only.</p>`,
    cfu: [
      {
        q: "a = [4, 9, 11, 15, 22]; search 15. Start low=0, high=4. After first mid check (target > a[mid]), what are low and high?",
        choices: ["low=3, high=4", "low=2, high=4", "low=3, high=3", "low=1, high=4"],
        answer: 0,
        explain: "mid=2, a[2]=11; 15>11 → low=3, high stays 4.",
      },
      {
        q: "In binary search, if low=5 and high=5, mid=5. a[mid] is too small. Next step?",
        choices: ["high = 4", "low = 6", "high = 5", "stop — not found"],
        answer: 1,
        explain: "Target above a[mid] → low = mid + 1 → 6; then low>high ends search if still wrong.",
      },
      {
        q: "List has 1000 sorted items. About how many comparisons in worst case?",
        choices: ["About 1000", "About 500", "About 10", "About 2"],
        answer: 2,
        explain: "O(log n): log2(1000) ≈ 10.",
      },
    ],
  },
  {
    id: "trace-11",
    title: "11 · Bubble & selection sort",
    html: `<p><strong>Bubble:</strong> adjacent swaps; outer pass pushes largest toward end; inner often <code>j in range(0, n-i-1)</code>.</p>
<p><strong>Selection:</strong> pick min in unsorted tail, swap to front — fewer swaps, still O(n²) comparisons.</p>
<p>Count what the question asks: comparisons, swaps, or completed passes (early-stop bubble returns pass count, not last loop variable after full run).</p>`,
    cfu: [
      {
        q: "One bubble pass on [4, 1, 3]: compare/swap adjacent left→right once through. Result list?",
        choices: ["[1, 3, 4]", "[1, 4, 3]", "[4, 1, 3]", "[3, 1, 4]"],
        answer: 0,
        explain: "4↔1 → [1,4,3]; 4↔3 → [1,3,4].",
      },
      {
        q: "n=5. Inner bubble loop uses j in range(0, n - i - 1). When outer i=2, how many j values?",
        choices: ["2", "3", "4", "5"],
        answer: 0,
        explain: "range(0, 5-2-1) = range(0,2) → j=0,1 → 2 iterations.",
      },
    ],
  },
  {
    id: "trace-12",
    title: "12 · Big O patterns",
    html: `<p>Describe growth as n → large; drop constants.</p>
<ul>
<li>One loop over n → O(n)</li>
<li>Nested loops 0…n−1 → O(n²)</li>
<li>Halve range each step → O(log n)</li>
<li>Fixed work, no n loop → O(1)</li>
</ul>`,
    cfu: [
      {
        q: "def g(n):\n    k = 0\n    while n > 1:\n        n = n // 2\n        k += 1\n    return k\nWhat is the Big O of g?",
        choices: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        answer: 1,
        explain: "Each step halves n — logarithmic.",
      },
      {
        q: "for i in range(n):\n    for j in range(i, n):\n        print(i, j)\nHow does print count grow?",
        choices: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
        answer: 2,
        explain: "Inner start depends on i but total iterations ~ n(n+1)/2 → O(n²).",
      },
    ],
  },
  {
    id: "trace-13",
    title: "13 · Classes (basic trace)",
    html: `<p><code>__init__(self, …)</code> sets <code>self.field</code>. Methods take <code>self</code> first.</p>
<p><code>r = Rect(3, 4)</code> → use attribute names from the class (e.g. <code>length</code>, <code>width</code>), not random x/y unless defined.</p>`,
    cfu: [
      {
        q: "class Box:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\nb = Box(2, 5)\nprint(b.area())",
        choices: ["7", "10", "25", "None"],
        answer: 1,
        explain: "2 * 5 = 10.",
      },
      {
        q: "After b = Box(2, 5), which fails?",
        choices: ["b.w", "b.area()", "Box.area(b)", "b.depth"],
        answer: 3,
        explain: "No depth attribute defined.",
      },
    ],
  },
  {
    id: "trace-14",
    title: "14 · Exam traps checklist",
    html: `<p>Before locking an MCQ answer, re-check:</p>
<ul>
<li><code>/</code> vs <code>//</code> vs <code>%</code></li>
<li><code>append</code> vs <code>extend</code>; <code>pop(index)</code></li>
<li><code>sort()</code> return is <code>None</code></li>
<li>Binary search: sorted? indices for low/high?</li>
<li>Shared list aliases after mutation</li>
<li><code>and</code>/<code>or</code> short-circuit</li>
</ul>`,
    cfu: [
      {
        q: "team = ['Bo', 'Mo']; idx = team.index('Mo'); team.pop('Mo'); print(team)",
        choices: ["['Bo']", "Error", "['Mo']", "['Bo', 'Mo']"],
        answer: 1,
        explain: "pop needs integer index, not name — TypeError.",
      },
      {
        q: "low, high = 0, 6 on a sorted list of length 7. mid = (low + high) // 2. Is mid always the middle value's index?",
        choices: [
          "Yes — formula guarantees middle element",
          "No — mid is an index; the value there may not be the median",
          "Only when length is even",
          "Only for binary search trees",
        ],
        answer: 1,
        explain: "mid indexes a slot; value at mid is not necessarily the data median.",
      },
      {
        q: "print(0.1 + 0.2 == 0.3)  # IB-style: focus on logic you control\nWhich lesson habit catches most list-trace mistakes?",
        choices: [
          "Memorize every built-in method name",
          "Ask mutate vs rebind before each line",
          "Always pick the longest choice",
          "Ignore loops that use range",
        ],
        answer: 1,
        explain: "Mutation vs assignment explains shared-list surprises.",
      },
    ],
  },
];

function traceEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function loadTraceProgress() {
  try {
    return JSON.parse(localStorage.getItem(TRACE_STORAGE) || "{}");
  } catch {
    return {};
  }
}

function saveTraceProgress(map) {
  localStorage.setItem(TRACE_STORAGE, JSON.stringify(map));
}

const TraceGuide = {
  root: null,
  currentId: null,
  /** @type {Record<string, (number|null)[]>} */
  picks: {},
  checked: false,

  init() {
    this.root = document.getElementById("traceGuideRoot");
  },

  open(lessonId) {
    if (!this.root) return;
    this.currentId = lessonId;
    this.checked = false;
    const lesson = TRACE_GUIDE.find((l) => l.id === lessonId);
    if (!lesson) return;
    if (!this.picks[lessonId]) {
      this.picks[lessonId] = lesson.cfu.map(() => null);
    }
    this.render();
    if (window.onTraceGuideOpen) window.onTraceGuideOpen(lessonId);
  },

  render() {
    const lesson = TRACE_GUIDE.find((l) => l.id === this.currentId);
    if (!lesson || !this.root) return;

    const idx = TRACE_GUIDE.findIndex((l) => l.id === lesson.id);
    const picks = this.picks[lesson.id] || lesson.cfu.map(() => null);

    let cfuHtml = "";
    lesson.cfu.forEach((item, i) => {
      let choices = "";
      item.choices.forEach((text, ci) => {
        const sel = picks[i] === ci ? " selected" : "";
        let extra = "";
        if (this.checked && picks[i] !== null) {
          if (ci === item.answer) extra = " correct";
          else if (picks[i] === ci) extra = " wrong";
        }
        choices += `<button type="button" class="mcq-choice${sel}${extra}" data-q="${i}" data-i="${ci}">${traceEscape(text)}</button>`;
      });
      let feedback = "";
      if (this.checked && picks[i] !== null && picks[i] !== item.answer) {
        feedback = `<p class="mcq-explain cfu-wrong">${traceEscape(item.explain)}</p>`;
      } else if (this.checked && picks[i] === item.answer) {
        feedback = `<p class="mcq-explain cfu-ok">${traceEscape(item.explain)}</p>`;
      }
      cfuHtml += `
        <div class="trace-cfu-block">
          <div class="trace-cfu-q"><strong>${i + 1}.</strong> ${
            typeof window.formatQuestionHtml === "function"
              ? window.formatQuestionHtml(item.q)
              : traceEscape(item.q).replace(/\n/g, "<br/>")
          }</div>
          <div class="mcq-choices">${choices}</div>
          ${feedback}
        </div>`;
    });

    const allAnswered = picks.every((p) => p !== null);
    let scoreLine = "";
    if (this.checked) {
      let ok = 0;
      lesson.cfu.forEach((item, i) => {
        if (picks[i] === item.answer) ok++;
      });
      scoreLine = `<p class="trace-score">${ok} / ${lesson.cfu.length} correct on this lesson.</p>`;
    }

    this.root.innerHTML = `
      <div class="trace-guide">
        <div class="lesson-meta">
          <span class="chip">Trace guide</span>
          <span>Lesson ${idx + 1} of ${TRACE_GUIDE.length}</span>
        </div>
        <h2>${traceEscape(lesson.title)}</h2>
        <div class="instructions trace-body">${lesson.html}</div>
        <section class="trace-cfu-section" aria-labelledby="cfuHeading">
          <h3 id="cfuHeading">Check for understanding</h3>
          <p class="mcq-hint">New scenarios — apply the rules; don’t match lesson keywords alone.</p>
          ${cfuHtml}
          ${scoreLine}
          <div class="actions trace-cfu-actions">
            <button type="button" class="primary" id="traceCheckBtn" ${allAnswered ? "" : "disabled"}>Check answers</button>
            <button type="button" class="ghost" id="traceRetryBtn">Reset picks</button>
          </div>
        </section>
        <div class="lesson-nav">
          <button type="button" class="ghost" id="tracePrev" ${idx <= 0 ? "disabled" : ""}>← Previous lesson</button>
          <button type="button" class="ghost" id="traceNext" ${idx >= TRACE_GUIDE.length - 1 ? "disabled" : ""}>Next lesson →</button>
        </div>
      </div>`;

    this.root.querySelectorAll(".mcq-choice[data-q]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.checked) return;
        const qi = parseInt(btn.dataset.q, 10);
        const ci = parseInt(btn.dataset.i, 10);
        this.picks[lesson.id][qi] = ci;
        this.render();
      });
    });

    document.getElementById("traceCheckBtn")?.addEventListener("click", () => {
      if (!allAnswered) return;
      this.checked = true;
      let ok = 0;
      lesson.cfu.forEach((item, i) => {
        if (this.picks[lesson.id][i] === item.answer) ok++;
      });
      if (ok === lesson.cfu.length) {
        const prog = loadTraceProgress();
        prog[lesson.id] = true;
        saveTraceProgress(prog);
        if (window.rebuildTrainerNav) window.rebuildTrainerNav();
      }
      this.render();
    });

    document.getElementById("traceRetryBtn")?.addEventListener("click", () => {
      this.picks[lesson.id] = lesson.cfu.map(() => null);
      this.checked = false;
      this.render();
    });

    document.getElementById("tracePrev")?.addEventListener("click", () => {
      if (idx > 0) this.open(TRACE_GUIDE[idx - 1].id);
    });
    document.getElementById("traceNext")?.addEventListener("click", () => {
      if (idx < TRACE_GUIDE.length - 1) this.open(TRACE_GUIDE[idx + 1].id);
    });
  },
};

window.TRACE_GUIDE = TRACE_GUIDE;
window.TraceGuide = TraceGuide;

