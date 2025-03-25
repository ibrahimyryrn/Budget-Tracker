import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { Button } from "../components/ui/button";
import { getCookies, removeCookies } from "../lib/cookies";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function HomePage() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    const { access_token } = getCookies();

    try {
      await axios.post(
        "https://ocmbpcwwhfvdttiwsgtw.supabase.co/auth/v1/logout",
        {},
        {
          headers: {
            apikey: `${import.meta.env.VITE_SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      removeCookies();
      alert("Successfully logout! Redirecting to login page...");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      removeCookies();
      alert(
        "Logout failed, but local session cleared. Redirecting to login page..."
      );
      navigate("/");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Logout Button */}
      <div className="w-full flex justify-end p-4 sm:p-6">
        <Button
          variant="outline"
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Logging out...
            </>
          ) : (
            "Logout"
          )}
        </Button>
      </div>

      {/* Header + Dashboard */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Budget Tracker
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Manage your finances with ease
          </p>
        </div>

        <Dashboard />
      </div>
    </main>
  );
}

export default HomePage;
