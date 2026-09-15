/**
 * Built-in Code Coach — hints and nudges without an API.
 * @typedef {{ hints: string[], concepts: { q: string, a: string }[] }} CoachPack
 */

const COACH_HINT_KEY = "ib-python-test-trainer-coach-hints";

/** @type {Record<string, CoachPack>} */
const COACH_BY_LESSON = {
  "u3-int-float": {
    hints: [
      "Use three separate print(...) calls — one per line.",
      "/ gives a float (3.5), // is floor division (3), % is remainder (1).",
      "Do not print labels like '7/2=' — only the number on each line.",
    ],
    concepts: [
      { q: "Why is 7/2 not 3?", a: "In Python 3, / always produces a float. Use // when you want integer division." },
    ],
  },
  "u3-input-mock": {
    hints: [
      "age is a string — convert with int(age) before adding.",
      "Print only the final number, nothing else.",
      "Try: print(int(age) + 1)",
    ],
    concepts: [
      { q: "Why int()?", a: "You cannot do math on a string until you convert it to a number." },
    ],
  },
  "u5-grade": {
    hints: [
      "Use if / elif / elif / else and return a string each time.",
      "Check highest scores first (90 before 80) so 100 is not caught by a lower branch.",
      "Return the letter — do not print it.",
    ],
    concepts: [
      { q: "return vs print?", a: "return sends a value back to the caller; print only shows text and the function still returns None." },
    ],
  },
  "u5-demorgan": {
    hints: [
      "One chained comparison works: 13 <= age <= 19.",
      "Do not use and or or in this exercise.",
      "Return True or False (boolean), not 'True' strings.",
    ],
    concepts: [
      { q: "Chained comparisons?", a: "13 <= age <= 19 means age is at least 13 AND at most 19." },
    ],
  },
  "u7-range": {
    hints: [
      "range(1, 11) gives 1..10 because the stop value is excluded.",
      "Add numbers in a loop, then print the total once after the loop.",
      "Initialize total = 0 before the loop.",
    ],
    concepts: [
      { q: "range stop value", a: "range(start, stop) never includes stop. For 1–10 use range(1, 11)." },
    ],
  },
  "u7-break": {
    hints: [
      "Loop with a counter or range; break when you find the condition.",
      "Print only what the instructions ask for.",
      "Make sure the loop actually reaches the break case.",
    ],
    concepts: [{ q: "break", a: "break exits the innermost loop immediately." }],
  },
  "u7-nested-count": {
    hints: [
      "Outer loop for rows, inner loop for columns (or the other way — stay consistent).",
      "Use a counter variable and increment inside the inner loop.",
      "Print the count after both loops finish.",
    ],
    concepts: [],
  },
  "u9-area": {
    hints: [
      "Define a function that returns width * height.",
      "Parameters should match the names in the instructions.",
      "Return a number, do not print inside the function unless asked.",
    ],
    concepts: [],
  },
  "u9-scope": {
    hints: [
      "Variables created inside a function stay inside unless you return them.",
      "Read the question: does it want a print from global code or a return?",
      "Call the function if the checker expects output from calling it.",
    ],
    concepts: [{ q: "Local scope", a: "Assignments inside def create local names; they do not change globals unless you use global (rare in this course)." }],
  },
  "u9-parse-age": {
    hints: [
      "Split or slice the string to get digits, then int(...).",
      "Return the integer age, not a string.",
      "Watch for extra characters — strip or split on non-digits if needed.",
    ],
    concepts: [],
  },
  "u10-slice": {
    hints: [
      "String slicing uses [start:stop] — stop is excluded.",
      "Negative indices count from the end.",
      "Return or print exactly what the test expects (check spacing).",
    ],
    concepts: [{ q: "s[1:4]", a: "Characters at index 1, 2, 3 — not including index 4." }],
  },
  "u10-strip-vowels": {
    hints: [
      "Build a new string in a loop, or use a list and join.",
      "Return the result after the loop — a return inside the loop exits too early.",
      "Lowercase vowels: a,e,i,o,u — check both cases if needed.",
    ],
    concepts: [
      { q: "return placement", a: "If return is inside the loop, you only process the first character. Return after the loop finishes." },
    ],
  },
  "u10-split": {
    hints: [
      "sentence.split() splits on whitespace into a list of words.",
      "Loop over words or indices depending on the task.",
      "Join with ' '.join(list) if you need a string back.",
    ],
    concepts: [{ q: "split vs list(s)", a: "list('hi there') splits characters; 'hi there'.split() splits words." }],
  },
  "u12-list-ops": {
    hints: [
      "Use append for one item, extend for many, or list + list.",
      "Do not confuse append([x]) with append(x).",
      "Return the new list if the function should produce it.",
    ],
    concepts: [],
  },
  "u12-find-max": {
    hints: [
      "Start with values[0] as best, then compare each item.",
      "Use a for loop over values — not range(len) unless you need indices.",
      "Return the largest value; handle empty only if the lesson says so.",
    ],
    concepts: [],
  },
  "u12-tuple": {
    hints: [
      "Tuples use parentheses and are immutable — good for fixed pairs like (name, score).",
      "Unpack with a, b = pair or index pair[0], pair[1].",
      "Return the tuple the tests expect (order matters).",
    ],
    concepts: [],
  },
  "u13-cell": {
    hints: [
      "2D list: grid[row][col] — row first, then column.",
      "Check bounds if the lesson mentions invalid indices.",
      "Return the cell value, not the whole row.",
    ],
    concepts: [{ q: "grid[r][c]", a: "First index is row (down), second is column (across)." }],
  },
  "u13-sum-grid": {
    hints: [
      "Use nested loops: for row in grid: for cell in row:",
      "Or for i in range(len(grid)) and range(len(grid[0])).",
      "Do not use range(grid) — range needs an integer, not a list.",
    ],
    concepts: [{ q: "len(grid)", a: "len(grid) is number of rows; len(grid[0]) is columns if the grid is rectangular." }],
  },
  "u13-build-row": {
    hints: [
      "Build a list with a loop or comprehension, then return it.",
      "make_row should return the list — not print it.",
      "Each cell should match the formula in the instructions.",
    ],
    concepts: [],
  },
  "c-pairs": {
    hints: [
      "Nested loops: for i in range(n): for j in range(i+1, n): counts each pair once.",
      "Or double loop over all i,j with i < j.",
      "Return the count as an integer.",
    ],
    concepts: [{ q: "Why i+1?", a: "Avoids counting (j,i) again and skips i==j." }],
  },
  "c-dup-fast": {
    hints: [
      "Convert to a set to remove duplicates, or track seen in a set as you loop.",
      "Set lookup is O(1) average — faster than nested loops for has duplicate.",
      "Return True/False, not print.",
    ],
    concepts: [{ q: "set vs list", a: "Sets cannot contain duplicates; len(set(lst)) < len(lst) means a duplicate existed." }],
  },
  "c-adjacent": {
    hints: [
      "Compare neighbors: for i in range(len(nums)-1): if nums[i] == nums[i+1].",
      "Stop early with return True when you find a match.",
      "Return False after the loop if none found.",
    ],
    concepts: [],
  },
  "c-halving": {
    hints: [
      "Start with n and count how many times you can integer-divide by 2 until 0.",
      "Use n //= 2 or n = n // 2 in a while loop.",
      "Return the step count.",
    ],
    concepts: [{ q: "Big O link", a: "Halving each step is logarithmic — same idea as binary search." }],
  },
  "c-vowel-list": {
    hints: [
      "Loop characters or words depending on spec.",
      "Return a new list/string; avoid returning inside the loop too early.",
      "Check membership with in or a vowel string.",
    ],
    concepts: [],
  },
  "c-find-number": {
    hints: [
      "Each book entry is a tuple — use for name, number in book or book[i][0].",
      "Return the number when name matches; return -1 after the loop if not found.",
      "Compare names with == exactly.",
    ],
    concepts: [{ q: "return -1", a: "Common sentinel meaning 'not found' when the function must return an int." }],
  },
  "c-linear-idx": {
    hints: [
      "Loop with index: for i in range(len(items)): if items[i] == target: return i",
      "Return -1 if you finish the loop without finding it.",
      "Do not return False unless the lesson asks for a boolean.",
    ],
    concepts: [],
  },
  "c-linear-value": {
    hints: [
      "Simple loop: for x in items: if x == target: return True",
      "Return False after the loop.",
      "Use == for value comparison.",
    ],
    concepts: [],
  },
  "c-sorted-early": {
    hints: [
      "If the list is sorted, stop when items[i] > target — no need to scan the rest.",
      "Still return -1 or False if never found.",
      "Compare before you decide to break.",
    ],
    concepts: [{ q: "Early exit", a: "On sorted data, once values pass the target, the rest cannot match if all later values are larger." }],
  },
};

const DEFAULT_PACK = {
  hints: [
    "Re-read the instructions — match return vs print.",
    "Run your code and compare output to what Check expects.",
    "Try one small fix, then Check again.",
  ],
  concepts: [
    { q: "Stuck?", a: "Use Run to see errors, then Check. Read the first failing test message carefully." },
  ],
};

function getPack(lessonId) {
  return COACH_BY_LESSON[lessonId] || DEFAULT_PACK;
}

function hintLevelKey(lessonId) {
  return `${COACH_HINT_KEY}-${lessonId}`;
}

function getHintLevel(lessonId) {
  return parseInt(localStorage.getItem(hintLevelKey(lessonId)) || "0", 10);
}

function setHintLevel(lessonId, level) {
  localStorage.setItem(hintLevelKey(lessonId), String(level));
}

function analyzeFailures(code, failures, lesson) {
  const tips = [];
  const text = failures.map((f) => `${f.title}\n${f.detail}`).join("\n");
  const lower = text.toLowerCase();

  if (/\bprint\s*\(/.test(code) && lesson?.tests?.some((t) => t.kind === "assert")) {
    tips.push("This lesson tests functions with assert — use return, not print.");
  }
  if (/\bpass\b/.test(code) && !/^\s*#/.test(code)) {
    tips.push("Replace pass with real code in your function body.");
  }
  if (lower.includes("none") && lower.includes("expected")) {
    tips.push("Your function returned None — add a return statement with the value.");
  }
  if (lower.includes("indent") || lower.includes("unexpected token")) {
    tips.push("Indentation error: use 4 spaces under def / if / for lines ending with :.");
  }
  if (lesson?.id === "u5-demorgan" && /\b(and|or)\b/.test(code)) {
    tips.push("This exercise wants a chained comparison — remove and/or.");
  }
  if (lesson?.id === "u13-sum-grid" && /range\s*\(\s*grid\s*\)/.test(code)) {
    tips.push("Use range(len(grid)), not range(grid).");
  }
  if (lower.includes("got") && lower.includes("expected") && lower.includes("output")) {
    tips.push("Output spacing matters — match newlines exactly (\\n at end of lines).");
  }
  if (failures[0]?.detail) {
    const first = failures[0].detail.slice(0, 120);
    if (first.length < failures[0].detail.length) {
      tips.push(`First issue: ${first}…`);
    }
  }
  return tips;
}

const Coach = {
  /** @type {HTMLElement|null} */
  messagesEl: null,
  currentLessonId: null,

  init() {
    this.messagesEl = document.getElementById("coachMessages");
    const hintBtn = document.getElementById("coachHintBtn");
    const focusBtn = document.getElementById("coachFocusBtn");
    if (hintBtn) hintBtn.addEventListener("click", () => this.giveNextHint());
    if (focusBtn) focusBtn.addEventListener("click", () => this.explainFocus());
  },

  clearMessages() {
    if (this.messagesEl) this.messagesEl.innerHTML = "";
  },

  append(role, html) {
    if (!this.messagesEl) return;
    const bubble = document.createElement("div");
    bubble.className = `coach-msg ${role}`;
    bubble.innerHTML = html;
    this.messagesEl.appendChild(bubble);
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  },

  onLessonOpen(lesson) {
    this.currentLessonId = lesson.id;
    setHintLevel(lesson.id, 0);
    this.clearMessages();
    this.append(
      "coach",
      `<strong>Hi — I'm Code Coach.</strong><p>I'm here for this lesson: <em>${escapeCoach(lesson.title)}</em>. Click <strong>Next hint</strong> if you're stuck, or <strong>Focus</strong> for what to prioritize. After a failed Check, I'll nudge you.</p>`
    );
    this.renderConceptChips(lesson.id);
  },

  renderConceptChips(lessonId) {
    const pack = getPack(lessonId);
    const wrap = document.getElementById("coachConcepts");
    if (!wrap || !pack.concepts.length) {
      if (wrap) wrap.innerHTML = "";
      return;
    }
    wrap.innerHTML = "";
    for (const c of pack.concepts) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "coach-chip";
      btn.textContent = c.q;
      btn.addEventListener("click", () => {
        this.append("coach", `<strong>${escapeCoach(c.q)}</strong><p>${escapeCoach(c.a)}</p>`);
      });
      wrap.appendChild(btn);
    }
  },

  giveNextHint() {
    if (!this.currentLessonId) return;
    const pack = getPack(this.currentLessonId);
    let level = getHintLevel(this.currentLessonId);
    if (level >= pack.hints.length) {
      this.append("coach", "<p>You've seen all hints for this lesson. Try small edits and Check again, or read the concept buttons above.</p>");
      return;
    }
    this.append("coach", `<strong>Hint ${level + 1}</strong><p>${escapeCoach(pack.hints[level])}</p>`);
    level += 1;
    setHintLevel(this.currentLessonId, level);
  },

  explainFocus() {
    if (!this.currentLessonId) return;
    const pack = getPack(this.currentLessonId);
    const focus =
      pack.hints[0] ||
      "Follow the instructions step by step; use Run for errors, Check for tests.";
    this.append("coach", `<strong>Focus on this</strong><p>${escapeCoach(focus)}</p>`);
  },

  onCheckResult(passed, code, failures, lesson) {
    if (passed) {
      this.append("coach", "<strong>Nice!</strong><p>All tests passed. Use <strong>Next →</strong> when you're ready.</p>");
      return;
    }
    const auto = analyzeFailures(code, failures, lesson);
    let body = "<strong>After Check</strong><p>Don't paste the full answer — try a small fix:</p><ul>";
    for (const t of auto.slice(0, 4)) {
      body += `<li>${escapeCoach(t)}</li>`;
    }
    body += "</ul>";
    if (auto.length === 0) {
      body += "<p>Use <strong>Next hint</strong> for a lesson-specific clue.</p>";
    }
    this.append("coach", body);
  },
};

function escapeCoach(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

window.Coach = Coach;
