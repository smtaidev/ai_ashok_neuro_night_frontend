// _components/identity-utils.tsx
export function renderDrawerMission(description: string): string[] {
  return description
    .split("\\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export type RenderedBlock = {
  type: "html" | "text";
  content: string;
};

export function renderDrawerBlocks(description: string): RenderedBlock[] {
  return description
    .split("\\n")
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const isHtml = /^<.+?>/.test(block);
      return {
        type: isHtml ? "html" : "text",
        content: block,
      };
    });
}


export function MissionDrawerContent({ data }: { data: string }) {
  const blocks = renderDrawerBlocks(data);

  return (
    <div className="space-y-4">
      {blocks.map((block, idx) => {
        if (block.type === "html") {
          return (
            <div
              key={idx}
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          );
        }

        const lines = block.content.split("\n");
        const isList = lines.every((line: any) => line.trim().startsWith("-"));

        if (isList) {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1">
              {lines.map((li, i) => (
                <li key={i}>{li.replace(/^-/, "").trim()}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={idx} className="text-muted-foreground">
            {block.content}
          </p>
        );
      })}
    </div>
  );
}
