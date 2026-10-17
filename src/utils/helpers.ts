import { addNonBreakingSpaces } from './addNonBreakingSpaces';
import stripHtmlAttributes from './stripHtmlAttributes';
import sanitizeHtml from './sanitizeHtml';

export async function defaultProcessText(text: string) {
  'use cache';

  return addNonBreakingSpaces(
    stripHtmlAttributes(sanitizeHtml(text, [], ['target']), ['class'])
  );
}
