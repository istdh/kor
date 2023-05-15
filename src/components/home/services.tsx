import React from 'react'
import Title from '../common/Title'
import CourseCard from '../course/course-card'
import { Carousel } from '@mantine/carousel'
import ServiceCard from '../services/service-card'

type Props = {
  services: any[]
}


function Services({ services }: Props) {

  return (
    <div className=' bg-gray-100 relative z-30 padding'>
      <Title title="Dịch vụ của chúng tôi" />

      {/* <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'> */}
      <Carousel withIndicators
        slideSize="25%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={1}
        breakpoints={[
          // { maxWidth: 'xl', slideSize: '20%' },
          { maxWidth: 'lg', slideSize: '30%' },
          { maxWidth: 'md', slideSize: '50%' },
          { maxWidth: 'sm', slideSize: '100%' },
        ]}>
        {services.map(item => (
          <Carousel.Slide key={item.id} className='p-2'>
            <ServiceCard image_url={item.thumbnail.url} title={item.title} sub_description={item.description} slug={item.slug} type={'dich-vu'} />
          </Carousel.Slide>
        ))}
      </Carousel>
      {/* </div> */}

    </div>
  )
}

export default Services