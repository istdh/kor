import { getAllNews, getCommon, getCooperation, getLinks, getProjects, getServices, getSlugBlogs } from '@/api/services'
import Layout from '@/components/layout/layout'
import { convertDate } from '@/ultil'
import { Breadcrumbs, Tooltip } from '@mantine/core'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function NewsPage() {
  const commons = useQuery({ queryKey: ['common'], queryFn: getCommon }).data
  const links = useQuery({ queryKey: ['links'], queryFn: getLinks }).data
  const services = useQuery({ queryKey: ['services'], queryFn: getServices }).data
  const projects = useQuery({ queryKey: ['projects'], queryFn: getProjects }).data
  const cooperation = useQuery({ queryKey: ['cooperation'], queryFn: getCooperation }).data
  const blogs = useQuery({ queryKey: ['all-news'], queryFn: getAllNews }).data
  const newName = commons[0]?.name.split("|") || ["", ""]

  return (
    <Layout links={links} cooperation={cooperation} services={services} projects={projects} common={commons[0]}>
      <Head>
        <title>Tin tức - {newName[0]} {newName[1]}</title>
      </Head>

      <div className="padding">
        <Breadcrumbs className='w-full relative before:w-full before:h-0.5 mb-5 before:absolute before:left-0 before:bg-gray-500 before:-bottom-2'>
          <Link className='text-blue-500 font-semibold' href={"/"}>Trang chủ</Link>
          <p className='font-semibold'>Tin tức</p>
        </Breadcrumbs>

        <div className='flex gap-5 flex-col xl:flex-row'>
          {/* news */}
          <div className='flex-1 '>
            {blogs.map((item: any) => (
              <Link href={item.slug} key={item.id} className=" border-t-2 block py-2 border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-32 h-22 md:w-44  md:h-30 relative">
                    <Image className="!relative" src={item.thumbnail.url} alt={item.title} fill />
                  </div>
                  <div className='flex justify-between flex-1 gap-4'>
                    <div className="">
                      <span className="block text-gray-400 mb-1 text-sm md:text-base">{convertDate(item.createdAt)}</span>
                      <p className="text-base md:text-xl font-semibold text-gray-900">{item.title}</p>
                      <p className='mt-4 text-sm text-gray-500'>{item.description.slice(0, 200) + "..."}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* other */}

          <div className='w-full xl:w-[350px] flex flex-col md:flex-row xl:flex-col gap-5'>
            <div className='flex-none xl:flex-none md:flex-1'>
              <h3 className='font-semibold mb-4 text-xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>Dịch vụ</h3>

              <ul className='flex flex-col gap-1 list-disc list-inside'>
                {services.slice(0, 5).map((item: any) => (
                  <li key={item.id}>
                    <Link href={`/${item.slug}`}>
                      <Tooltip className='inline text-blue-700' label={item.title}>
                        <p>
                          {`${item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}`}
                        </p>
                      </Tooltip></Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex-none xl:flex-none md:flex-1'>
              <h3 className='font-semibold mb-4 text-xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>Dự án</h3>

              <ul className='flex flex-col gap-1 list-disc list-inside'>
                {projects.slice(0, 5).map((item: any) => (
                  <li key={item.id}>
                    <Link href={`/${item.slug}`}>
                      <Tooltip className='inline text-blue-700' label={item.title}>
                        <p>
                          {`${item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}`}
                        </p>
                      </Tooltip>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NewsPage

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['common'], getCommon)
  await queryClient.prefetchQuery(['links'], getLinks)
  await queryClient.prefetchQuery(['cooperation'], getCooperation)
  await queryClient.prefetchQuery(['all-news'], getAllNews)
  await queryClient.prefetchQuery(['services'], getServices)
  await queryClient.prefetchQuery(['projects'], getProjects)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10
  }
}
