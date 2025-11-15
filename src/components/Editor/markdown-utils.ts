export function renderMarkdown(md: string): string {
  // very small markdown renderer for demo purposes
  let html = md;
  // code blocks ```
  html = html.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${escapeHtml(code)}</code></pre>`);
  // inline code `code`
  html = html.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);
  // headings
  html = html.replace(/^######\s?(.*)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s?(.*)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s?(.*)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s?(.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s?(.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s?(.*)$/gm, '<h1>$1</h1>');
  // bold and italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // blockquote
  html = html.replace(/^>\s?(.*)$/gm, '<blockquote>$1</blockquote>');
  // unordered list
  html = html.replace(/^(?:-\s.+(?:\r?\n|$))+?/gm, (block) => {
    const items = block.trim().split(/\r?\n/).map((l) => l.replace(/^-\s?/, '').trim());
    return `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  });
  // paragraphs
  html = html
    .split(/\n{2,}/)
    .map((para) => {
      if (/^\s*<\/?(h\d|ul|ol|pre|blockquote|p|img|code)/.test(para.trim())) return para;
      return `<p>${para.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('');
  return html;
}

export function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
