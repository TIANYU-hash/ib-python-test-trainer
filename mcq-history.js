/**
 * Remember completed MCQ stems/ids so new mocks skip them.
 */
const MCQ_SEEN_STORAGE = "ib-python-test-trainer-mcq-seen";
const MCQ_SEEN_MAX = 4000;

/** @param {{ id?: string, q: string }} item */
function mcqQuestionKey(item) {
  if (item.id && !String(item.id).startsWith("gen-")) {
    return "id:" + item.id;
  }
  return "q:" + item.q;
}

function loadMcqSeenSet() {
  try {
    const raw = JSON.parse(localStorage.getItem(MCQ_SEEN_STORAGE) || "[]");
    if (!Array.isArray(raw)) return new Set();
    return new Set(raw.filter((k) => typeof k === "string"));
  } catch {
    return new Set();
  }
}

function saveMcqSeenSet(set) {
  let arr = [...set];
  if (arr.length > MCQ_SEEN_MAX) {
    arr = arr.slice(arr.length - MCQ_SEEN_MAX);
  }
  localStorage.setItem(MCQ_SEEN_STORAGE, JSON.stringify(arr));
}

/** @param {{ id?: string, q: string }[]} items */
function markMcqQuestionsSeen(items) {
  if (!items || !items.length) return;
  const set = loadMcqSeenSet();
  for (const item of items) {
    set.add(mcqQuestionKey(item));
  }
  saveMcqSeenSet(set);
}

function clearMcqSeenHistory() {
  localStorage.removeItem(MCQ_SEEN_STORAGE);
}

function mcqSeenCount() {
  return loadMcqSeenSet().size;
}

window.mcqQuestionKey = mcqQuestionKey;
window.loadMcqSeenSet = loadMcqSeenSet;
window.markMcqQuestionsSeen = markMcqQuestionsSeen;
window.clearMcqSeenHistory = clearMcqSeenHistory;
window.mcqSeenCount = mcqSeenCount;
