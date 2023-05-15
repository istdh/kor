import { getAllCourses, getCommon, getCooperation, getCourseDetail, getLinks, getOtherCourses, getProjects, getResearchs, getServices, getSlugCourses } from '@/api/services'
import Layout from '@/components/layout/layout'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import React from 'react'
import { Breadcrumbs, Tooltip } from '@mantine/core';
import Link from 'next/link'
import DetailPost from '@/components/common/detail'
import Image from 'next/image'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
import { convertDate } from '@/ultil'
import { ContactUs } from '@/components/common/contact-form'
import { useDisclosure } from '@mantine/hooks'
import ContactInformation from '@/components/common/contact-info'
import { Carousel } from '@mantine/carousel'
import ServiceCard from '@/components/services/service-card'

function CourseDetail({ slug }: InferGetStaticPropsType<GetStaticProps>) {
  const commons = useQuery({ queryKey: ["common"], queryFn: getCommon }).data
  const links = useQuery({ queryKey: ["links"], queryFn: getLinks }).data
  const courseDetail = useQuery({ queryKey: ["course-details"], queryFn: () => getCourseDetail(slug) }).data
  const other = useQuery({ queryKey: ["other-course"], queryFn: () => getOtherCourses(slug) }).data
  const services = useQuery({ queryKey: ['services'], queryFn: getServices }).data
  const projects = useQuery({ queryKey: ['projects'], queryFn: getProjects }).data
  const cooperation = useQuery({ queryKey: ['cooperation'], queryFn: getCooperation }).data
  const newName = commons[0].name.split("|")

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Layout links={links} cooperation={cooperation} services={services} projects={projects} common={commons[0]} >
      <Head>
        <title>{courseDetail.title} - {newName[0]} {newName[1]}</title>
      </Head>
      <ContactUs common={commons[0]} opened={opened} close={close} />
      <div className='padding'>
        <Breadcrumbs className='w-full relative before:w-full before:h-0.5 before:absolute before:left-0 before:bg-gray-500 before:-bottom-2'>
          <Link className='text-blue-500' href={"/"}>Trang chủ</Link>
          <Link className='text-blue-500' href={"/khoa-hoc"}>Khóa học</Link>
          <Tooltip label={courseDetail.title}>
            <p>{courseDetail.title.slice(0, 20)}...</p>
          </Tooltip>
        </Breadcrumbs>

        <div className='mt-5'>

          <div className='flex flex-col gap-5 lg:flex-row'>
            <div className=''>
              <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>{courseDetail.title}</h1>
              <div className='flex justify-between mb-4'>
                <p className='font-medium italic text-gray-600'>Đăng ngày: {convertDate(courseDetail.createdAt)}</p>
                <div className=" flex justify-start gap-1 items-center">
                  <h3 className="font-semibold">Chia sẻ:</h3>
                  <div className='flex gap-2'>
                    <FacebookShareButton quote={courseDetail.title} hashtag='#vienmoitruong' url={`https://vienmoitruong.com/khoa-hoc/${slug}`} >
                      <FacebookIcon size={20} />
                    </FacebookShareButton>
                    <TwitterShareButton url={`https://vienmoitruong.com/khoa-hoc/${slug}`} ><TwitterIcon size={20} /></TwitterShareButton>
                    <LinkedinShareButton url={`https://vienmoitruong.com/khoa-hoc/${slug}`} > <LinkedinIcon size={20} /></LinkedinShareButton>
                  </div>
                </div>
              </div>

              <DetailPost content={courseDetail.content.raw} />
            </div>

            <div className='flex flex-col sm:flex-row lg:flex-col'>
              <div className='w-full h-[300px] lg:w-[300px] xl:w-[350px] lg:h-[200px] xl:h-[280px] relative border'>
                <Image alt='thumbnail' src={courseDetail.thumbnail.url} className='w-full h-full' fill />
              </div>

              <div className='px-2 mt-4'>
                <p className='text-red-700 text-sm'><span className='font-semibold text-black text-base'>Lịch khai giảng:</span> {courseDetail.schedule}</p>
                <p className='text-red-700 text-sm'><span className='font-semibold text-black text-base'>Thời lượng:</span> {courseDetail.duration}</p>
                <p className='text-red-700 text-sm'><span className='font-semibold text-black text-base'>Địa điểm:</span> Viện Công Nghệ Môi Trường Cộng Đồng</p>
                <button onClick={open} className='block w-full border-2 py-3 text-xl font-semibold uppercase bg-green-700 mt-4 text-white border-green-700'>Ghi danh</button>
              </div>

              <div className='px-2 mt-4'>
                <h3 className='text-xl font-semibold relative before:absolute before:w-full before:h-0.5 before:bg-black before:left-0 before:-bottom-2'>Khóa học khác</h3>

                <div className='mt-4'>
                  {other.map((item: any) => (
                    <Link className='text-blue-700 font-medium' key={item.id} href={`/khoa-hoc/${item.slug}`}>{item.title.length > 100 ? item.title.slice(0, 100) + "..." : item.title}</Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
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

export default CourseDetail

export async function getStaticPaths() {
  const slugs = await getSlugCourses()

  const paths = slugs.map((item: any) => ({
    params: { slug: item.slug },
  }))

  return {
    paths: paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient()
  const slug = params?.slug!
  await queryClient.prefetchQuery(['common'], getCommon)
  await queryClient.prefetchQuery(['links'], getLinks)
  await queryClient.prefetchQuery(["other-course"], () => getOtherCourses(slug as string))
  await queryClient.prefetchQuery(['course-details'], () => getCourseDetail(slug as string))
  await queryClient.prefetchQuery(['services'], getServices)
  await queryClient.prefetchQuery(['projects'], getProjects)
  await queryClient.prefetchQuery(['cooperation'], getCooperation)

  return {
    props: {
      slug,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10
  }
}