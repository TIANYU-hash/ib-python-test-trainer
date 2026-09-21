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
<h3>Scope trap</h3>
<pre class="mcq-code">count = 0
def bump():
    count = count + 1   # UnboundLocalError</pre>
<p>Assignment makes <code>count</code> local for the whole function, so the right-hand <code>count</code> is not the global. Need <code>global count</code> to mutate global (rare on your tests, but MCQs ask it).</p>
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
    html: `<p>These are the “small” rules that are easy to forget because each one only matters in one type of question. Each entry explains <strong>what</strong> happens and <strong>one example</strong> — not a compressed bullet list.</p>

<div class="study-rule"><p class="study-rule-title">= vs ==</p>
<p><code>=</code> assigns a value to a name. <code>==</code> compares two values. <code>if x = 3</code> is illegal; <code>if x == 3</code> is a comparison.</p></div>

<div class="study-rule"><p class="study-rule-title">print with commas</p>
<p><code>print(a, b, c)</code> evaluates a, then b, then c, then shows them on <strong>one line</strong> separated by spaces. It is not the same as printing three separate lines.</p></div>

<div class="study-rule"><p class="study-rule-title">Index 0 and valid indices</p>
<p>The first slot is index <strong>0</strong>. If <code>len(items) == 3</code>, legal indices are <strong>0, 1, 2</strong> only. Index <code>3</code> is one past the end → IndexError (unless you are slicing).</p></div>

<div class="study-rule"><p class="study-rule-title">Slice end is excluded</p>
<p><code>items[1:3]</code> takes indices 1 and 2, not 3. <code>items[:2]</code> is the first two elements. Empty slice past the end is OK: <code>items[99:]</code> → <code>[]</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">range stop value</p>
<p><code>range(2, 11, 3)</code> produces 2, 5, 8 — it never includes 11. Think “stop before stop.”</p></div>

<div class="study-rule"><p class="study-rule-title">Iterable (what for-loops need)</p>
<p><code>for x in something</code> requires <code>something</code> to be iterable (list, string, range, dict keys, etc.). <code>for x in 7</code> fails because an int is not iterable. <code>tuple(5)</code> fails for the same reason; <code>tuple([5])</code> works.</p></div>

<div class="study-rule"><p class="study-rule-title">String + string only</p>
<p><code>"a" + "b"</code> → <code>"ab"</code>. <code>"7" + 3</code> → TypeError. Use <code>int("7") + 3</code> if you need math.</p></div>

<div class="study-rule"><p class="study-rule-title">String methods do not change the old string</p>
<p><code>s.lower()</code> returns a new string. Unless you assign back (<code>s = s.lower()</code>), <code>s</code> stays the same.</p></div>

<div class="study-rule"><p class="study-rule-title">in vs find</p>
<p><code>"cat" in phrase</code> → True/False. <code>phrase.find("cat")</code> → index or -1. Trap: <code>find("cat") &gt; 0</code> is false when <code>"cat"</code> starts at index 0 — use <code>&gt;= 0</code> or use <code>in</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">append vs extend</p>
<p><code>append(x)</code> adds <strong>one</strong> item to the end (even if x is a list). <code>extend([1,2])</code> adds two separate items. <code>[1,2].append([3])</code> → <code>[1,2,[3]]</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">remove vs pop</p>
<p><code>remove(value)</code> deletes the <strong>first</strong> matching value. <code>pop(index)</code> deletes by position and returns that item. <code>pop("name")</code> is wrong — names are not indices.</p></div>

<div class="study-rule"><p class="study-rule-title">List += often acts like extend</p>
<p><code>nums += [4, 5]</code> usually mutates the same list object (like extend). That is different from <code>nums = nums + [4, 5]</code>, which builds a new list.</p></div>

<div class="study-rule"><p class="study-rule-title">Copying a list (avoid accidental alias)</p>
<p><code>b = a</code> shares the same list. To copy: <code>b = a.copy()</code> or <code>b = a[:]</code> or <code>b = list(a)</code>. Still shallow: inner lists may be shared.</p></div>

<div class="study-rule"><p class="study-rule-title">One-element tuple comma</p>
<p><code>(5)</code> is just the int 5 in parentheses. A tuple with one item is <code>(5,)</code> — the comma is required.</p></div>

<div class="study-rule"><p class="study-rule-title">dict[key] vs get</p>
<p><code>d["missing"]</code> → KeyError. <code>d.get("missing")</code> → <code>None</code>. <code>d.get("missing", 0)</code> → <code>0</code> when you supply a default.</p></div>

<div class="study-rule"><p class="study-rule-title">Looping a dict</p>
<p><code>for k in prices:</code> gives each <strong>key</strong>. Values need <code>prices[k]</code> or <code>.values()</code> / <code>.items()</code>.</p></div>

<div class="study-rule"><p class="study-rule-title">2D list indexing</p>
<p><code>grid[row][col]</code> — row first (which sublist), then column (index inside that row). Not the other way around.</p></div>

<div class="study-rule"><p class="study-rule-title">try / except (when except runs)</p>
<p>The <code>try</code> block runs line by line. If an error happens, Python jumps to <code>except</code> and skips the rest of <code>try</code>. If no error, <code>except</code> is skipped entirely.</p></div>

<div class="study-rule"><p class="study-rule-title">break vs continue vs pass</p>
<p><code>break</code> leaves the loop completely. <code>continue</code> skips to the next iteration of the same loop. <code>pass</code> does nothing — placeholder so syntax is valid.</p></div>

<div class="study-rule"><p class="study-rule-title">Checking for None</p>
<p><code>x is None</code> tests identity (common style). <code>x == None</code> often works but <code>is None</code> is what many style guides prefer on tests.</p></div>

<div class="study-rule"><p class="study-rule-title">== vs is (values vs same object)</p>
<p><code>3 == 3.0</code> is True (same numeric value). <code>3 is 3.0</code> is False (different types/objects). For small ints Python may cache — on tests, trust the rule: <code>==</code> value, <code>is</code> identity.</p></div>

<div class="study-rule"><p class="study-rule-title">Nested loops — how many times</p>
<p>Inner loop finishes fully for each outer step. Two loops 0..n-1 → about <code>n × n</code> body runs (unless break). That is why nested loops often mean O(n²).</p></div>

<div class="study-rule"><p class="study-rule-title">Binary search loop condition</p>
<p>Common pattern: <code>while low &lt;= high</code>. When <code>low</code> passes <code>high</code>, the search window is empty → not found. <code>low</code> and <code>high</code> are always indices, not the values stored in the list.</p></div>

<div class="study-rule"><p class="study-rule-title">Linear “not found” convention</p>
<p>Many functions return <code>-1</code> when no index matches. That is a sentinel, not “index -1” (last element).</p></div>

<p>See also <strong>Part 2</strong> for the full <code>and</code>/<code>or</code> short-circuit table — that topic deserves its own page, not one line.</p>`,
  },
];

window.STUDY_GUIDE = STUDY_GUIDE;

