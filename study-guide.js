/**
 * Study guide UI — content lives in study-content.js
 */
function studyEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getStudyGuide() {
  return window.STUDY_GUIDE || [];
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
    const guide = getStudyGuide();
    const lesson = guide.find((l) => l.id === this.currentId);
    if (!lesson || !this.root) return;
    const idx = guide.findIndex((l) => l.id === lesson.id);

    this.root.innerHTML = `
      <div class="study-guide">
        <div class="lesson-meta">
          <span class="chip">Study guide</span>
          <span>Part ${idx + 1} of ${guide.length}</span>
        </div>
        <h2>${studyEscape(lesson.title)}</h2>
        <div class="instructions study-body">${lesson.html}</div>
        <div class="lesson-nav">
          <button type="button" class="ghost" id="studyPrev" ${idx <= 0 ? "disabled" : ""}>← Previous</button>
          <button type="button" class="ghost" id="studyNext" ${idx >= guide.length - 1 ? "disabled" : ""}>Next part →</button>
        </div>
      </div>`;

    document.getElementById("studyPrev")?.addEventListener("click", () => {
      if (idx > 0) this.open(guide[idx - 1].id);
    });
    document.getElementById("studyNext")?.addEventListener("click", () => {
      if (idx < guide.length - 1) this.open(guide[idx + 1].id);
    });
  },
};

window.StudyGuide = StudyGuide;
