export function formatContent(content: string): string {
  if (!content) return "";

  const regex = /(.)\1{25,}/g;

  return content.replace(regex, (match) => {
    return match.slice(0, 20) + ".......";
  });
}
