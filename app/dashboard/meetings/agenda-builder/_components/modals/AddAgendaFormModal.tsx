//? working code 
"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useGetMeetingByIdQuery, useCreateAgendaMutation } from "@/redux/api/meeting/meetingApi";
import toast from "react-hot-toast";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSubmit: (data: FormValues) => void;
  meetingId: string;
};

export type AgendaItem = {
  title: string;
  presenter: string[];
  timeHr: number;
  timeMin: number;
  details: string;
};

export type FormValues = {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  meetingType: "Monthly" | "Quarterly" | "Annual" | "Board" | "";
  attendees: string[];
  welcomePresenters: string[];
  welcomeHr: number;
  welcomeMin: number;
  agendaItems: AgendaItem[];
};

export type FormattedOutput = {
  inviteAttendees: { attendees: string[] };
  welcomeAndOpeningRemark: {
    presenter: string[];
    timeAllocated: { hours: number; minutes: number };
  };
  agendaItems: {
    title: string;
    presenter: string[];
    timeAllocated: { hours: number; minutes: number };
    details: string;
  }[];
};

const AddAgendaFromModal: React.FC<DrawerProps> = ({ isOpen, onClose, title, meetingId }) => {
  const { data, isLoading, error } = useGetMeetingByIdQuery(meetingId, { skip: !meetingId });
  const [createAgenda, { isLoading: isCreating }] = useCreateAgendaMutation();

  const { register, handleSubmit, setValue, watch, control, reset } = useForm<FormValues>({
    defaultValues: {
      startDate: "2025-08-24",
      startTime: "10:00",
      endDate: "2025-08-24",
      endTime: "12:00",
      meetingType: "Monthly",
      attendees: [],
      welcomePresenters: [],
      welcomeHr: 0,
      welcomeMin: 0,
      agendaItems: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "agendaItems" });

  const [attendeeInput, setAttendeeInput] = useState("");
  const [welcomePresenterInput, setWelcomePresenterInput] = useState("");
  const [agendaPresenterInputs, setAgendaPresenterInputs] = useState<Record<number, string>>({});

  const currentAttendees = watch("attendees");
  const currentWelcomePresenters = watch("welcomePresenters");
  const agendaItems = watch("agendaItems");

  // --- Attendees Handlers ---
  const handleAddAttendee = () => {
    if (attendeeInput.trim()) {
      setValue("attendees", [...currentAttendees, attendeeInput.trim()]);
      setAttendeeInput("");
    }
  };
  const handleRemoveAttendee = (index: number) => setValue(
    "attendees",
    currentAttendees.filter((_, i) => i !== index)
  );

  // --- Welcome Presenters Handlers ---
  const handleAddWelcomePresenter = () => {
    if (welcomePresenterInput.trim()) {
      setValue("welcomePresenters", [...currentWelcomePresenters, welcomePresenterInput.trim()]);
      setWelcomePresenterInput("");
    }
  };
  const handleRemoveWelcomePresenter = (index: number) => setValue(
    "welcomePresenters",
    currentWelcomePresenters.filter((_, i) => i !== index)
  );

  // --- Agenda Presenters Handlers ---
  const handleAddAgendaPresenter = (index: number) => {
    const input = agendaPresenterInputs[index] || "";
    if (input.trim()) {
      const updated = [...(agendaItems[index]?.presenter || []), input.trim()];
      setValue(`agendaItems.${index}.presenter`, updated);
      setAgendaPresenterInputs({ ...agendaPresenterInputs, [index]: "" });
    }
  };
  const handleRemoveAgendaPresenter = (agendaIndex: number, presenterIndex: number) => {
    const updated = agendaItems[agendaIndex].presenter.filter((_, i) => i !== presenterIndex);
    setValue(`agendaItems.${agendaIndex}.presenter`, updated);
  };

  // --- Submit Handler ---
 const submitHandler: SubmitHandler<FormValues> = async (formData) => {
  const payload: FormattedOutput = {
    inviteAttendees: { attendees: formData.attendees },
    welcomeAndOpeningRemark: {
      presenter: formData.welcomePresenters,
      timeAllocated: {
        hours: Number(formData.welcomeHr) || 0,
        minutes: Number(formData.welcomeMin) || 0,
      },
    },
    agendaItems: formData.agendaItems.map(item => ({
      title: item.title,
      presenter: item.presenter,
      timeAllocated: {
        hours: Number(item.timeHr) || 0,
        minutes: Number(item.timeMin) || 0,
      },
      details: item.details,
    })),
  };

  try {
    const response = await createAgenda({ meetingId, ...payload }).unwrap();
    console.log("Agenda Created:", response); // ✅ Log response
    toast.success("Agenda created successfully!"); // ✅ Show toast
    reset();
    onClose();
  } catch (err: any) {
    console.error("Error creating agenda:", err);
    toast.error(err?.data?.message || "Failed to create agenda."); // ✅ Show error toast
  }
};

  const darkBlue = "bg-blue-900/99";
  const borderBlue = "border-sky-800";
  const labelColor = "text-gray-800";

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading meeting</p>;

  return (
    <div className={`fixed inset-0 z-50 transition-all ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className={`absolute top-0 right-0 w-full sm:w-[40rem] h-full bg-white shadow-2xl transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className={`${darkBlue} p-4 text-white flex justify-between`}>
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose}>&times;</button>
        </div>

        <div className="overflow-y-auto h-full p-6">
          {/* Meeting Metadata */}
          {data?.data && (
            <div className="pb-6 mb-4 border-b space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Meeting Name</h3>
                <p className="mt-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
                  {data.data.name}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Start Date & Time</h3>
                  <div className="mt-2 flex gap-2">
                    <span className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
                      {new Date(data.data.startDate).toLocaleDateString()}
                    </span>
                    <span className="w-32 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
                      {new Date(data.data.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">End Date & Time</h3>
                  <div className="mt-2 flex gap-2">
                    <span className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
                      {new Date(data.data.endDate).toLocaleDateString()}
                    </span>
                    <span className="w-32 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
                      {new Date(data.data.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Meeting Type</h3>
                <div className="flex gap-2 flex-wrap">
                  {["Monthly", "Quarterly", "Annual", "Board"].map((type) => (
                    <span
  key={type}
  className={`px-3 py-1 rounded-full border border-white/30 
    text-sm font-medium transition-all duration-300 
    ${data.data.type === type
      ? "bg-blue-900/90 text-white backdrop-blur-lg shadow-lg hover:scale-105"
      : "bg-white/10 text-gray-400 backdrop-blur-md"}
  `}
>
  {type}
</span>

                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            {/* Attendees */}
            <div>
              <label className={labelColor}>Invite Attendees</label>
              <div className="flex gap-2 mt-2">
                <input
                  value={attendeeInput}
                  onChange={(e) => setAttendeeInput(e.target.value)}
                  type="text"
                  placeholder="Name..."
                  className="p-2 border rounded-lg flex-1"
                />
                <button type="button" onClick={handleAddAttendee} className={`px-4 py-2 ${darkBlue} text-white rounded-lg`}>
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentAttendees.map((attendee, index) => (
                  <span key={index} className="flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm">
                    {attendee}
                    <button type="button" onClick={() => handleRemoveAttendee(index)} className="text-red-500">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Welcome presenters */}
            <div>
              <label className={labelColor}>Welcome & Opening Remark</label>
              <div className="flex gap-2 mt-2">
                <input
                  value={welcomePresenterInput}
                  onChange={(e) => setWelcomePresenterInput(e.target.value)}
                  type="text"
                  placeholder="Name..."
                  className="p-2 border rounded-lg flex-1"
                />
                <button type="button" onClick={handleAddWelcomePresenter} className={`px-4 py-2 ${darkBlue} text-white rounded-lg`}>
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentWelcomePresenters.map((p, index) => (
                  <span key={index} className="flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm">
                    {p}
                    <button type="button" onClick={() => handleRemoveWelcomePresenter(index)} className="text-red-500">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <input type="number" {...register("welcomeHr")} placeholder="Hr" className="border p-2 w-16 rounded-lg" />
                <input type="number" {...register("welcomeMin")} placeholder="Min" className="border p-2 w-16 rounded-lg" />
              </div>
            </div>

            {/* Agenda Items */}
            <div>
              <label className={labelColor}>Agenda Items</label>
              <br />
              {fields.map((field, index) => (
                <div key={field.id} className="border p-3 rounded-lg mb-3">
                  <input {...register(`agendaItems.${index}.title` as const)} placeholder="Title" className="border p-2 w-full mb-2 rounded-lg" />

                  {/* Agenda presenters */}
                  <div className="flex gap-2 mb-2">
                    <input
                      value={agendaPresenterInputs[index] || ""}
                      onChange={(e) => setAgendaPresenterInputs({ ...agendaPresenterInputs, [index]: e.target.value })}
                      placeholder="Presenter name..."
                      className="border p-2 flex-1 rounded-lg"
                    />
                    <button type="button" onClick={() => handleAddAgendaPresenter(index)} className={`px-4 py-2 ${darkBlue} text-white rounded-lg`}>
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {agendaItems[index]?.presenter?.map((p, pIndex) => (
                      <span key={pIndex} className="flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm">
                        {p}
                        <button type="button" onClick={() => handleRemoveAgendaPresenter(index, pIndex)} className="text-red-500">
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 mb-2">
                    <input type="number" {...register(`agendaItems.${index}.timeHr` as const)} placeholder="Hr" className="border p-2 w-16 rounded-lg" />
                    <input type="number" {...register(`agendaItems.${index}.timeMin` as const)} placeholder="Min" className="border p-2 w-16 rounded-lg" />
                  </div>
                  <textarea {...register(`agendaItems.${index}.details` as const)} placeholder="Details..." className="border p-2 w-full rounded-lg" />
                  <button type="button" className="text-gray-600 bg-red-400/20 border border-red-200 p-2 rounded-2xl  mt-2" onClick={() => remove(index)}>Remove</button>
                </div>
              ))}
              {/* <br /> */}
              <div className="w-full flex justify-end">

            
              {fields.length < 20 && (
                <button type="button" className={`mt-2 px-4 py-2 ${darkBlue} text-white rounded-lg`} onClick={() => append({ title: "", presenter: [], timeHr: 0, timeMin: 0, details: "" })}>
                  + Add More
                </button>
              )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-10">
              <button type="submit" className={`${darkBlue} text-white px-6 py-2 rounded-lg`} disabled={isCreating}>
                {isCreating ? "Saving..." : "Save"}
              </button>
              <button type="submit" className={`${borderBlue} border px-6 py-2 rounded-lg`} disabled={isCreating}>
                {isCreating ? "Publishing..." : "Publish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAgendaFromModal;
