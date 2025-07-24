import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = ({ className }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateClock(); // initial
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId); // cleanup
  }, []);

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/login");
  };

  return (
    <nav
      className={`bg-[#DADDEC] h-16 flex items-center justify-end px-4 text-black ${className} gap-4`}
    >
      <div>
        <h4 className="text-xl">Time: {currentTime}</h4>
      </div>
      <div>
        <h4 className="font-bold text-[20px]">Hey Zeeshan Khan</h4>
      </div>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border border-gray-400"
        >
          <img
            src="/profile.jpg" // replace with actual path or dynamic image
            alt="Profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ""; // fallback to initials or blank
              e.target.style.display = "none";
            }}
            className="w-full h-full object-cover"
          />
          {!isOpen && (
            <img
              src="https://zeeshan-khan-full-stack-dev-portfolio.vercel.app/persnal/young-male.png"
              alt="Profile Image"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded text-black z-10">
            <div className="px-4 py-2 border-b font-medium">
              Hey Zeeshan Khan
            </div>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
