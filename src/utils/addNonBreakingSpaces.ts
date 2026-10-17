import { parse, HTMLElement, TextNode, Node } from 'node-html-parser';

export function addNonBreakingSpaces(text: string): string {
  if (!text) return '';

  const shortWords = new Set([
    'в',
    'к',
    'на',
    'за',
    'об',
    'от',
    'по',
    'со',
    'у',
    'из',
    'без',
    'до',
    'при',
    'про',
    'с',
    'о',
    'мы',
    'во'
  ]);

  const processText = (text: string): string => {
    const parts = text.split(/(\s+|[.,!?])/g).filter(Boolean);

    for (let i = 0; i < parts.length - 1; i++) {
      const currentWord = parts[i].trim();

      if (!currentWord || /^[.,!?\s]+$/.test(currentWord)) continue;

      if (shortWords.has(currentWord.toLowerCase()) || currentWord.length < 3) {
        let nextIndex = i + 1;
        while (nextIndex < parts.length && parts[nextIndex].trim() === '') {
          nextIndex++;
        }

        if (nextIndex < parts.length) {
          for (let j = i + 1; j < nextIndex; j++) {
            if (parts[j].trim() === '') {
              parts[j] = '\u00A0';
            }
          }
        }
      }
    }

    return parts.join('');
  };

  try {
    const root = parse(text);

    const processNode = (node: Node) => {
      if (node.nodeType === 3) {
        const textNode = node as TextNode;

        textNode.textContent = processText(textNode.textContent);
      } else if (node.nodeType === 1) {
        const elementNode = node as HTMLElement;
        if (
          elementNode.tagName?.toLowerCase() === 'script' ||
          elementNode.tagName?.toLowerCase() === 'style'
        ) {
          return;
        }
        elementNode.childNodes.forEach(processNode);
      }
    };

    processNode(root);
    return root.toString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return text.replace(/>([^<]+)</g, (match, textContent) => {
      return '>' + processText(textContent) + '<';
    });
  }
}
