/**
 * Renders heading text where *words in asterisks* get the hand-drawn underline
 * accent. Keeps the markup in site.ts readable for non-developers.
 */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="hl">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Plain-text version (for aria labels, metadata). */
export const plain = (text: string) => text.replace(/\*/g, "");
