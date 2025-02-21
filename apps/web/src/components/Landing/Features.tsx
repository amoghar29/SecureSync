import { Lock, QrCode, Cloud, Fingerprint, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: <Lock className="w-8 h-8 text-blue-500" />,
    title: "Secure TOTP Generation",
    description:
      "Industry-standard time-based one-time passwords with military-grade encryption for maximum security.",
  },
  {
    icon: <QrCode className="w-8 h-8 text-blue-500" />,
    title: "Easy QR Code Scanning",
    description:
      "Instantly add new accounts with our lightning-fast QR code scanner. No manual entry required.",
  },
  {
    icon: <Cloud className="w-8 h-8 text-blue-500" />,
    title: "Offline Functionality",
    description:
      "Generate secure codes even without an internet connection. Your security never goes offline.",
  },
  {
    icon: <Fingerprint className="w-8 h-8 text-blue-500" />,
    title: "Biometric Authentication",
    description:
      "Secure your accounts with fingerprint or face recognition for an extra layer of protection.",
  },
  {
    icon: <Zap className="w-8 h-8 text-blue-500" />,
    title: "Lightweight Design",
    description:
      "Minimal resource usage while maintaining maximum security and performance.",
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    title: "Privacy Focused",
    description:
      "Your data never leaves your device. Zero tracking, zero analytics, complete privacy.",
  },
];

export default function Features() {
  return (
    <div id="features" className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful Features for Enhanced Security
          </h2>
          <p className="text-gray-400 text-lg">
            Experience industry-leading security features that make SecureSync
            the most reliable 2FA solution available.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <div className="bg-blue-500/10 rounded-lg p-3 inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
