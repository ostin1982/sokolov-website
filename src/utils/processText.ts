import { addNonBreakingSpaces } from './addNonBreakingSpaces';
import stripHtmlAttributes from './stripHtmlAttributes';
import sanitizeHtml from './sanitizeHtml';

export function processText(text: string) {
  return addNonBreakingSpaces(
    stripHtmlAttributes(sanitizeHtml(text, [], ['target']), ['class'])
  );
}
