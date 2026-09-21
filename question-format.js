/**
 * Render MCQ / CFU stems: prose + monospace code blocks with real indentation.
 */
function qfEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function qfNormalizeText(text) {
  let t = String(text).replace(/\r\n/g, "\n");
  if (!t.includes("\n") && (t.match(/;/g) || []).length >= 2) {
    t = t
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .join("\n");
  }
  return t;
}

function qfIsProseLine(line) {
  const s = line.trim();
  if (!s) return false;
  if (s.endsWith("?")) return true;
  if (/^(Which|What|How many|How does|Can you|Same list|After one|Best |Fix |Compare safely|Capitalize|Check if|A one-element|grid = \[\[0\]\*3\]\*3 is)/i.test(s)) {
    return true;
  }
  if (/^(Sorted a =|Bubble sort:|Nested loops:|One bubble pass|Binary search on \d)/i.test(s)) {
    return true;
  }
  return false;
}

function qfIsCodeLine(line) {
  const s = line.trim();
  if (!s) return false;
  if (qfIsProseLine(line)) return false;
  if (/^(print|def |for |while |if |elif |else:|class |import |return |break|continue|find\(|pass\b)/.test(s)) {
    return true;
  }
  if (/^[a-zA-Z_]\w*\s*=/.test(s)) return true;
  if (/^\s{2,}(print|if |elif |else:|return |n =|L =|total |count |g =|msg =|areas\.|b =|word =|sim =|k =)/.test(line)) {
    return true;
  }
  return false;
}

function qfTrimCodeIndent(lines) {
  const nonEmpty = lines.filter((l) => l.trim());
  if (!nonEmpty.length) return lines;
  const min = Math.min(...nonEmpty.map((l) => (l.match(/^(\s*)/) || ["", ""])[1].length));
  if (min <= 0) return lines;
  return lines.map((l) => (l.trim() ? l.slice(min) : ""));
}

function formatQuestionHtml(text) {
  const normalized = qfNormalizeText(text);
  const lines = normalized.split("\n");

  let codeStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (qfIsCodeLine(lines[i])) {
      codeStart = i;
      break;
    }
  }

  if (codeStart === -1) {
    const t = normalized.trim();
    if (qfIsCodeLine(t) && !t.includes("?")) {
      return `<pre class="mcq-code">${qfEscape(t)}</pre>`;
    }
    return `<p class="mcq-prompt">${qfEscape(t).replace(/\n/g, "<br/>")}</p>`;
  }

  const prosePart = lines.slice(0, codeStart).join("\n").trim();
  let codePart = lines.slice(codeStart);
  while (codePart.length && !codePart[codePart.length - 1].trim()) codePart.pop();
  codePart = qfTrimCodeIndent(codePart);

  let html = "";
  if (prosePart) {
    html += `<p class="mcq-prompt">${qfEscape(prosePart).replace(/\n/g, "<br/>")}</p>`;
  }
  if (codePart.length) {
    html += `<pre class="mcq-code">${qfEscape(codePart.join("\n"))}</pre>`;
  }
  return html || `<p class="mcq-prompt">${qfEscape(normalized)}</p>`;
}

function formatChoiceHtml(text) {
  const normalized = qfNormalizeText(text);
  if (normalized.includes("\n") || normalized.length > 48) {
    return `<span class="mcq-choice-code">${formatQuestionHtml(normalized)}</span>`;
  }
  return qfEscape(normalized);
}

window.formatQuestionHtml = formatQuestionHtml;
window.formatChoiceHtml = formatChoiceHtml;
window.qfEscape = qfEscape;
