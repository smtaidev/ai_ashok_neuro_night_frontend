"use client";
import { useState, useEffect } from "react";
import link from "@/public/image/link-icon.svg";
import Image from "next/image";

// Type for Strategic Theme
type Theme = {
  id: number;
  title: string;
  details: string;
};

const StrategicAfter = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [themeTitle, setThemeTitle] = useState<string>("");
  const [themeDetails, setThemeDetails] = useState<string>("");
  const [themes, setThemes] = useState<Theme[]>([]);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  // Load data from LocalStorage (or fallback hardcoded)
  useEffect(() => {
    const savedThemes = localStorage.getItem("strategicThemes");
    if (savedThemes) {
      setThemes(JSON.parse(savedThemes));
    } else {
      setThemes([
        { id: 1, title: "Data as an asset", details: "" },
        { id: 2, title: "Global expansion", details: "Lorem ipsum is simply dummy text of the printing industry." },
      ]);
    }
  }, []);

  // Save to LocalStorage when themes change
  useEffect(() => {
    localStorage.setItem("strategicThemes", JSON.stringify(themes));
  }, [themes]);

  // Save or Edit Theme
  const handleSave = () => {
    if (editingTheme) {
      setThemes((prevThemes) =>
        prevThemes.map((theme) =>
          theme.id === editingTheme.id
            ? { ...theme, title: themeTitle, details: themeDetails }
            : theme
        )
      );
      setEditingTheme(null);
    } else {
      setThemes((prevThemes) => [
        ...prevThemes,
        { id: Date.now(), title: themeTitle, details: themeDetails },
      ]);
    }
    setThemeTitle("");
    setThemeDetails("");
    setIsModalOpen(false);
  };

  // Edit Theme
  const handleEdit = (theme: Theme) => {
    setThemeTitle(theme.title);
    setThemeDetails(theme.details);
    setEditingTheme(theme);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  // Delete Theme
  const handleDelete = (id: number) => {
    setThemes((prevThemes) => prevThemes.filter((theme) => theme.id !== id));
    setActiveMenu(null);
  };

  return (
    <div className="bg-blue-50/50 min-h-[calc(100vh-65px)] p-5">
      <div className="space-y-10 p-5 bg-white rounded-2xl border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Strategic Themes</h1>
          <div className="flex items-center gap-3">
            <Image src={link} alt="link" className="w-6 h-6 cursor-pointer" />
          <button
            onClick={() => {
                setThemeTitle("");
                setThemeDetails("");
                setEditingTheme(null);
                setIsModalOpen(true);
            }}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
            >
            Add New Strategic Themes
          </button>
              </div>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme, index) => (
            <div key={theme.id} className="bg-sky-200 rounded-lg p-4 relative">
              <div className="flex justify-between items-start">
                <div>
                  {/* Serial number instead of theme.id */}
                  <span className="bg-blue-900 text-white rounded-full w-6 h-6 p-4 flex items-center justify-center">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold mt-2">{theme.title}</h3>
                </div>

                {/* Three dot menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === theme.id ? null : theme.id)
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ⋮
                  </button>
                  {activeMenu === theme.id && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg">
                      <button
                        onClick={() => handleEdit(theme)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(theme.id)}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {theme.details && <p className="text-sm mt-2">{theme.details}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-2xl text-gray-700"
            >
              &times;
            </button>
            <div className="bg-blue-900 text-white rounded-t-xl p-4 mb-4">
              <h2 className="text-xl font-bold">
                {editingTheme ? "Edit Strategic Theme" : "Create Strategic Theme"}
              </h2>
            </div>
            <div className="p-4 mb-4 space-y-4">
              <input
                type="text"
                value={themeTitle}
                onChange={(e) => setThemeTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Strategic theme title"
              />
              <textarea
                value={themeDetails}
                onChange={(e) => setThemeDetails(e.target.value)}
                className="w-full min-h-[150px] p-2 border border-gray-300 rounded-lg"
                placeholder="Add Details..."
              />
            </div>
            <div className="flex justify-end p-4 gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicAfter;
