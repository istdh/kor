import React from 'react'
import { Carousel } from '@mantine/carousel';
import Image from 'next/image';
import Link from 'next/link';

type TypeCarousel = {
  id: string;
  title: string;
  banner: {
    url: string;
  }
}

type Props = {
  carousels: TypeCarousel[]
  name: string
  slogan: string
}

function CarouselSection({ carousels, name, slogan }: Props) {
  const names = name?.split("|")

  return (
    <div >
      <Carousel className='relative' controlsOffset="xs" controlSize={40} loop withIndicators >
        {carousels?.map(carousel => (
          <Carousel.Slide key={carousel.id} className='!relative '>
            <div className="w-full h-[300px] relative md:h-[450px] lg:h-[550px] xl:h-[700px]">
              <Image src={carousel.banner.url} priority={true} alt={carousel.title} fill className=' w-full' />
            </div>
            <div className='w-full h-full bg-white/50 absolute top-0 flex justify-center items-center select-none'>
              <div className='text-white flex items-center justify-center flex-col gap-4'>
                <h1 className='text-center text-green-700 text-xl md:text-4xl xl:text-6xl font-bold uppercase'>{names[0]} <br /> {names[1]}</h1>
                <h2 className='hidden md:block uppercase text-red-600 sm:text-sm text-center md:text-base font-semibold'>{slogan}</h2>
                <Link href={"/ve-chung-toi"} className='px-5 py-2 text-sm md:text-base md:px-6 md:py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all duration-300 lg:py-3 lg:text-lg font-semibold lg:px-10 uppercase'>Về chúng tôi</Link>
              </div>
            </div>
          </Carousel.Slide>
        ))}

      </Carousel>
    </div>
  )
}

export default CarouselSection