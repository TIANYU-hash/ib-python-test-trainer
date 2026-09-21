function buildStudyNav() {
  const nav = document.getElementById("studyNav");
  if (!nav || !window.STUDY_GUIDE) return;

  const block = document.createElement("div");
  block.className = "unit-block";
  const label = document.createElement("div");
  label.className = "unit-label";
  label.textContent = "Study · Traced examples";
  block.appendChild(label);

  for (const sl of window.STUDY_GUIDE) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lesson-link";
    btn.dataset.study = sl.id;
    btn.textContent = sl.title;
    btn.addEventListener("click", () => {
      if (window.StudyGuide) window.StudyGuide.open(sl.id);
    });
    block.appendChild(btn);
  }

  nav.appendChild(block);
}

function setStudyNavActive(lessonId) {
  document.querySelectorAll(".lesson-link[data-study]").forEach((b) => {
    b.classList.toggle("active", b.dataset.study === lessonId);
  });
}

function initStudyPage() {
  if (!window.StudyGuide) return;
  window.StudyGuide.init();
  buildStudyNav();

  window.onStudyGuideOpen = (lessonId) => {
    setStudyNavActive(lessonId);
    if (lessonId) {
      const url = `${location.pathname}${location.search}#${lessonId}`;
      history.replaceState(null, "", url);
    }
  };

  let start = "study-01";
  const hash = location.hash.replace(/^#/, "");
  if (hash && window.STUDY_GUIDE.some((l) => l.id === hash)) {
    start = hash;
  }

  window.StudyGuide.open(start);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStudyPage);
} else {
  initStudyPage();
}
