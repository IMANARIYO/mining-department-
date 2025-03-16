// src/components/BlastingForm.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";

const BlastingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    reportId: "",
    dateTime: new Date().toISOString(),
    blastLocation: "",
    blastId: "",
    rockType: "",
    groundStability: "",
    waterPresence: "",
    groundTemperature: 0,
    numberOfHoles: 0,
    holeDepth: 0,
    holeDiameter: 0,
    holeCondition: "",
    ventilationPlan: false,
    areaEvacuated: false,
    personnelAccounted: false,
    equipmentRemoved: false,
    teamLeadSignature: "",
    teamMembers: ["", ""]
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type} = e.target;
      const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/blasting", formData);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg space-y-6">
      <h1 className="text-2xl font-bold mb-4">
        Blasting Team Pre-Blast Report
      </h1>

      {/* Basic Information */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Report ID</label>
            <input
              type="text"
              name="reportId"
              value={formData.reportId}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Date & Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-gray-700">Blast Location</label>
            <input
              type="text"
              name="blastLocation"
              value={formData.blastLocation}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Blast ID</label>
            <input
              type="text"
              name="blastId"
              value={formData.blastId}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
      </div>

      {/* Ground Conditions Assessment & Blast Hole Preparation */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">
          Ground Conditions Assessment
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Rock Type</label>
            <input
              type="text"
              name="rockType"
              value={formData.rockType}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Ground Stability</label>
            <input
              type="text"
              name="groundStability"
              value={formData.groundStability}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-gray-700">Water Presence</label>
            <input
              type="text"
              name="waterPresence"
              value={formData.waterPresence}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Ground Temperature</label>
            <input
              type="number"
              name="groundTemperature"
              value={formData.groundTemperature}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2 mt-4">
          Blast Hole Preparation
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Number of Holes</label>
            <input
              type="number"
              name="numberOfHoles"
              value={formData.numberOfHoles}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Hole Diameter (mm)</label>
            <input
              type="number"
              name="holeDiameter"
              value={formData.holeDiameter}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-gray-700">Hole Depth (m)</label>
            <input
              type="number"
              name="holeDepth"
              value={formData.holeDepth}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Hole Condition</label>
            <div className="flex items-center space-x-2">
              <label>
                <input
                  type="checkbox"
                  name="holeCondition"
                  value="Clean"
                  checked={formData.holeCondition === "Clean"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Clean
              </label>
              <label>
                <input
                  type="checkbox"
                  name="holeCondition"
                  value="Blocked"
                  checked={formData.holeCondition === "Blocked"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Blocked
              </label>
              <label>
                <input
                  type="checkbox"
                  name="holeCondition"
                  value="Partially Blocked"
                  checked={formData.holeCondition === "Partially Blocked"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Partially Blocked
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Checklist & Team Sign-off */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Safety Checklist</h2>
        <div className="space-y-2">
          <div>
            <label className="block text-gray-700">
              <input
                type="checkbox"
                name="ventilationPlan"
                checked={formData.ventilationPlan}
                onChange={handleChange}
                className="mr-2"
              />
              Ventilation Plan Implemented
            </label>
          </div>
          <div>
            <label className="block text-gray-700">
              <input
                type="checkbox"
                name="areaEvacuated"
                checked={formData.areaEvacuated}
                onChange={handleChange}
                className="mr-2"
              />
              Area Evacuated and Secured
            </label>
          </div>
          <div>
            <label className="block text-gray-700">
              <input
                type="checkbox"
                name="personnelAccounted"
                checked={formData.personnelAccounted}
                onChange={handleChange}
                className="mr-2"
              />
              Personnel Accounted For
            </label>
          </div>
          <div>
            <label className="block text-gray-700">
              <input
                type="checkbox"
                name="equipmentRemoved"
                checked={formData.equipmentRemoved}
                onChange={handleChange}
                className="mr-2"
              />
              Equipment Removed from Blast Area
            </label>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2 mt-4">Team Sign-off</h2>
        <div>
          <label className="block text-gray-700">Team Lead Signature</label>
          <input
            type="text"
            name="teamLeadSignature"
            value={formData.teamLeadSignature}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mt-2">
          <label className="block text-gray-700">Team Members</label>
          {formData.teamMembers.map((member, index) => (
            <input
              key={index}
              type="text"
              value={member}
              onChange={(e) => {
                const newMembers = [...formData.teamMembers];
                newMembers[index] = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  teamMembers: newMembers
                }));
              }}
              className="w-full border rounded p-2 mb-2"
            />
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlastingForm;
