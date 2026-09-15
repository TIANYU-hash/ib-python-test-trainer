/** @typedef {{ kind: 'stdout', expected: string, setup?: string }} StdoutTest */
/** @typedef {{ kind: 'assert', code: string, message?: string }} AssertTest */
/** @typedef {{ id: string, unit: number, unitName: string, title: string, html: string, starter: string, tests: (StdoutTest|AssertTest)[] }} Lesson */

/** @type {Lesson[]} */
const LESSONS = [
  {
    id: "u3-int-float",
    unit: 3,
    unitName: "Unit 3 · Console & types",
    title: "Division, // and %",
    html: `<p>Write a short program that prints <strong>three lines</strong> (use three <code>print</code> calls):</p>
<ol>
<li>Result of <code>7 / 2</code></li>
<li>Result of <code>7 // 2</code></li>
<li>Result of <code>7 % 2</code></li>
</ol>
<p>Each value on its own line, no extra text.</p>`,
    starter: `# Print three lines: 7/2, 7//2, 7%2\n`,
    tests: [{ kind: "stdout", expected: "3.5\n3\n1\n" }],
  },
  {
    id: "u3-input-mock",
    unit: 3,
    unitName: "Unit 3 · Console & types",
    title: "Convert and add one",
    html: `<p>We simulate input: the checker runs your code with <code>age = "17"</code> already set (as a string).</p>
<p>Convert <code>age</code> to an integer, add 1, and print only that number on one line.</p>`,
    starter: `# age is already set to the string "17" before your code runs\n`,
    tests: [
      {
        kind: "stdout",
        setup: 'age = "17"\n',
        expected: "18\n",
      },
    ],
  },
  {
    id: "u5-grade",
    unit: 5,
    unitName: "Unit 5 · Conditionals",
    title: "Grade with elif chain",
    html: `<p>Define <code>grade(score)</code> that returns a letter:</p>
<ul>
<li>90+ → <code>"A"</code></li>
<li>80+ → <code>"B"</code></li>
<li>70+ → <code>"C"</code></li>
<li>else → <code>"F"</code></li>
</ul>
<p>Use <code>elif</code> in the right order. Return a string, do not print.</p>`,
    starter: "def grade(score):\n    # your code\n    pass\n",
    tests: [
      { kind: "assert", code: "assert grade(95) == 'A'" },
      { kind: "assert", code: "assert grade(80) == 'B'" },
      { kind: "assert", code: "assert grade(70) == 'C'" },
      { kind: "assert", code: "assert grade(69) == 'F'" },
      { kind: "assert", code: "assert grade(100) == 'A', '100 must be A, not C — check elif order'" },
    ],
  },
  {
    id: "u5-demorgan",
    unit: 5,
    unitName: "Unit 5 · Conditionals",
    title: "Teen check without and",
    html: `<p>Define <code>is_teen(age)</code> that returns <code>True</code> if age is from 13 to 19 inclusive.</p>
<p><strong>Rule:</strong> do not use <code>and</code> or <code>or</code> in your function — use one chained comparison instead (e.g. <code>13 &lt;= age &lt;= 19</code>).</p>`,
    starter: "def is_teen(age):\n    pass\n",
    tests: [
      { kind: "assert", code: "assert is_teen(13) is True" },
      { kind: "assert", code: "assert is_teen(19) is True" },
      { kind: "assert", code: "assert is_teen(20) is False" },
      { kind: "assert", code: "assert is_teen(12) is False" },
    ],
  },
  {
    id: "u7-range",
    unit: 7,
    unitName: "Unit 7 · Loops",
    title: "Sum with range",
    html: `<p>Print the sum of integers from 1 through 10 inclusive (one number on one line).</p>
<p>Use a <code>for</code> loop and <code>range</code>. Expected answer: <code>55</code>.</p>`,
    starter: "total = 0\n# use for and range\n",
    tests: [{ kind: "stdout", expected: "55\n" }],
  },
  {
    id: "u7-break",
    unit: 7,
    unitName: "Unit 7 · Loops",
    title: "First multiple of 7",
    html: `<p>Print the <strong>first</strong> number from 1 to 100 that is divisible by 7 (just that number, one line).</p>
<p>Use a loop and <code>break</code> when you find it. Answer should be <code>7</code>.</p>`,
    starter: "# print first number 1..100 divisible by 7\n",
    tests: [{ kind: "stdout", expected: "7\n" }],
  },
  {
    id: "u7-nested-count",
    unit: 7,
    unitName: "Unit 7 · Loops",
    title: "Nested loop counter",
    html: `<p>Define <code>inner_runs(outer, inner)</code> that returns how many times the inner loop body would run for:</p>
<pre>for i in range(outer):
    for j in range(inner):
        count += 1</pre>
<p>Do not print — return the count. Example: <code>inner_runs(3, 4)</code> → <code>12</code>.</p>`,
    starter: "def inner_runs(outer, inner):\n    pass\n",
    tests: [
      { kind: "assert", code: "assert inner_runs(3, 4) == 12" },
      { kind: "assert", code: "assert inner_runs(5, 2) == 10" },
      { kind: "assert", code: "assert inner_runs(0, 5) == 0" },
    ],
  },
  {
    id: "u9-area",
    unit: 9,
    unitName: "Unit 9 · Functions",
    title: "Return, not print",
    html: `<p>Define <code>area(width, height)</code> that <strong>returns</strong> width × height.</p>
<p>Do not print inside the function.</p>`,
    starter: "def area(width, height):\n    pass\n",
    tests: [
      { kind: "assert", code: "assert area(4, 5) == 20" },
      { kind: "assert", code: "assert area(0, 10) == 0" },
    ],
  },
  {
    id: "u9-scope",
    unit: 9,
    unitName: "Unit 9 · Functions",
    title: "Local total",
    html: `<p>Define <code>add_bonus(base)</code> that creates a <strong>local</strong> variable <code>bonus = 5</code> and returns <code>base + bonus</code>.</p>`,
    starter: "def add_bonus(base):\n    pass\n",
    tests: [
      { kind: "assert", code: "assert add_bonus(10) == 15" },
      { kind: "assert", code: "assert add_bonus(0) == 5" },
    ],
  },
  {
    id: "u9-parse-age",
    unit: 9,
    unitName: "Unit 9 · Functions",
    title: "Safe int parse",
    html: `<p>Define <code>parse_age(text)</code>:</p>
<ul>
<li>If <code>text</code> can be converted to an integer, return that int.</li>
<li>Otherwise return <code>None</code> (do not crash).</li>
</ul>
<p>Use try / except.</p>`,
    starter: "def parse_age(text):\n    pass\n",
    tests: [
      { kind: "assert", code: "assert parse_age('17') == 17" },
      { kind: "assert", code: "assert parse_age('cat') is None" },
      { kind: "assert", code: "assert parse_age('0') == 0" },
    ],
  },
  {
    id: "u10-slice",
    unit: 10,
    unitName: "Unit 10 · Strings",
    title: "Slice the middle",
    html: `<p>Given <code>word = "PYTHON"</code> (already set), print the substring <code>YTH</code> using slicing only — one line of output.</p>`,
    starter: '# word = "PYTHON" is set for you\n',
    tests: [
      { kind: "stdout", setup: 'word = "PYTHON"\n', expected: "YTH\n" },
    ],
  },
  {
    id: "u10-strip-vowels",
    unit: 10,
    unitName: "Unit 10 · Strings",
    title: "Remove vowels",
    html: `<p>Define <code>no_vowels(s)</code> that returns a new string with every <code>a,e,i,o,u</code> (lower or upper) removed.</p>
<p>Example: <code>"banana"</code> → <code>"bnn"</code>.</p>`,
    starter: "def no_vowels(s):\n    pass\n",
    tests: [
      { kind: "assert", code: 'assert no_vowels("banana") == "bnn"' },
      { kind: "assert", code: 'assert no_vowels("Owls") == "wls"' },
      { kind: "assert", code: 'assert no_vowels("") == ""' },
    ],
  },
  {
    id: "u10-split",
    unit: 10,
    unitName: "Unit 10 · Strings",
    title: "Split words",
    html: `<p>Given <code>sentence</code> (set for you), split it into words and print the word at index <code>0</code> on one line.</p>`,
    starter: "# sentence is set below in the checker\n",
    tests: [
      {
        kind: "stdout",
        setup: 'sentence = "Owls are so cool!"\n',
        expected: "Owls\n",
      },
    ],
  },
  {
    id: "u12-list-ops",
    unit: 12,
    unitName: "Unit 12 · Lists",
    title: "Append and sum",
    html: `<p>Start with <code>nums = [1, 2, 3]</code> (already set). Append <code>4</code>, then print the sum of all items (one number).</p>`,
    starter: "# nums = [1, 2, 3] is set for you\n",
    tests: [
      { kind: "stdout", setup: "nums = [1, 2, 3]\n", expected: "10\n" },
    ],
  },
  {
    id: "u12-find-max",
    unit: 12,
    unitName: "Unit 12 · Lists",
    title: "Maximum in a list",
    html: `<p>Define <code>biggest(values)</code> that returns the largest number in a non-empty list. Do not use <code>max()</code>.</p>`,
    starter: "def biggest(values):\n    pass\n",
    tests: [
      { kind: "assert", code: "assert biggest([88, 94, 71, 100]) == 100" },
      { kind: "assert", code: "assert biggest([5]) == 5" },
      { kind: "assert", code: "assert biggest([-3, -1, -9]) == -1" },
    ],
  },
  {
    id: "u12-tuple",
    unit: 12,
    unitName: "Unit 12 · Lists",
    title: "Unpack coordinates",
    html: `<p>Given <code>point = (3, 7)</code>, unpack into <code>x</code> and <code>y</code> and print <code>x + y</code> on one line.</p>`,
    starter: "# point = (3, 7) is set for you\n",
    tests: [
      { kind: "stdout", setup: "point = (3, 7)\n", expected: "10\n" },
    ],
  },
  {
    id: "u13-cell",
    unit: 13,
    unitName: "Unit 13 · 2D lists",
    title: "Read a cell",
    html: `<p><code>grid</code> is a 3×3 grid (set for you). Print the value at <strong>row 1, column 2</strong> (one number).</p>
<p>Remember: <code>grid[row][col]</code>.</p>`,
    starter: "# grid is set for you\n",
    tests: [
      {
        kind: "stdout",
        setup: "grid = [[1,2,3],[4,5,6],[7,8,9]]\n",
        expected: "6\n",
      },
    ],
  },
  {
    id: "u13-sum-grid",
    unit: 13,
    unitName: "Unit 13 · 2D lists",
    title: "Sum all cells",
    html: `<p>Define <code>sum_grid(grid)</code> that returns the total of every number in a 2D list. Use nested loops.</p>`,
    starter: "def sum_grid(grid):\n    pass\n",
    tests: [
      { kind: "assert", code: "assert sum_grid([[1,2],[3,4]]) == 10" },
      {
        kind: "assert",
        code: "assert sum_grid([[1,2,3],[4,5,6],[7,8,9]]) == 45",
      },
    ],
  },
  {
    id: "u13-build-row",
    unit: 13,
    unitName: "Unit 13 · 2D lists",
    title: "Build one row",
    html: `<p>Define <code>make_row(cols, fill)</code> that returns a list of length <code>cols</code> where every item is <code>fill</code>.</p>
<p>Example: <code>make_row(4, 0)</code> → <code>[0, 0, 0, 0]</code>.</p>`,
    starter: "def make_row(cols, fill):\n    pass\n",
    tests: [
      { kind: "assert", code: "assert make_row(4, 0) == [0, 0, 0, 0]" },
      { kind: "assert", code: "assert make_row(1, 9) == [9]" },
      { kind: "assert", code: "assert make_row(0, 1) == []" },
    ],
  },

  // ── Constructs lab (ideas from class / chat practice) ──
  {
    id: "c-pairs",
    unit: 90,
    unitName: "Constructs · Pairs & loops",
    title: "All unordered pairs",
    html: `<p>Define <code>count_pairs(items)</code> that returns every <strong>unordered</strong> pair of distinct items, each exactly once.</p>
<p>Example: <code>['a','b','c']</code> → <code>[('a','b'), ('a','c'), ('b','c')]</code> (in that order).</p>
<p>Use nested loops with <code>j = i + 1</code>. Add a comment: time complexity O(n²) and why.</p>`,
    starter: "def count_pairs(items):\n    pairs = []\n    # nested loops\n    return pairs\n",
    tests: [
      {
        kind: "assert",
        code: "assert count_pairs(['a','b','c']) == [('a','b'), ('a','c'), ('b','c')]",
      },
      { kind: "assert", code: "assert count_pairs([]) == []" },
      { kind: "assert", code: "assert count_pairs(['x']) == []" },
      { kind: "assert", code: "assert len(count_pairs([1,2,3,4])) == 6" },
    ],
  },
  {
    id: "c-dup-fast",
    unit: 90,
    unitName: "Constructs · Pairs & loops",
    title: "Duplicate with a set (O(n))",
    html: `<p>Define <code>has_duplicate_fast(items)</code> that returns <code>True</code> if any value appears twice in the list, else <code>False</code>.</p>
<p>One pass. Use a <code>set</code> to remember what you have seen. Use <code>for item in items:</code>.</p>
<p>Do <strong>not</strong> use nested loops.</p>`,
    starter: "def has_duplicate_fast(items):\n    seen = set()\n    # for item in items:\n    return False\n",
    tests: [
      { kind: "assert", code: "assert has_duplicate_fast([3,1,4,1]) is True" },
      { kind: "assert", code: "assert has_duplicate_fast([1,2,3]) is False" },
      { kind: "assert", code: "assert has_duplicate_fast([1,2,1]) is True" },
      { kind: "assert", code: "assert has_duplicate_fast([]) is False" },
    ],
  },
  {
    id: "c-adjacent",
    unit: 90,
    unitName: "Constructs · Pairs & loops",
    title: "Adjacent duplicates only",
    html: `<p>Define <code>has_adjacent_duplicate(items)</code> that returns <code>True</code> only when two <strong>neighbours</strong> are equal (<code>items[i] == items[i+1]</code>).</p>
<p>One loop. This is O(n) but is <em>not</em> the same as full duplicate detection.</p>
<p>Example: <code>[1,2,1]</code> → <code>False</code>; <code>[1,1,2]</code> → <code>True</code>.</p>`,
    starter: "def has_adjacent_duplicate(items):\n    pass\n",
    tests: [
      { kind: "assert", code: "assert has_adjacent_duplicate([1,1,2]) is True" },
      { kind: "assert", code: "assert has_adjacent_duplicate([1,2,1]) is False" },
      { kind: "assert", code: "assert has_adjacent_duplicate([5]) is False" },
    ],
  },
  {
    id: "c-halving",
    unit: 90,
    unitName: "Constructs · Pairs & loops",
    title: "Count halvings (Big O idea)",
    html: `<p>Define <code>worst_binary(n)</code> that returns how many times you can do <code>n = n // 2</code> until <code>n</code> becomes 0, counting each step (including the step that reaches 0).</p>
<p>Start with <code>n</code> a positive integer. Example: <code>worst_binary(1000)</code> → <code>10</code>.</p>`,
    starter: "def worst_binary(n):\n    looks = 0\n    while n > 0:\n        pass\n    return looks\n",
    tests: [
      { kind: "assert", code: "assert worst_binary(1000) == 10" },
      { kind: "assert", code: "assert worst_binary(1) == 1" },
      { kind: "assert", code: "assert worst_binary(8) == 4" },
    ],
  },
  {
    id: "c-vowel-list",
    unit: 90,
    unitName: "Constructs · Pairs & loops",
    title: "for item in a list",
    html: `<p>Define <code>count_vowels_in_words(words)</code> where <code>words</code> is a list of strings.</p>
<p>Return the total number of vowels (a,e,i,o,u — upper or lower) in <strong>all</strong> words combined. Use <code>for word in words:</code> and loop over characters.</p>`,
    starter: "def count_vowels_in_words(words):\n    total = 0\n    return total\n",
    tests: [
      { kind: "assert", code: 'assert count_vowels_in_words(["Owls", "are"]) == 3' },
      { kind: "assert", code: "assert count_vowels_in_words([]) == 0" },
      { kind: "assert", code: 'assert count_vowels_in_words(["xyz"]) == 0' },
    ],
  },

  {
    id: "c-find-number",
    unit: 91,
    unitName: "Constructs · Search",
    title: "Phone book lookup",
    html: `<p>Define <code>find_number(book, name)</code>. Each entry is a tuple <code>(name, number)</code>. Return the number string for <code>name</code>, or <code>None</code> if not found.</p>
<p>Compare <code>book[i][0]</code> to <code>name</code> — not <code>name in book[i]</code>.</p>`,
    starter: "def find_number(book, name):\n    pass\n",
    tests: [
      {
        kind: "assert",
        code: 'assert find_number([("Ada","555-0101"),("Cy","555-0118")], "Cy") == "555-0118"',
      },
      {
        kind: "assert",
        code: 'assert find_number([("Ada","555-0101")], "Zed") is None',
      },
    ],
  },
  {
    id: "c-linear-idx",
    unit: 91,
    unitName: "Constructs · Search",
    title: "Linear search index",
    html: `<p>Define <code>linear_search(items, target)</code> that returns the <strong>index</strong> of <code>target</code>, or <code>-1</code> if missing.</p>
<p>Return an int — do not return <code>False</code>.</p>`,
    starter: "def linear_search(items, target):\n    pass\n",
    tests: [
      { kind: "assert", code: "assert linear_search([10,20,30], 20) == 1" },
      { kind: "assert", code: "assert linear_search([10,20,30], 99) == -1" },
      {
        kind: "assert",
        code: "assert linear_search(['a','b'], 'a') == 0",
        message: "Index 0 is valid — do not use False for not found",
      },
    ],
  },
  {
    id: "c-linear-value",
    unit: 91,
    unitName: "Constructs · Search",
    title: "Linear search — return value",
    html: `<p>Define <code>find_number_list(nums, target)</code> that returns <code>target</code> if it is in the list, else <code>None</code> (data retrieval, not index).</p>`,
    starter: "def find_number_list(nums, target):\n    pass\n",
    tests: [
      { kind: "assert", code: "assert find_number_list([3,1,4], 4) == 4" },
      { kind: "assert", code: "assert find_number_list([3,1,4], 2) is None" },
    ],
  },
  {
    id: "c-sorted-early",
    unit: 91,
    unitName: "Constructs · Search",
    title: "Sorted linear — stop early",
    html: `<p>List <code>items</code> is sorted ascending. Define <code>linear_search_sorted(items, target)</code> that returns <code>(index, comparisons)</code>.</p>
<ul>
<li>If found → index where it sits, and number of comparisons.</li>
<li>If not found → <code>(-1, comparisons)</code>.</li>
<li>If you pass the target (current item &gt; target), stop early.</li>
</ul>
<p>Test: <code>sorted_nums = [0,1,2,3,4,5,6,7,8,9]</code>, target <code>4.5</code> → <code>(-1, 6)</code>.</p>`,
    starter: "def linear_search_sorted(items, target):\n    comparisons = 0\n    return (-1, comparisons)\n",
    tests: [
      {
        kind: "assert",
        code: "assert linear_search_sorted([0,1,2,3,4,5,6,7,8,9], 4.5) == (-1, 6)",
      },
      {
        kind: "assert",
        code: "assert linear_search_sorted([0,1,2,3,4,5,6,7,8,9], 4) == (4, 5)",
      },
    ],
  },
];

const UNITS = [
  { n: 3, label: "Unit 3" },
  { n: 5, label: "Unit 5" },
  { n: 7, label: "Unit 7" },
  { n: 9, label: "Unit 9" },
  { n: 10, label: "Unit 10" },
  { n: 12, label: "Unit 12" },
  { n: 13, label: "Unit 13" },
  { n: 90, label: "Constructs · pairs & Big O" },
  { n: 91, label: "Constructs · search" },
];

window.LESSONS = LESSONS;
window.UNITS = UNITS;
