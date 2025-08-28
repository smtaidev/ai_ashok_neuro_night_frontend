import React from "react";

interface TakeMeetingMinutesModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingId: string | null;
  agendas?: any;
  loading?: boolean;
}

const TakeMeetingMinutesModal: React.FC<TakeMeetingMinutesModalProps> = ({
  isOpen,
  onClose,
  meetingId,
  agendas,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Right drawer */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-all">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-900 px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-white">Take Meeting Minutes</h2>
          <button
            onClick={onClose}
            className="text-white cursor-pointer hover:text-gray-200 text-xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {meetingId ? (
            <>
              <p className="text-gray-700">
                <span className="font-medium">Meeting ID:</span> {meetingId}
              </p>

              {loading && <p className="text-gray-500">Loading agendas...</p>}

              {!loading && agendas && agendas.data?.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {agendas.data.map((agenda: any, idx: number) => (
                    <li key={idx}>{agenda.title || "Untitled Agenda"}</li>
                  ))}
                </ul>
              ) : (
                !loading && <p className="text-gray-500">No agendas found.</p>
              )}
            </>
          ) : (
            <p className="text-gray-500">No meeting selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeMeetingMinutesModal;
