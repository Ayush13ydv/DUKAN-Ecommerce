import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutComponent({ logout }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function passed as a prop
    console.log('User logged out');
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <a
        onClick={() => setShowModal(true)}
        className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
      >
        Logout
      </a>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-5 shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Logout?</h2>
            <p className="text-lg md:text-xl mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Mat kar bhai, ro dunga<span>😢</span></p>
            <div className="flex flex-col md:flex-row justify-center gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-teal-500 hover:bg-gray-400 w-full md:w-[14em]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-teal-700 text-white hover:bg-red-700 w-full md:w-[13em]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LogoutComponent;
