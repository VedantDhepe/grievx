import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqList = [
  {
    question: "What is GrievX?",
    answer:
      "GrievX is a smart civic complaint management platform that connects citizens, administrators, and supervisors for rapid, transparent issue resolution. Anyone can submit complaints, track their progress, and interact with authorities for a better city experience.",
  },
  {
    question: "Who can use GrievX?",
    answer:
      "GrievX is built for: (1) Citizens who want to report and follow civic complaints; (2) Admins who manage, assign, and resolve issues; (3) Supervisors/Chiefs who monitor overdue complaints and overall system health.",
  },
  {
    question: "How do I file a complaint?",
    answer:
      "Sign up, log in as a citizen, and go to your dashboard. Click ‘Create Complaint’, fill out the details, optionally attach images, and submit. You can track its status throughout the process.",
  },
  {
    question: "How will I know if my complaint is resolved?",
    answer:
      "Each complaint’s dashboard status is updated in real-time. Notifications or emails may also be sent when there is a change in your complaint’s status.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, GrievX uses authentication and privacy best practices. Your personal details and complaints are only visible to authorized personnel handling your case.",
  },
  {
    question: "Which areas can I report issues for?",
    answer:
      "GrievX covers every district and taluka in Maharashtra. Complaints are routed to the correct authority based on your location details.",
  },
  {
    question: "What if my complaint is ignored or delayed?",
    answer:
      "Supervisors and Chiefs monitor all overdue complaints. You can also view the escalation path and contact details for authorities if necessary.",
  },
  {
    question: "How is GrievX different from other platforms?",
    answer:
      "GrievX is designed for fast, transparent, and accountable resolution, with analytics for authorities, mobile-friendly access, and locally-relevant area mapping."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState(-1);

  const toggle = (idx) => setOpen(open === idx ? -1 : idx);

  return (
    <div className="min-h-screen bg-lime-200 py-14 px-4">
      <div className="max-w-3xl mx-auto bg-white/80 rounded-xl shadow-lg py-10 px-6">
        <h1 className="text-3xl font-extrabold text-purple-800 mb-8 text-center">Frequently Asked Questions</h1>
        <div className="flex flex-col gap-5">
          {faqList.map((item, idx) => (
            <div key={idx} className="border rounded-2xl bg-white/70 transition hover:shadow-lg">
              <button
                className="w-full flex justify-between items-center text-lg font-semibold px-5 py-4 text-left focus:outline-none"
                onClick={() => toggle(idx)}
                aria-expanded={open === idx}
              >
                <span>{item.question}</span>
                <span className="text-purple-600">
                  {open === idx ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              <div
                className={`text-gray-700 px-5 pb-4 transition-all overflow-hidden ${open === idx ? "max-h-[200px]" : "max-h-0"}`}
                style={{ transition: 'max-height 0.3s', }}
              >
                {open === idx && (
                  <div>{item.answer}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
