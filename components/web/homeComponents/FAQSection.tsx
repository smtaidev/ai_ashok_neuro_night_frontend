"use client";
import { useState, ReactNode } from "react";

// ✅ Define the type for each FAQ item
type FAQItem = {
  question: string;
  answer: ReactNode;
};

// ✅ Use the FAQItem type for the array
const faqData: FAQItem[] = [
  {
    question: "Why should you choose our product?",
    answer: (
      <div>
        <p>
          Think of it this way: in the sea of options, there are two main types
          of products out there...
        </p>
        <p>
          But here&apos;s the kicker: neither of them truly nails the essence of strategy...
        </p>
        <p>
          That&apos;s where we come in. Our platform isn&apos;t just about tasks or goals...
        </p>
      </div>
    ),
  },
  {
    question: "What's wrong with the annual strategic planning process?",
    answer: (
      <div>
        <p>
          In today&apos;s digital world, where agility rules supreme...
        </p>
        <p>
          However, in the digital age, where barriers to entry are low...
        </p>
        <p>
          Our product supports a dynamic, adaptable strategy...
        </p>
      </div>
    ),
  },
  {
    question: "How do we tackle your strategy journey?",
    answer: (
      <div>
        <p>
          We&apos;ve simplified it into three key steps: Assess, Blueprint, and Choreograph...
        </p>
        <p>
          Curious to learn more? Head over to our Solutions page...
        </p>
      </div>
    ),
  },
];

const FAQSection = () => {
  // ✅ `openIndex` can be a number or null
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // ✅ Type the function parameter
  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 mx-auto text-base-content rounded-xl overflow-hidden">
      <div className="space-y-5">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className="border border-lime-300/10 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center font-semibold px-3 py-3 text-left text-base-content focus:outline-none"
                onClick={() => toggle(index)}
              >
                {faq.question}
                <span className="lg:text-4xl text-2xl">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="px-3 py-2 text-xs sm:text-sm lg:text-base-content/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
