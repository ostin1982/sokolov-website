export default function stripHtmlAttributes(
  html: string,
  attrsToRemove: string[]
): string {
  if (!html) return '';

  const regexPatterns = attrsToRemove.map(
    attr => new RegExp(`\\s+${attr}=["'][^"']*["']`, 'g')
  );

  let cleanedHtml = html;

  regexPatterns.forEach(pattern => {
    cleanedHtml = cleanedHtml.replace(pattern, '');
  });

  return cleanedHtml;
}
