import { processText } from './processText';

export async function defaultProcessText(text: string) {
  'use cache';

  return processText(text);
}
