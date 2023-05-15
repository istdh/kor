import { getAllCourses, getCommon, getCooperation, getLinks, getProjects, getResearchs, getServices } from '@/api/services'
import CourseCard from '@/components/course/course-card'
import Layout from '@/components/layout/layout'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link'
import ContactInformation from '@/components/common/contact-info'
import ServiceCard from '@/components/services/service-card'
import { Carousel } from '@mantine/carousel'

function CoursesPage() {
  const courses = useQuery({ queryKey: ['all_courses'], queryFn: getAllCourses }).data
  const commons = useQuery({ queryKey: ['common'], queryFn: getCommon }).data
  const links = useQuery({ queryKey: ['links'], queryFn: getLinks }).data
  const services = useQuery({ queryKey: ['services'], queryFn: getServices }).data
  const projects = useQuery({ queryKey: ['projects'], queryFn: getProjects }).data
  const cooperation = useQuery({ queryKey: ['cooperation'], queryFn: getCooperation }).data
  const newName = commons[0]?.name.split("|") || ["", ""]

  return (
    <Layout links={links} cooperation={cooperation} services={services} projects={projects} common={commons[0]}>
      <Head>
        <title>Khóa học - {newName[0]} {newName[1]}</title>
      </Head>


      <div className='padding'>

        <Breadcrumbs className='w-full relative before:w-full before:h-0.5 before:absolute before:left-0 before:bg-gray-500 before:-bottom-2'>
          <Link className='text-blue-500' href={"/"}>Trang chủ</Link>
          <p>Khóa học</p>
        </Breadcrumbs>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10'>
          {courses.map((course: any) => (
            <CourseCard key={course.id} title={course.title} slug={course.slug} sub_description={course.description} image_url={course.thumbnail.url} />
          ))}
        </div>

        <ContactInformation />

        <div>
          <h3 className='font-semibold mb-4 text-xl lg:text-2xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>DỊCH VỤ</h3>
          <div>
            <Carousel withIndicators
              slideSize="25%"
              slideGap="md"
              loop
              align="start"
              slidesToScroll={3}
              breakpoints={[
                // { maxWidth: 'xl', slideSize: '20%' },
                { maxWidth: 'lg', slideSize: '30%' },
                { maxWidth: 'md', slideSize: '50%' },
                { maxWidth: 'sm', slideSize: '100%' },
              ]}>
              {services.map((item: any) => (
                <Carousel.Slide key={item.id} className='p-2'>
                  <ServiceCard type='dich-vu' image_url={item.thumbnail.url} title={item.title} sub_description={item.description} slug={item.slug} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='font-semibold mb-4 text-xl lg:text-2xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>Dự án</h3>
          <div>
            <Carousel withIndicators
              slideSize="25%"
              slideGap="md"
              loop
              align="start"
              slidesToScroll={3}
              breakpoints={[
                // { maxWidth: 'xl', slideSize: '20%' },
                { maxWidth: 'lg', slideSize: '30%' },
                { maxWidth: 'md', slideSize: '50%' },
                { maxWidth: 'sm', slideSize: '100%' },
              ]}>
              {projects.map((item: any) => (
                <Carousel.Slide key={item.id} className='p-2'>
                  <ServiceCard type='du-an' image_url={item.image.url} title={item.title} sub_description={item.description} slug={item.slug} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CoursesPage

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['common'], getCommon)
  await queryClient.prefetchQuery(['links'], getLinks)
  await queryClient.prefetchQuery(["all_courses"], getAllCourses)
  await queryClient.prefetchQuery(['services'], getServices)
  await queryClient.prefetchQuery(['projects'], getProjects)
  await queryClient.prefetchQuery(['cooperation'], getCooperation)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10
  }
}