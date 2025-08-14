"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSubmit: (data: FormValues) => void;
  meetingId: string | null;
};

export type FormValues = {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  meetingType: "Monthly" | "Quarterly" | "Annual" | "Board" | "";
  attendeeNames: string;
  welcomeRemark: string;
  presenter: string;
  meetingMinutes: string;
  agendaTitle: string;
  agendaPresenter: string;
  agendaHr: string;
  agendaMin: string;
  agendaItems: string;
  agendaItemDetails: string;
  priority: "High" | "Medium" | "Low" | "";
  status: "Open" | "In Progress" | "Closed" | "";
};

const MEETING_TYPES = ["Monthly", "Quarterly", "Annual", "Board"] as const;
const PRIORITY_OPTIONS = ["High", "Medium", "Low"] as const;
const STATUS_OPTIONS = ["Open", "In Progress", "Closed"] as const;

const ArchiveFromModal: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title = "Meeting Details",
  onSubmit,
  meetingId,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      meetingType: "",
      priority: "",
      status: "",
      attendeeNames: "Tom, Harry, John, George, Dana, David, Todd",
      presenter: "Cameron Williamson",
      agendaPresenter: "Cameron Williamson",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      welcomeRemark: "",
      meetingMinutes: "",
      agendaTitle: "",
      agendaHr: "",
      agendaMin: "",
      agendaItems: "",
      agendaItemDetails: "",
    },
  });

  const meetingType = watch("meetingType");

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
      const firstFocusable = focusableElements[0] as HTMLElement;
      firstFocusable?.focus();
    } else {
      (document.activeElement as HTMLElement)?.blur();
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="Close modal"
      />

      <div
        className={`absolute top-0 right-0 w-full sm:w-[40rem] h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        inert={!isOpen}
      >
        <div className="flex items-center justify-between p-4 bg-blue-600 text-gray-900">
          <h2 id="modal-title" className="text-xl font-semibold text-white tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-medium hover:text-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="p-6 overflow-y-auto flex-1 space-y-6"
        >
          

          {/* Start & End Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Start Date & Time */}
            <div>
              <label className="block font-semibold mb-1 text-sm">Start Date &amp; Time</label>
              <div className="flex gap-2">
                <input
                  {...register("startDate", { required: true })}
                  type="text"
                  placeholder="May 17, 2024"
                  className={`border rounded-lg px-3 py-2 w-1/2 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.startDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <div className="relative w-1/2">
                  <input
                    {...register("startTime", { required: true })}
                    type="text"
                    placeholder="12:00 AM"
                    className={`border rounded-lg px-3 py-2 w-full text-sm text-gray-600 placeholder-gray-400 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.startTime ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    {/* Clock icon (simple SVG) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* End Date & Time */}
            <div>
              <label className="block font-semibold mb-1 text-sm">End Date &amp; Time</label>
              <div className="flex gap-2">
                <input
                  {...register("endDate", { required: true })}
                  type="text"
                  placeholder="May 17, 2024"
                  className={`border rounded-lg px-3 py-2 w-1/2 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.endDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <div className="relative w-1/2">
                  <input
                    {...register("endTime", { required: true })}
                    type="text"
                    placeholder="12:00 AM"
                    className={`border rounded-lg px-3 py-2 w-full text-sm text-gray-600 placeholder-gray-400 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.endTime ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Type Buttons */}
          <div>
            <label className="block font-semibold mb-2 text-sm">Meeting Type</label>
            <div className="flex gap-3 flex-wrap">
              {MEETING_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setValue("meetingType", type)}
                  className={`border border-black rounded-md px-3 py-1 text-sm font-medium select-none transition-colors ${
                    meetingType === type
                      ? "bg-blue-400 text-black"
                      : "text-gray-700 hover:bg-blue-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Attendee Names (readonly) */}
          <div>
            <label className="block font-semibold mb-1 text-sm">Attendee Name:</label>
            <p className="text-gray-700">Tom, Harry, John, George, Dana, David, Todd</p>
          </div>

          {/* Welcome and Opening Remark */}
          <div>
            <p className="font-semibold text-sm mb-1">Welcome And Opening Remark</p>
            <p className="font-semibold text-sm mb-1">
              Presenter: <span className="font-normal">Cameron Williamson</span>
            </p>
            <textarea
              {...register("welcomeRemark")}
              placeholder="Meeting Minutes......"
              className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[110px]"
            />
          </div>

          {/* Agenda Items Title */}
          <div>
            <label htmlFor="agendaTitle" className="block font-semibold mb-1 text-sm">
              Agenda Items
            </label>
            <input
              {...register("agendaTitle")}
              id="agendaTitle"
              type="text"
              placeholder="Title......"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="mt-1 font-semibold text-sm">
              Presenter: <span className="font-normal">Cameron Williamson</span>
            </p>
          </div>

          {/* Time Allocated */}
          <div>
            <label className="block font-semibold mb-1 text-sm">Time Allocated</label>
            <div className="flex gap-3 max-w-xs">
              <input
                {...register("agendaHr")}
                type="number"
                min={0}
                placeholder="Hr"
                className="w-1/2 rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                {...register("agendaMin")}
                type="number"
                min={0}
                max={59}
                placeholder="Min."
                className="w-1/2 rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Agenda Items Textarea */}
          <div>
            <textarea
              {...register("agendaItems")}
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when"
              className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[80px]"
            />
          </div>

          {/* Agenda Item Details and dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
            <textarea
              {...register("agendaItemDetails")}
              placeholder="Agenda Item Details"
              className="col-span-1 sm:col-span-2 w-full rounded-md border border-gray-300 p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[80px]"
            />
            <div className="space-y-3">
              <select
                {...register("priority")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Priority</option>
                {PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <select
                {...register("status")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Status</option>
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-blue-900 border border-blue-900 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArchiveFromModal;
