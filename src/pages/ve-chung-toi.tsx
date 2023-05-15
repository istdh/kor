import { getAbouts, getAllNews, getCommon, getCooperation, getLinks, getProjects, getResearchs, getServices } from '@/api/services'
import ContactInformation from '@/components/common/contact-info'
import DetailPost from '@/components/common/detail'
import Layout from '@/components/layout/layout'
import { Breadcrumbs } from '@mantine/core'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share'

function About() {
  const commons = useQuery({ queryKey: ['common'], queryFn: getCommon }).data
  const links = useQuery({ queryKey: ['links'], queryFn: getLinks }).data
  const abouts = useQuery({ queryKey: ['abouts'], queryFn: getAbouts }).data
  const blogs = useQuery({ queryKey: ['all-news'], queryFn: getAllNews }).data
  const services = useQuery({ queryKey: ['services'], queryFn: getServices }).data
  const projects = useQuery({ queryKey: ['projects'], queryFn: getProjects }).data
  const cooperation = useQuery({ queryKey: ['cooperation'], queryFn: getProjects }).data
  const newName = commons[0]?.name.split("|") || ["", ""]

  return (
    <Layout links={links} cooperation={cooperation} services={services} projects={projects} common={commons[0]}>
      <Head>
        <title>Giới thiệu về {newName[0]} {newName[1]}</title>
      </Head>
      <div className="padding">
        <Breadcrumbs className='w-full relative before:w-full before:h-0.5 before:absolute before:left-0 mb-5 before:bg-gray-500 before:-bottom-2'>
          <Link className='text-blue-500 font-medium' href={"/"}>Trang chủ</Link>
          <p className='font-medium'>Về chúng tôi</p>
        </Breadcrumbs>
        <div className='flex gap-10 flex-col lg:flex-row '>
          <div className='t text-justify'>
            {abouts[0]?.content.raw ? <DetailPost content={abouts[0]?.content.raw} /> : "Đăng cập nhật"}

            <div className=" flex justify-start gap-1 items-center mb-5">
              <h3 className="font-semibold">Chia sẻ:</h3>
              <div className='flex gap-2'>
                <FacebookShareButton quote={"Giới thiệu về Viện Công Nghệ Môi Trường Cộng Đồng"} hashtag='#vienmoitruong' url={`https://vienmoitruong.com/ve-chung-toi`} ><FacebookIcon size={20} /></FacebookShareButton>
                <TwitterShareButton url={`https://vienmoitruong.com/ve-chung-toi`} > <TwitterIcon size={20} /></TwitterShareButton>
                <LinkedinShareButton url={`https://vienmoitruong.com/ve-chung-toi`} > <LinkedinIcon size={20} /></LinkedinShareButton>
              </div>
            </div>
            <ContactInformation />

          </div>

          <div className="right flex flex-col gap-4">
            <div>
              <h3 className='font-semibold mb-4 text-xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>Tin tức</h3>
              <div className='flex flex-col lg:w-[350px]'>
                {blogs.slice(0, 5).map((item: any) => (
                  <ul key={item.id} className='text-blue-700 flex gap-2 items-start list-disc list-inside text-lg'>
                    <li>
                      <Link key={item.id} className='hover:underline' href={item.slug} >{item.title}</Link>
                    </li>
                  </ul>
                ))}
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-4 text-xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>DỊCH VỤ</h3>
              <div className='flex flex-col lg:w-[350px]'>
                {services.slice(0, 5).map((item: any) => (
                  <ul key={item.id} className='text-blue-700 flex gap-2 items-start list-disc list-inside text-lg'>
                    <li>
                      <Link key={item.id} className='hover:underline' href={item.slug} >{item.title}</Link>
                    </li>
                  </ul>
                ))}
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-4 text-xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>Dự án</h3>
              <div className='flex flex-col lg:w-[350px]'>
                {projects.slice(0, 5).map((item: any) => (
                  <ul key={item.id} className='text-blue-700 flex gap-2 items-start list-disc list-inside text-lg'>
                    <li>
                      <Link key={item.id} className='hover:underline' href={item.slug} >{item.title}</Link>
                    </li>
                  </ul>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['common'], getCommon)
  await queryClient.prefetchQuery(['links'], getLinks)
  await queryClient.prefetchQuery(['abouts'], getAbouts)
  await queryClient.prefetchQuery(['all-news'], getAllNews)
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
