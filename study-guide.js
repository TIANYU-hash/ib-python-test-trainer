/**
 * Study guide — traced examples from basics through linear & binary search.
 * @typedef {{ id: string, title: string, html: string }} StudyLesson
 */

/** @type {StudyLesson[]} */
const STUDY_GUIDE = [
  {
    id: "study-01",
    title: "1 · Values & operators",
    html: `<p>Work line by line. In Python 3, <code>/</code> is always float division.</p>
<table class="study-table"><thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td><code>/</code></td><td>Float division</td><td><code>48 / 2</code> → <strong>24.0</strong></td></tr>
<tr><td><code>//</code></td><td>Floor division</td><td><code>17 // 5</code> → <strong>3</strong></td></tr>
<tr><td><code>%</code></td><td>Remainder</td><td><code>17 % 5</code> → <strong>2</strong></td></tr>
</tbody></table>
<pre class="mcq-code">print(48 % 2, 48 / 2)</pre>
<table class="study-table"><thead><tr><th>Step</th><th>Expression</th><th>Result</th></tr></thead>
<tbody>
<tr><td>1</td><td><code>48 % 2</code></td><td><code>0</code></td></tr>
<tr><td>2</td><td><code>48 / 2</code></td><td><code>24.0</code></td></tr>
<tr><td>3</td><td><code>print(...)</code></td><td><strong>0 24.0</strong> on screen</td></tr>
</tbody></table>
<p><strong>Trap:</strong> <code>10 / 5</code> is <code>2.0</code>, not <code>2</code>.</p>
<p><strong>print vs store:</strong> <code>x = 5 + 2</code> stores 7; only <code>print(x)</code> shows it. “Return” ≠ “print”.</p>`,
  },
  {
    id: "study-02",
    title: "2 · Booleans & and/or/not",
    html: `<p><strong>Falsy:</strong> <code>0</code>, <code>""</code>, <code>[]</code>, <code>{}</code>, <code>None</code>, <code>False</code>. <strong>Truthy:</strong> <code>[0]</code>, <code>"hi"</code>, etc.</p>
<p><strong>Short-circuit:</strong> <code>False and f()</code> never calls <code>f()</code>. <code>True or f()</code> never calls <code>f()</code>.</p>
<pre class="mcq-code">print(not (7 &gt; 9 and 7 == 10))</pre>
<table class="study-table"><thead><tr><th>Step</th><th>What happens</th></tr></thead>
<tbody>
<tr><td>1</td><td><code>7 &gt; 9</code> → <code>False</code></td></tr>
<tr><td>2</td><td><code>False and …</code> → <code>False</code> (<code>7 == 10</code> not evaluated)</td></tr>
<tr><td>3</td><td><code>not False</code> → <strong>True</strong></td></tr>
</tbody></table>
<pre class="mcq-code">print(not (3 &gt; 3 and 3 == 4))   # True — same pattern</pre>`,
  },
  {
    id: "study-03",
    title: "3 · if / elif / else",
    html: `<p><strong>Rule:</strong> at most <strong>one</strong> branch runs — first true test wins.</p>
<pre class="mcq-code">score = 85
if score &gt;= 90:
    g = "A"
elif score &gt;= 80:
    g = "B"
else:
    g = "F"
print(g)</pre>
<table class="study-table"><thead><tr><th>score</th><th>First match</th><th>g</th></tr></thead>
<tbody>
<tr><td>85</td><td><code>&gt;= 80</code></td><td><strong>B</strong></td></tr>
<tr><td>90</td><td><code>&gt;= 90</code></td><td><strong>A</strong></td></tr>
</tbody></table>
<p><strong>Trap:</strong> <code>if x == 3 or 5:</code> means <code>(x==3) or 5</code> → almost always True. Use <code>x == 3 or x == 5</code>.</p>`,
  },
  {
    id: "study-04",
    title: "4 · Loops (range, while)",
    html: `<p><code>range(2, 11, 3)</code> → values 2, 5, 8 (stop before 11).</p>
<pre class="mcq-code">count = 0
for i in range(2, 11, 3):
    count += 1
print(count)</pre>
<table class="study-table"><thead><tr><th>i</th><th>count</th></tr></thead>
<tbody><tr><td>2</td><td>1</td></tr><tr><td>5</td><td>2</td></tr><tr><td>8</td><td>3</td></tr></tbody></table>
<p><strong>Output:</strong> <code>3</code></p>
<pre class="mcq-code">n = 12
while n &gt; 0:
    n = n - 5
print(n)</pre>
<table class="study-table"><thead><tr><th>Run?</th><th>n after body</th></tr></thead>
<tbody><tr><td>yes</td><td>7 → 2 → -3</td></tr><tr><td>no</td><td><code>-3 &gt; 0</code> false</td></tr></tbody></table>
<p><strong>Output:</strong> <code>-3</code></p>
<p><strong>Trap:</strong> <code>while i &lt;= len(items)</code> on 3 items allows <code>i == 3</code> → <code>items[3]</code> → IndexError.</p>
<pre class="mcq-code">total = 0
for k in range(1, 4):
    if k == 2:
        continue
    total += k
print(total)   # 4</pre>`,
  },
  {
    id: "study-05",
    title: "5 · Lists & mutations",
    html: `<pre class="mcq-code">nums = [10, 20, 30]
print(nums[1], nums[1:3], nums[-1])   # 20 [20, 30] 30</pre>
<p>Slice includes start, <strong>excludes</strong> end.</p>
<pre class="mcq-code">bag = [1, 2]
bag.append([3])
print(len(bag), bag[-1])   # 3 [3]</pre>
<pre class="mcq-code">a = [15, 20, 23]
b = a.pop(1)
print(b, a)   # 20 [15, 23]</pre>
<p><strong>pop(index)</strong> — not name. Use <code>remove("Mo")</code> to drop by value.</p>
<pre class="mcq-code">nums = [4, 5, 7]
t = nums.sort()
print(t, nums[0])   # None 4</pre>
<p><strong>Alias:</strong></p>
<pre class="mcq-code">a = [1, 2]; b = a; b.append(3)   # a is [1, 2, 3]</pre>
<pre class="mcq-code">def f(L):
    L = L + [9]
    return L
x = [1]; y = f(x)
print(x, y)   # [1] [1, 9]</pre>
<p>Ask: <strong>rebind</strong> (<code>L = …</code>) or <strong>mutate</strong> (<code>append</code>, <code>sort</code>)?</p>`,
  },
  {
    id: "study-06",
    title: "6 · Strings & functions",
    html: `<pre class="mcq-code">word = "hello"
word = word[0].upper() + word[1:]
print(word)   # Hello</pre>
<p>Strings are <strong>immutable</strong> — no <code>word[0] = 'H'</code>.</p>
<pre class="mcq-code">def twice(n):
    print(n * 2)
    return n + 1
x = twice(4)
print(x)   # prints 8, then prints 5</pre>
<table class="study-table"><thead><tr><th>Step</th><th>Effect</th></tr></thead>
<tbody>
<tr><td><code>twice(4)</code></td><td>screen shows <strong>8</strong></td></tr>
<tr><td>return</td><td><strong>5</strong></td></tr>
<tr><td><code>print(x)</code></td><td><strong>5</strong></td></tr>
</tbody></table>
<pre class="mcq-code">def f():
    print(1)
# f() returns None — no return statement</pre>`,
  },
  {
    id: "study-07",
    title: "7 · Linear search",
    html: `<p>Any order. Walk indices <code>0 … len-1</code> until found or done.</p>
<pre class="mcq-code">def linear_search(a, target):
    for i in range(len(a)):
        if a[i] == target:
            return i
    return -1</pre>
<p><strong>Trace:</strong> <code>a = [4, 9, 2, 7]</code>, <code>target = 7</code></p>
<table class="study-table"><thead><tr><th>i</th><th>a[i]</th><th>== 7?</th></tr></thead>
<tbody>
<tr><td>0</td><td>4</td><td>no</td></tr>
<tr><td>1</td><td>9</td><td>no</td></tr>
<tr><td>2</td><td>2</td><td>no</td></tr>
<tr><td>3</td><td>7</td><td><strong>yes → return 3</strong></td></tr>
</tbody></table>
<p><strong>Variant</strong> — first index where <code>a[i] &gt;= t</code>:</p>
<pre class="mcq-code">find([3, 5, 8], 6)   # index 2 (8 is first &gt;= 6)</pre>
<table class="study-table"><thead><tr><th>i</th><th>a[i]</th><th>&gt;= 6?</th></tr></thead>
<tbody><tr><td>0</td><td>3</td><td>no</td></tr><tr><td>1</td><td>5</td><td>no</td></tr><tr><td>2</td><td>8</td><td><strong>yes</strong></td></tr></tbody></table>
<p><strong>Big O:</strong> O(n). <strong>Not found:</strong> often return <code>-1</code>.</p>`,
  },
  {
    id: "study-08",
    title: "8 · Binary search",
    html: `<p><strong>Sorted list only.</strong> <code>low</code> and <code>high</code> are <strong>indices</strong>.</p>
<pre class="mcq-code">def binary_search(a, target):
    low = 0
    high = len(a) - 1
    while low &lt;= high:
        mid = (low + high) // 2
        if a[mid] == target:
            return mid
        elif target &lt; a[mid]:
            high = mid - 1
        else:
            low = mid + 1
    return -1</pre>
<p><strong>Trace:</strong> <code>a = [2, 5, 8, 12, 16]</code>, <code>target = 12</code></p>
<table class="study-table"><thead><tr><th>low</th><th>high</th><th>mid</th><th>a[mid]</th><th>action</th></tr></thead>
<tbody>
<tr><td>0</td><td>4</td><td>2</td><td>8</td><td>12 &gt; 8 → low = 3</td></tr>
<tr><td>3</td><td>4</td><td>3</td><td>12</td><td><strong>found → 3</strong></td></tr>
</tbody></table>
<p><strong>Trace:</strong> same list, <code>target = 5</code></p>
<table class="study-table"><thead><tr><th>low</th><th>high</th><th>mid</th><th>a[mid]</th><th>action</th></tr></thead>
<tbody>
<tr><td>0</td><td>4</td><td>2</td><td>8</td><td>5 &lt; 8 → high = 1</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>2</td><td>5 &gt; 2 → low = 1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>5</td><td><strong>found → 1</strong></td></tr>
</tbody></table>
<p><strong>Not found</strong> (<code>target = 6</code>): eventually <code>low &gt; high</code> → return <code>-1</code>.</p>
<p><strong>Trap:</strong> hitting target at <code>mid</code> once on unsorted data does not make binary search valid.</p>
<p><strong>Big O:</strong> O(log n).</p>`,
  },
  {
    id: "study-09",
    title: "9 · Compare & mixed drill",
    html: `<table class="study-table"><thead><tr><th></th><th>Linear</th><th>Binary</th></tr></thead>
<tbody>
<tr><td>Order needed?</td><td>No</td><td><strong>Sorted</strong></td></tr>
<tr><td>Move</td><td>+1 index</td><td>Halve range</td></tr>
<tr><td>Typical loop</td><td><code>for i in range(len(a))</code></td><td><code>while low &lt;= high</code>, <code>mid</code></td></tr>
<tr><td>Big O</td><td>O(n)</td><td>O(log n)</td></tr>
</tbody></table>
<h3>Mixed answers (trace yourself)</h3>
<ol class="study-drill">
<li><code>print(17 // 5, 17 % 5, 17 / 5)</code> → <strong>3 2 3.4</strong></li>
<li><code>d = {"x": 7}; print(d.get("w", 0), d.get("x"))</code> → <strong>0 7</strong></li>
<li>First <code>&gt;= 6</code> in <code>[3, 5, 8]</code> → index <strong>2</strong></li>
<li>Binary find <code>12</code> in <code>[2, 5, 8, 12, 16]</code> → index <strong>3</strong></li>
</ol>
<p>Use <strong>Trace guide</strong> CFU and <strong>MCQ mock</strong> to practice after reading each part.</p>`,
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
