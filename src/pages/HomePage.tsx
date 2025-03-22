import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { Button } from "../components/ui/button";
import { getCookies, removeCookies } from "../lib/cookies";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();

  async function handleLogout() {
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

      setTimeout(() => {
        alert("Successfully logout! Redirecting to login page...");
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Logout failed", error);
      removeCookies();

      alert(
        "Logout failed, but local session cleared. Redirecting to login page..."
      );
      navigate("/login");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="w-full flex justify-end p-4">
        <Button
          variant="outline"
          className=" bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 ">Budget Tracker</h1>
          <p className="text-gray-500  mt-2">Manage your finances with ease</p>
        </div>
        <Dashboard />
      </div>
    </main>
  );
}

export default HomePage;
