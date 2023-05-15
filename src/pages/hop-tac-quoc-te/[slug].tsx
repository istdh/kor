import { getBlogDetail, getCommon, getCooperation, getCooperationSlugs, getLinks, getOtherCooperation, getProjects, getResearchs, getServices } from '@/api/services'
import ContactInformation from '@/components/common/contact-info'
import DetailPost from '@/components/common/detail'
import Layout from '@/components/layout/layout'
import ServiceCard from '@/components/services/service-card'
import { convertDate } from '@/ultil'
import { Carousel } from '@mantine/carousel'
import { Breadcrumbs, Tooltip } from '@mantine/core'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'next-share'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

function CooperationDetail({ slug }: InferGetStaticPropsType<GetStaticProps>) {
  const commons = useQuery({ queryKey: ['common'], queryFn: getCommon }).data
  const links = useQuery({ queryKey: ['links'], queryFn: getLinks }).data
  const services = useQuery({ queryKey: ['services'], queryFn: getServices }).data
  const projects = useQuery({ queryKey: ['projects'], queryFn: getProjects }).data
  const cooperation = useQuery({ queryKey: ['cooperation'], queryFn: getCooperation }).data
  const detail = useQuery({ queryKey: ['cooperation-detail'], queryFn: () => getBlogDetail(slug) }).data
  const other = useQuery({ queryKey: ['cooperation-other'], queryFn: () => getOtherCooperation(slug) }).data
  const newName = commons[0].name.split("|")
  return (
    <Layout links={links} services={services} projects={projects} cooperation={cooperation} common={commons[0]}>
      <Head>
        <title>
          {detail.title} - {newName[0]} {newName[1]}
        </title>
      </Head>

      <div className='padding'>
        <Breadcrumbs className='w-full relative before:w-full before:h-0.5 before:absolute before:left-0 before:bg-gray-500 before:-bottom-2'>
          <Link className='text-blue-500' href={"/"}>Trang chủ</Link>
          <Link className='text-blue-500' href={"/tin-tuc"}>Tin tức</Link>
          <Tooltip label={detail.title}>
            <p>{detail.title?.slice(0, 20)}...</p>
          </Tooltip>
        </Breadcrumbs>

        <div className='mt-5 flex gap-5 flex-col lg:flex-row'>

          <div className='flex flex-col gap-5 lg:flex-row'>
            <div className=''>
              <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>{detail.title}</h1>
              <div className='flex justify-between mb-4'>
                <p className='font-medium italic text-gray-600'>Cập nhật lần cuối: {convertDate(detail.updatedAt)}</p>
                <div className=" flex justify-start gap-1 items-center">
                  <h3 className="font-semibold">Chia sẻ:</h3>
                  <div className='flex gap-2'>
                    <FacebookShareButton quote={detail.title} hashtag='#vienmoitruong' url={`https://vienmoitruong.com/du-an/${slug}`} ><FacebookIcon size={20} /></FacebookShareButton>
                    <TwitterShareButton url={`https://vienmoitruong.com/du-an/${slug}`} > <TwitterIcon size={20} /></TwitterShareButton>
                    <LinkedinShareButton url={`https://vienmoitruong.com/du-an/${slug}`} > <LinkedinIcon size={20} /></LinkedinShareButton>
                  </div>
                </div>
              </div>

              <div className='text-justify'>
                <DetailPost content={detail.content.raw} />
              </div>

              <ContactInformation />

            </div>
          </div>

          <div className='mb-4'>
            <h3 className='font-semibold mb-4 text-xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>Tin tức khác</h3>
            <div className=' lg:w-[350px]'>
              <ul className='text-blue-700 flex-col flex gap-2 items-start list-disc list-inside text-lg'>
                {other?.slice(0, 5).map((item: any) => (
                  <li key={item.id} >
                    <Link className='hover:underline' href={`/${item.slug}`} >{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className='font-semibold mb-4 text-xl lg:text-2xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>DỊCH VỤ</h3>
          <div>
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
              {services.map((item: any) => (
                <Carousel.Slide key={item.id} className='p-2'>
                  <ServiceCard type='dich-vu' image_url={item.thumbnail.url} title={item.title} sub_description={item.description} slug={item.slug} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default CooperationDetail

export async function getStaticPaths() {
  const slugs = await getCooperationSlugs()

  const paths = slugs.map((item: any) => ({
    params: { slug: item.slug.split("/")[1] },
  }))

  return {
    paths: paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient()
  const slug = `hop-tac-quoc-te/${params?.slug! as string}`
  await queryClient.prefetchQuery(['common'], getCommon)
  await queryClient.prefetchQuery(['links'], getLinks)
  await queryClient.prefetchQuery(['services'], getServices)
  await queryClient.prefetchQuery(['projects'], getProjects)
  await queryClient.prefetchQuery(['researchs'], getResearchs)
  await queryClient.prefetchQuery(['cooperation'], getCooperation)
  await queryClient.prefetchQuery(['cooperation-detail'], () => getBlogDetail(slug))
  await queryClient.prefetchQuery(['cooperation-other'], () => getOtherCooperation(slug))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      slug
    },
    revalidate: 10
  }
}
