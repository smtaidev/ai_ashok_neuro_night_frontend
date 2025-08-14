"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Type definition for the main form's properties
type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSubmit: (data: FormValues) => void;
  meetingId: string | null;
};

// Type definition for the form's data structure
export type FormValues = {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  meetingType: "Monthly" | "Quarterly" | "Annual" | "Board" | "";
  attendees: string[]; // Changed to array
  presenter: string[]; // Changed to array
  timeAllocatedHr: string;
  timeAllocatedMin: string;
  agendaTitle: string;
  agendaPresenter: string[]; // Changed to array
  agendaTimeHr: string;
  agendaTimeMin: string;
  agendaDetails: string;
};

// New component for the Agenda Details Modal
type AgendaDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    agendaTitle: string;
    agendaPresenter: string[];
    agendaTimeHr: string;
    agendaTimeMin: string;
    agendaDetails: string;
  }) => void;
  initialData: {
    agendaTitle: string;
    agendaPresenter: string[];
    agendaTimeHr: string;
    agendaTimeMin: string;
    agendaDetails: string;
  };
};

const AgendaDetailsModal: React.FC<AgendaDetailsModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: initialData,
  });

  const currentAgendaPresenters = watch("agendaPresenter");
  const [agendaPresenterInput, setAgendaPresenterInput] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      reset(initialData);
    }
  }, [isOpen, initialData, reset]);

  const submitHandler: SubmitHandler<any> = (data) => {
    onSubmit(data);
    onClose();
  };

  const handleAddAgendaPresenter = () => {
    if (agendaPresenterInput.trim() !== "") {
      setValue("agendaPresenter", [
        ...currentAgendaPresenters,
        agendaPresenterInput.trim(),
      ]);
      setAgendaPresenterInput("");
    }
  };

  const handleRemoveAgendaPresenter = (index: number) => {
    const newAgendaPresenters = currentAgendaPresenters.filter(
      (_, i) => i !== index
    );
    setValue("agendaPresenter", newAgendaPresenters);
  };

  const darkBlue = "bg-sky-800";
  const lightBlue = "bg-blue-600";
  const borderBlue = "border-sky-800";
  const labelColor = "text-gray-800";
  const textColor = "text-sky-800";

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        className={`absolute inset-y-0 right-0 w-full sm:w-[40rem] h-full ${lightBlue} shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 ${darkBlue} text-white`}>
          <h2 className="text-lg font-semibold">Agenda Item Details</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:text-gray-200"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex-1 overflow-y-auto p-8 space-y-6 bg-white flex flex-col"
        >
          {/* Agenda Title */}
          <div>
            <label htmlFor="agendaTitle" className="text-sm text-gray-500">
              Title
            </label>
            <input
              {...register("agendaTitle")}
              type="text"
              placeholder="Title...."
              className="p-2 border rounded-lg w-full bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
            />
          </div>

          {/* Agenda Presenter */}
          <div>
            <label htmlFor="agendaPresenter" className="text-sm text-gray-500">
              Presenter
            </label>
            <div className="flex gap-2">
              <input
                value={agendaPresenterInput}
                onChange={(e) => setAgendaPresenterInput(e.target.value)}
                type="text"
                placeholder="Name"
                className="p-2 border rounded-lg flex-1 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
              />
              <button
                type="button"
                onClick={handleAddAgendaPresenter}
                className={`px-4 py-2 ${darkBlue} text-white rounded-lg hover:opacity-90 transition-opacity`}
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {currentAgendaPresenters.map((presenter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 p-2 bg-gray-100 rounded-lg"
                >
                  <span className="text-gray-700">{presenter}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAgendaPresenter(index)}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda Time Allocated */}
          <div className="flex items-center gap-4">
            <span className={`text-md font-semibold ${labelColor}`}>
              Time Allocated
            </span>
            <input
              {...register("agendaTimeHr")}
              type="number"
              placeholder="1"
              className="p-2 border rounded-lg w-16 text-center bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
            />
            <span className="text-gray-600">Hr</span>
            <input
              {...register("agendaTimeMin")}
              type="number"
              placeholder="30"
              className="p-2 border rounded-lg w-16 text-center bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
            />
            <span className="text-gray-600">Min.</span>
          </div>

          {/* Agenda Item Details */}
          <div>
            <label className={`block text-md font-semibold ${labelColor}`}>
              Agenda Item Details
            </label>
            <textarea
              {...register("agendaDetails")}
              placeholder="Add Details...."
              className="p-2 border rounded-lg w-full h-40 mt-2 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="mt-auto flex justify-center sm:justify-start gap-4 pt-12">
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg border-2 ${borderBlue} ${textColor} font-semibold hover:bg-sky-50 transition-colors`}
            >
              Save
            </button>
            <button
              type="submit"
              className={`px-6 py-2 ${darkBlue} text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity`}
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main component remains the default export
const AddAgendaFromModal: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title = "Add Agenda Item",
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      meetingType: "",
      attendees: [],
      presenter: [],
      timeAllocatedHr: "",
      timeAllocatedMin: "",
      agendaTitle: "",
      agendaPresenter: [],
      agendaTimeHr: "",
      agendaTimeMin: "",
      agendaDetails: "",
    },
  });

  const meetingType = watch("meetingType");
  const currentAttendees = watch("attendees");
  const currentPresenters = watch("presenter");
  const agendaDetails = watch("agendaDetails");
  const agendaTitle = watch("agendaTitle");
  const agendaPresenter = watch("agendaPresenter");
  const agendaTimeHr = watch("agendaTimeHr");
  const agendaTimeMin = watch("agendaTimeMin");

  const [isAgendaDetailsModalOpen, setIsAgendaDetailsModalOpen] = useState(false);
  const [attendeeInput, setAttendeeInput] = useState<string>("");
  const [presenterInput, setPresenterInput] = useState<string>("");

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      const focusableElements = document.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      (focusableElements[0] as HTMLElement)?.focus();
    } else {
      (document.activeElement as HTMLElement)?.blur();
    }
  }, [isOpen]);

  const handleAddAttendee = () => {
    if (attendeeInput.trim() !== "") {
      setValue("attendees", [...currentAttendees, attendeeInput.trim()]);
      setAttendeeInput("");
    }
  };

  const handleRemoveAttendee = (index: number) => {
    const newAttendees = currentAttendees.filter((_, i) => i !== index);
    setValue("attendees", newAttendees);
  };

  const handleAddPresenter = () => {
    if (presenterInput.trim() !== "") {
      setValue("presenter", [...currentPresenters, presenterInput.trim()]);
      setPresenterInput("");
    }
  };

  const handleRemovePresenter = (index: number) => {
    const newPresenters = currentPresenters.filter((_, i) => i !== index);
    setValue("presenter", newPresenters);
  };

  // Function to handle data from the child modal
  const handleAgendaDetailsSubmit = (data: {
    agendaTitle: string;
    agendaPresenter: string[];
    agendaTimeHr: string;
    agendaTimeMin: string;
    agendaDetails: string;
  }) => {
    setValue("agendaTitle", data.agendaTitle);
    setValue("agendaPresenter", data.agendaPresenter);
    setValue("agendaTimeHr", data.agendaTimeHr);
    setValue("agendaTimeMin", data.agendaTimeMin);
    setValue("agendaDetails", data.agendaDetails);
    setIsAgendaDetailsModalOpen(false);
  };

  const darkBlue = "bg-sky-800";
  const lightBlue = "bg-blue-600";
  const borderBlue = "border-sky-800";
  const labelColor = "text-gray-800";
  const textColor = "text-sky-800";

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        {/* Modal Panel */}
        <div
          className={`absolute top-0 right-0 w-full sm:w-[40rem] h-full ${lightBlue} shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between p-4 ${darkBlue} text-white`}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-2xl hover:text-gray-200"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex-1 overflow-y-auto p-8 space-y-6 bg-white"
          >
            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={`block text-md font-semibold ${labelColor}`}>Start Date & Time</label>
                <div className="flex gap-2 mt-2">
                  <input
                    {...register("startDate")}
                    type="date"
                    className="p-2 border rounded-lg w-1/2 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
                  />
                  <input
                    {...register("startTime")}
                    type="time"
                    className="p-2 border rounded-lg w-1/2 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
                  />
                </div>
              </div>
              <div>
                <label className={`block text-md font-semibold ${labelColor}`}>End Date & Time</label>
                <div className="flex gap-2 mt-2">
                  <input
                    {...register("endDate")}
                    type="date"
                    className="p-2 border rounded-lg w-1/2 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
                  />
                  <input
                    {...register("endTime")}
                    type="time"
                    className="p-2 border rounded-lg w-1/2 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
                  />
                </div>
              </div>
            </div>

            {/* Meeting Type */}
            <div>
              <label className={`block text-md font-semibold ${labelColor}`}>Meeting Type</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Monthly", "Quarterly", "Annual", "Board"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setValue("meetingType", type as FormValues["meetingType"])}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors duration-200 ${
                      meetingType === type
                        ? `${darkBlue} text-white`
                        : `bg-white ${borderBlue} ${textColor}`
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Invite Attendees */}
            <div>
              <label className={`block text-md font-semibold ${labelColor}`}>Invite Attendees</label>
              <div className="flex gap-2 mt-2">
                <input
                  value={attendeeInput}
                  onChange={(e) => setAttendeeInput(e.target.value)}
                  type="text"
                  placeholder="Name..."
                  className="p-2 border rounded-lg flex-1 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
                />
                <button type="button" onClick={handleAddAttendee} className={`px-4 py-2 ${darkBlue} text-white rounded-lg hover:opacity-90 transition-opacity`}>
                  Add
                </button>
              </div>
              {/* Display added attendees */}
              <div className="mt-2 flex flex-wrap gap-2">
                {currentAttendees.map((attendee, index) => (
                  <div key={index} className="flex items-center gap-1 p-2 bg-gray-100 rounded-lg">
                    <span className="text-gray-700">{attendee}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttendee(index)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Welcome & Opening Remark */}
            <div>
              <label className={`block text-md font-semibold ${labelColor}`}>Welcome And Opening Remark</label>
              <div className="flex gap-2 mt-2">
                <input
                  value={presenterInput}
                  onChange={(e) => setPresenterInput(e.target.value)}
                  type="text"
                  placeholder="Name..."
                  className="p-2 border rounded-lg flex-1 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
                />
                <button type="button" onClick={handleAddPresenter} className={`px-4 py-2 ${darkBlue} text-white rounded-lg hover:opacity-90 transition-opacity`}>
                  Add
                </button>
              </div>
              {/* Display added presenters */}
              <div className="mt-2 flex flex-wrap gap-2">
                {currentPresenters.map((presenter, index) => (
                  <div key={index} className="flex items-center gap-1 p-2 bg-gray-100 rounded-lg">
                    <span className="text-gray-700">{presenter}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePresenter(index)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span className={`text-md font-semibold ${labelColor}`}>Time Allocated</span>
                <input
                  {...register("timeAllocatedHr")}
                  type="number"
                  placeholder="1"
                  className="p-2 border rounded-lg w-16 text-center bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
                />
                <span className="text-gray-600">Hr</span>
                <input
                  {...register("timeAllocatedMin")}
                  type="number"
                  placeholder="30"
                  className="p-2 border rounded-lg w-16 text-center bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
                />
                <span className="text-gray-600">Min.</span>
              </div>
            </div>

            {/* Add Agenda Item */}
            <div>
              <label className={`block text-md font-semibold ${labelColor}`}>Add Agenda Item</label>
              <div className="relative mt-2">
                <textarea
                  value={agendaDetails}
                  disabled // Disable direct editing
                  placeholder="Add Details...."
                  className="p-2 border rounded-lg w-full h-20 bg-gray-50 border-gray-300 focus:outline-none"
                ></textarea>
                <button
                  type="button"
                  onClick={() => setIsAgendaDetailsModalOpen(true)}
                  className={`absolute -bottom-4 right-0 px-4 py-2 text-white text-sm ${darkBlue} rounded-lg shadow-md hover:opacity-90 transition-opacity`}
                >
                  Add Agenda Details
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center sm:justify-start gap-4 pt-12">
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg border-2 ${borderBlue} ${textColor} font-semibold hover:bg-sky-50 transition-colors`}
              >
                Save
              </button>
              <button
                type="submit"
                className={`px-6 py-2 ${darkBlue} text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity`}
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
      <AgendaDetailsModal
        isOpen={isAgendaDetailsModalOpen}
        onClose={() => setIsAgendaDetailsModalOpen(false)}
        onSubmit={handleAgendaDetailsSubmit}
        initialData={{
          agendaTitle,
          agendaPresenter,
          agendaTimeHr,
          agendaTimeMin,
          agendaDetails,
        }}
      />
    </>
  );
};

export default AddAgendaFromModal;











// "use client";
// import React, { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";

// type DrawerProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   onSubmit: (data: FormValues) => void;
//   meetingId: string | null;
// };

// // Updated FormValues type to use string arrays for attendees and presenters
// export type FormValues = {
//   startDate: string;
//   startTime: string;
//   endDate: string;
//   endTime: string;
//   meetingType: "Monthly" | "Quarterly" | "Annual" | "Board" | "";
//   attendees: string[]; // Changed to array
//   presenter: string[]; // Changed to array
//   timeAllocatedHr: string;
//   timeAllocatedMin: string;
//   agendaTitle: string;
//   agendaPresenter: string[]; // Changed to array
//   agendaTimeHr: string;
//   agendaTimeMin: string;
//   agendaDetails: string;
// };

// const AddAgendaFromModal: React.FC<DrawerProps> = ({
//   isOpen,
//   onClose,
//   title = "Add Agenda Item",
//   onSubmit,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       startDate: "",
//       startTime: "",
//       endDate: "",
//       endTime: "",
//       meetingType: "",
//       attendees: [], // Initialized as an empty array
//       presenter: [], // Initialized as an empty array
//       timeAllocatedHr: "",
//       timeAllocatedMin: "",
//       agendaTitle: "",
//       agendaPresenter: [], // Initialized as an empty array
//       agendaTimeHr: "",
//       agendaTimeMin: "",
//       agendaDetails: "",
//     },
//   });

//   const meetingType = watch("meetingType");
//   const currentAttendees = watch("attendees");
//   const currentPresenters = watch("presenter");
//   const currentAgendaPresenters = watch("agendaPresenter");

//   // Local state for temporary input fields before adding to the arrays
//   const [attendeeInput, setAttendeeInput] = useState<string>("");
//   const [presenterInput, setPresenterInput] = useState<string>("");
//   const [agendaPresenterInput, setAgendaPresenterInput] = useState<string>("");

//   const submitHandler: SubmitHandler<FormValues> = (data) => {
//     onSubmit(data);
//     reset();
//     onClose();
//   };

//   useEffect(() => {
//     if (isOpen) {
//       const focusableElements = document.querySelectorAll(
//         "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
//       );
//       (focusableElements[0] as HTMLElement)?.focus();
//     } else {
//       (document.activeElement as HTMLElement)?.blur();
//     }
//   }, [isOpen]);

//   // --- Functions to handle adding and removing items from the arrays ---

//   // Attendees
//   const handleAddAttendee = () => {
//     if (attendeeInput.trim() !== "") {
//       setValue("attendees", [...currentAttendees, attendeeInput.trim()]);
//       setAttendeeInput("");
//     }
//   };

//   const handleRemoveAttendee = (index: number) => {
//     const newAttendees = currentAttendees.filter((_, i) => i !== index);
//     setValue("attendees", newAttendees);
//   };

//   // Welcome And Opening Remark Presenter
//   const handleAddPresenter = () => {
//     if (presenterInput.trim() !== "") {
//       setValue("presenter", [...currentPresenters, presenterInput.trim()]);
//       setPresenterInput("");
//     }
//   };

//   const handleRemovePresenter = (index: number) => {
//     const newPresenters = currentPresenters.filter((_, i) => i !== index);
//     setValue("presenter", newPresenters);
//   };

//   // Add Agenda Item Presenter
//   const handleAddAgendaPresenter = () => {
//     if (agendaPresenterInput.trim() !== "") {
//       setValue("agendaPresenter", [...currentAgendaPresenters, agendaPresenterInput.trim()]);
//       setAgendaPresenterInput("");
//     }
//   };

//   const handleRemoveAgendaPresenter = (index: number) => {
//     const newAgendaPresenters = currentAgendaPresenters.filter((_, i) => i !== index);
//     setValue("agendaPresenter", newAgendaPresenters);
//   };

//   // Define a custom color for consistency
//   const darkBlue = "bg-blue-900";
//   const lightBlue = "bg-blue-600";
//   const borderBlue = "border-blue-800";
//   const labelColor = "text-gray-800";
//   const textColor = "text-blue-800";

//   return (
//     <div
//       className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
//         isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//       role="dialog"
//     >
//       {/* Backdrop */}
//       <div
//         className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
//           isOpen ? "opacity-100" : "opacity-0"
//         }`}
//         onClick={onClose}
//       />

//       {/* Modal Panel */}
//       <div
//         className={`absolute top-0 right-0 w-full sm:w-[40rem] h-full ${lightBlue} shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className={`flex items-center justify-between p-4 ${darkBlue} text-white`}>
//           <h2 className="text-lg font-semibold">{title}</h2>
//           <button
//             onClick={onClose}
//             className="text-2xl hover:text-gray-200"
//             aria-label="Close modal"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit(submitHandler)}
//           className="flex-1 overflow-y-auto p-8 space-y-6 bg-white"
//         >
//           {/* Date & Time */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className={`block text-md font-semibold ${labelColor}`}>Start Date & Time</label>
//               <div className="flex gap-2 mt-2">
//                 <input
//                   {...register("startDate")}
//                   type="date"
//                   className="p-2 border rounded-lg w-1/2 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//                 />
//                 <input
//                   {...register("startTime")}
//                   type="time"
//                   className="p-2 border rounded-lg w-1/2 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className={`block text-md font-semibold ${labelColor}`}>End Date & Time</label>
//               <div className="flex gap-2 mt-2">
//                 <input
//                   {...register("endDate")}
//                   type="date"
//                   className="p-2 border rounded-lg w-1/2 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//                 />
//                 <input
//                   {...register("endTime")}
//                   type="time"
//                   className="p-2 border rounded-lg w-1/2 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Meeting Type */}
//           <div>
//             <label className={`block text-md font-semibold ${labelColor}`}>Meeting Type</label>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {["Monthly", "Quarterly", "Annual", "Board"].map((type) => (
//                               <button
//                                 key={type}
//                                 type="button"
//                                 onClick={() => setValue("meetingType", type as FormValues["meetingType"])}
//                                 className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors duration-200 ${
//                                   meetingType === type
//                                     ? `${darkBlue} text-white`
//                                     : `bg-white ${borderBlue} ${textColor}`
//                                 }`}
//                               >
//                                 {type}
//                               </button>
//                             ))}
//             </div>
//           </div>

//           {/* Invite Attendees */}
//           <div>
//             <label className={`block text-md font-semibold ${labelColor}`}>Invite Attendees</label>
//             <div className="flex gap-2 mt-2">
//               <input
//                 value={attendeeInput}
//                 onChange={(e) => setAttendeeInput(e.target.value)}
//                 type="text"
//                 placeholder="Name..."
//                 className="p-2 border rounded-lg flex-1 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//               />
//               <button type="button" onClick={handleAddAttendee} className={`px-4 py-2 ${darkBlue} text-white rounded-lg hover:opacity-90 transition-opacity`}>
//                 Add
//               </button>
//             </div>
//             {/* Display added attendees */}
//             <div className="mt-2 flex flex-wrap gap-2">
//               {currentAttendees.map((attendee, index) => (
//                 <div key={index} className="flex items-center gap-1 p-2 bg-gray-100 rounded-lg">
//                   <span className="text-gray-700">{attendee}</span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveAttendee(index)}
//                     className="text-gray-500 hover:text-gray-800"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Welcome & Opening Remark */}
//           <div>
//             <label className={`block text-md font-semibold ${labelColor}`}>Welcome And Opening Remark</label>
//             <div className="flex gap-2 mt-2">
//               <input
//                 value={presenterInput}
//                 onChange={(e) => setPresenterInput(e.target.value)}
//                 type="text"
//                 placeholder="Name..."
//                 className="p-2 border rounded-lg flex-1 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//               />
//               <button type="button" onClick={handleAddPresenter} className={`px-4 py-2 ${darkBlue} text-white rounded-lg hover:opacity-90 transition-opacity`}>
//                 Add
//               </button>
//             </div>
//             {/* Display added presenters */}
//             <div className="mt-2 flex flex-wrap gap-2">
//               {currentPresenters.map((presenter, index) => (
//                 <div key={index} className="flex items-center gap-1 p-2 bg-gray-100 rounded-lg">
//                   <span className="text-gray-700">{presenter}</span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemovePresenter(index)}
//                     className="text-gray-500 hover:text-gray-800"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="flex items-center gap-4 mt-4">
//               <span className={`text-md font-semibold ${labelColor}`}>Time Allocated</span>
//               <input
//                 {...register("timeAllocatedHr")}
//                 type="number"
//                 placeholder="1"
//                 className="p-2 border rounded-lg w-16 text-center bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//               />
//               <span className="text-gray-600">Hr</span>
//               <input
//                 {...register("timeAllocatedMin")}
//                 type="number"
//                 placeholder="30"
//                 className="p-2 border rounded-lg w-16 text-center bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//               />
//               <span className="text-gray-600">Min.</span>
//             </div>
//           </div>

//           {/* Add Agenda Item */}
//           <div>
//             <label className={`block text-md font-semibold ${labelColor}`}>Add Agenda Item</label>
//             <div className="flex flex-col gap-4 mt-2">
//                 <div>
//                     <label htmlFor="agendaTitle" className="text-sm text-gray-500">Title</label>
//                     <input
//                       {...register("agendaTitle")}
//                       type="text"
//                       placeholder="Title...."
//                       className="p-2 border rounded-lg w-full bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="agendaPresenter" className="text-sm text-gray-500">Presenter</label>
//                     <div className="flex gap-2">
//                         <input
//                           value={agendaPresenterInput}
//                           onChange={(e) => setAgendaPresenterInput(e.target.value)}
//                           type="text"
//                           placeholder="Name"
//                           className="p-2 border rounded-lg flex-1 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//                         />
//                         <button type="button" onClick={handleAddAgendaPresenter} className={`px-4 py-2 ${darkBlue} text-white rounded-lg hover:opacity-90 transition-opacity`}>
//                             Add
//                         </button>
//                     </div>
//                     {/* Display added agenda presenters */}
//                     <div className="mt-2 flex flex-wrap gap-2">
//                       {currentAgendaPresenters.map((presenter, index) => (
//                         <div key={index} className="flex items-center gap-1 p-2 bg-gray-100 rounded-lg">
//                           <span className="text-gray-700">{presenter}</span>
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveAgendaPresenter(index)}
//                             className="text-gray-500 hover:text-gray-800"
//                           >
//                             &times;
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                 </div>
//             </div>
//             <div className="flex items-center gap-4 mt-4">
//               <span className={`text-md font-semibold ${labelColor}`}>Time Allocated</span>
//               <input
//                 {...register("agendaTimeHr")}
//                 type="number"
//                 placeholder="1"
//                 className="p-2 border rounded-lg w-16 text-center bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//               />
//               <span className="text-gray-600">Hr</span>
//               <input
//                 {...register("agendaTimeMin")}
//                 type="number"
//                 placeholder="30"
//                 className="p-2 border rounded-lg w-16 text-center bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//               />
//               <span className="text-gray-600">Min.</span>
//             </div>
//           </div>

//           {/* Agenda Item Details */}
//           <div>
//             <label className={`block text-md font-semibold ${labelColor}`}>Agenda Item Details</label>
//             <div className="relative mt-2">
//                 <textarea
//                   {...register("agendaDetails")}
//                   placeholder="Add Details...."
//                   className="p-2 border rounded-lg w-full h-20 bg-gray-50 border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-800"
//                 ></textarea>
//                 <button
//                   type="button"
//                   className={`absolute -bottom-4 right-0 px-4 py-2 text-white text-sm ${darkBlue} rounded-lg shadow-md hover:opacity-90 transition-opacity`}
//                 >
//                   Add Agenda Details
//                 </button>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-center sm:justify-start gap-4 pt-12">
//             <button
//               type="submit"
//               className={`px-6 py-2 rounded-lg border-2 ${borderBlue} ${textColor} font-semibold hover:bg-sky-50 transition-colors`}
//             >
//               Save
//             </button>
//             <button
//               type="submit"
//               className={`px-6 py-2 ${darkBlue} text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity`}
//             >
//               Publish
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddAgendaFromModal;
