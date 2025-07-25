import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileDetails } from "../api/apiCalls";


const Navbar = ({ className }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const timeRef = useRef(null);

  const { data} = useQuery({
    queryKey: ["user"],
    queryFn: profileDetails,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
  });

  console.log("data", data?.data);
  // const { name, image } = data.data;

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      if (timeRef.current) {
        timeRef.current.innerText = timeString;
      }
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);



    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear("token");
    localStorage.clear("token");
    navigate("/login");
  };

  return (
    <nav
      className={`bg-[#DADDEC] h-16 flex items-center justify-end px-4 text-black ${className} gap-4`}
    >
      <div className="flex items-center gap-5">
        <h4 className="text-xl">
          Date:
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h4>
        <h4 className="text-xl">
          Time: <span ref={timeRef}></span>
        </h4>
        <h5 className="text-xl font-bold">Hey {data?.data?.name}</h5>
        <img
          src={data?.data?.image}
          alt="Profile"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "";
            e.target.style.display = "none";
          }}
          className="w-10 h-10 rounded-full overflow-hidden border border-gray-400"
        />
      </div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden cursor-pointer border border-gray-400"
        >
          <span className="sr-only">Toggle profile dropdown</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg text-black z-10">
            <div className="px-4 py-2 border-b font-semibold text-gray-700">
              {data?.data?.name}
            </div>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            {/* <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
              // onClick={}
            >
              Sign Up
            </button> */}
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
