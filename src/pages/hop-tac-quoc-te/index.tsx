import { getCommon, getCooperation, getLinks, getProjects, getResearchs, getServices } from '@/api/services'
import Layout from '@/components/layout/layout'
import { convertDate } from '@/ultil'
import { Breadcrumbs } from '@mantine/core'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Tooltip } from '@mantine/core';

function CooperationPage() {
  const commons = useQuery({ queryKey: ['common'], queryFn: getCommon }).data
  const links = useQuery({ queryKey: ['links'], queryFn: getLinks }).data
  const services = useQuery({ queryKey: ['services'], queryFn: getServices }).data
  const projects = useQuery({ queryKey: ['projects'], queryFn: getProjects }).data
  const cooperation = useQuery({ queryKey: ['cooperation'], queryFn: getCooperation }).data
  const newName = commons[0]?.name.split("|") || ["", ""]
  return (
    <Layout links={links} services={services} projects={projects} common={commons[0]} cooperation={cooperation}>
      <Head>
        <title>Hợp tác quốc tế - {newName[0]} {newName[1]}</title>
      </Head>

      <div className="padding">
        <Breadcrumbs className='w-full relative before:w-full before:h-0.5 mb-5 before:absolute before:left-0 before:bg-gray-500 before:-bottom-2'>
          <Link className='text-blue-500 font-semibold' href={"/"}>Trang chủ</Link>
          <p className='font-semibold'>Hợp tác quốc tế</p>
        </Breadcrumbs>

        <div className='flex gap-5 flex-col xl:flex-row'>
          {/* news */}
          <div className='flex-1 '>
            {cooperation.map((item: any) => (
              <Link href={item.slug} key={item.id} className=" border-2 block py-2 border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-32 h-22 md:w-44  md:h-30 relative">
                    <Image className="!relative border-r-2" src={item.thumbnail.url} alt={item.title} fill />
                  </div>
                  <div className='flex justify-between flex-1 gap-4 px-2'>
                    <div className="">
                      <span className="block text-gray-400 mb-1 text-xs md:text-sm">{convertDate(item.createdAt)}</span>
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
            <div className='flex-1'>
              <h3 className='font-semibold mb-4 text-xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>Dịch vụ</h3>

              <ul className='flex flex-col gap-1 list-disc list-inside'>
                {services.slice(0, 5).map((item: any) => (
                  <li key={item.id}> <Link className='text-blue-700' href={"/dich-vu" + "/" + item.slug} >
                    <Tooltip className='inline' label={item.title}>
                      <p>
                        {`${item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}`}
                      </p>
                    </Tooltip>
                  </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex-1'>
              <h3 className='font-semibold mb-4 text-xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>Dự án</h3>

              <ul className='flex flex-col gap-1 list-disc list-inside'>
                {projects.slice(0, 5).map((item: any) => (
                  <li key={item.id}> <Link className='text-blue-700' href={"/dich-vu" + "/" + item.slug} >
                    <Tooltip className='inline' label={item.title}>
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
    </Layout >
  )
}

export default CooperationPage

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['common'], getCommon)
  await queryClient.prefetchQuery(['links'], getLinks)
  await queryClient.prefetchQuery(['services'], getServices)
  await queryClient.prefetchQuery(['projects'], getProjects)
  await queryClient.prefetchQuery(['researchs'], getResearchs)
  await queryClient.prefetchQuery(['cooperation'], getCooperation)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10
  }
}
