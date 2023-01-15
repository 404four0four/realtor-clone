import React, { useState } from 'react'

export default function CreateListing() {
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: true,
        regularPrice: 0,
        discountedPrice: 0,
    });
    const { type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice } = formData;
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
                        }`} type='button' id='type' value="rent" onClick={onChange}>rent</button>
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
                <p className='text-lg mt-6 font-semibold'>Parking spot</p>
                <div className='flex'>
                    <button className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-xl transition duration-150 ease-in-out w-full ${!parking ? "bg-white text-black" : "bg-slate-600 text-white"
                        }`} type='button' id='parking' value={true} onClick={onChange}>yes</button>
                    <button className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-xl transition duration-150 ease-in-out w-full ${parking ? "bg-white text-black" : "bg-slate-600 text-white"
                        }`} type='button' id='parking' value={false} onClick={onChange}>no</button>
                </div>
                <p className='text-lg mt-6 font-semibold'>Furnished</p>
                <div className='flex'>
                    <button className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-xl transition duration-150 ease-in-out w-full ${!furnished ? "bg-white text-black" : "bg-slate-600 text-white"
                        }`} type='button' id='furnished' value={true} onClick={onChange}>yes</button>
                    <button className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-xl transition duration-150 ease-in-out w-full ${furnished ? "bg-white text-black" : "bg-slate-600 text-white"
                        }`} type='button' id='furnished' value={false} onClick={onChange}>no</button>
                </div>
                <p className='text-lg mt-6 font-semibold'>Address</p>
                <textarea type="text" id="address" value={address} onChange={onChange} placeholder="Address" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'></textarea>
                <p className='text-lg font-semibold'>Description</p>
                <textarea type="text" id="description" value={description} onChange={onChange} placeholder="Description" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'></textarea>
                <p className='text-lg mt-6 font-semibold'>Offer</p>
                <div className='flex mb-6'>
                    <button className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-xl transition duration-150 ease-in-out w-full ${!offer ? "bg-white text-black" : "bg-slate-600 text-white"
                        }`} type='button' id='offer' value={true} onClick={onChange}>yes</button>
                    <button className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-xl transition duration-150 ease-in-out w-full ${offer ? "bg-white text-black" : "bg-slate-600 text-white"
                        }`} type='button' id='offer' value={false} onClick={onChange}>no</button>
                </div>
                <div className='mb-6 flex items-center'>
                    <div>
                        <p className='text-lg font-semibold'>Regular price</p>
                        <div className='flex w-full justify-center items-center space-x-6'>
                            <input type="number" id="regularPrice" value={regularPrice} onChange={onChange} min="50" max="4000000" required className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                            {type === "rent" && (
                                <div>
                                    <p className='text-md w-full whitespace-nowrap'>$ / Month</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {offer && (
                    <div className='mb-6 flex items-center'>
                        <div>
                            <p className='text-lg font-semibold'>Discounted price</p>
                            <div className='flex w-full justify-center items-center space-x-6'>
                                <input required={offer} type="number" id="discountedPrice" value={discountedPrice} onChange={onChange} min="50" max="4000000" className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                                {type === "rent" && (
                                    <div>
                                        <p className='text-md w-full whitespace-nowrap'>$ / Month</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div className='mb-6'>
                    <p className='text-lg font-semibold'>Images</p>
                    <p className='text-gray-600'>The first image will be the cover (max6)</p>
                    <input type="file" id="images" onChange={onChange} accept="image/*" multiple required className='bg-white w-full px-3 py-1.5 rounded text-gray-700 border border-gray-300 transition duration-150 ease-in-out focus:bg-white focus:border-slate-600' />
                </div>
                <button className='mb-6 text-sm uppercase font-medium text-center w-full rounded bg-blue-600 px-7 py-3 text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' type='submit'>create listing</button>
            </form>
        </main>
    );
};
