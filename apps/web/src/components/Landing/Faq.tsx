import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
const faqs = [
  {
    question: "How secure is SecureSync?",
    answer:
      "SecureSync uses military-grade encryption and follows industry best practices for TOTP generation. Your data is encrypted end-to-end and never stored unencrypted. We undergo regular security audits and penetration testing to ensure maximum security.",
  },
 
  {
    question: "What happens if I lose my device?",
    answer:
      "SecureSync offers secure cloud backup of your encrypted authentication data. With proper account verification, you can restore your codes on a new device. We recommend enabling biometric authentication and keeping recovery codes in a safe place.",
  },
  
  {
    question: "Is SecureSync available on all platforms?",
    answer:
      "SecureSync is available as a Progressive Web App (PWA) that works on all modern browsers and can be installed on desktop and mobile devices. Native apps for iOS and Android are also available.",
  },
  {
    question: "How does SecureSync ensure data privacy?",
    answer:
      "SecureSync prioritizes user privacy by implementing strict data handling policies. We do not sell or share your data with third parties, and all personal information is stored securely with encryption.",
  },
];

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="border-b border-gray-800">
        <button
          className="w-full py-6 flex justify-between items-center text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-white text-lg font-medium">{question}</span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>
        {isOpen && (
          <div className="pb-6">
            <p className="text-gray-400">{answer}</p>
          </div>
        )}
      </div>
    );
  };
export default function Faq() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about SecureSync
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
