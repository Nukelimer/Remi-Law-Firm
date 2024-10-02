'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function RLLP_Image({img1, img2}:any) {

  const [showFirstImage, setShowFirstImage] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstImage((prev) => !prev); // Toggle the image state
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  return (
    <div className="relative w-1/2  h-full md:flex hidden">
    <Image
      priority
        src={img1}
      height={10000}
      alt="onboarding"
      width={10000}
      className={`transition-opacity duration-1000 ease-in-out ${
        showFirstImage ? "opacity-100" : "opacity-0"
      } absolute inset-0 object-cover w-full h-full`}
    />
    <Image
      priority
      src={img2}
      height={10000}
      alt="onboarding 22"
      width={10000}
      className={`transition-opacity duration-1000 ease-in-out ${
        showFirstImage ? "opacity-0" : "opacity-100"
      } absolute inset-0 object-cover w-full h-full`}
    />
  </div>
  )
}

export default RLLP_Image

