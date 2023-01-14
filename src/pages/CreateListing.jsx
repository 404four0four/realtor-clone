import React, { useState } from 'react'

export default function CreateListing() {
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
    });
    const { type, name, bedrooms, bathrooms } = formData;
    function onChange() { }
    return (
        <main className='max-w-md px-2 mx-auto'>
            <h1 className='text-center text-3xl font-bold mt-6'>Create a Listing</h1>
            <form>
                <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
                <div className='flex'>
                    <button className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-xl transition duration-150 ease-in-out w-full ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
                        }`} type='button' id='type' value="sell" onClick={onChange}>sell</button>
                    <button className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-xl transition duration-150 ease-in-out w-full ${type === "sell" ? "bg-white text-black" : "bg-slate-600 text-white"
                        }`} type='button' id='type' value="sell" onClick={onChange}>rent</button>
                </div>
                <p className='text-lg mt-6 font-semibold'>Name</p>
                <input type="text" id="name" value={name} onChange={onChange} placeholder="Name" maxLength="50" minLength="1" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' />
                <div className='flex space-x-6 justify-start mb-6'>
                    <div>
                        <p className='text-lg font-semibold'>Beds</p>
                        <input type="number" id="bedrooms" value={bedrooms} onChange={onChange} min="1" max="50" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Baths</p>
                        <input type="number" id="bathrooms" value={bathrooms} onChange={onChange} min="1" max="50" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                    </div>
                </div>
            </form>
        </main>
    );
};
