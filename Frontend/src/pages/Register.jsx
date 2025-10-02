import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaCloudUploadAlt } from "react-icons/fa";

// Maharashtra districts and talukas (minimal sample, add all as needed)
const districtsData = {
  "Ahmednagar": [
    "Ahmednagar", "Shrigonda", "Kopargaon", "Rahata", "Akole", "Sangamner", "Parner", "Rahuri", "Shrirampur", "Nevasa", "Shevgaon", "Pathardi", "Jamkhed"
  ],
  "Akola": [
    "Akola", "Akot", "Balapur", "Murtizapur", "Patur", "Telhara"
  ],
  "Amravati": [
    "Amravati", "Bhatkuli", "Nandgaon Khandeshwar", "Dharni", "Chikhaldara", "Achalpur", "Chandurbazar", "Morshi", "Warud", "Daryapur", "Anjangaon Surji", "Chandur Bazar", "Dhamangaon Railway", "Tiosa"
  ],
  "Aurangabad": [
    "Aurangabad", "Kannad", "Vaijapur", "Gangapur", "Sillod", "Soegaon", "Khuldabad", "Phulambri", "Paithan"
  ],
  "Beed": [
    "Beed", "Ashti", "Patoda", "Shirur (Kasar)", "Georai", "Majalgaon", "Ambajogai", "Parli", "Wadwani", "Kaij", "Dharur"
  ],
  "Bhandara": [
    "Bhandara", "Tumsar", "Mohadi", "Sakoli", "Pauni", "Lakhani", "Lakhandur"
  ],
  "Buldhana": [
    "Buldhana", "Chikhli", "Deulgaon Raja", "Malkapur", "Motala", "Nandura", "Sangrampur", "Shegaon", "Jalgaon Jamod", "Lonar", "Mehkar"
  ],
  "Chandrapur": [
    "Chandrapur", "Ballarpur", "Bhadravati", "Warora", "Chimur", "Nagbhid", "Mul", "Saoli", "Gondpipri", "Korpana", "Pombhurna", "Rajura", "Tadoor"
  ],
  "Dhule": [
    "Dhule", "Sakri", "Shirpur"
  ],
  "Gadchiroli": [
    "Gadchiroli", "Armori", "Sironcha", "Kurkheda", "Desaiganj (Wadsa)", "Aheri", "Chimur", "Dhanora", "Mulchera", "Bhamragad", "Etapalli", "Chamorshi"
  ],
  "Gondia": [
    "Gondia", "Tirora", "Tumsar", "Arjuni Morgaon", "Salekasa", "Sadak Arjuni", "Deori"
  ],
  "Hingoli": [
    "Hingoli", "Basmath", "Kalamnuri", "Sengaon", "Aundha Nagnath"
  ],
  "Jalgaon": [
    "Jalgaon", "Bhusawal", "Erandol", "Chalisgaon", "Jamner", "Pachora", "Parola", "Bodwad", "Dharangaon", "Muktainagar", "Raver", "Yawal", "Amalner"
  ],
  "Jalna": [
    "Jalna", "Ambad", "Partur", "Ghansawangi", "Mantha", "Bhokardan", "Badnapur", "Sindkhed Raja"
  ],
  "Kolhapur": [
    "Karvir", "Panhala", "Hatkanangle", "Shirol", "Gadhinglaj", "Radhanagari", "Chandgad", "Kagal", "Ajara"
  ],
  "Latur": [
    "Latur", "Renapur", "Udgir", "Nilanga", "Ausa", "Jalkot", "Shirur Anantpal", "Deoni"
  ],
  "Mumbai City": [
    "Mumbai"
  ],
  "Mumbai Suburban": [
    "Andheri", "Borivali", "Kurla"
  ],
  "Nagpur": [
    "Nagpur", "Kamptee", "Ramtek", "Katol", "Narkhed", "Kalameshwar", "Parshivni", "Hingna", "Umred", "Mouda"
  ],
  "Nanded": [
    "Nanded", "Ardhapur", "Bhokar", "Biloli", "Deglur", "Dharmabad", "Hadgaon", "Himayatnagar", "Kandhar", "Kinwat", "Loha", "Mahur", "Mudkhed", "Moktali", "Mukhed", "Naigaon (Khairgaon)", "Umri"
  ],
  "Nandurbar": [
    "Nandurbar", "Akkalkuwa", "Taloda", "Shahada", "Dhadgaon", "Navapur"
  ],
  "Nashik": [
    "Nashik", "Sinnar", "Dindori", "Igatpuri", "Malegaon", "Nandgaon", "Yeola", "Deola", "Baglan", "Chandwad", "Kalwan", "Trimbak"
  ],
  "Osmanabad": [
    "Osmanabad", "Tuljapur", "Bhum", "Paranda", "Kalamb", "Vashi", "Lohara", "Umarga"
  ],
  "Palghar": [
    "Vasai", "Palghar", "Dahanu", "Talasari", "Jawhar", "Mokhada", "Vikramgad", "Wada"
  ],
  "Parbhani": [
    "Parbhani", "Pathri", "Sonpeth", "Manwath", "Gangakhed", "Palam", "Jintur", "Sailu", "Purna"
  ],
  "Pune": [
    "Pune City", "Haveli", "Khed", "Shirur", "Junnar", "Ambegaon", "Mawal", "Mulshi", "Bhor", "Baramati", "Indapur", "Daund"
  ],
  "Raigad": [
    "Alibag", "Pen", "Panvel", "Khalapur", "Uran", "Karjat", "Roha", "Sudhagad", "Mahad", "Poladpur", "Shrivardhan", "Mangaon", "Murud"
  ],
  "Ratnagiri": [
    "Ratnagiri", "Sangameshwar", "Chiplun", "Guhagar", "Khed", "Mandangad", "Dapoli", "Lanja"
  ],
  "Sangli": [
    "Sangli", "Miraj", "Kavathe Mahankal", "Tasgaon", "Palus", "Jath", "Atpadi", "Khanapur", "Walwa", "Shirala"
  ],
  "Satara": [
    "Satara", "Karad", "Wai", "Khandala", "Phaltan", "Man", "Mahabaleshwar", "Jaoli", "Patan"
  ],
  "Sindhudurg": [
    "Kudal", "Sawantwadi", "Vengurla", "Malwan", "Devgad", "Vaibhavwadi", "Dodamarg", "Kanakavali"
  ],
  "Solapur": [
    "Solapur North", "Solapur South", "Akkalkot", "Barshi", "Madha", "Karmala", "Pandharpur", "Mohol", "Malshiras", "Sangola", "Mangalwedha"
  ],
  "Thane": [
    "Thane", "Bhiwandi", "Kalyan", "Ulhasnagar", "Ambarnath", "Murbad", "Shahapur", "Vasai", "Palghar", "Dahanu", "Jawhar", "Mokhada", "Talasari", "Vikramgad", "Wada"
  ],
  "Wardha": [
    "Wardha", "Deoli", "Hinganghat", "Arvi", "Samudrapur", "Seloo", "Ashti", "Karanja"
  ],
  "Washim": [
    "Washim", "Risod", "Malegaon", "Mangrulpir", "Karanja", "Manora"
  ],
  "Yavatmal": [
    "Yavatmal", "Wani", "Maregaon", "Pandharkawada (Kelapur)", "Ralegaon", "Ghatanji", "Darwha", "Ner", "Digras", "Arni", "Pusad", "Mahagaon", "Umarkhed", "Kalamb"
  ]
};


const allDistricts = Object.keys(districtsData);

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    state: "Maharashtra",
    district: "",
    taluka: "",
    profilePic: "",
  });
  const [previewPic, setPreviewPic] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileRef = useRef();

  // On field change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value, ...(e.target.name === "district" && { taluka: "" }) });
  }

  // Profile pic upload handler
  function handlePicUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewPic(ev.target.result);
      setForm((old) => ({ ...old, profilePic: ev.target.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.phone || !form.address || !form.district || !form.taluka || !form.gender || !form.dob) {
      setError("Please fill all required fields.");
      return;
    }
    const ok = register(form);
    if (ok) {
      setSuccess(true);
      setError("");
      setTimeout(() => navigate("/login"), 1200);
    } else {
      setError("Email already registered");
    }
  }

  // Get taluka options for selected district
  const talukaOptions = form.district ? districtsData[form.district] : [];

 return (
    <div className="max-w-5xl mx-auto mt-8 p-8 bg-white rounded-2xl shadow-2xl flex flex-col gap-8">
      <h2 className="text-2xl font-extrabold mb-1 text-purple-700 text-center">Create Your Account</h2>
      {success && <div className="mb-3 text-green-600 text-center">Registration successful! Redirecting...</div>}
      {error && <div className="mb-3 text-red-600 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Profile Picture Upload */}
        <div className="flex flex-row items-center justify-start gap-7 mb-1">
          <label className="font-semibold text-gray-700 flex flex-col items-center w-44">
            Profile Picture <span className="text-gray-400 font-normal">(optional)</span>
            <div
              className="relative flex flex-col items-center justify-center border-2 border-dashed border-purple-300 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all cursor-pointer p-6 w-40 h-40 mt-2"
              onClick={() => fileRef.current.click()}
            >
              {previewPic ? (
                <img src={previewPic} alt="Preview" className="object-cover rounded-full w-20 h-20 mb-2 border shadow-lg" />
              ) : (
                <FaCloudUploadAlt size={44} className="text-purple-400 mb-2" />
              )}
              <span className="text-xs text-gray-600">Click to upload</span>
              <input type="file" accept="image/*" ref={fileRef} onChange={handlePicUpload} className="hidden" />
            </div>
          </label>
          <div className="flex-grow">
            {/* General info grouped in 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="font-semibold text-gray-700 flex flex-col">
                Full Name
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="border px-3 py-2 rounded mt-1" />
              </label>
              <label className="font-semibold text-gray-700 flex flex-col">
                Email
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Eg: user@grievx.com" required className="border px-3 py-2 rounded mt-1" />
              </label>
              <label className="font-semibold text-gray-700 flex flex-col">
                Phone Number
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className="border px-3 py-2 rounded mt-1" />
              </label>
              <label className="font-semibold text-gray-700 flex flex-col">
                Gender
                <select name="gender" value={form.gender} onChange={handleChange} required className="border px-3 py-2 rounded mt-1">
                  <option value="">Select Gender</option>
                  <option value="Other">Other / Not say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <label className="font-semibold text-gray-700 flex flex-col">
                Date of Birth
                <input name="dob" type="date" value={form.dob} onChange={handleChange} required className="border px-3 py-2 rounded mt-1" />
              </label>
              <label className="font-semibold text-gray-700 flex flex-col">
                State
                <select className="border px-3 py-2 rounded mt-1" name="state" value={form.state} disabled>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </label>
              <label className="font-semibold text-gray-700 flex flex-col">
                District
                <select name="district" value={form.district} onChange={handleChange} required className="border px-3 py-2 rounded mt-1">
                  <option value="">Select District</option>
                  {Object.keys(districtsData).map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </label>
              <label className="font-semibold text-gray-700 flex flex-col">
                Taluka
                <select name="taluka" value={form.taluka} onChange={handleChange} required className="border px-3 py-2 rounded mt-1" disabled={!form.district}>
                  <option value="">Select Taluka</option>
                  {talukaOptions.map((tal) => (
                    <option key={tal} value={tal}>{tal}</option>
                  ))}
                </select>
              </label>
              <label className="font-semibold text-gray-700 flex flex-col">
                Role
                <select name="role" value={form.role} onChange={handleChange} className="border px-3 py-2 rounded mt-1">
                  <option value="citizen">Citizen</option>
                  <option value="admin">Admin</option>
                  <option value="chief">Chief</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        {/* Password fields as last row, 2 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          <label className="font-semibold text-gray-700 flex flex-col">
            Password
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Choose a password" required className="border px-3 py-2 rounded mt-1" />
          </label>
          <label className="font-semibold text-gray-700 flex flex-col">
            Confirm Password
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" required className="border px-3 py-2 rounded mt-1" />
          </label>
        </div>
        <button type="submit" className="bg-purple-700 text-white rounded py-2 font-semibold hover:bg-purple-800 transition text-lg">
          Register
        </button>
      </form>
    </div>
  );
}
