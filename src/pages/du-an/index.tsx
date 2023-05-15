import { getAllNews, getCooperation, getCourses, getLinks } from '@/api/services'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import React from 'react'
import { getCommon, getProjects, getServices } from '@/api/services'
import Layout from '@/components/layout/layout'
import { Breadcrumbs, Tooltip } from '@mantine/core'
import Link from 'next/link'
import Head from 'next/head'
import ServiceCard from '@/components/services/service-card'
import ContactInformation from '@/components/common/contact-info'

function ProjectsPage() {
  const commons = useQuery({ queryKey: ['common'], queryFn: getCommon }).data
  const links = useQuery({ queryKey: ['links'], queryFn: getLinks }).data
  const services = useQuery({ queryKey: ['services'], queryFn: getServices }).data
  const projects = useQuery({ queryKey: ['projects'], queryFn: getProjects }).data
  const blogs = useQuery({ queryKey: ['all-news'], queryFn: getAllNews }).data
  const cooperation = useQuery({ queryKey: ['cooperation'], queryFn: getCooperation }).data
  const newName = commons[0]?.name.split("|") || ["", ""]

  return (
    <Layout links={links} services={services} cooperation={cooperation} projects={projects} common={commons[0]}>
      <Head>
        <title>Dự án - {newName[0]} {newName[1]}</title>
      </Head>

      <div className="padding">
        <Breadcrumbs className='w-full relative before:w-full before:h-0.5 mb-5 before:absolute before:left-0 before:bg-gray-500 before:-bottom-2'>
          <Link className='text-blue-500 font-semibold' href={"/"}>Trang chủ</Link>
          <p className='font-semibold'>Dự án</p>
        </Breadcrumbs>

        <div className='flex gap-5 flex-col md:flex-row'>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
              {projects.map((item: any) => (
                <ServiceCard key={item.id} type='du-an' image_url={item.image.url} title={item.title} sub_description={item.description} slug={item.slug} />
              ))}
            </div>
            <ContactInformation />
          </div>

          <div>
            <h3 className='font-semibold mb-4 text-xl uppercase relative before:absolute before:w-full before:h-0.5 before:bg-black before:-bottom-1 before:left-0'>Tin tức</h3>
            <div className='flex flex-col lg:w-[350px]'>
              <ul className='text-blue-700 flex flex-col gap-2 items-start list-disc list-inside text-lg'>
                {blogs.slice(0, 5).map((item: any) => (
                  <li key={item.id}>
                    <Link href={`/${item.slug}`}>
                      <Tooltip className='inline' label={item.title}>
                        <p>
                          {`${item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}`}
                        </p>
                      </Tooltip></Link>
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

export default ProjectsPage


export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['common'], getCommon)
  await queryClient.prefetchQuery(['links'], getLinks)
  await queryClient.prefetchQuery(['courses'], getCourses)
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
