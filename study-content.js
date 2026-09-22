/** @type {{ id: string, title: string, html: string }[]} */
const STUDY_GUIDE = [
  {
    id: "study-01",
    title: "1 · Values & operators",
    html: `<p>This part is about reading numeric expressions the way Python 3 actually evaluates them. On tests, wrong answers are often one character off: a missing <code>.0</code>, using <code>//</code> instead of <code>/</code>, or confusing what gets <strong>printed</strong> with what gets <strong>returned</strong> from a function.</p>
<h3>What each operator does</h3>
<p>When you see several operators in one expression, Python follows precedence rules (parentheses first, then <code>**</code>, then <code>*</code>/<code>/</code>/<code>//</code>/<code>%</code>, then <code>+</code>/<code>-</code>). For trace questions, it is usually enough to evaluate each argument to <code>print</code> separately, left to right.</p>
<table class="study-table"><thead><tr><th>Operator</th><th>Meaning in Python 3</th><th>Example</th></tr></thead>
<tbody>
<tr><td><code>/</code></td><td>True division — result is always a <strong>float</strong>, even when it divides evenly.</td><td><code>48 / 2</code> → <code>24.0</code></td></tr>
<tr><td><code>//</code></td><td>Floor division — “how many whole times” (drops the fractional part toward negative infinity).</td><td><code>17 // 5</code> → <code>3</code></td></tr>
<tr><td><code>%</code></td><td>Remainder after division.</td><td><code>17 % 5</code> → <code>2</code></td></tr>
<tr><td><code>**</code></td><td>Exponent — groups <strong>right to left</strong>.</td><td><code>2**3**2</code> means <code>2**(3**2)</code> = <code>2**9</code> = <code>512</code></td></tr>
</tbody></table>
<h3>Worked trace: print with % and /</h3>
<pre class="mcq-code">print(48 % 2, 48 / 2)</pre>
<p><code>print</code> can take several values separated by commas. Python evaluates each value fully before printing, separated by a single space.</p>
<table class="study-table"><thead><tr><th>Step</th><th>What you evaluate</th><th>Result</th></tr></thead>
<tbody>
<tr><td>1</td><td>First argument: <code>48 % 2</code></td><td><code>0</code> (remainder is an int here)</td></tr>
<tr><td>2</td><td>Second argument: <code>48 / 2</code></td><td><code>24.0</code> (float division)</td></tr>
<tr><td>3</td><td><code>print</code> displays both</td><td><strong>0 24.0</strong> on one line</td></tr>
</tbody></table>
<h3>Second example: all three division types</h3>
<pre class="mcq-code">print(17 // 5, 17 % 5, 17 / 5)</pre>
<p>Output: <strong>3 2 3.4</strong>. Notice the last value is float division, not “3”.</p>
<div class="study-trap"><strong>Trap — “clean” division still float:</strong> Students see <code>10 / 5</code> and pick <code>2</code>. In Python 3 the answer is <code>2.0</code>. This shows up constantly in MCQs.</div>
<div class="study-trap"><strong>Trap — mixing operators on one line:</strong> Do not rush. Evaluate <code>%</code>, <code>//</code>, and <code>/</code> as separate mini-problems, then combine for <code>print</code>.</div>
<div class="study-trick"><strong>Trick — MCQ scanning order:</strong> For <code>print(a % b, a // b, a / b)</code>, jot down three slots: remainder, floor, float. Fill them before looking at choices.</div>
<h3>input(), types, and common errors</h3>
<p><code>input()</code> always gives you a <strong>string</strong>, even if the user types digits. You must convert before arithmetic:</p>
<pre class="mcq-code">age = input()   # user typed 17 → age is "17"
age + 1         # TypeError: str + int</pre>
<p><code>int("7")</code> works; <code>int("3.9")</code> fails because the string is not an integer literal. <code>float("cat")</code> also fails. Those are <strong>ValueError</strong> (bad content for the conversion).</p>
<p><code>"7" + 3</code> is a <strong>TypeError</strong>: wrong types for <code>+</code>, not a bad string for conversion.</p>
<div class="study-trick"><strong>Trick — error vocabulary:</strong> TypeError = operation doesn’t make sense for these types. ValueError = conversion/reasonableness failed.</div>
<h3>print vs return (shows up everywhere later)</h3>
<p><code>print(x)</code> sends text to the console. It does not give a usable result to the rest of your program. A function with no <code>return</code> hands back <code>None</code> even if it printed something useful. Always read the question: “what is printed?” vs “what does the call return?”</p>`,
  },
  {
    id: "study-02",
    title: "2 · Booleans & and/or/not",
    html: `<p>Booleans drive <code>if</code> statements and many MCQ traces. You need two skills: knowing what counts as true/false, and knowing when Python <strong>skips</strong> part of an expression (short-circuit).</p>
<h3>Truthy and falsy values</h3>
<p>Python treats values in conditions as either “true enough” or “false enough”:</p>
<ul>
<li><strong>Falsy:</strong> <code>0</code>, <code>0.0</code>, empty string <code>""</code>, empty list <code>[]</code>, empty dict <code>{}</code>, <code>None</code>, <code>False</code>.</li>
<li><strong>Truthy:</strong> most other things — including <code>[0]</code> (list with one zero), <code>"False"</code> (non-empty string), negative numbers.</li>
</ul>
<div class="study-trap"><strong>Trap:</strong> <code>[0]</code> is truthy because the list is not empty. Only the number <code>0</code> inside would be falsy if you tested the element.</div>
<h3>not, and, or — order matters</h3>
<p>Without parentheses, Python applies <code>not</code> first, then <code>and</code>, then <code>or</code>. Parentheses override that — always work inside parentheses first.</p>
<h3>Short-circuit (read slowly — this is not one memorized sentence)</h3>
<p>Python evaluates <code>and</code> / <code>or</code> <strong>left to right</strong>. It may <strong>stop early</strong> because the answer is already decided. That is separate from whether the final result is “True/False” — <code>and</code>/<code>or</code> often return the <strong>actual values</strong> involved.</p>
<table class="study-table"><thead><tr><th>Operator</th><th>When does Python stop early?</th><th>Does the right side run?</th></tr></thead>
<tbody>
<tr><td><code>and</code></td><td>Left is <strong>falsy</strong> → whole thing is false</td><td><strong>No</strong> — right side skipped</td></tr>
<tr><td><code>and</code></td><td>Left is truthy → still need to check right</td><td><strong>Yes</strong></td></tr>
<tr><td><code>or</code></td><td>Left is <strong>truthy</strong> → whole thing is true enough</td><td><strong>No</strong> — right side skipped</td></tr>
<tr><td><code>or</code></td><td>Left is falsy → must try right side</td><td><strong>Yes</strong></td></tr>
</tbody></table>
<p>So for <code>0 or len("ab")</code>: left is falsy, so Python <strong>must</strong> run <code>len("ab")</code>. For <code>5 or print("hi")</code>: left is truthy, so <code>print</code> never runs.</p>
<p><strong>What value comes out?</strong> (not always True/False)</p>
<pre class="mcq-code">print(0 and 5)   # 0  — first falsy wins for and
print(3 and 5)   # 5  — both checked, last value
print(0 or 5)    # 5
print(3 or 5)    # 3  — first truthy wins for or</pre>
<h3>Worked trace: not + and</h3>
<pre class="mcq-code">print(not (7 &gt; 9 and 7 == 10))</pre>
<table class="study-table"><thead><tr><th>Step</th><th>Reasoning</th></tr></thead>
<tbody>
<tr><td>1</td><td><code>7 &gt; 9</code> is <code>False</code>.</td></tr>
<tr><td>2</td><td><code>False and …</code> short-circuits → whole <code>and</code> is <code>False</code> without checking <code>7 == 10</code>.</td></tr>
<tr><td>3</td><td><code>not False</code> → <strong>True</strong>.</td></tr>
</tbody></table>
<pre class="mcq-code">print(not (3 &gt; 3 and 3 == 4))   # True — same idea</pre>
<h3>Worked trace: or with len</h3>
<pre class="mcq-code">x = 0
flag = x or len("ab")
print(flag)</pre>
<p><code>0</code> is falsy, so Python evaluates <code>len("ab")</code>, which is <code>2</code>. Output: <strong>2</strong>.</p>
<div class="study-trap"><strong>Trap:</strong> Mixing up <code>and</code> vs <code>or</code> skip direction is the #1 logic mistake. Use the table above — do not compress it into “falsy skips” without naming which operator.</div>
<div class="study-trap"><strong>Trap — if x == 3 or 5:</strong> Parsed as <code>(x == 3) or (5)</code>. Since <code>5</code> is truthy, the condition is almost always true. Write <code>x == 3 or x == 5</code>.</div>
<div class="study-trick"><strong>Trick:</strong> When tracing, underline the first part of each <code>and</code>/<code>or</code>. Decide true/false before touching the second part.</div>`,
  },
  {
    id: "study-03",
    title: "3 · if / elif / else",
    html: `<p>Conditional chains choose <strong>at most one</strong> block. Think of it like a ladder: you climb until the first rung that holds your weight, then you stop.</p>
<h3>Rules</h3>
<ul>
<li>Python tests from the top. The first condition that is true runs its block; everything below is skipped.</li>
<li><code>else</code> runs only if nothing above matched.</li>
<li><code>elif</code> order matters — put stricter / higher thresholds first (90 before 80).</li>
</ul>
<h3>Worked trace: letter grade</h3>
<pre class="mcq-code">score = 85
if score &gt;= 90:
    g = "A"
elif score &gt;= 80:
    g = "B"
else:
    g = "F"
print(g)</pre>
<p>For 85: <code>&gt;= 90</code> fails, <code>&gt;= 80</code> succeeds → <code>g</code> is <strong>B</strong>. For 100 you must hit the first branch → <strong>A</strong>. If you reversed the <code>elif</code> order (80 before 90), a score of 100 could incorrectly become B.</p>
<h3>Chained comparisons</h3>
<pre class="mcq-code">13 &lt;= age &lt;= 19</pre>
<p>Means both <code>13 &lt;= age</code> and <code>age &lt;= 19</code> — inclusive “teen band” in many IB questions.</p>
<h3>Floating-point grades / money</h3>
<p>Binary floats cannot store every decimal perfectly. <code>0.1 + 0.2 == 0.3</code> is often false. On tests you may see <code>round(total, 2) == 0.3</code> as the safe pattern.</p>
<div class="study-trap"><strong>Trap — elif order:</strong> Putting wider conditions before narrower ones steals cases (100 treated as B).</div>
<div class="study-trap"><strong>Trap — assignment in conditions:</strong> <code>if x = 3</code> is a syntax error in Python; use <code>==</code> for comparison.</div>
<div class="study-trick"><strong>Trick:</strong> For long chains, make a small table of sample inputs (59, 69, 70, 100) and one column per branch outcome.</div>`,
  },
  {
    id: "study-04",
    title: "4 · Loops (range, while)",
    html: `<p>Loops repeat work. Tracing loops means tracking the loop variable, the condition, and any accumulators (<code>total</code>, <code>count</code>, etc.) after each pass.</p>
<h3>for and range</h3>
<p><code>range(start, stop, step)</code> generates numbers starting at <code>start</code>, adding <code>step</code> each time, until the next value would reach or pass <code>stop</code> (stop is <strong>not</strong> included).</p>
<pre class="mcq-code">list(range(2, 11, 3))   # [2, 5, 8]</pre>
<pre class="mcq-code">count = 0
for i in range(2, 11, 3):
    count += 1
print(count)</pre>
<table class="study-table"><thead><tr><th>i</th><th>count after body</th></tr></thead>
<tbody><tr><td>2</td><td>1</td></tr><tr><td>5</td><td>2</td></tr><tr><td>8</td><td>3</td></tr></tbody></table>
<p>Output: <strong>3</strong>. The loop ran once per value in the range, not “11 minus 2”.</p>
<h3>while loops</h3>
<p>Before each iteration, Python checks the condition. If it is false initially, the body may never run.</p>
<pre class="mcq-code">n = 12
while n &gt; 0:
    n = n - 5
print(n)</pre>
<p>Sequence of n: 12 → 7 → 2 → -3. After -3, condition fails. Prints <strong>-3</strong> (not 2 — the body still ran when n was 2 and subtracted again).</p>
<div class="study-trap"><strong>Trap — off-by-one with len:</strong> Valid indices for a list of length 3 are 0,1,2. <code>while i &lt;= len(items)</code> allows i=3 → IndexError. Prefer <code>i &lt; len(items)</code> or <code>for item in items</code>.</div>
<div class="study-trap"><strong>Trap — infinite loop:</strong> If the question shows only <code>print(items[i])</code> inside <code>while</code> and never <code>i += 1</code>, i stays 0 forever. MCQ explanations sometimes assume i increases — read the full code.</div>
<h3>continue and break</h3>
<pre class="mcq-code">total = 0
for k in range(1, 4):
    if k == 2:
        continue
    total += k
print(total)</pre>
<p><code>continue</code> skips the rest of the body for this k only. k=2 adds nothing. Answer: <strong>4</strong>.</p>
<h3>Nested loops</h3>
<p>Inner loop completes fully for each outer step. Total inner runs ≈ outer × inner (e.g. 3×4 = 12). That pattern leads to O(n²) later.</p>
<div class="study-trick"><strong>Trick:</strong> Draw a tiny table with columns for loop variable, condition T/F, and variables that change. One row per iteration.</div>`,
  },
  {
    id: "study-05",
    title: "5 · Lists & mutations",
    html: `<p>Lists are ordered, mutable sequences. Most list bugs on tests come from (1) slicing rules, (2) methods that return <code>None</code>, (3) shared references, (4) 2D grid aliasing.</p>
<h3>Indexing and slicing</h3>
<pre class="mcq-code">nums = [10, 20, 30]
print(nums[1], nums[1:3], nums[-1])</pre>
<p>Output: <strong>20 [20, 30] 30</strong>. Slice <code>1:3</code> includes index 1 and 2, stops before 3. Negative index -1 is the last element.</p>
<h3>append vs extend</h3>
<pre class="mcq-code">bag = [1, 2]
bag.append([3])
print(len(bag), bag[-1])   # 3 [3]</pre>
<p><code>append</code> adds exactly one object — here one list. <code>extend([3,4])</code> would add two separate numbers.</p>
<h3>pop and remove</h3>
<pre class="mcq-code">a = [15, 20, 23]
b = a.pop(1)
print(b, a)   # 20 [15, 23]</pre>
<p><code>pop(1)</code> uses an index. <code>team.pop("Mo")</code> is wrong — TypeError. To remove by value: <code>remove("Mo")</code>.</p>
<h3>sort vs sorted</h3>
<pre class="mcq-code">nums = [4, 5, 7]
t = nums.sort()
print(t, nums[0])   # None 4</pre>
<p><code>.sort()</code> rearranges the list in place and returns <code>None</code>. <code>sorted(nums)</code> returns a new list and leaves nums unchanged.</p>
<h3>Aliasing</h3>
<pre class="mcq-code">a = [1, 2]
b = a
b.append(3)
print(a)   # [1, 2, 3] — same object</pre>
<pre class="mcq-code">def f(L):
    L = L + [9]    # new list, local name only
    return L
x = [1]
y = f(x)
print(x, y)   # [1] [1, 9]</pre>
<h3>2D lists</h3>
<pre class="mcq-code">grid = [[0]*3 for _ in range(3)]   # three independent rows</pre>
<p>Bad pattern: <code>[[0]*3]*3</code> repeats the same inner list three times — editing one row edits all.</p>
<div class="study-trick"><strong>Trick:</strong> Before each line ask: “Does this rebind a name or mutate an object others share?”</div>
<div class="study-trap"><strong>Trap:</strong> Tuple <code>(5)</code> is int; one-element tuple is <code>(5,)</code> — comma required.</div>`,
  },
  {
    id: "study-06",
    title: "6 · Strings, dicts & functions",
    html: `<p>Strings behave like lists for reading (index/slice) but cannot be changed in place. Dicts map keys to values. Functions bundle steps — but return value and printed output differ.</p>
<h3>Strings</h3>
<pre class="mcq-code">word = "hello"
word = word[0].upper() + word[1:]
print(word)   # Hello</pre>
<p><code>capitalize()</code> makes first char upper and rest lower. <code>title()</code> capitalizes each word — useful for names like <code>"anna kline"</code> → <code>"Anna Kline"</code>.</p>
<div class="study-trap"><strong>Trap:</strong> <code>word[0] = "H"</code> → TypeError. <code>word.upper()[0]</code> alone loses the rest of the string.</div>
<h3>Dicts</h3>
<pre class="mcq-code">d = {"x": 7}
print(d.get("w", 0), d.get("x"))   # 0 7</pre>
<p><code>get(key, default)</code> avoids KeyError when the key is missing. Without default, missing key returns <code>None</code> from <code>get</code>, but <code>d[key]</code> raises KeyError.</p>
<pre class="mcq-code">cards = [{"v": 2}, {"v": 5}]
print(cards[1]["v"] + cards[0]["v"])   # 7</pre>
<p>Index the list first, then use the string key.</p>
<h3>Functions — print vs return</h3>
<pre class="mcq-code">def twice(n):
    print(n * 2)
    return n + 1
x = twice(4)
print(x)</pre>
<p>Console shows 8 from inside <code>twice</code>, then 5 from <code>print(x)</code>. The question “what does twice return?” → <strong>5</strong>, not 8.</p>
<pre class="mcq-code">def f():
    print(1)
# f() returns None</pre>
<h3>Scope — local, global, and types in one trace</h3>
<p>Rubric B2.1.1 expects you to trace names that hold <strong>bool, int, float, str</strong> (and “char” = one-character str). Track each name’s value after every line.</p>
<pre class="mcq-code">score = 85          # global int
def grade():
    passed = score >= 80    # local bool
    label = "OK" if passed else "no"   # local str
    return label
print(grade(), score)   # OK 85</pre>
<pre class="mcq-code">count = 0
def bump():
    count = count + 1   # UnboundLocalError — count treated as local</pre>
<p>Assignment makes <code>count</code> local for the whole function, so the right-hand <code>count</code> is not the global. To update the global counter:</p>
<pre class="mcq-code">count = 0
def bump():
    global count
    count = count + 1
bump()
bump()
print(count)   # 2</pre>
<p><strong>Decimal:</strong> syllabus “decimal” → Python <code>float</code> (e.g. <code>3.4</code>, <code>2.0</code> from <code>/</code>).</p>
<div class="study-trick"><strong>Trick:</strong> Tuple return: <code>return q, r</code> then <code>q, r = divide(17, 5)</code> — watch print order if swapped.</div>`,
  },
  {
    id: "study-07",
    title: "7 · Linear search",
    html: `<p>Linear search means “look at items one by one until done.” No sorting required. Worst case you inspect every element — O(n).</p>
<h3>Standard pattern</h3>
<pre class="mcq-code">def linear_search(a, target):
    for i in range(len(a)):
        if a[i] == target:
            return i
    return -1</pre>
<p>Return type is usually an index or -1 / None for “not found.” Read the question carefully.</p>
<h3>Full trace</h3>
<p><code>a = [4, 9, 2, 7]</code>, target <code>7</code>:</p>
<table class="study-table"><thead><tr><th>i</th><th>a[i]</th><th>Equal target?</th></tr></thead>
<tbody>
<tr><td>0</td><td>4</td><td>no</td></tr>
<tr><td>1</td><td>9</td><td>no</td></tr>
<tr><td>2</td><td>2</td><td>no</td></tr>
<tr><td>3</td><td>7</td><td>yes → return 3</td></tr>
</tbody></table>
<h3>Variant: first index where condition holds</h3>
<pre class="mcq-code"># return first i where a[i] &gt;= t
find([3, 5, 8], 6)   # index 2 because 8 is first &gt;= 6</pre>
<p>Do not assume equality — trace the comparison in the code.</p>
<h3>How to recognize linear search in MCQs</h3>
<ul>
<li>Single loop from 0 to len-1 (or for each item).</li>
<li>No <code>mid</code>, no halving of a range.</li>
<li>Works on unsorted data.</li>
</ul>
<div class="study-trap"><strong>Trap:</strong> Returning the value instead of the index (or vice versa).</div>
<div class="study-trick"><strong>Trick:</strong> If the list is sorted and you need speed, binary search is possible — but only if the question says sorted and uses mid/low/high.</div>`,
  },
  {
    id: "study-08",
    title: "8 · Binary search",
    html: `<p>Binary search is fast because each step eliminates half the remaining indices. It requires a <strong>sorted</strong> sequence and careful index arithmetic.</p>
<h3>Variables are indices</h3>
<p><code>low</code> and <code>high</code> point into the list — they are not the values you search for. <code>mid = (low + high) // 2</code> picks a middle index (left-biased when even length).</p>
<h3>Full algorithm sketch</h3>
<pre class="mcq-code">while low &lt;= high:
    mid = (low + high) // 2
    if a[mid] == target:
        return mid
    elif target &lt; a[mid]:
        high = mid - 1
    else:
        low = mid + 1
return -1</pre>
<h3>Trace: find 12 in [2, 5, 8, 12, 16]</h3>
<table class="study-table"><thead><tr><th>low</th><th>high</th><th>mid</th><th>a[mid]</th><th>Decision</th></tr></thead>
<tbody>
<tr><td>0</td><td>4</td><td>2</td><td>8</td><td>12 &gt; 8 → low = 3</td></tr>
<tr><td>3</td><td>4</td><td>3</td><td>12</td><td>found → return 3</td></tr>
</tbody></table>
<h3>Trace: find 5 in same list</h3>
<table class="study-table"><thead><tr><th>low</th><th>high</th><th>mid</th><th>a[mid]</th><th>Decision</th></tr></thead>
<tbody>
<tr><td>0</td><td>4</td><td>2</td><td>8</td><td>5 &lt; 8 → high = 1</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>2</td><td>5 &gt; 2 → low = 1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>5</td><td>found → return 1</td></tr>
</tbody></table>
<h3>Not found</h3>
<p>For target 6, you eventually get <code>low &gt; high</code> — empty range, return -1. Trace until that happens; do not guess.</p>
<div class="study-trap"><strong>Trap — unsorted list:</strong> Finding the target at mid once does not prove binary search works. Wrong half may be discarded incorrectly.</div>
<div class="study-trap"><strong>Trap — off-by-one:</strong> When target is smaller, <code>high = mid - 1</code>, not mid. When larger, <code>low = mid + 1</code>.</div>
<div class="study-trick"><strong>Trick:</strong> ~log₂(n) steps — 1000 items ≈ 10 comparisons worst case.</div>`,
  },
  {
    id: "study-09",
    title: "9 · Master checklist & drill",
    html: `<p>Use this part before mocks. Compare search types, run the checklist on every MCQ, then do the drill without looking.</p>
<h3>Linear vs binary — full comparison</h3>
<table class="study-table"><thead><tr><th>Question</th><th>Linear search</th><th>Binary search</th></tr></thead>
<tbody>
<tr><td>Must data be sorted?</td><td>No</td><td><strong>Yes</strong></td></tr>
<tr><td>What moves each step?</td><td>One index forward (or each item)</td><td>low/high window shrinks by half</td></tr>
<tr><td>Typical code shape</td><td><code>for i in range(len(a))</code></td><td><code>while low &lt;= high</code>, compute mid</td></tr>
<tr><td>Worst-case comparisons</td><td>n</td><td>about log₂(n)</td></tr>
<tr><td>Big O</td><td>O(n)</td><td>O(log n)</td></tr>
</tbody></table>
<h3>10-second MCQ checklist</h3>
<ol class="study-drill">
<li><code>/</code> → float? <code>//</code> floor? <code>%</code> remainder?</li>
<li><code>.sort()</code> returns <code>None</code>?</li>
<li><code>append</code> (one item) vs <code>extend</code> (many)?</li>
<li><code>pop(index)</code> vs <code>remove(value)</code>?</li>
<li>Shared list or <code>[[0]*3]*3</code>?</li>
<li>Question asks print or return?</li>
<li>Binary: sorted data? low/high are indices?</li>
<li><code>and</code>/<code>or</code> short-circuit?</li>
<li>Slice end exclusive; <code>&lt;= len</code> index error?</li>
<li>One-tuple <code>(5,)</code> comma?</li>
</ol>
<h3>Mixed drill — trace, then check</h3>
<ol class="study-drill">
<li><code>print(17 // 5, 17 % 5, 17 / 5)</code> → <strong>3 2 3.4</strong></li>
<li><code>print(not (3 &gt; 3 and 3 == 4))</code> → <strong>True</strong></li>
<li><code>d = {"x":7}; print(d.get("w",0), d.get("x"))</code> → <strong>0 7</strong></li>
<li>First index with value &gt;= 6 in [3,5,8] → <strong>2</strong></li>
<li>Binary search for 12 in [2,5,8,12,16] → index <strong>3</strong></li>
</ol>
<p>Practice more on <a href="index.html">Home</a> (coding + MCQ mock) and the <strong>Trace guide</strong> CFU quizzes.</p>`,
  },
  {
    id: "study-10",
    title: "10 · Small rules reference",
    html: `<p>One-off rules that only show up in certain question types. Each box has a short explanation plus an example. Use the section headings to jump — not everything applies to every test topic.</p>

<h3>Syntax &amp; printing</h3>

<div class="study-rule"><p class="study-rule-title">= vs ==</p>
<p><code>=</code> assigns a value to a name. <code>==</code> compares two values. <code>if x = 3</code> is illegal; <code>if x == 3</code> is a comparison.</p></div>

<div class="study-rule"><p class="study-rule-title">print with commas</p>
<p><code>print(a, b, c)</code> evaluates a, then b, then c, then shows them on <strong>one line</strong> separated by spaces. It is not the same as three separate <code>print</code> calls.</p></div>

<div class="study-rule"><p class="study-rule-title">print vs return</p>
<p><code>print(x)</code> shows output in the console only. A function with no <code>return</code> gives <code>None</code> to the caller even if it printed useful text. Read whether the question asks “printed” or “returned.”</p></div>

<h3>Numbers &amp; conversion</h3>

<div class="study-rule"><p class="study-rule-title">/ vs // vs %</p>
<p><code>/</code> is always float division in Python 3 (<code>10 / 5</code> → <code>2.0</code>). <code>//</code> is floor division. <code>%</code> is remainder. On one <code>print(a % b, a // b, a / b)</code> line, evaluate each piece separately.</p></div>

<div class="study-rule"><p class="study-rule-title">** groups right to left</p>
<p><code>2 ** 3 ** 2</code> means <code>2 ** (3 ** 2)</code> = <code>2 ** 9</code> = <code>512</code>, not <code>64</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">input() is always str</p>
<p>Even if the user types digits, <code>input()</code> returns a string. <code>age = input()</code> then <code>age + 1</code> → TypeError until you use <code>int(age)</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">int() / float() and ValueError</p>
<p><code>int("7")</code> works. <code>int("3.9")</code> fails — the string is not a plain integer literal. <code>float("cat")</code> fails too. Bad <strong>content</strong> for conversion → <strong>ValueError</strong>.</p></div>

<div class="study-rule"><p class="study-rule-title">TypeError vs ValueError</p>
<p><strong>TypeError:</strong> the operation does not make sense for these types (<code>"7" + 3</code>). <strong>ValueError:</strong> types are OK but the value cannot be converted or used (<code>int("3.9")</code>, <code>list.index(missing)</code>).</p></div>

<div class="study-rule"><p class="study-rule-title">isdigit(), isalpha(), isdecimal()</p>
<p>These are <strong>string</strong> methods that return True/False. <code>"42".isdigit()</code> → True; <code>"3.9".isdigit()</code> → False (dot is not a digit). They do not convert — use <code>int()</code> after you check if you need to.</p></div>

<h3>Strings &amp; text</h3>

<div class="study-rule"><p class="study-rule-title">Strings are immutable</p>
<p>You cannot change one character in place: <code>word[0] = "H"</code> → TypeError. Build a new string: <code>word = "H" + word[1:]</code> or use methods like <code>upper()</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">String + and string *</p>
<p><code>"a" + "b"</code> → <code>"ab"</code>. <code>"7" + 3</code> → TypeError. <code>"hi" * 3</code> → <code>"hihihi"</code>. <code>3 * "ab"</code> → <code>"ababab"</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">Methods return new strings</p>
<p><code>s.lower()</code>, <code>s.strip()</code>, <code>s.replace(...)</code> return a <strong>new</strong> string. Unless you assign back (<code>s = s.strip()</code>), <code>s</code> is unchanged.</p></div>

<div class="study-rule"><p class="study-rule-title">strip(), lstrip(), rstrip()</p>
<p>Remove whitespace from both ends (<code>strip</code>), left only (<code>lstrip</code>), or right only (<code>rstrip</code>). Optional argument removes those characters instead: <code>"...hi...".strip(".")</code>. Example trace:</p>
<pre class="mcq-code">tag = "  hi  "
print(len(tag.strip()), tag.strip()[0])   # 2 h</pre></div>

<div class="study-rule"><p class="study-rule-title">split() with no argument</p>
<p><code>text.split()</code> splits on <strong>any whitespace</strong> and drops empty runs — good for “words in a sentence.” Punctuation stays on the word (<code>"cool!"</code> is one token). <code>text.split(",")</code> splits only on commas.</p></div>

<div class="study-rule"><p class="study-rule-title">replace(old, new)</p>
<p>Replaces <strong>all</strong> occurrences of a substring with another substring. Returns a new string. <code>"a-b-a".replace("-", "")</code> → <code>"aba"</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">upper, lower, capitalize, title</p>
<p><code>upper()</code> / <code>lower()</code> — whole string. <code>capitalize()</code> — first char upper, rest lower (<code>"eLEPHANT"</code> → <code>"Elephant"</code>). <code>title()</code> — each word capitalized (<code>"anna kline"</code> → <code>"Anna Kline"</code>). Trace <code>len(s.title())</code> on the <strong>new</strong> string, not the old one.</p></div>

<div class="study-rule"><p class="study-rule-title">join(separator)</p>
<p>Called on the separator string: <code>" ".join(["a", "b"])</code> → <code>"a b"</code>. The argument must be a list (or iterable) of strings.</p></div>

<div class="study-rule"><p class="study-rule-title">in vs find (strings)</p>
<p><code>"cat" in phrase</code> → True/False. <code>phrase.find("cat")</code> → index or <code>-1</code> if missing. Trap: <code>find("cat") &gt; 0</code> is false when <code>"cat"</code> starts at index 0 — use <code>&gt;= 0</code> or use <code>in</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">len() on strings and lists</p>
<p><code>len("hello")</code> → 5. After <code>strip()</code>, length can shrink. Index <code>len(s)-1</code> is the last valid index; index <code>len(s)</code> is out of range for single indexing.</p></div>

<h3>Indexing, slices, loops</h3>

<div class="study-rule"><p class="study-rule-title">Index 0 and valid indices</p>
<p>The first slot is index <strong>0</strong>. If <code>len(items) == 3</code>, legal indices are <strong>0, 1, 2</strong> only. Index <code>3</code> is one past the end → IndexError (unless you are slicing).</p></div>

<div class="study-rule"><p class="study-rule-title">Negative indices</p>
<p><code>items[-1]</code> is the last element, <code>items[-2]</code> second from end. Same idea for strings.</p></div>

<div class="study-rule"><p class="study-rule-title">Slice end is excluded</p>
<p><code>items[1:3]</code> takes indices 1 and 2, not 3. <code>items[:2]</code> is the first two elements. Empty slice past the end is OK: <code>items[99:]</code> → <code>[]</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">Slice step (optional third number)</p>
<p><code>s[::-1]</code> reverses a string or list. Step is how far to jump each time; omitted step defaults to 1.</p></div>

<div class="study-rule"><p class="study-rule-title">range stop value</p>
<p><code>range(2, 11, 3)</code> produces 2, 5, 8 — it never includes 11. Think “stop before stop.”</p></div>

<div class="study-rule"><p class="study-rule-title">Iterable (what for-loops need)</p>
<p><code>for x in something</code> requires an iterable (list, string, range, dict keys, …). <code>for x in 7</code> fails. <code>tuple(5)</code> fails; <code>tuple([5])</code> works.</p></div>

<div class="study-rule"><p class="study-rule-title">for item in lst vs range(len(lst))</p>
<p><code>for x in lst</code> — <code>x</code> is each <strong>value</strong>. <code>for i in range(len(lst))</code> — <code>i</code> is each <strong>index</strong> so you can use <code>lst[i]</code> or change position logic.</p></div>

<div class="study-rule"><p class="study-rule-title">while and len — off-by-one</p>
<p>Valid indices for length 3 are 0,1,2. <code>while i &lt;= len(items)</code> allows <code>i == 3</code> → IndexError. Prefer <code>i &lt; len(items)</code> or a <code>for</code> loop.</p></div>

<div class="study-rule"><p class="study-rule-title">elif order — first match wins</p>
<p>Python checks <code>if</code>, then each <code>elif</code> top to bottom and stops at the first true branch. Put stricter conditions first (e.g. <code>&gt;= 90</code> before <code>&gt;= 80</code>) so a score of 100 is not caught by the wrong grade.</p></div>

<div class="study-rule"><p class="study-rule-title">break vs continue vs pass</p>
<p><code>break</code> leaves the loop completely. <code>continue</code> skips to the next iteration of the same loop. <code>pass</code> does nothing — placeholder so syntax is valid.</p></div>

<div class="study-rule"><p class="study-rule-title">Nested loops — how many times</p>
<p>Inner loop finishes fully for each outer step. Two loops 0..n-1 → about <code>n × n</code> body runs (unless break). Often O(n²).</p></div>

<h3>Lists &amp; tuples</h3>

<div class="study-rule"><p class="study-rule-title">append vs extend</p>
<p><code>append(x)</code> adds <strong>one</strong> item (even if x is a list). <code>extend([1,2])</code> adds each item. <code>[1,2].append([3])</code> → <code>[1,2,[3]]</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">insert(i, x) and count(x)</p>
<p><code>insert</code> puts a value at index <code>i</code> and shifts the rest. <code>count(x)</code> counts how many times <code>x</code> appears — it does not return an index.</p></div>

<div class="study-rule"><p class="study-rule-title">remove vs pop</p>
<p><code>remove(value)</code> deletes the <strong>first</strong> matching value. <code>pop(index)</code> deletes by position and returns that item. <code>pop()</code> with no arg removes the last item. <code>pop("Mo")</code> → TypeError (need an integer index).</p></div>

<div class="study-rule"><p class="study-rule-title">index(value) on a list</p>
<p><code>lst.index("Mo")</code> returns the index of the <strong>first</strong> match. If the value is missing → <strong>ValueError</strong> (not -1). Strings use <code>find</code> for -1; lists use <code>index</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">sort() vs sorted()</p>
<p><code>nums.sort()</code> rearranges the list <strong>in place</strong> and returns <code>None</code>. <code>t = nums.sort(); print(t, nums[0])</code> often prints <code>None</code> and the new smallest. <code>sorted(nums)</code> returns a new sorted list and leaves <code>nums</code> unchanged.</p></div>

<div class="study-rule"><p class="study-rule-title">Mutating list methods often return None</p>
<p><code>append</code>, <code>extend</code>, <code>insert</code>, <code>remove</code>, <code>sort</code>, <code>reverse</code> change the list and return <code>None</code>. Do not chain them expecting a new list.</p></div>

<div class="study-rule"><p class="study-rule-title">List += often acts like extend</p>
<p><code>nums += [4, 5]</code> usually mutates the same list. <code>nums = nums + [4, 5]</code> builds a new list object.</p></div>

<div class="study-rule"><p class="study-rule-title">Copying a list (avoid accidental alias)</p>
<p><code>b = a</code> shares the same list. Copy with <code>a.copy()</code>, <code>a[:]</code>, or <code>list(a)</code>. Shallow copy: inner lists may still be shared.</p></div>

<div class="study-rule"><p class="study-rule-title">[[0] * 3] * 3 trap</p>
<p>Repeating the same inner list alias makes every row the same object. Changing <code>grid[0][0]</code> can change every row. Build rows separately in a loop or use independent sublists.</p></div>

<div class="study-rule"><p class="study-rule-title">One-element tuple comma</p>
<p><code>(5)</code> is just the int 5. A one-item tuple is <code>(5,)</code> — the comma matters.</p></div>

<div class="study-rule"><p class="study-rule-title">max, min, sum on iterables</p>
<p><code>max([3,8,2])</code> → 8. <code>sum([1,2,3])</code> → 6. Empty list with <code>max</code> → ValueError.</p></div>

<h3>Dicts &amp; 2D lists</h3>

<div class="study-rule"><p class="study-rule-title">dict[key] vs get</p>
<p><code>d["missing"]</code> → KeyError. <code>d.get("missing")</code> → <code>None</code>. <code>d.get("missing", 0)</code> → default when key absent.</p></div>

<div class="study-rule"><p class="study-rule-title">Looping a dict</p>
<p><code>for k in prices:</code> gives each <strong>key</strong>. Use <code>prices[k]</code>, <code>.values()</code>, or <code>.items()</code> for values or pairs.</p></div>

<div class="study-rule"><p class="study-rule-title">2D list indexing</p>
<p><code>grid[row][col]</code> — row first (which sublist), then column inside that row. <code>lst[i][key]</code> for a list of dicts: index the list, then the key.</p></div>

<h3>Functions, errors, search</h3>

<div class="study-rule"><p class="study-rule-title">Function without return</p>
<p>If the body has no <code>return</code>, the call evaluates to <code>None</code>. Printing inside the function does not change the return value.</p></div>

<div class="study-rule"><p class="study-rule-title">Local names inside a function</p>
<p>Assigning to a name inside a function creates/updates a <strong>local</strong> variable unless you use <code>global</code> (rare on Y1 tests). Outer variables can be read if you do not assign to the same name locally.</p></div>

<div class="study-rule"><p class="study-rule-title">try / except flow</p>
<p><code>try</code> runs line by line. On error, Python jumps to matching <code>except</code> and skips the rest of <code>try</code>. If no error, <code>except</code> is skipped.</p></div>

<div class="study-rule"><p class="study-rule-title">except ValueError (and specific types)</p>
<p><code>except ValueError:</code> runs only for ValueError (e.g. bad <code>int()</code> input). Other errors still crash. Bare <code>except:</code> catches everything — avoid unless the question shows it.</p></div>

<div class="study-rule"><p class="study-rule-title">finally (always runs)</p>
<p>After <code>try</code> / <code>except</code>, a <code>finally:</code> block runs whether or not an error occurred — useful for cleanup (close file, reset flag). Order: try → except (if error) → finally.</p>
<pre class="mcq-code">try:
    n = int(text)
except ValueError:
    n = 0
finally:
    print("done")   # always prints</pre></div>

<div class="study-rule"><p class="study-rule-title">Extract a substring (slice)</p>
<p>Indices pick characters without changing the original string: <code>s[1:4]</code> from index 1 up to (not including) 4. <code>word = "PYTHON"; word[1:4]</code> → <code>"YTH"</code>. Combine with <code>+</code> or methods to build a new string.</p></div>

<div class="study-rule"><p class="study-rule-title">Loop over characters (B2.1.2 construct)</p>
<p><code>for ch in word:</code> gives each one-character string. Use this to count, filter, or build a new string: <code>result = result + ch</code> only when <code>ch</code> is not a vowel (see Home → <strong>no_vowels</strong> lesson).</p></div>

<div class="study-rule"><p class="study-rule-title">str.index vs str.find</p>
<p><code>s.find("x")</code> → index or <code>-1</code>. <code>s.index("x")</code> → index or <strong>ValueError</strong> if missing (like list <code>.index</code>).</p></div>

<div class="study-rule"><p class="study-rule-title">Remove or alter part of a string</p>
<p>Delete index <code>i</code>: <code>s[:i] + s[i+1:]</code>. Insert/replace: <code>replace</code> or slice + concat — always store the new string in a variable.</p></div>

<div class="study-rule"><p class="study-rule-title">Resource errors (files)</p>
<p>Opening a missing file can raise <strong>FileNotFoundError</strong>. Syllabus “resource unavailability” — handle with try/except so the program can show a message instead of crashing.</p>
<pre class="mcq-code">try:
    f = open("data.txt")
    text = f.read()
except FileNotFoundError:
    text = ""</pre></div>

<div class="study-rule"><p class="study-rule-title">Checking for None</p>
<p><code>x is None</code> is the usual test. Do not confuse “not found” return <code>-1</code> with falsy <code>0</code> when checking search results — read the question’s convention.</p></div>

<div class="study-rule"><p class="study-rule-title">== vs is</p>
<p><code>==</code> compares values. <code>is</code> compares identity (same object). <code>3 == 3.0</code> True; <code>3 is 3.0</code> False.</p></div>

<div class="study-rule"><p class="study-rule-title">Linear “not found” convention</p>
<p>Many functions return <code>-1</code> when no index matches — a sentinel, not “use index -1” (last element).</p></div>

<div class="study-rule"><p class="study-rule-title">Binary search loop condition</p>
<p>Common: <code>while low &lt;= high</code>. When <code>low</code> passes <code>high</code>, window empty → not found. <code>low</code>/<code>high</code> are <strong>indices</strong>; data must be sorted for standard binary search.</p></div>

<div class="study-rule"><p class="study-rule-title">Bubble / selection sort (one pass idea)</p>
<p><strong>Bubble:</strong> compare neighbors, swap if out of order; each pass fixes one more at the end. <strong>Selection:</strong> each outer step finds the min in the unsorted tail and swaps it into place. Count what the question asks: comparisons, swaps, or passes.</p></div>

<p>See also <strong>Part 1</strong> (operators, input), <strong>Part 2</strong> (<code>and</code>/<code>or</code> short-circuit table), <strong>Part 9</strong> (full linear vs binary write-up), and <strong>Part 11</strong> (IB B2 criteria map).</p>`,
  },
  {
    id: "study-11",
    title: "11 · IB B2 criteria map",
    html: `<p>This part ties your <strong>IB CS B2</strong> statements to what you must <strong>construct</strong>, <strong>trace</strong>, or <strong>describe</strong>. Use it for self-check before a criterion is graded. “Meeting” usually means you can do it correctly most of the time with clear reasoning; “Exceeding” means you handle edge cases and can explain <em>why</em>, not just the answer.</p>

<h3>Coverage checklist (syllabus → this site)</h3>
<table class="study-table"><thead><tr><th>Criterion</th><th>Required</th><th>Where</th><th>Gap to close yourself</th></tr></thead>
<tbody>
<tr><td>B2.1.1</td><td>Trace global/local; bool, char, decimal, int, str</td><td>Parts 1–2, 6, 10; MCQ; Trace guide</td><td>Write a 6-line program and fill a trace table by hand</td></tr>
<tr><td>B2.1.2</td><td>Extract &amp; manipulate substrings</td><td>Part 6, 10; Unit 10 lessons; <code>no_vowels</code></td><td>One task using slice + loop + concat</td></tr>
<tr><td>B2.1.3</td><td>Describe failures; try/except/finally</td><td>Part 10–11; <code>parse_age</code> lesson</td><td>Paragraph: role of EH + logic vs runtime error</td></tr>
<tr><td>B2.1.4</td><td>Trace table, print, breakpoint, step</td><td>Parts 1–8; Trace guide; template below</td><td>One bug fixed with a breakpoint in VS Code/Cursor</td></tr>
<tr><td>B2.2.2</td><td>1D/2D list add, remove, traverse</td><td>Part 5, 10; Unit 13; <code>sum_grid</code></td><td>Nested loop over a 3×3 grid</td></tr>
<tr><td>B2.4.2</td><td>Linear &amp; binary search; efficiency; choice</td><td>Parts 7–9; Constructs search lessons</td><td>Code <code>binary_search</code> from memory; trace both</td></tr>
</tbody></table>

<h3>B2.1.1 — Global &amp; local variables (trace &amp; construct)</h3>
<p><strong>Data types on the rubric:</strong> In Python you work with <code>bool</code>, <code>int</code>, <code>float</code>, <code>str</code>. A “char” is usually a one-character string: <code>word[0]</code> → <code>"P"</code>, not a separate char type like Java.</p>
<table class="study-table"><thead><tr><th>Idea</th><th>What to show</th></tr></thead>
<tbody>
<tr><td>Local variable</td><td>Created inside a <code>def</code>; exists only while the function runs.</td></tr>
<tr><td>Global variable</td><td>Defined at module level; readable inside functions unless you assign to the same name locally.</td></tr>
<tr><td>Rebind vs mutate</td><td><code>L = L + [9]</code> inside a function rebinds <strong>local</strong> <code>L</code>; outer list unchanged. <code>L.append(9)</code> mutates the shared list object.</td></tr>
<tr><td><code>global</code></td><td>Needed to <strong>assign</strong> to a global name inside a function (e.g. counter). Rare but appears on traces.</td></tr>
</tbody></table>
<pre class="mcq-code">total = 0          # global
def add(n):
    local_sum = total + n   # read global, write local
    return local_sum
print(add(5), total)   # 5 0</pre>
<p><strong>Practice:</strong> Study <strong>Part 5–6</strong> (including <code>global count</code> trace), Part 10 (copy / +=), Home → <strong>Local total</strong>, MCQ on <code>f(x)</code> / <code>L + []</code>, Trace guide scope items.</p>

<h3>B2.1.2 — Substrings: extract &amp; manipulate</h3>
<p>You must write code that <strong>identifies</strong> and <strong>extracts</strong> parts of strings, then alters, concatenates, or replaces.</p>
<table class="study-table"><thead><tr><th>Technique</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Slice</td><td><code>s[2:5]</code>, <code>s[:3]</code>, <code>s[-2:]</code></td></tr>
<tr><td>Index one char</td><td><code>s[0]</code>, <code>s[i]</code></td></tr>
<tr><td>Concatenate</td><td><code>prefix + s[1:]</code> or <code>s[:i] + s[i+1:]</code></td></tr>
<tr><td>Replace / case</td><td><code>s.replace("a", "o")</code>, <code>s.upper()</code>, <code>s.strip()</code></td></tr>
<tr><td>Test substring</td><td><code>"cat" in s</code>, <code>s.find("cat")</code> (watch index 0)</td></tr>
<tr><td>Split into parts</td><td><code>words = line.split()</code> then <code>words[1][0]</code></td></tr>
<tr><td>Loop characters</td><td><code>for ch in s:</code> to scan or build a new string</td></tr>
<tr><td>Alter / delete</td><td><code>s[:i] + s[i+1:]</code>, <code>replace</code>, assign result back</td></tr>
</tbody></table>
<p>Strings are <strong>immutable</strong> — every manipulation produces a <strong>new</strong> string (assign it if you need to keep it).</p>
<pre class="mcq-code">name = "anna kline"
display = name.title()
print(display.split()[1][0])   # K — extract + manipulate chain</pre>
<p><strong>Practice:</strong> Home → Unit 10 (slice <code>YTH</code>, split, <strong>no_vowels</strong>), Part 6 &amp; 10 string rules, Trace guide string CFU (<code>title</code>, <code>strip</code>).</p>

<h3>B2.1.3 — Exception handling (describe &amp; use)</h3>
<p><strong>Why exceptions exist:</strong> So a program can respond to failure instead of crashing silently or stopping the whole run.</p>
<p><strong>Failure types the syllabus mentions:</strong></p>
<ul>
<li><strong>Unexpected input</strong> — user types letters when you expect a number → <code>int()</code> → ValueError.</li>
<li><strong>Resource unavailability</strong> — e.g. file not found → <code>FileNotFoundError</code> when opening a path that does not exist.</li>
<li><strong>Logic errors</strong> — program runs but wrong result; <strong>not</strong> caught by try/except (you fix the algorithm).</li>
</ul>
<p><strong>Role of exception handling (exam wording):</strong> lets the program detect runtime failures, respond with a fallback or message, and optionally run cleanup (<code>finally</code>) instead of stopping abruptly.</p>
<pre class="mcq-code"># logic error — no exception; wrong math
avg = a + b / 2        # should be (a + b) / 2

# runtime error — try/except can help
try:
    n = int(text)
except ValueError:
    n = 0</pre>
<p><strong>Constructs (Python):</strong> <code>try</code> / <code>except</code> / optional <code>finally</code>. (Java: try/catch/finally.) You may list several <code>except</code> types; <code>finally</code> always runs.</p>
<pre class="mcq-code">try:
    age = int(input_text)
except ValueError:
    age = 0
finally:
    print("checked")</pre>
<p><code>except</code> runs only when a matching error happens in <code>try</code>. Other error types need their own <code>except</code> or propagate upward.</p>
<p><strong>Practice:</strong> Part 10 (ValueError, FileNotFoundError, finally), Home → <strong>Safe int parse</strong>, MCQ Unit 5; in writing, explain logic error vs exception.</p>

<h3>B2.1.4 — Debugging techniques (describe &amp; use)</h3>
<table class="study-table"><thead><tr><th>Technique</th><th>What you do</th><th>When it helps</th></tr></thead>
<tbody>
<tr><td><strong>Trace table</strong></td><td>Track line, each variable, and output after each step.</td><td>Loops, search, if/elif — required for B2.1.1 traces too.</td></tr>
<tr><td><strong>Print debugging</strong></td><td>Temporary <code>print(i, x)</code> inside loops or functions.</td><td>Quick check of “what is i here?”</td></tr>
<tr><td><strong>Breakpoint / step</strong></td><td>Click gutter in VS Code/Cursor → red dot; Run → Start Debugging; Step Over (F10) and watch Variables.</td><td>Find the first line where a value becomes wrong.</td></tr>
<tr><td><strong>Step-by-step execution</strong></td><td>Execute one statement at a time mentally or in a tracer.</td><td>MCQ “what is printed?” — Home trace panel &amp; Trace guide.</td></tr>
</tbody></table>
<p><strong>Trace table template</strong> (copy on paper for any loop):</p>
<table class="study-table"><thead><tr><th>Line</th><th>i</th><th>total</th><th>Notes / output</th></tr></thead>
<tbody>
<tr><td>init</td><td>—</td><td>0</td><td></td></tr>
<tr><td>loop body</td><td>0</td><td>…</td><td>update after each assignment</td></tr>
<tr><td>loop body</td><td>1</td><td>…</td><td>stop when loop exits</td></tr>
</tbody></table>
<p><strong>Practice:</strong> Parts 1–8 worked traces; Home <strong>Trace guide</strong>; one failed MCQ redone with a blank table before reading the explanation.</p>

<h3>B2.2.2 — 1D &amp; 2D lists (construct &amp; traverse)</h3>
<p><strong>Dynamic list:</strong> Python lists (like Java ArrayLists) can grow and shrink — <code>append</code> / <code>pop</code> change length at run time. Fixed-size arrays are a Java idea; IB Python tasks use lists.</p>
<table class="study-table"><thead><tr><th>Skill</th><th>Python</th></tr></thead>
<tbody>
<tr><td>1D list</td><td><code>nums = [3, 1, 4]</code> — index, slice, loop <code>for x in nums</code> or <code>for i in range(len(nums))</code></td></tr>
<tr><td>Add / remove</td><td><code>append</code>, <code>extend</code>, <code>insert</code>, <code>remove</code>, <code>pop</code></td></tr>
<tr><td>2D list</td><td>List of lists: <code>grid[r][c]</code> — row then column</td></tr>
<tr><td>Build 2D safely</td><td><code>[[0]*cols for _ in range(rows)]</code> — not <code>[[0]*cols]*rows</code></td></tr>
<tr><td>Traverse 2D</td><td>Nested loops: outer row, inner column</td></tr>
</tbody></table>
<pre class="mcq-code">def sum_grid(grid):
    total = 0
    for row in grid:
        for cell in row:
            total = total + cell
    return total</pre>
<p><strong>Practice:</strong> Part 5, Part 10, Home → Unit 13 (<code>sum_grid</code>, <code>make_grid</code>, print grid), Trace guide lists / 2D CFU.</p>

<h3>B2.4.2 — Linear vs binary search (construct, trace, efficiency)</h3>
<table class="study-table"><thead><tr><th></th><th>Linear</th><th>Binary</th></tr></thead>
<tbody>
<tr><td>Data</td><td>Any order</td><td><strong>Sorted</strong> (or indexed like a phone book by name)</td></tr>
<tr><td>Worst comparisons</td><td>O(n) — every item once</td><td>O(log n) — halve each step</td></tr>
<tr><td>Typical average</td><td>~n/2 comparisons if item exists</td><td>~log n each lookup</td></tr>
<tr><td>Typical use</td><td>Small/unsorted list; search by field that is not the sort key</td><td>Large sorted list; repeated lookups on same data</td></tr>
</tbody></table>
<p><strong>Syllabus scenario (both directions):</strong></p>
<ul>
<li>Contacts sorted by <strong>name</strong> → find “Dee’s” phone: <strong>binary search</strong> on names (efficient).</li>
<li>Same book, find <strong>who owns 555-0199</strong> when entries are not sorted by number → <strong>linear search</strong> (or rebuild index).</li>
</ul>
<p><strong>Construct:</strong> you should write both algorithms from memory — see Part 7–8 and Home → Constructs · search (<code>linear_search</code>, <code>binary_search</code>).</p>
<p><strong>Practice:</strong> Part 7–9, MCQ Unit 1 &amp; 9, Trace guide search — trace until <code>low &gt; high</code> or return index.</p>

<h3>Quick self-rating (honest check)</h3>
<ol class="study-drill">
<li>Can I fill a trace table (line + variables) for a 5-line loop without running code? (B2.1.1, B2.1.4)</li>
<li>Can I trace <code>global count</code> across two function calls? (B2.1.1)</li>
<li>Can I write slice + <code>for ch in s</code> + concat for a string task? (B2.1.2)</li>
<li>Can I explain try/except/finally, ValueError input, FileNotFoundError, and why logic errors need a code fix? (B2.1.3)</li>
<li>Have I used a breakpoint and Step Over at least once? (B2.1.4)</li>
<li>Can I add/remove in 1D and write <code>sum_grid</code> with nested loops? (B2.2.2)</li>
<li>Can I code <code>linear_search</code> and <code>binary_search</code> and pick which for name vs phone lookup? (B2.4.2)</li>
</ol>
<p>If any item is shaky, drill that part first before chasing a higher rubric band.</p>`,
  },
];

window.STUDY_GUIDE = STUDY_GUIDE;

