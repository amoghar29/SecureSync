import { useState, useEffect } from "react";
import { Plus, X, RefreshCw } from "lucide-react";
import axios from "axios";
import "../App.css"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface TOTPCode {
  serviceName: string;
  token: string;
}

export default function Dashboard() {
  const [codes, setCodes] = useState<TOTPCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSecret, setNewSecret] = useState({
    serviceName: "",
    secretKey: "",
  });

  const fetchCodes = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/totp/generateAll`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setCodes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching codes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNewSecret = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/totp/secret`,
        newSecret,
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsDialogOpen(false);
        setNewSecret({ serviceName: "", secretKey: "" });
        fetchCodes();
      }
    } catch (error) {
      console.error("Error adding secret:", error);
    }
  };

  useEffect(() => {
    fetchCodes();
    // Fetch new codes every 30 seconds
    const interval = setInterval(fetchCodes, 20000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Get Started</h2>
        <p className="text-gray-400 mb-8">
          Add your first account to start generating secure authentication codes
        </p>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </button>
      </div>
    </div>
  );

  const CodesList = () => (
    <div className="min-h-screen bg-black p-4 pt-20">
      <div className="max-w-md mx-auto space-y-4">
        {codes.map((code, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg p-4 border border-gray-800"
          >
            <div className="text-gray-400 text-sm mb-1">{code.serviceName}</div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-mono text-blue-400">
                {code.token}
              </div>
              <div className="relative">
                <RefreshCw className="rotate-slow w-6 h-6 text-blue-400 animate-spin-slow" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );

  return (
    <>
      {codes.length === 0 ? <EmptyState /> : <CodesList />}

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-white mb-6">
              Add New Account
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  value={newSecret.serviceName}
                  onChange={(e) =>
                    setNewSecret((prev) => ({
                      ...prev,
                      serviceName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Google, GitHub"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Secret Key
                </label>
                <input
                  type="text"
                  value={newSecret.secretKey}
                  onChange={(e) =>
                    setNewSecret((prev) => ({
                      ...prev,
                      secretKey: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter your secret key"
                />
              </div>

              <button
                onClick={addNewSecret}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-6 transition-colors"
              >
                Add Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
