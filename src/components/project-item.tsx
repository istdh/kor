import React from 'react'

import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  sub_description: string;
  banner_url: string;
  slug: string
}

function ProjectItem({ title, slug, sub_description, banner_url }: Props) {
  return (
    <div className='relative'>
      <div className='h-[300px] md:h-[500px] relative lg:h-[700px] w-full'>
        <Image src={banner_url} alt='banner' className='!w-full' fill />
      </div>
      <div className='absolute w-full h-full z-40 bg-black/40 top-0 flex items-center flex-col justify-center gap-4 md:items-start md:px-20 lg:px-32'>
        <h1 className='text-xl uppercase text-blue-500 font-semibold md:text-2xl lg:text-4xl'>{title}</h1>
        <p className='hidden md:block lg:text-lg text-white'>{sub_description}</p>
        <Link href={`/du-an/${slug}`} className='border-2 border-blue-500 text-blue-500 hover:bg-blue-500 px-4 py-1.5 hover:text-white md:px-8 md:py-2.5 lg:px-12 lg:py-3.5 lg:text-lg uppercase font-semibold duration-300 transition-all ease-in-out'>Xem chi tiết</Link>
      </div>
    </div>
  )
}

export default ProjectItem