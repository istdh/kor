import { Carousel } from '@mantine/carousel'
import { Title } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

type Props = {
  testimonials: any[]
}

function Testimonials({ testimonials }: Props) {
  return (
    <div className='padding'>
      <Title title="Cảm nhận của khách hàng" />
      <Carousel className='py-2' controlSize={40} slidesToScroll={1} loop withIndicators>
        {testimonials.map(item =>
          <Carousel.Slide key={item.id} >
            <div className="max-w-screen-xl px-4 py-6 mx-auto text-center lg:py-12 lg:px-6">
              <figure className="max-w-screen-md mx-auto">
                <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
                </svg>
                <blockquote>
                  <p className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white">{`"${item.message}"`}</p>
                </blockquote>
                <figcaption className="flex items-center justify-center mt-6 space-x-3">
                  <Image className='rounded-full bg-gray-100' src={item.avatar.url} width={30} height={30} alt="cảm nhận về viện công nghệ môi trường cộng đồng" />
                  <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div className="pr-3 font-medium text-gray-900 dark:text-white">{item.name}</div>
                    <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400 uppercase">{item.role}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </Carousel.Slide>
        )}
      </Carousel>
    </div>

  )
}

export default Testimonials