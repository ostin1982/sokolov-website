import DOMPurify from 'isomorphic-dompurify';

export default function sanitizeHtml(
  html: string,
  addTags?: string[],
  addAttr?: string[]
) {
  if (!html) return '';
  return DOMPurify.sanitize(html, { ADD_TAGS: addTags, ADD_ATTR: addAttr });
}
