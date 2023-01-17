import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Spinner from '../components/Spinner'
import { v4 as uuidv4 } from 'uuid';
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
    const navigate = useNavigate();
    const auth = getAuth();
    const [loading, setLoading] = useState(false);
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
        latitude: 0,
        longitude: 0,
        images: {},
    });
    const { type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice, latitude, longitude, images } = formData;
    function onChange(e) {
        let boolean = null;
        if (e.target.value === "true") {
            boolean = true;
        }
        if (e.target.value === "false") {
            boolean = false;
        }

        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }));
        }

        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    }
    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (+discountedPrice >= +regularPrice) {
            setLoading(false);
            toast.error('Discounted price needs be less than regular price.');
            return;
        }
        if (images.length > 6) {
            setLoading(false);
            toast.error("Maximum 6 images are allowed to be uploaded.")
            return;
        }

        async function storeImage(image) {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        reject(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );


            });
        }

        const imgUrls = await Promise.all(
            [...images]
                .map((image) => storeImage(image)))
            .catch((error) => {
                setLoading(false);
                toast.error("Images not uploaded");
                return;
            });
        const formDataCopy = {
            ...formData,
            imgUrls,
            timestamp: serverTimestamp(),
        }
        delete formDataCopy.images;
        !formDataCopy.offer && delete formDataCopy.discountedPrice;
        const docRef = await addDoc(collection(db, "listings"), formDataCopy);
        setLoading(false);
        toast.success('Listing created.');
        navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    }

    if (loading) {
        return <Spinner />
    }
    return (
        <main className='max-w-md px-2 mx-auto'>
            <h1 className='text-center text-3xl font-bold mt-6'>Create a Listing</h1>
            <form onSubmit={onSubmit}>
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
                <div className='mb-6 flex space-x-6'>
                    <div>
                        <p className='text-lg font-semibold'>Latitude</p>
                        <input type="number" id="latitude" value={latitude} onChange={onChange} min="-90" max="90" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Longitude</p>
                        <input type="number" id="longitude" value={longitude} onChange={onChange} min="-180" max="180" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                    </div>
                </div>
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
