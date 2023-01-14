import React, { useState } from "react";
import { getAuth, updateProfile, } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FcHome } from 'react-icons/fc';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };
  const [changeDetail, setChangeDetail] = useState(false);
  const { name, email } = formData;
  function onLogout() {
    auth.signOut();
    navigate('/');
  };
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { name: name });
      }
      toast.success('Profile updated successfully.')
    } catch (error) {
      toast.error("Unable to update the profile.");
    }
  };
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input type="text" id="name" value={name} disabled={!changeDetail} onChange={onChange} className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-out mb-6 ${changeDetail && "bg-red-200 focus:bg-red-200"}`} />
            <input type="email" id="email" value={email} disabled className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-out mb-6" />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">Do you want to change your name?
                <span onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState)
                }} className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-1">
                  {changeDetail ? "Apply change" : "Edit"}</span>
              </p>
              <p onClick={onLogout} className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer">Log out</p>
            </div>
          </form>
          <button type="submit" className="flex w-full justify-center items-center">
            <Link to="/create-listing" className="flex w-full justify-center items-center bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hoveR:shadow-lg active:bg-blue-800">
              <FcHome className="mr-2 bg-red-200 rounded-full text-3xl p-1 border-2" />Sell or rent your home
            </Link>
          </button>
        </div>
      </section >
    </>
  );
};
