/**
 * Study guide — traced examples, tricks & traps through linear & binary search.
 * @typedef {{ id: string, title: string, html: string }} StudyLesson
 */

/** @type {StudyLesson[]} */
const STUDY_GUIDE = [
  {
    id: "study-01",
    title: "1 · Values & operators",
    html: `<p>Trace <strong>one expression at a time</strong>. MCQs often differ by a float, one remainder, or print vs return.</p>
<h3>Rules</h3>
<table class="study-table"><thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td><code>/</code></td><td>Float division (Python 3)</td><td><code>48 / 2</code> → <strong>24.0</strong></td></tr>
<tr><td><code>//</code></td><td>Floor division</td><td><code>17 // 5</code> → <strong>3</strong></td></tr>
<tr><td><code>%</code></td><td>Remainder</td><td><code>17 % 5</code> → <strong>2</strong></td></tr>
<tr><td><code>**</code></td><td>Power (right-associative)</td><td><code>2**3**2</code> → <code>2**9</code> = <strong>512</strong></td></tr>
</tbody></table>
<h3>Worked trace</h3>
<pre class="mcq-code">print(48 % 2, 48 / 2)</pre>
<table class="study-table"><thead><tr><th>Step</th><th>Expression</th><th>Result</th></tr></thead>
<tbody>
<tr><td>1</td><td><code>48 % 2</code></td><td><code>0</code></td></tr>
<tr><td>2</td><td><code>48 / 2</code></td><td><code>24.0</code></td></tr>
<tr><td>3</td><td><code>print(...)</code></td><td><strong>0 24.0</strong></td></tr>
</tbody></table>
<div class="study-trap"><strong>Trap:</strong> <code>10 / 5</code> prints <code>2.0</code>, not <code>2</code>. “Even division” still float.</div>
<div class="study-trap"><strong>Trap:</strong> Mixing <code>/</code> and <code>//</code> on the same line — evaluate each part separately.</div>
<div class="study-trick"><strong>Trick:</strong> On print MCQs, write three results in order: <code>%</code>, then <code>//</code> if present, then <code>/</code> last.</div>
<h3>Types &amp; errors</h3>
<ul>
<li><code>"7" + 3</code> → <strong>TypeError</strong> (str + int).</li>
<li><code>int("3.9")</code> or <code>float("cat")</code> → <strong>ValueError</strong> (bad content).</li>
<li><code>input()</code> → always a <strong>string</strong> until you convert.</li>
</ul>
<div class="study-trap"><strong>Trap:</strong> Confusing TypeError vs ValueError — wrong <em>type</em> of operation vs wrong <em>content</em> for conversion.</div>
<div class="study-trick"><strong>Trick:</strong> “What does calling f return?” ≠ “what prints?” — assignment stores; print shows on screen only.</div>`,
  },
  {
    id: "study-02",
    title: "2 · Booleans & and/or/not",
    html: `<h3>Rules</h3>
<ul>
<li><strong>Falsy:</strong> <code>0</code>, <code>0.0</code>, <code>""</code>, <code>[]</code>, <code>{}</code>, <code>None</code>, <code>False</code>.</li>
<li><strong>Truthy:</strong> <code>[0]</code>, <code>"False"</code>, <code>-1</code>, any non-empty string/list.</li>
<li><strong>Order:</strong> <code>not</code> → <code>and</code> → <code>or</code> (unless parentheses).</li>
</ul>
<h3>Short-circuit (must know)</h3>
<table class="study-table"><thead><tr><th>Expression</th><th>Right side runs?</th></tr></thead>
<tbody>
<tr><td><code>False and anything</code></td><td><strong>No</strong></td></tr>
<tr><td><code>True and anything</code></td><td>Yes</td></tr>
<tr><td><code>True or anything</code></td><td><strong>No</strong></td></tr>
<tr><td><code>False or anything</code></td><td>Yes</td></tr>
</tbody></table>
<pre class="mcq-code">print(not (7 &gt; 9 and 7 == 10))</pre>
<table class="study-table"><thead><tr><th>Step</th><th>Result</th></tr></thead>
<tbody>
<tr><td><code>7 &gt; 9</code></td><td>False</td></tr>
<tr><td><code>False and …</code></td><td>False (second part skipped)</td></tr>
<tr><td><code>not False</code></td><td><strong>True</strong></td></tr>
</tbody></table>
<pre class="mcq-code">x = 0
flag = x or len("ab")
print(flag)   # 2</pre>
<div class="study-trick"><strong>Trick:</strong> For <code>not (A and B)</code>, evaluate <code>A</code> first — if <code>A</code> is false, you never need <code>B</code>.</div>
<div class="study-trap"><strong>Trap:</strong> Assuming every function on the line runs — side effects (append, print) may never happen.</div>
<div class="study-trap"><strong>Trap:</strong> <code>if x == 3 or 5:</code> is <code>(x==3) or 5</code> → almost always <strong>True</strong> because <code>5</code> is truthy.</div>`,
  },
  {
    id: "study-03",
    title: "3 · if / elif / else",
    html: `<h3>Rules</h3>
<ul>
<li>Only <strong>one</strong> branch among <code>if / elif / else</code> runs.</li>
<li>Test top → bottom; first true wins; rest skipped.</li>
<li><code>elif</code> order matters: put <strong>stricter</strong> tests first (90 before 80).</li>
</ul>
<pre class="mcq-code">score = 85
if score &gt;= 90:
    g = "A"
elif score &gt;= 80:
    g = "B"
else:
    g = "F"
print(g)</pre>
<p>85: first test false, second true → <strong>B</strong>. 100 must hit <code>&gt;= 90</code>, not stop at 80.</p>
<h3>Chained comparisons</h3>
<pre class="mcq-code">13 &lt;= age &lt;= 19   # both must hold — inclusive range</pre>
<h3>Float compare</h3>
<div class="study-trick"><strong>Trick:</strong> <code>0.1 + 0.2 == 0.3</code> is often false in memory — use <code>round(x, 2)</code> before compare on tests.</div>
<div class="study-trap"><strong>Trap:</strong> <code>if x == 3 or 5</code> — write <code>x == 3 or x == 5</code>.</div>
<div class="study-trap"><strong>Trap:</strong> Using <code>elif</code> in wrong order (80 before 90) makes 100 become B instead of A.</div>`,
  },
  {
    id: "study-04",
    title: "4 · Loops (range, while)",
    html: `<h3><code>range</code></h3>
<p><code>range(start, stop, step)</code> — include <code>start</code>, stop <strong>before</strong> <code>stop</code>.</p>
<pre class="mcq-code">list(range(2, 11, 3))   # [2, 5, 8]</pre>
<pre class="mcq-code">count = 0
for i in range(2, 11, 3):
    count += 1
print(count)   # 3</pre>
<h3><code>while</code></h3>
<p>Condition checked <strong>before</strong> each body run.</p>
<pre class="mcq-code">n = 12
while n &gt; 0:
    n = n - 5
print(n)   # -3</pre>
<div class="study-trap"><strong>Trap:</strong> <code>while i &lt;= len(items): print(items[i])</code> on 3 items — when <code>i == 3</code>, still <code>3 &lt;= 3</code> → <code>items[3]</code> → <strong>IndexError</strong>. Valid indices: 0,1,2 only. Use <code>i &lt; len(items)</code>.</div>
<div class="study-trap"><strong>Trap:</strong> Infinite loop if counter never updates — don’t assume <code>i</code> increases unless the code shows it.</div>
<h3><code>continue</code> / <code>break</code></h3>
<pre class="mcq-code">total = 0
for k in range(1, 4):
    if k == 2:
        continue
    total += k
print(total)   # 4</pre>
<div class="study-trick"><strong>Trick:</strong> Nested loops — total inner runs = product (e.g. 3×4 = 12). Count, don’t memorize one formula name.</div>`,
  },
  {
    id: "study-05",
    title: "5 · Lists & mutations",
    html: `<h3>Indexing &amp; slicing</h3>
<pre class="mcq-code">nums = [10, 20, 30]
print(nums[1], nums[1:3], nums[-1])   # 20 [20, 30] 30</pre>
<p>Slice: include start index, <strong>exclude</strong> end. <code>nums[1:10]</code> past end is OK.</p>
<h3>Methods</h3>
<table class="study-table"><thead><tr><th>Call</th><th>Mutates?</th><th>Returns</th></tr></thead>
<tbody>
<tr><td><code>append(x)</code></td><td>Yes</td><td><code>None</code></td></tr>
<tr><td><code>extend(iter)</code></td><td>Yes</td><td><code>None</code></td></tr>
<tr><td><code>pop(i)</code></td><td>Yes</td><td>removed item</td></tr>
<tr><td><code>sort()</code></td><td>Yes</td><td><strong>None</strong></td></tr>
<tr><td><code>sorted(L)</code></td><td>No</td><td>new list</td></tr>
</tbody></table>
<pre class="mcq-code">bag = [1, 2]
bag.append([3])
print(len(bag), bag[-1])   # 3 [3]</pre>
<pre class="mcq-code">nums = [4, 5, 7]
t = nums.sort()
print(t, nums[0])   # None 4</pre>
<div class="study-trap"><strong>Trap:</strong> <code>y = L.sort()</code> — <code>y</code> is <code>None</code>, not the sorted list.</div>
<div class="study-trap"><strong>Trap:</strong> <code>append([3])</code> adds <strong>one</strong> element (the list). <code>extend([3])</code> adds the number 3.</div>
<div class="study-trap"><strong>Trap:</strong> <code>pop("Mo")</code> → TypeError. Use <code>pop(index)</code> or <code>remove("Mo")</code>.</div>
<h3>Aliases &amp; 2D grid</h3>
<pre class="mcq-code">a = [1, 2]; b = a; b.append(3)   # a is [1, 2, 3]</pre>
<pre class="mcq-code">grid = [[0]*3]*3        # BAD — one row shared
grid = [[0]*3 for _ in range(3)]   # GOOD</pre>
<div class="study-trap"><strong>Trap:</strong> <code>[[0]*3]*3</code> — changing <code>grid[0][0]</code> can change every row.</div>
<pre class="mcq-code">def f(L):
    L = L + [9]
    return L
x = [1]; y = f(x)
print(x, y)   # [1] [1, 9]</pre>
<div class="study-trick"><strong>Trick:</strong> Before each line ask: <strong>rebind</strong> (<code>L = …</code>) or <strong>mutate</strong> (<code>append</code>, <code>sort</code>)?</div>`,
  },
  {
    id: "study-06",
    title: "6 · Strings, dicts & functions",
    html: `<h3>Strings</h3>
<p>Immutable — build new strings.</p>
<pre class="mcq-code">word = "hello"
word = word[0].upper() + word[1:]
print(word)   # Hello</pre>
<table class="study-table"><thead><tr><th>Method</th><th>Effect</th></tr></thead>
<tbody>
<tr><td><code>capitalize()</code></td><td>First upper, rest lower</td></tr>
<tr><td><code>title()</code></td><td>Each word capitalized</td></tr>
<tr><td><code>"sub" in s</code></td><td>Safe substring test</td></tr>
</tbody></table>
<div class="study-trap"><strong>Trap:</strong> <code>word[0] = "H"</code> → TypeError.</div>
<div class="study-trap"><strong>Trap:</strong> <code>find(x) &gt; 0</code> misses match at index 0 — use <code>&gt;= 0</code> or <code>in</code>.</div>
<h3>Dicts</h3>
<pre class="mcq-code">d = {"x": 7}
print(d.get("w", 0), d.get("x"))   # 0 7</pre>
<div class="study-trap"><strong>Trap:</strong> <code>d.get("w")</code> without default → <code>None</code>. With <code>, 0</code> → <code>0</code>.</div>
<div class="study-trap"><strong>Trap:</strong> <code>d["missing"]</code> → KeyError; <code>for key in d:</code> loops keys, not values.</div>
<pre class="mcq-code">cards = [{"v": 2}, {"v": 5}]
print(cards[1]["v"] + cards[0]["v"])   # 7</pre>
<h3>Functions</h3>
<pre class="mcq-code">def twice(n):
    print(n * 2)
    return n + 1
x = twice(4)
print(x)   # screen: 8 then 5</pre>
<div class="study-trap"><strong>Trap:</strong> “Calling f returns” with only <code>print</code> inside → <strong>None</strong>.</div>
<div class="study-trap"><strong>Trap:</strong> Code after <code>return</code> never runs. Bare <code>return</code> → None.</div>
<pre class="mcq-code">def bump():
    count = count + 1   # UnboundLocalError without global</pre>
<div class="study-trick"><strong>Trick:</strong> Tuple return: <code>return a, b</code> → caller can <code>x, y = f()</code>.</div>`,
  },
  {
    id: "study-07",
    title: "7 · Linear search",
    html: `<h3>When to use</h3>
<ul>
<li>List in <strong>any order</strong>.</li>
<li>Check each index (or each value) until found or end.</li>
<li>Worst case: <strong>n</strong> comparisons → <strong>O(n)</strong>.</li>
</ul>
<pre class="mcq-code">def linear_search(a, target):
    for i in range(len(a)):
        if a[i] == target:
            return i
    return -1</pre>
<p><strong>Trace:</strong> <code>a = [4, 9, 2, 7]</code>, target <code>7</code> → return <strong>3</strong>.</p>
<h3>Variant: first where condition holds</h3>
<pre class="mcq-code"># first i where a[i] &gt;= t
find([3, 5, 8], 6)   # index 2 (8, not 5)</pre>
<div class="study-trick"><strong>Trick:</strong> Read the condition in the code (<code>==</code> vs <code>&gt;=</code>) — don’t assume “find exact target”.</div>
<div class="study-trap"><strong>Trap:</strong> Returning index vs returning value — trace what the question asks.</div>
<div class="study-trap"><strong>Trap:</strong> <code>-1</code> convention means “not found” — not the same as index 0.</div>
<h3>Identify in code</h3>
<ul>
<li>Single loop over indices or elements.</li>
<li>No <code>mid</code>, no halving <code>low</code>/<code>high</code>.</li>
</ul>`,
  },
  {
    id: "study-08",
    title: "8 · Binary search",
    html: `<h3>Requirements</h3>
<ul>
<li>Data must be <strong>sorted</strong> (ascending unless problem says otherwise).</li>
<li><code>low</code>, <code>high</code>, <code>mid</code> are <strong>indices</strong>, not values.</li>
<li>Usually <code>while low &lt;= high</code>.</li>
</ul>
<pre class="mcq-code">mid = (low + high) // 2
if target &lt; a[mid]:  high = mid - 1
elif target &gt; a[mid]: low = mid + 1
else: return mid</pre>
<p><strong>Trace:</strong> <code>[2, 5, 8, 12, 16]</code>, target <code>12</code></p>
<table class="study-table"><thead><tr><th>low</th><th>high</th><th>mid</th><th>a[mid]</th><th>action</th></tr></thead>
<tbody>
<tr><td>0</td><td>4</td><td>2</td><td>8</td><td>12 &gt; 8 → low = 3</td></tr>
<tr><td>3</td><td>4</td><td>3</td><td>12</td><td><strong>found → 3</strong></td></tr>
</tbody></table>
<p><strong>Not found</strong> (e.g. target <code>6</code>): eventually <code>low &gt; high</code> → <code>-1</code>.</p>
<div class="study-trap"><strong>Trap:</strong> Target equals <code>a[mid]</code> on try 1 on an <strong>unsorted</strong> list — luck, not proof binary search works.</div>
<div class="study-trap"><strong>Trap:</strong> Using <code>&lt;= len</code> or value at mid as “median” — mid is an <strong>index</strong>; left/right discard depends on <strong>sorted order</strong>.</div>
<div class="study-trick"><strong>Trick:</strong> ~log₂(n) steps — 1000 items ≈ 10 comparisons worst case.</div>
<div class="study-trick"><strong>Trick:</strong> After “too small”, <code>low = mid + 1</code> (not mid). After “too big”, <code>high = mid - 1</code>.</div>`,
  },
  {
    id: "study-09",
    title: "9 · Master checklist & drill",
    html: `<h3>Linear vs binary</h3>
<table class="study-table"><thead><tr><th></th><th>Linear</th><th>Binary</th></tr></thead>
<tbody>
<tr><td>Sorted required?</td><td>No</td><td><strong>Yes</strong></td></tr>
<tr><td>Typical code</td><td><code>for i in range(len(a))</code></td><td><code>while low &lt;= high</code>, <code>mid</code></td></tr>
<tr><td>Big O</td><td>O(n)</td><td>O(log n)</td></tr>
</tbody></table>
<h3>10-second MCQ checklist</h3>
<ol class="study-drill">
<li><code>/</code> vs <code>//</code> vs <code>%</code> — float on <code>/</code>?</li>
<li><code>sort()</code> → <code>None</code>?</li>
<li><code>append</code> vs <code>extend</code>?</li>
<li><code>pop(index)</code> vs <code>remove(value)</code>?</li>
<li>Shared list / <code>[[0]*3]*3</code>?</li>
<li><code>return</code> vs <code>print</code>?</li>
<li>Binary: sorted? <code>low</code>/<code>high</code> indices?</li>
<li><code>and</code>/<code>or</code> short-circuit?</li>
<li>Slice end exclusive; <code>&lt;= len</code> off-by-one?</li>
<li>Tuple <code>(5,)</code> comma?</li>
</ol>
<h3>Mixed drill (cover answers, trace first)</h3>
<ol class="study-drill">
<li><code>print(17 // 5, 17 % 5, 17 / 5)</code> → <strong>3 2 3.4</strong></li>
<li><code>print(not (3 &gt; 3 and 3 == 4))</code> → <strong>True</strong></li>
<li><code>d.get("w", 0), d.get("x")</code> with <code>d={"x":7}</code> → <strong>0 7</strong></li>
<li>Linear: first <code>&gt;= 6</code> in <code>[3,5,8]</code> → index <strong>2</strong></li>
<li>Binary: find <code>12</code> in <code>[2,5,8,12,16]</code> → index <strong>3</strong></li>
</ol>
<p>Next: <a href="index.html">Home</a> for coding + MCQ, or <strong>Trace guide</strong> on the main site for CFU quizzes.</p>`,
  },
];

function studyEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const StudyGuide = {
  root: null,
  currentId: null,

  init() {
    this.root = document.getElementById("studyGuideRoot");
  },

  open(lessonId) {
    if (!this.root) return;
    this.currentId = lessonId;
    this.render();
    if (window.onStudyGuideOpen) window.onStudyGuideOpen(lessonId);
  },

  render() {
    const lesson = STUDY_GUIDE.find((l) => l.id === this.currentId);
    if (!lesson || !this.root) return;
    const idx = STUDY_GUIDE.findIndex((l) => l.id === lesson.id);

    this.root.innerHTML = `
      <div class="study-guide">
        <div class="lesson-meta">
          <span class="chip">Study guide</span>
          <span>Part ${idx + 1} of ${STUDY_GUIDE.length}</span>
        </div>
        <h2>${studyEscape(lesson.title)}</h2>
        <div class="instructions study-body">${lesson.html}</div>
        <div class="lesson-nav">
          <button type="button" class="ghost" id="studyPrev" ${idx <= 0 ? "disabled" : ""}>← Previous</button>
          <button type="button" class="ghost" id="studyNext" ${idx >= STUDY_GUIDE.length - 1 ? "disabled" : ""}>Next part →</button>
        </div>
      </div>`;

    document.getElementById("studyPrev")?.addEventListener("click", () => {
      if (idx > 0) this.open(STUDY_GUIDE[idx - 1].id);
    });
    document.getElementById("studyNext")?.addEventListener("click", () => {
      if (idx < STUDY_GUIDE.length - 1) this.open(STUDY_GUIDE[idx + 1].id);
    });
  },
};

window.STUDY_GUIDE = STUDY_GUIDE;
window.StudyGuide = StudyGuide;
