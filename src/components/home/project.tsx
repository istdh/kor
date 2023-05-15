import React from 'react'
import Title from '../common/Title'
import ProjectItem from '../project-item'
import { Carousel } from '@mantine/carousel'

type Props = {
  projects: any[]
}

function ProjectSection({ projects }: Props) {
  return (
    <div className='padding'>
      <Title title="Dự án của chúng tôi" />
      <Carousel className='py-2' controlSize={40} slidesToScroll={1} loop withIndicators>
        {projects.map(item =>
          <Carousel.Slide key={item.id} >
            <ProjectItem slug={item.slug} title={item.title} sub_description={item.description} banner_url={item.image.url} />
          </Carousel.Slide>
        )}
      </Carousel>
    </div>
  )
}

export default ProjectSection