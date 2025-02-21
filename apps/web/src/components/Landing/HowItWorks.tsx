import { QrCode, Wallet, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    number: 1,
    icon: <QrCode className="w-12 h-12 text-blue-500" />,
    title: "Download & Install",
    description: "Download the app or login to the website",
  },
  {
    number: 2,
    icon: <Wallet className="w-12 h-12 text-blue-500" />,
    title: "Scan QR Code",
    description:
      "Use the app to scan the QR code provided by your service provider or website.",
  },
  {
    number: 3,
    icon: <Shield className="w-12 h-12 text-blue-500" />,
    title: "Generate Codes",
    description:
      "Instantly get secure TOTP codes whenever you need to log in to your accounts.",
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div
      id="how-it-works"
      className="relative bg-black min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How SecureSync Works
          </h2>
          <p className="text-gray-400 text-lg">
            Three simple steps to secure your accounts with our advanced 2FA
            solution
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-gray-900 rounded-xl p-8 border border-gray-800"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {step.number}
              </div>
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}
