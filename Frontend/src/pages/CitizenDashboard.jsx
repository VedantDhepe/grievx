import React, { useState, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa"; // Add this import

// --- Dummy Data ---
const initialComplaints = [
  {
    id: 1,
    title: "Pothole in Main Street",
    category: "Road",
    location: "Ward 5, Near Park",
    duration: "3 days",
    imageUrl: "road.png",
    status: "Pending"
  },
  {
    id: 2,
    title: "Water Leakage",
    category: "Water",
    location: "Block B, Sector 2",
    duration: "1 week",
    imageUrl: "water.png",
    status: "Resolved"
  }
];

function ComplaintCard({ complaint }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 border border-gray-100">
      {complaint.imageUrl &&
        <img
          src={complaint.imageUrl}
          alt={complaint.title}
          className="h-36 w-full object-cover rounded mb-2 border"
        />
      }
      <h3 className="text-lg font-bold text-purple-900">{complaint.title}</h3>
      <div className="text-sm text-gray-700">Category: {complaint.category}</div>
      <div className="text-sm text-gray-700">Location: {complaint.location}</div>
      <div className="text-sm text-gray-700">Duration: {complaint.duration}</div>
      <div className={`text-xs font-semibold ${complaint.status === "Resolved" ? "text-green-600" : "text-yellow-700"}`}>
        Status: {complaint.status}
      </div>
    </div>
  );
}

function ComplaintForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    duration: "",
    imageUrl: ""
  });
  const [previewPhoto, setPreviewPhoto] = useState("");
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewPhoto(ev.target.result);
    reader.readAsDataURL(file);
    setForm({ ...form, imageUrl: "" }); // Clear URL if uploading
  };

  const handleImageUrlChange = (e) => {
    setForm({ ...form, imageUrl: e.target.value });
    setPreviewPhoto(e.target.value);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewPhoto(ev.target.result);
      reader.readAsDataURL(file);
      setForm({ ...form, imageUrl: "" });
    }
  };

  const handleClickDropArea = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.category || !form.location || !form.duration) return;
    onSubmit({
      ...form,
      id: Date.now(),
      status: "Pending",
      imageUrl: previewPhoto
    });
    setForm({ title: "", category: "", location: "", duration: "", imageUrl: "" });
    setPreviewPhoto("");
  };

  return (
    <form className="bg-white/90 p-8 rounded-xl shadow-xl flex flex-col gap-4 max-w-xl mx-auto mb-10 border"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-extrabold text-purple-900 mb-2 text-center">
        Submit a Complaint
      </h2>
      <label className="font-semibold text-gray-700">
        Title
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Eg: Damaged streetlight at crossroads"
          className="border px-3 py-2 rounded w-full mt-1"
          required
        />
      </label>
      <label className="font-semibold text-gray-700">
        Category
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full mt-1"
          required
        >
          <option value="">Select Category</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Public Safety">Public Safety</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label className="font-semibold text-gray-700">
        Location
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Eg: Ward 3, near city library"
          className="border px-3 py-2 rounded w-full mt-1"
          required
        />
      </label>
      <label className="font-semibold text-gray-700">
        Duration of Problem
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Eg: 4 days"
          className="border px-3 py-2 rounded w-full mt-1"
          required
        />
      </label>
      <label className="font-semibold text-gray-700">
        Upload Photo
        <div
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-purple-500 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all cursor-pointer p-6 text-center"
          style={{ minHeight: "160px" }}
          onClick={handleClickDropArea}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <FaCloudUploadAlt size={48} className="text-purple-500 mb-2" />
          <span className="font-semibold text-purple-900">Click or drag & drop to upload an image</span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handlePhotoUpload}
          />
          <span className="text-xs text-gray-600">Max size: 10MB</span>
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            placeholder="Or paste image URL here"
            value={form.imageUrl}
            onChange={handleImageUrlChange}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        {previewPhoto &&
          <img
            src={previewPhoto}
            alt="preview"
            className="h-32 mt-3 mx-auto rounded border object-cover shadow"
          />
        }
      </label>
      <button
        type="submit"
        className="mt-3 bg-purple-700 text-white font-semibold py-2 rounded hover:bg-purple-800 transition"
      >
        Submit
      </button>
    </form>
  );
}

export default function CitizenDashboard() {
  const [complaints, setComplaints] = useState(initialComplaints);

  const handleAddComplaint = (data) => {
    setComplaints([data, ...complaints]);
  };

  return (
    <div className="py-10">
      <ComplaintForm onSubmit={handleAddComplaint} />
      <h2 className="text-xl font-bold text-purple-900 mb-6 text-center">Your Previous Complaints</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 pb-10">
        {complaints.map(comp => <ComplaintCard key={comp.id} complaint={comp} />)}
      </div>
    </div>
  );
}
