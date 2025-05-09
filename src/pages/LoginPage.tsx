import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 transition-colors duration-200">
      {/* Sol taraf - sadece md ve üzeri ekranlarda görünür */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="smallGrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
              <pattern
                id="grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <rect width="80" height="80" fill="url(#smallGrid)" />
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center mb-10 text-center">
          <div className="w-48 h-48 mb-6">
            <img
              src="/budget-logo-white.svg"
              alt="Budget Tracker Logo"
              className="w-full h-full"
            />
          </div>
          <h1 className="text-white text-4xl font-bold mb-2">BUDGET TRACKER</h1>
          <p className="text-blue-100 text-lg">
            The key to your financial freedom
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-white text-xl font-medium mb-3">
              Reach Your Financial Goals
            </h3>
            <p className="text-blue-100">
              Track your income and expenses, plan your budget, and reach your
              financial goals faster.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium">Secure & Private</p>
              <p className="text-blue-100 text-sm">
                Your data is secure and private
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sağ taraf - Form her zaman görünür */}
      <div className="flex flex-col justify-center p-6 md:p-12 w-full md:w-1/2">
        <div className="max-w-md w-full mx-auto">
          {/* Mobil Logo - yalnızca md altında görünür */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="w-24 h-24 mb-4">
              <img
                src="/budget-logo-blue.svg"
                alt="Budget Tracker Logo"
                className="w-full h-full"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Budget Tracker</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 mt-2">
              Sign in to your account to manage your budget
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
