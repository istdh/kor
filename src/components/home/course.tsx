import React from 'react'
import Title from '../common/Title'
import CourseCard from '../course/course-card'
import { Carousel } from '@mantine/carousel'

type Props = {
  courses: any[]
}

function Courses({ courses }: Props) {

  return (
    <div className='padding'>
      <Title title="Chương trình đào tạo" />

      {/* <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'> */}
      <Carousel withIndicators
        slideSize="25%"
        slideGap="sm"
        loop
        align="start"
        slidesToScroll={1}
        breakpoints={[
          { maxWidth: 'lg', slideSize: '30%' },
          { maxWidth: 'md', slideSize: '50%' },
          { maxWidth: 'sm', slideSize: '100%' },
        ]}>
        {courses.map(item => (
          <Carousel.Slide key={item.id} className='p-2'>
            <CourseCard title={item.title} sub_description={item.description} slug={item.slug} image_url={item.thumbnail.url} />
          </Carousel.Slide>
        ))}
      </Carousel>
      {/* </div> */}

    </div>
  )
}

export default Courses