"use client";
import React, { useState } from 'react';

const AfterPage: React.FC = () => {
  const [vision, setVision] = useState("A Vision provides direction, motivation, and reinforcement for decision-making. It inspires employees, differentiates the organization, and serves as a benchmark for measuring progress. Crafting a clear Vision statement ensures alignment, focus, and success.");
  const [isEditing, setIsEditing] = useState(false);
  const [editedVision, setEditedVision] = useState(vision);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setVision(editedVision);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedVision(vision);
    setIsEditing(false);
  };

  return (
    <div className="p-5 bg-gray-50">
      <div className="bg-white border border-gray-200 p-5 rounded-lg relative">
        <div className='flex justify-between items-center mb-5'>

        <h2 className="text-2xl font-semibold mb-2">Vision</h2>
        





                <div className="flex justify-between items-center">
          <div>
            {isEditing ? (
              <>
                <button onClick={handleSave} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg mr-2">Save</button>
                <button onClick={handleCancel} className="bg-white text-blue-500 border cursor-pointer border-blue-500 px-4 py-2 rounded-lg">Cancel</button>
              </>
            ) : (
              <button onClick={handleEdit} className="text-blue-800 font-bold cursor-pointer">Edit</button>
            )}
          </div>
        </div>








        </div>
        {isEditing ? (
          <textarea
            value={editedVision}
            onChange={(e) => setEditedVision(e.target.value)}
            className="w-full min-h-[100px] p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <p className="mb-2">{vision}</p>
        )}
        
      </div>
      <div className='flex justify-end'>

          <button className="bg-blue-900 mr-1 mt-5 text-white px-4 py-2 rounded-lg">ClaretiAI Insights</button>
      </div>
    </div>
  );
};

export default AfterPage;