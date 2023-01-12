import React, { useState } from "react";
import { getAuth } from "firebase/auth";

export default function Profile() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: "Samagra",
    email: "khannasamagra92@gmail.com"
  });
  const { name, email } = formData;
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input type="text" id="name" value={name} disabled className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-out mb-6" />
            <input type="email" id="email" value={email} disabled className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-out mb-6" />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">Do you want to change your name?
                <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-1">Edit</span>
              </p>
              <p className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer">Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
