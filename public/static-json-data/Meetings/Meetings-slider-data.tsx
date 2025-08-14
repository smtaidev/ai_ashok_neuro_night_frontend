import React from "react";

const MeetingsSliderData = () => {
  const data:{title:string,description:string}[] = [
    {
      title: "Agenda Builder",
      description:
        "The Agenda Builder is a powerful tool for creating effective and customized agendas for any meeting occasion. It enables you to develop effective strategy meetings of all types, such as monthly team meetings, quarterly reviews, or annual board meetings.",
    },
    {
      title: "Minutes",
      description:
        "The Minutes component ensures you capture every detail of your meetings accurately and efficiently. Linked directly to the Agenda Builder for a seamless transition, it allows you to tag action items and assign them to participants with due dates, save notes, and add links for comprehensive documentation.",
    },
    {
      title: "Archive",
      description:
        "The Archive provides a centralized repository for your past twelve meeting agendas and minutes, making it easy to access and review historical data. It stores and organizes meeting documents, searches and retrieves past meeting records quickly, and maintains a clear and structured archive for future reference.",
    },
  ];

  return (
    <div>
      <h2 className="font-semibold text-[20px] mt-4">Meeting Modal</h2>
      <p className="text-[16px] my-5 px-2">
        The Meeting module is designed to streamline and enhance your strategy
        meetings, providing a comprehensive solution for creating, recording,
        and storing meeting details. It includes three key components: Agenda
        Builder, Minutes, and Archive, each tailored to optimize different
        aspects of your meetings.
      </p>
        <div className="flex flex-col gap-4">
            {data.map((item, index) => (
            <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-100"
            >
                <h3 className="text-[20px] font-semibold">{item.title}</h3>
                <p className="text-[18px] text-gray-600 mt-2">{item.description}</p>
            </div>
            ))}
        </div>
    </div>
  );
};

export default MeetingsSliderData;
