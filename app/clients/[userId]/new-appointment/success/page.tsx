import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function SuccessPage() {
  return (
    <div className='flex h-screen max-h-screen px-[5%]'>

      <div className="success-img">
        

        <Link href={'/'}>
          
        <Image
            priority
            src="/assets/icons/logo-full_.png"
            alt="logo"
            width={10000}
            height={10000}
            className="mb-12 h-60 mx-auto w-fit"
          />
        </Link>


        <section className="flex flex-col items-center">

        <Image
            priority
            src="/assets/gifs/success.gif"
            alt="success"
            width={100}
            height={100}
            // className="mb-12 h-60 mx-auto w-fit"
          />
        </section>
</div>

    </div>
  )
}

export default SuccessPage;