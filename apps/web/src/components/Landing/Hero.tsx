import { useNavigate } from "react-router-dom";
import { Lock, Mail,  } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-black pb-8 pt-48">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-5xl font-bold text-white leading-tight">
              Secure Your Digital Identity With{" "}
              <span className="text-blue-500">SecureSync</span>
            </h1>
            <p className="text-xl text-gray-300">
              A modern, secure alternative to Google Authenticator. Manage your
              two-factor authentication codes with ease and confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all">
                Add New Service
              </button>
              <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all">
                View Tutorial
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-neutral-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Your Authentication Codes
                </h2>

              </div>

              <div className="space-y-4">
                <div className="bg-neutral-700/50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">GitHub</h3>
                        <p className="text-gray-400 text-sm">Expires in 25s</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-mono text-blue-400">
                        123 456
                      </span>
                      <button className="text-neutral-400 hover:text-red-500 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-700/50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Gmail</h3>
                        <p className="text-gray-400 text-sm">Expires in 15s</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-mono text-blue-400">
                        789 012
                      </span>
                      <button className="text-neutral-400 hover:text-red-500 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
