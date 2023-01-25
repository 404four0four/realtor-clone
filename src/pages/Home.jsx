import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import { db } from "../firebase";
import ListingItem from "../components/ListingItem"

export default function Home() {
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    async function fecthListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4));
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.error(error);
      }
    }
    fecthListings();
  }, []);

  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fecthListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4));
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.error(error);
      }
    }
    fecthListings();
  }, []);

  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fecthListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, where("type", "==", "sell"), orderBy("timestamp", "desc"), limit(4));
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.error(error);
      }
    }
    fecthListings();
  }, []);
  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent offers</h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more offers</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Places for rent</h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more places for rent</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rentListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Places for sale</h2>
            <Link to="/category/sell">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more places for sale</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {saleListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
