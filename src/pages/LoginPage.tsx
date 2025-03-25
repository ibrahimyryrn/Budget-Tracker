import { LoginForm } from "../components/LoginForm";
import { Link } from "react-router-dom";
import logo from "../../public/budget-logo-white.svg"; // doğru path'le

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 transition-colors duration-200">
      {/* Sol görsel alan - sadece md ve üzeri */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* grid svg veya arka plan desenleri */}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center mb-10 text-center">
          <div className="w-48 h-48 mb-6">
            <img
              src={logo}
              alt="Budget Tracker Logo"
              className="w-full h-full"
            />
          </div>
          <h1 className="text-white text-4xl font-bold mb-2">BUDGET TRACKER</h1>
          <p className="text-blue-100 text-lg">Take control of your finances</p>
        </div>
      </div>

      {/* Sağ form alanı - tüm ekranlarda gösterilir */}
      <div className="flex flex-col justify-center p-6 md:p-12 w-full md:w-1/2">
        <div className="max-w-md w-full mx-auto">
          {/* Mobil logo - sadece md altında görünür */}
          <div className="md:hidden flex flex-col items-center mb-6">
            <div className="w-24 h-24 mb-2">
              <img
                src={logo}
                alt="Budget Tracker Logo"
                className="w-full h-full"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Budget Tracker</h1>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 mt-2">
              Sign in to your account to manage your budget
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
