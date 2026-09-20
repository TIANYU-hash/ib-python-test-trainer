/**
 * Procedural MCQ items — new parameters each Generate (not a fixed pool).
 * @typedef {{ id: string, unit: number, q: string, choices: string[], answer: number, explain: string }} GenMcqItem
 */

function mcqRi(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mcqPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function mcqShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function mcqHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

/** @param {string} correct @param {string[]} wrongs @param {number} unit @param {string} explain */
function mcqMake(unit, q, correct, wrongs, explain) {
  const uniqWrongs = [...new Set(wrongs.filter((w) => w !== correct))].slice(0, 3);
  while (uniqWrongs.length < 3) {
    uniqWrongs.push(String(mcqRi(0, 99)) + " (distractor)");
  }
  const choices = mcqShuffle([correct, ...uniqWrongs.slice(0, 3)]);
  return {
    id: `gen-${unit}-${mcqHash(q + correct)}`,
    unit,
    q,
    choices,
    answer: choices.indexOf(correct),
    explain,
  };
}

function genSortedList(len, minVal, maxVal) {
  const set = new Set();
  while (set.size < len) set.add(mcqRi(minVal, maxVal));
  return [...set].sort((a, b) => a - b);
}

/** @type {{ unit: number, fn: () => GenMcqItem | null }[]} */
const MCQ_GENERATOR_FNS = [
  // —— Unit 1 ——
  {
    unit: 1,
    fn() {
      const n = mcqPick([8, 16, 32, 64, 128, 256, 512, 1000]);
      const log2 = Math.ceil(Math.log2(n));
      const q = `Binary search on ${n} sorted items — worst-case comparisons about`;
      return mcqMake(
        1,
        q,
        String(log2),
        [String(n), String(Math.floor(n / 2)), String(log2 + mcqPick([2, 3, 5]))],
        `Halving each step → about log₂(${n}) ≈ ${log2}.`
      );
    },
  },
  {
    unit: 1,
    fn() {
      const n = mcqRi(20, 200);
      return mcqMake(
        1,
        `A single loop from 0 to ${n - 1} (inclusive) with O(1) work inside is`,
        "O(n)",
        ["O(1)", "O(log n)", "O(n²)"],
        "One pass over n items → linear."
      );
    },
  },
  {
    unit: 1,
    fn() {
      const n = mcqRi(3, 12);
      return mcqMake(
        1,
        `Nested loops: for i in range(${n}): for j in range(${n}): pass — body runs about`,
        `${n * n} times`,
        [`${n * 2} times`, `${n + n} times`, `${n} times`],
        `${n}×${n} = ${n * n} iterations.`
      );
    },
  },
  {
    unit: 1,
    fn() {
      return mcqMake(
        1,
        "Which change doubles worst-case linear search comparisons on one list?",
        "The list length doubles",
        ["The list is sorted first", "You use print in the loop", "You rename the variable"],
        "Linear cost grows with n."
      );
    },
  },

  // —— Unit 2 ——
  {
    unit: 2,
    fn() {
      const a = mcqRi(11, 99);
      const b = mcqRi(2, 9);
      const mod = a % b;
      const div = a / b;
      const correct = `${mod} ${div}`;
      const q = `What is printed?\nprint(${a} % ${b}, ${a} / ${b})`;
      return mcqMake(
        2,
        q,
        correct,
        [`${Math.floor(a / b)} ${mod}`, `${mod}.0 ${Math.floor(a / b)}`, `${mod} ${Math.floor(a / b)}.0`],
        `% → ${mod}; / in Python 3 → ${div}.`
      );
    },
  },
  {
    unit: 2,
    fn() {
      const x = mcqPick([0, 0, ""]);
      const s = mcqPick(["ab", "xy", "go"]);
      const flag = x || s.length;
      const q = `x = ${x === "" ? '""' : x}\nflag = x or len("${s}")\nprint(flag)`;
      return mcqMake(2, q, String(flag), ["0", "True", s], "Falsy x → or evaluates len → " + flag + ".");
    },
  },
  {
    unit: 2,
    fn() {
      const a = mcqRi(2, 5);
      const b = mcqRi(2, 4);
      const c = mcqRi(2, 3);
      const val = a ** b ** c;
      const q = `print(${a} ** ${b} ** ${c})`;
      return mcqMake(
        2,
        q,
        String(val),
        [String(a ** (b * c)), String((a ** b) * c), String(a + b + c)],
        `** is right-associative: ${b}**${c} first, then ${a}**…`
      );
    },
  },
  {
    unit: 2,
    fn() {
      return mcqMake(
        2,
        "Which raises TypeError?",
        '"7" + 3',
        ['int("7") + 3', "7 / 2", "7 // 2"],
        "Cannot add str and int without conversion."
      );
    },
  },

  // —— Unit 3 ——
  {
    unit: 3,
    fn() {
      const score = mcqRi(60, 100);
      let g;
      if (score >= 90) g = "A";
      else if (score >= 80) g = "B";
      else if (score >= 70) g = "C";
      else g = "F";
      const q = `score = ${score}\nif score >= 90: g = "A"\nelif score >= 80: g = "B"\nelif score >= 70: g = "C"\nelse: g = "F"\nprint(g)`;
      return mcqMake(3, q, g, ["A", "B", "C", "F"].filter((x) => x !== g), "First matching elif/else branch wins.");
    },
  },
  {
    unit: 3,
    fn() {
      const a = mcqRi(2, 9);
      const b = mcqRi(2, 9);
      const left = a > b;
      const right = a === b + 1;
      const result = !(left && right);
      const q = `print(not (${a} > ${b} and ${a} == ${b + 1}))`;
      return mcqMake(
        3,
        q,
        result ? "True" : "False",
        [result ? "False" : "True", "Error", "None"],
        `Evaluate and, then not.`
      );
    },
  },

  // —— Unit 4 ——
  {
    unit: 4,
    fn() {
      const step = mcqPick([3, 4, 5, 6, 7]);
      const start = mcqRi(15, 35);
      let sim = start;
      while (sim > 0) sim -= step;
      const q = `n = ${start}\nwhile n > 0:\n    n = n - ${step}\nprint(n)`;
      return mcqMake(4, q, String(sim), [String(sim + step), "0", String(start)], `Subtract ${step} until n≤0; final n is ${sim}.`);
    },
  },
  {
    unit: 4,
    fn() {
      const start = mcqRi(2, 5);
      const stop = start + mcqRi(6, 12);
      const step = mcqPick([1, 2, 3]);
      const vals = [];
      for (let v = start; v < stop; v += step) vals.push(v);
      const q = `count = 0\nfor i in range(${start}, ${stop}, ${step}):\n    count += 1\nprint(count)`;
      return mcqMake(
        4,
        q,
        String(vals.length),
        [String(vals.length + 1), String(vals.length - 1 || 1), String(stop - start)],
        `range(${start}, ${stop}, ${step}) → ${vals.length} values.`
      );
    },
  },
  {
    unit: 4,
    fn() {
      const outer = mcqRi(2, 6);
      const inner = mcqRi(2, 5);
      return mcqMake(
        4,
        `for i in range(${outer}):\n    for j in range(${inner}):\n        pass\nHow many times does pass run?`,
        String(outer * inner),
        [String(outer + inner), String(outer), String(inner)],
        `${outer}×${inner} = ${outer * inner}.`
      );
    },
  },

  // —— Unit 5 ——
  {
    unit: 5,
    fn() {
      const n = mcqRi(2, 9);
      const q = `def twice(n):\n    print(n * 2)\n    return n + 1\nx = twice(${n})\nprint(x)`;
      return mcqMake(5, q, String(n + 1), [String(n * 2), "None", String(n)], "Return value is n+1, not the print.");
    },
  },
  {
    unit: 5,
    fn() {
      const q = `def f(L):\n    L = L + [9]\n    return L\nx = [1]\ny = f(x)\nprint(x, y)`;
      return mcqMake(
        5,
        q,
        "[1] [1, 9]",
        ["[1, 9] [1, 9]", "[1] [1]", "[9] [1, 9]"],
        "L + [9] rebinds local L; x unchanged."
      );
    },
  },
  {
    unit: 5,
    fn() {
      const w = mcqRi(2, 7);
      const h = mcqRi(2, 7);
      const q = `def area(w, h):\n    return w * h\nprint(area(${w}, ${h}) + area(1, 2))`;
      return mcqMake(5, q, String(w * h + 2), [String(w * h), String(w + h + 2), String(w * h * 2)], `${w}*${h}+2 = ${w * h + 2}.`);
    },
  },

  // —— Unit 6 ——
  {
    unit: 6,
    fn() {
      const word = mcqPick(["hello", "world", "python", "tiger"]);
      const cap = word[0].toUpperCase() + word.slice(1).toLowerCase();
      const q = `word = "${word}"\nword = word[0].upper() + word[1:]\nprint(word)`;
      const got = word[0].toUpperCase() + word.slice(1);
      return mcqMake(6, q, got, [word.toUpperCase(), word, cap + "X"], "Build new string with first char upper.");
    },
  },
  {
    unit: 6,
    fn() {
      const s = mcqPick(["PYTHON", "TIGER", "SCHOOL"]);
      const a = s[1] + s[2] + s[0];
      const b = s.slice(-2);
      const q = `s = "${s}"\nprint(s[1:3], s[-2:])`;
      const c1 = s.slice(1, 3);
      const c2 = s.slice(-2);
      return mcqMake(6, q, `${c1} ${c2}`, [`${s.slice(0, 3)} ${c2}`, `${c1} ${s[0]}`, `${s} ${c2}`], `Slice 1:3 and last two chars.`);
    },
  },

  // —— Unit 7 ——
  {
    unit: 7,
    fn() {
      const nums = mcqShuffle([mcqRi(2, 9), mcqRi(2, 9), mcqRi(2, 9)]);
      const sorted = nums.slice().sort((a, b) => a - b);
      const q = `nums = [${nums.join(", ")}]\nt = nums.sort()\nprint(t, nums[0])`;
      return mcqMake(7, q, `None ${sorted[0]}`, [`[${sorted.join(", ")}] ${sorted[0]}`, `None ${nums[0]}`, `None ${sorted[2]}`], "sort() → None; nums sorted in place.");
    },
  },
  {
    unit: 7,
    fn() {
      const arr = [mcqRi(10, 30), mcqRi(10, 30), mcqRi(10, 30)];
      const idx = 1;
      const removed = arr[idx];
      const rest = [arr[0], arr[2]];
      const q = `a = [${arr.join(", ")}]\nb = a.pop(${idx})\nprint(b, a)`;
      return mcqMake(7, q, `${removed} [${rest.join(", ")}]`, [`${arr[2]} [${arr[0]}, ${arr[1]}]`, `${idx} [${rest.join(", ")}]`, `${removed} [${arr.join(", ")}]`], `pop(${idx}) removes ${removed}.`);
    },
  },
  {
    unit: 7,
    fn() {
      const n = mcqRi(2, 8);
      const q = `bag = [1, 2]\nbag.append([${n}])\nprint(len(bag), bag[-1])`;
      return mcqMake(7, q, `3 [${n}]`, [`2 [${n}]`, `3 ${n}`, `4 [${n}]`], "append adds one element (the list object).");
    },
  },
  {
    unit: 7,
    fn() {
      return mcqMake(
        7,
        "type((5,)) and type((5)) are",
        "tuple and int",
        ["tuple and tuple", "int and int", "list and int"],
        "(5,) is tuple; (5) is just grouping → int."
      );
    },
  },

  // —— Unit 8 ——
  {
    unit: 8,
    fn() {
      const key = mcqPick(["a", "b", "x"]);
      const val = mcqRi(1, 9);
      const d = { [key]: val };
      const miss = mcqPick(["z", "q", "w"]);
      const q = `d = {"${key}": ${val}}\nprint(d.get("${miss}", 0), d.get("${key}"))`;
      return mcqMake(8, q, `0 ${val}`, [`KeyError ${val}`, `None ${val}`, `0 0`], "get default for missing key.");
    },
  },
  {
    unit: 8,
    fn() {
      const v1 = mcqRi(2, 9);
      const v2 = mcqRi(2, 9);
      const q = `cards = [{"v": ${v1}}, {"v": ${v2}}]\nprint(cards[1]["v"] + cards[0]["v"])`;
      return mcqMake(8, q, String(v1 + v2), [String("" + v1 + v2), String(v1 - v2), "Error"], "Index list, then key; add numbers.");
    },
  },
  {
    unit: 8,
    fn() {
      return mcqMake(
        8,
        "grid = [[0]*3 for _ in range(3)]\ngrid[0][0] = 9\nprint(grid[1][0], grid[0][0])",
        "0 9",
        ["9 9", "9 0", "0 0"],
        "List comp makes separate rows."
      );
    },
  },

  // —— Unit 9 ——
  {
    unit: 9,
    fn() {
      const a = genSortedList(5, 1, 50);
      const low = 0;
      const high = a.length - 1;
      const mid = Math.floor((low + high) / 2);
      let target = mcqPick(a.filter((v, i) => i !== mid));
      if (target === undefined) target = a[0] + 100;
      let nlow = low;
      let nhigh = high;
      if (target > a[mid]) nlow = mid + 1;
      else nhigh = mid - 1;
      const q = `Sorted a = [${a.join(", ")}]; low=0, high=${high}; mid=${mid}; a[mid]=${a[mid]}; target=${target}. After one binary-search step, new low and high?`;
      const correct = `${nlow}, ${nhigh}`;
      return mcqMake(
        9,
        q,
        correct,
        [`${mid}, ${high}`, `${low}, ${mid}`, `${nlow + 1}, ${nhigh}`],
        "Adjust low or high by mid±1."
      );
    },
  },
  {
    unit: 9,
    fn() {
      const arr = mcqShuffle([mcqRi(2, 9), mcqRi(2, 9), mcqRi(2, 9)]);
      let pass = arr.slice();
      for (let j = 0; j < pass.length - 1; j++) {
        if (pass[j] > pass[j + 1]) {
          const t = pass[j];
          pass[j] = pass[j + 1];
          pass[j + 1] = t;
        }
      }
      const q = `One bubble pass (left→right) on [${arr.join(", ")}]. Result list?`;
      return mcqMake(9, q, `[${pass.join(", ")}]`, [`[${arr.join(", ")}]`, `[${mcqShuffle(pass).join(", ")}]`, `[${pass.slice().reverse().join(", ")}]`], "Adjacent compare-swap once through.");
    },
  },
  {
    unit: 9,
    fn() {
      const n = mcqRi(4, 9);
      const i = mcqRi(1, n - 2);
      const inner = Math.max(0, n - i - 1);
      return mcqMake(
        9,
        `Bubble sort: n=${n}, outer i=${i}, inner j in range(0, n-i-1). How many j values?`,
        String(inner),
        [String(inner + 1), String(n), String(i)],
        `range(0, ${n - i - 1}) → ${inner} iterations.`
      );
    },
  },
  {
    unit: 9,
    fn() {
      const a = genSortedList(4, 1, 30);
      const t = mcqRi(a[0], a[a.length - 1] + 5);
      let idx = -1;
      for (let i = 0; i < a.length; i++) {
        if (a[i] >= t) {
          idx = i;
          break;
        }
      }
      const q = `def find(a, t):\n    for i in range(len(a)):\n        if a[i] >= t:\n            return i\n    return -1\nfind([${a.join(", ")}], ${t})`;
      return mcqMake(
        9,
        q,
        String(idx),
        [String(idx + 1), "-1", String(a.indexOf(t) >= 0 ? a.indexOf(t) : 0)],
        "First index where a[i] >= t."
      );
    },
  },
];

/**
 * @param {number} count
 * @param {number[]} units
 * @returns {GenMcqItem[]}
 */
function buildGeneratedMcqQuiz(count, units) {
  const unitSet = new Set(units);
  const fns = MCQ_GENERATOR_FNS.filter((g) => unitSet.has(g.unit));
  const bank =
    typeof window !== "undefined" && window.MCQ_BANK
      ? window.MCQ_BANK.filter((q) => unitSet.has(q.unit))
      : [];
  const quiz = [];
  const seenQ = new Set();

  if (!fns.length && !bank.length) return [];

  let guard = 0;
  const maxGuard = count * 80;

  while (quiz.length < count && guard < maxGuard) {
    guard++;
    let item = null;
    if (fns.length && (Math.random() < 0.85 || !bank.length)) {
      const gen = fns[Math.floor(Math.random() * fns.length)];
      try {
        item = gen.fn();
      } catch {
        item = null;
      }
    } else if (bank.length) {
      item = mcqPick(bank);
    }
    if (!item || seenQ.has(item.q)) continue;
    seenQ.add(item.q);
    quiz.push(item);
  }

  return mcqShuffle(quiz);
}

window.buildGeneratedMcqQuiz = buildGeneratedMcqQuiz;
window.MCQ_GENERATOR_FNS = MCQ_GENERATOR_FNS;
