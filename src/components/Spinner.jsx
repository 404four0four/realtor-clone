import React from 'react'
import spinner from "../assets/svg/spinner.svg";

export default function Spinner() {
    return (
        <div className='z-50 bg-black bg-opacity-50 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0'>
            <div>
                <img src={spinner} alt="Loading" className='h-24' />
            </div>
        </div>
    )
}
