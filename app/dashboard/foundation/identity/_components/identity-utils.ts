// components/identity-utils.ts
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

export const identitySectionsData = [
  {
    id: "01",
    title: "Mission",
    content: "",
    drawerContent: {
      title: "Mission",
      description: String.raw`
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <h1 style="font-size: 24px; font-weight: bold;">The mission statement is clear and well-articulated when it:</h1>
        <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
          <li>Is short, precise, easy to remember, and follow;</li>
          <li>Captures the soul of the organization and is continuously pursued;</li>
          <li>Inspires employees to work towards achieving it;</li>
          <li>Assists in delivering value to the stakeholders, employees, and the society.</li>
        </ul>
      </div>
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <h2 style="font-size: 20px; font-weight: bold;">Ensure the mission statement is not:</h2>
        <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
          <li>Lengthy, complex, and incoherent to understand;</li>
          <li>Just a description of what the organization does currently;</li>
          <li>Merely linked or tied to a deadline or milestones;</li>
          <li>Easily overlooked by stakeholders.</li>
        </ul>
      </div>
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <h2 style="font-size: 20px; font-weight: bold;">Does your mission statement:</h2>
        <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
          <li>Express your distinctive and enduring reasons for existence?</li>
          <li>Appeal to a wide range of stakeholders, not just a select few?</li>
          <li>Provide a framework for your organization's actions?</li>
          <li>Avoid merely describing your current products, outputs, or target customers?</li>
        </ul>
      </div>
      `,
    },
  },
  {
    id: "02",
    title: "Value",
    content: "",
    drawerContent: {
      title: "Value",
      description: String.raw`
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <p>
          Essentially, values serve as a communication tool, conveying the organization's priorities and offering clear guidance for decision-making. It's worth noting that terms like guiding principles, company principles, and company beliefs are often used interchangeably with values in some organizations.
        </p>
        <p style="margin-top: 10px;">
          Consider your company's values as the foundation of its culture. What fundamental beliefs and behaviors should leaders, managers, and employees exhibit? What guidelines should govern your organizational growth, hiring practices, personal development, and decision-making?
        </p>
      </div>
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <h2 style="font-size: 20px; font-weight: bold;">Sony's Value Statements:</h2>
        <ul style="list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">
          <li><strong>Dreams & Curiosity:</strong> Pioneer the future with dreams and curiosity.</li>
          <li><strong>Diversity:</strong> Pursue the creation of the very best by harnessing diversity and varying viewpoints.</li>
          <li><strong>Integrity & Sincerity:</strong> Earn the trust for the Sony brand through ethical and responsible conduct.</li>
          <li><strong>Sustainability:</strong> Fulfill our stakeholder responsibilities through disciplined business practices.</li>
        </ul>
      </div>
      `,
    },
  },
  {
    id: "03",
    title: "Purpose",
    content: "",
    drawerContent: {
      title: "Purpose",
      description: String.raw`
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <p>
          In today's corporate environment, many company executives embrace the notion that their organizations should not only prioritize improving shareholder value but also contribute positively to society. As a result, establishing a clear corporate purpose that guides all decision-making and operations has become an essential aspect of business conduct.
        </p>
      </div>
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <h2 style="font-size: 20px; font-weight: bold;">Philips Purpose Statement:</h2>
        <p style="margin-top: 10px;">
          "At Philips, our purpose is to improve people’s health and well-being through meaningful innovation. We aim to improve 2.5 billion lives per year by 2030, including 400 million in underserved communities."
        </p>
        <p style="margin-top: 10px;">
          As a technology company, we – and our brand licensees – innovate for people with one consistent belief: there’s always a way to make life better.
        </p>
      </div>
      <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; background-color: #f9fafb;">
        <h2 style="font-size: 20px; font-weight: bold;">P&G's Purpose Statement:</h2>
        <p style="margin-top: 10px;">
          "We will provide branded products and services of superior quality and value that improve the lives of the world’s consumers, now and for generations to come. As a result, consumers will reward us with leadership sales, profit and value creation, allowing our people, our shareholders and the communities in which we live and work to prosper."
        </p>
      </div>
      `,
    },
  },
] as const;


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
        const isList = lines.every((line) => line.trim().startsWith("-"));

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
