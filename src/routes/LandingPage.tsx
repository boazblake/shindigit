import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { Calendar, Users, Gift, LogIn, UserPlus, Key, User } from "lucide-react";

const LandingPage = () => {
  const { login, logout, signup, user } = useUserContext();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      isLogin ? await login(alias, password) : await signup(alias, password);
      navigate("/home");
    } catch (err) {
      console.error("Auth Error", err);
      setErrorMessage(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero section */}
          <div className="space-y-8 text-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Plan Events,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Share Moments
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Create and manage events with ease. Invite friends, track RSVPs, and coordinate items to bring.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <div className="p-3 bg-indigo-100 rounded-lg w-fit mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Easy Planning</h3>
                <p className="text-sm text-gray-600">Create and manage events in minutes</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Track RSVPs</h3>
                <p className="text-sm text-gray-600">Know who's coming to your event</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Item Sharing</h3>
                <p className="text-sm text-gray-600">Coordinate what to bring</p>
              </div>
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="mb-8">
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    isLogin 
                      ? "bg-indigo-600 text-white shadow-sm" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <LogIn className="w-5 h-5 inline-block mr-2" />
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    !isLogin 
                      ? "bg-indigo-600 text-white shadow-sm" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <UserPlus className="w-5 h-5 inline-block mr-2" />
                  Register
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-1 text-center">
                  Alias
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="alias"
                    type="text"
                    placeholder="Enter your alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-center"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-center">
                  Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-center"
                  />
                </div>
              </div>
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
                  {errorMessage}
                </div>
              )}
              <button
                type="submit"
                className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
              >
                {isLogin ? (
                  <>
                    <LogIn className="w-5 h-5 inline-block mr-2" />
                    Login
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 inline-block mr-2" />
                    Create Account
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;