"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Status = "blue" | "green" | "red";

const CheckAlign = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [checks, setChecks] = useState<{ [key: string]: boolean }>({});
  const [note, setNote] = useState("");
  const [statuses, setStatuses] = useState<{ [key: string]: Status }>({
    Vision: "blue",
    "Strategic Themes": "blue",
    "Business Goals": "blue",
  });

  const handleCheckboxChange = (key: string) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    let newStatus: Status = "blue";

    const allChecked =
      Object.values(checks).length > 0 && Object.values(checks).every(Boolean);

    if (allChecked && !note.trim()) {
      newStatus = "green";
    } else if (note.trim()) {
      newStatus = "red";
    }

    if (activeCard) {
      setStatuses((prev) => ({ ...prev, [activeCard]: newStatus }));
    }

    setChecks({});
    setNote("");
  };

  const getCardStyle = (status: Status) => {
    switch (status) {
      case "green":
        return "border-green-600 text-green-600";
      case "red":
        return "border-red-600 text-red-600";
      default:
        return "border-blue-600 text-blue-600";
    }
  };

  const renderModal = () => (
    <DialogContent className="max-w-2xl p-0">
      <DialogHeader className="bg-blue-900 text-white px-6 py-3 rounded-t-md">
        <DialogTitle>Blueprint Alignment Check</DialogTitle>
      </DialogHeader>
      <div className="p-6 space-y-6">
        {/* Section 1 */}
        <div>
          <h4 className="font-semibold mb-2">
            Were all relevant stakeholders involved in the Blueprint phase?
          </h4>
          {[
            "Verified the inclusion of key internal and external stakeholders.",
            "Ensured diverse perspectives were considered during the Blueprint phase.",
            "Confirmed representation from relevant departments and teams.",
          ].map((item, i) => (
            <label key={i} className="flex items-start gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checks[item] || false}
                onChange={() => handleCheckboxChange(item)}
                className="mt-1 h-4 w-4 text-blue-900 border-gray-300 rounded"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <hr />
        {/* Section 2 */}
        <div>
          <h4 className="font-semibold mb-2">
            Do we have a shared understanding of the outcomes from the Blueprint phase?
          </h4>
          {[
            "Conducted a review session to discuss assessment findings.",
            "Ensured alignment of interpretations and insights among stakeholders.",
            "Documented and communicated key takeaways from the Blueprint phase.",
          ].map((item, i) => (
            <label key={i} className="flex items-start gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checks[item] || false}
                onChange={() => handleCheckboxChange(item)}
                className="mt-1 h-4 w-4 text-blue-900 border-gray-300 rounded"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <div>
          {["Vision", "Strategic Themes", "Business Goals"].map((item, i) => (
            <label key={i} className="flex items-start gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checks[item] || false}
                onChange={() => handleCheckboxChange(item)}
                className="mt-1 h-4 w-4 text-blue-900 border-gray-300 rounded"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <hr />
        {/* Notes */}
        <div>
          <h4 className="font-semibold mb-2">Suggestions/Notes</h4>
          <Textarea
            placeholder="Write your suggestion..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="bg-gray-100"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-blue-900 text-white px-6">
            Save
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div>
      {/* Cards Section */}
      <div className="grid  md:grid-cols-3 gap-6">
        {Object.keys(statuses).map((title, idx) => (
          <Dialog key={title}>
            <div
              className={`border-2 rounded-lg p-6 shadow  ${getCardStyle(
                statuses[title]
              )}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {`0${idx + 1}`}
                </span>
                <h3 className="font-semibold text-lg">{title}</h3>
              </div>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setActiveCard(title);
                  }}
                  className="bg-blue-900 text-white text-sm px-4 py-2 rounded-md"
                >
                  {title} Statements
                </Button>
              </DialogTrigger>
            </div>

            {renderModal()}
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default CheckAlign;
