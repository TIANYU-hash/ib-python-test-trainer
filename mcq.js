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

  // —— Extended bank (5 more per unit) · trace / application style ——
  { id: "u1-6", unit: 1, q: "def g(n):\n    k = 0\n    while n > 1:\n        n = n // 2\n        k += 1\n    return k\nBig O of g(n) is", choices: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1, explain: "Halving n each loop → logarithmic." },
  { id: "u1-7", unit: 1, q: "One pass through an unsorted list of size n to find the max is", choices: ["O(log n)", "O(n)", "O(n²)", "O(1)"], answer: 1, explain: "Single loop, one comparison per item." },
  { id: "u1-8", unit: 1, q: "Which problem size doubles the worst-case linear search steps?", choices: ["List length doubles", "List sorted", "Use binary search", "Add a print"], answer: 0, explain: "Linear work grows with n." },
  { id: "u1-9", unit: 1, q: "Algorithm A: 3n + 100 steps. Algorithm B: n². For large n, which dominates?", choices: ["A always", "B", "Same", "Depends on 100 only"], answer: 1, explain: "n² eventually exceeds any linear term." },
  { id: "u1-10", unit: 1, q: "Sorted list of 8 items — binary search worst-case comparisons about", choices: ["8", "4", "3", "1"], answer: 2, explain: "log₂(8) = 3 halvings." },

  { id: "u2-6", unit: 2, q: "print(2 ** 3 ** 2) outputs", choices: ["64", "512", "36", "81"], answer: 1, explain: "** right-associative: 3**2=9, then 2**9=512." },
  { id: "u2-7", unit: 2, q: "x = 0\nflag = x or len('ab')\nprint(flag)", choices: ["0", "2", "True", "ab"], answer: 1, explain: "0 falsy → or evaluates len('ab') → 2." },
  { id: "u2-8", unit: 2, q: "Which is falsy?", choices: ["[0]", "'0'", "0.0", "None"], answer: 3, explain: "None is falsy; [0] is truthy." },
  { id: "u2-9", unit: 2, q: "print(17 // 5, 17 % 5, 17 / 5)", choices: ["3 2 3.4", "3 2 3", "4 2 3.4", "3.4 2 3.4"], answer: 0, explain: "//, %, then float /." },
  { id: "u2-10", unit: 2, q: "age = input() then age + 1 without conversion usually", choices: ["Works", "TypeError", "ValueError", "SyntaxError"], answer: 1, explain: "str + int not allowed." },

  { id: "u3-6", unit: 3, q: "score = 85\nif score >= 90:\n    g = 'A'\nelif score >= 80:\n    g = 'B'\nelse:\n    g = 'F'\nprint(g)", choices: ["A", "B", "C", "F"], answer: 1, explain: "First false, elif 80+ true → B." },
  { id: "u3-7", unit: 3, q: "print(not (5 > 3 and 2 == 3))", choices: ["True", "False", "Error", "None"], answer: 0, explain: "5>3 true, 2==3 false → and false → not true." },
  { id: "u3-8", unit: 3, q: "x = 10\nif x > 5:\n    if x > 20:\n        y = 1\n    else:\n        y = 2\nprint(y)", choices: ["1", "2", "Error", "10"], answer: 1, explain: "Inner else: x not > 20 → y=2." },
  { id: "u3-9", unit: 3, q: "Best guard before int(user_text) when user may type letters", choices: ["Always int()", "try/except ValueError", "if user_text:", "print only"], answer: 1, explain: "Bad content → ValueError on int()." },
  { id: "u3-10", unit: 3, q: "print(3 == 3.0, 3 is 3.0)", choices: ["True True", "True False", "False True", "False False"], answer: 1, explain: "== true; is checks identity — different types." },

  { id: "u4-6", unit: 4, q: "n = 12\nwhile n > 0:\n    n = n - 5\nprint(n)", choices: ["2", "-3", "0", "12"], answer: 1, explain: "12→7→2→-3 then stop." },
  { id: "u4-7", unit: 4, q: "total = 0\nfor k in range(1, 4):\n    if k == 2:\n        continue\n    total += k\nprint(total)", choices: ["3", "4", "6", "1"], answer: 1, explain: "Skip k=2; 1+3=4." },
  { id: "u4-8", unit: 4, q: "for i in range(3):\n    for j in range(2):\n        pass\nHow many times does pass run?", choices: ["5", "6", "3", "2"], answer: 1, explain: "3×2 = 6." },
  { id: "u4-9", unit: 4, q: "i = 0\nwhile i < 3:\n    print(i)\n    i += 1\nLast value printed?", choices: ["3", "2", "0", "Infinite"], answer: 1, explain: "Prints 0,1,2." },
  { id: "u4-10", unit: 4, q: "break in a for loop", choices: ["Skips to next item", "Exits the loop", "Restarts loop", "Exits program"], answer: 1, explain: "break leaves the innermost loop." },

  { id: "u5-6", unit: 5, q: "def f(L):\n    L = L + [9]\n    return L\nx = [1]\ny = f(x)\nprint(x, y)", choices: ["[1,9] [1,9]", "[1] [1,9]", "[1] [1]", "[9] [1,9]"], answer: 1, explain: "L+[] rebinds local L; x unchanged." },
  { id: "u5-7", unit: 5, q: "def twice(n):\n    print(n*2)\n    return n+1\nx = twice(4)\nprint(x)", choices: ["8", "5", "None", "4"], answer: 1, explain: "Print 8; return 5; x is 5." },
  { id: "u5-8", unit: 5, q: "def f():\n    return\n    return 3\nprint(f())", choices: ["3", "None", "0", "Error"], answer: 1, explain: "Bare return → None." },
  { id: "u5-9", unit: 5, q: "Global count=0\ndef bump():\n    count = count + 1\nCalling bump() without nonlocal/global", choices: ["Works", "UnboundLocalError", "SyntaxError", "Returns None only"], answer: 1, explain: "Assignment makes count local." },
  { id: "u5-10", unit: 5, q: "def area(w, h):\n    return w * h\nprint(area(3, 4) + area(1, 2))", choices: ["14", "12", "7", "Error"], answer: 0, explain: "12 + 2 = 14." },

  { id: "u6-6", unit: 6, q: "s = 'eLEPHANT'\nprint(s.capitalize(), len(s.title()))", choices: ["Elephant 8", "ELEPHANT 8", "Elephant 7", "elephant 8"], answer: 0, explain: "capitalize + title length 8." },
  { id: "u6-7", unit: 6, q: "word = 'hello'\nword = word[0].upper() + word[1:]\nprint(word)", choices: ["HELLO", "Hello", "hello", "H"], answer: 1, explain: "H + ello." },
  { id: "u6-8", unit: 6, q: "phrase = 'cat nap'\nprint('cat' in phrase, phrase.find('cat'))", choices: ["True 0", "True -1", "False 0", "True 1"], answer: 0, explain: "Substring at index 0." },
  { id: "u6-9", unit: 6, q: "print('ab' * 3, len(''))", choices: ["ababab 0", "ab3 0", "ababab 1", "Error"], answer: 0, explain: "Repeat string; empty len 0." },
  { id: "u6-10", unit: 6, q: "t = 'Hi'\nt.lower()\nprint(t)", choices: ["hi", "Hi", "HI", "Error"], answer: 1, explain: "lower returns new string; t unchanged." },

  { id: "u7-6", unit: 7, q: "nums = [3,1,2]\nt = nums.sort()\nprint(t, nums[0])", choices: ["None 1", "[1,2,3] 1", "None 3", "[1,2,3] 3"], answer: 0, explain: "sort in place; returns None." },
  { id: "u7-7", unit: 7, q: "a = [10,20,30]\nb = a.pop(1)\nprint(b, a)", choices: ["20 [10,30]", "30 [10,20]", "1 [10,30]", "20 [20,30]"], answer: 0, explain: "pop index 1 removes 20." },
  { id: "u7-8", unit: 7, q: "bag = [1,2]\nbag.append([3])\nprint(len(bag), bag[-1])", choices: ["3 3", "3 [3]", "2 [3]", "4 [3]"], answer: 1, explain: "One appended element: the list [3]." },
  { id: "u7-9", unit: 7, q: "a = [1,2]\nb = a\nb.append(3)\nprint(a)", choices: ["[1,2]", "[1,2,3]", "[3]", "Error"], answer: 1, explain: "Same list mutated." },
  { id: "u7-10", unit: 7, q: "type((5,)) and type((5))", choices: ["tuple int", "tuple tuple", "int tuple", "list int"], answer: 0, explain: "(5,) tuple; (5) is int." },

  { id: "u8-6", unit: 8, q: "d = {'a': 1, 'b': 2}\nprint(d.get('c', 0), d.get('a'))", choices: ["0 1", "KeyError 1", "0 None", "None 1"], answer: 0, explain: "Missing key uses default 0." },
  { id: "u8-7", unit: 8, q: "grid = [[0]*3 for _ in range(3)]\ngrid[0][0] = 9\nprint(grid[1][0], grid[0][0])", choices: ["9 9", "0 9", "0 0", "9 0"], answer: 1, explain: "Independent rows — only top-left 9." },
  { id: "u8-8", unit: 8, q: "cards = [{'v': 2}, {'v': 5}]\nprint(cards[1]['v'] + cards[0]['v'])", choices: ["7", "25", "52", "Error"], answer: 0, explain: "5+2=7." },
  { id: "u8-9", unit: 8, q: "m = {}\nm['x'] = [1,2]\nm['x'].append(3)\nprint(m['x'])", choices: ["[1,2,3]", "[3]", "Error", "[1,2]"], answer: 0, explain: "Mutate list value in dict." },
  { id: "u8-10", unit: 8, q: "team = ['Bo','Mo']\nteam.pop('Mo')", choices: ["['Bo']", "Error", "['Mo']", "Removes by name"], answer: 1, explain: "pop needs index not name." },

  { id: "u9-6", unit: 9, q: "a = [3,5,8] unsorted. Standard binary search without sorting first is", choices: ["Always OK", "Not correct in general", "OK if target at mid", "OK if len odd"], answer: 1, explain: "Need sorted order to discard halves safely." },
  { id: "u9-7", unit: 9, q: "a = [4,9,11,15,22]; low=0, high=4; mid=2 (11); target 15. Next low, high?", choices: ["3,4", "2,4", "3,3", "1,4"], answer: 0, explain: "15>11 → low=mid+1=3, high=4." },
  { id: "u9-8", unit: 9, q: "One bubble pass on [4,1,3] left→right adjacent swaps. Result?", choices: ["[1,3,4]", "[1,4,3]", "[4,1,3]", "[3,1,4]"], answer: 0, explain: "4↔1, then 4↔3." },
  { id: "u9-9", unit: 9, q: "n=5; inner bubble j in range(0, n-i-1). When i=2, how many j values?", choices: ["2", "3", "4", "5"], answer: 0, explain: "range(0,2) → 0,1." },
  { id: "u9-10", unit: 9, q: "find_pos scans until a[i] >= t on [3,5,8], t=6. Returns", choices: ["1", "2", "-1", "0"], answer: 1, explain: "Index 2 first with 8>=6." },
];

/** Full mock length (pick this many unique questions from the filtered pool). */
const MCQ_FULL_MOCK_SIZE = 45;

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
      count: Math.min(MCQ_FULL_MOCK_SIZE, Math.max(5, raw.count ?? MCQ_FULL_MOCK_SIZE)),
      units: Array.isArray(raw.units) ? raw.units : MCQ_FILTER_UNITS.map((u) => u.n),
    };
  } catch {
    return { count: MCQ_FULL_MOCK_SIZE, units: MCQ_FILTER_UNITS.map((u) => u.n) };
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

  maxQuizCount(units) {
    const n = this.getFilteredPool(units).length;
    return Math.max(5, n);
  },

  buildQuiz(count, units) {
    const pool = shuffleArray(this.getFilteredPool(units));
    if (pool.length === 0) return [];
    const want = Math.max(5, Math.min(count, MCQ_FULL_MOCK_SIZE));
    if (want <= pool.length) {
      return pool.slice(0, want);
    }
    const out = pool.slice();
    while (out.length < want) {
      out.push(...shuffleArray(pool));
    }
    return out.slice(0, want);
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
        <p class="mcq-lead">Bank of <strong>${bankTotal}</strong> questions (10 per unit). Each <strong>Generate</strong> shuffles and picks a fresh set — full mock = <strong>${MCQ_FULL_MOCK_SIZE}</strong> unique from the pool.</p>

        <div class="mcq-options">
          <label class="mcq-field">
            <span>Number of questions</span>
            <input type="number" id="mcqCount" min="5" max="${Math.min(MCQ_FULL_MOCK_SIZE, poolSize)}" value="${Math.min(prefs.count, poolSize, MCQ_FULL_MOCK_SIZE)}" />
          </label>
          <p class="mcq-hint" id="mcqPoolHint">Available from selected units: <strong>${poolSize}</strong> (we shuffle; if you ask for more than available, some may repeat).</p>
        </div>

        <fieldset class="mcq-units">
          <legend>Include units</legend>
          ${unitChecks}
        </fieldset>

        <div class="actions">
          <button type="button" class="primary" id="mcqStartBtn">Generate quiz</button>
          <button type="button" class="ghost" id="mcqQuick30">Quick: new random ${MCQ_FULL_MOCK_SIZE}-question mock</button>
        </div>
      </div>`;

    const updateHint = () => {
      const units = this.readUnitsFromDom();
      const avail = this.getFilteredPool(units).length;
      const maxQ = Math.min(MCQ_FULL_MOCK_SIZE, Math.max(5, avail));
      const countEl = document.getElementById("mcqCount");
      if (countEl) {
        countEl.max = String(maxQ);
        const cur = parseInt(countEl.value || "45", 10);
        if (cur > maxQ) countEl.value = String(maxQ);
      }
      const count = parseInt(countEl?.value || "45", 10);
      const hint = document.getElementById("mcqPoolHint");
      if (hint) {
        const uniqueNote =
          avail >= count
            ? `Each generate picks <strong>${count}</strong> different questions from ${avail}.`
            : `Only ${avail} unique — extras may repeat.`;
        hint.innerHTML = `Pool: <strong>${avail}</strong>. ${uniqueNote}`;
      }
    };

    this.root.querySelectorAll('input[type="checkbox"][data-unit]').forEach((cb) => {
      cb.addEventListener("change", updateHint);
    });
    document.getElementById("mcqCount")?.addEventListener("input", updateHint);

    updateHint();

    document.getElementById("mcqStartBtn")?.addEventListener("click", () => this.startFromSetup());
    document.getElementById("mcqQuick30")?.addEventListener("click", () => {
      this.root.querySelectorAll('input[type="checkbox"][data-unit]').forEach((cb) => {
        cb.checked = true;
      });
      const countEl = document.getElementById("mcqCount");
      if (countEl) countEl.value = String(MCQ_FULL_MOCK_SIZE);
      this.startFromSetup();
    });
  },

  /** New random set without leaving results (same prefs). */
  regenerateQuiz() {
    const prefs = loadMcqPrefs();
    this.quiz = this.buildQuiz(prefs.count, prefs.units);
    if (!this.quiz.length) return;
    this.answers = this.quiz.map(() => null);
    this.index = 0;
    this.phase = "quiz";
    this.renderQuestion();
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
    const avail = this.getFilteredPool(units).length;
    const maxQ = Math.min(MCQ_FULL_MOCK_SIZE, Math.max(5, avail));
    const safeCount = Math.min(maxQ, Math.max(5, count));
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

    document.getElementById("mcqRetry")?.addEventListener("click", () => this.regenerateQuiz());
    document.getElementById("mcqBackSetup")?.addEventListener("click", () => this.renderSetup());
  },
};

window.MCQ_BANK = MCQ_BANK;
window.Mcq = Mcq;
