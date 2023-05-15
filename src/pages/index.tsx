import { ContactUs } from '@/components/common/contact-form'
import CarouselSection from '@/components/home/carousel'
import Courses from '@/components/home/course'
import News from '@/components/home/news'
import Partner from '@/components/home/partner'
import Services from '@/components/home/services'
import Statictis from '@/components/home/statictis'
import Layout from '@/components/layout/layout'
import { useDisclosure } from '@mantine/hooks'
import Head from 'next/head'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import { getAllNews, getCarousels, getCommon, getCooperation, getCourses, getLinks, getPartner, getProjects, getResearchs, getServices, getTestimonials } from '@/api/services'
import ProjectSection from '@/components/home/project'
import Testimonials from '@/components/home/testimonials'


export default function Home() {

  const [opened, { open, close }] = useDisclosure(false);

  const commons = useQuery({ queryKey: ['common'], queryFn: getCommon }).data
  const links = useQuery({ queryKey: ['links'], queryFn: getLinks }).data
  const courses = useQuery({ queryKey: ['courses'], queryFn: getCourses }).data
  const carousels = useQuery({ queryKey: ['carousel'], queryFn: getCarousels }).data
  const allNews = useQuery({ queryKey: ['all-news'], queryFn: getAllNews }).data
  const services = useQuery({ queryKey: ['services'], queryFn: getServices }).data
  const cooperation = useQuery({ queryKey: ['cooperation'], queryFn: getCooperation }).data
  const projects = useQuery({ queryKey: ['projects'], queryFn: getProjects }).data
  const partners = useQuery({ queryKey: ['partners'], queryFn: getPartner }).data
  const testimonials = useQuery({ queryKey: ['testimonials'], queryFn: getTestimonials }).data
  const newName = commons[0]?.name.split("|") || ["", ""]

  return (
    <Layout links={links} cooperation={cooperation} services={services} projects={projects} common={commons[0]} >
      <Head>
        <title>{newName[0]} {newName[1]}</title>
      </Head>
      <ContactUs common={commons[0]} opened={opened} close={close} />
      <CarouselSection name={commons[0]?.name} slogan={commons[0]?.slogan} carousels={carousels} />
      <Courses courses={courses} />
      <div className='w-full h-[300px] lg:h-[400px] image-container relative ' style={{ background: "url(/contact.jpg)", backgroundPosition: "center", backgroundSize: "cover" }}>
        {/* <Image src="/contact.jpg" alt='liên hệ viện công nghệ môi trường' fill className='image bg-cover bg-center !h-full !w-full' /> */}
        <div className='absolute top-0 left-0 w-full h-full bg-white/70 px-10 z-30 flex justify-center items-center gap-5 flex-col'>
          <h1 className='text-lg lg:text-3xl text-center font-semibold text-green-700'>HƠN 300+ CÁ NHÂN VÀ DOANH NGHIỆP ĐANG SỬ DỤNG DỊCH VỤ <br className='hidden md:block' /> CỦA VIỆN CÔNG NGHỆ MÔI TRƯỜNG CỘNG ĐỒNG</h1>
          <button className='px-4 border-2 border-green-700 py-2 hover:bg-green-700 hover:text-white font-semibold text-green-700 duration-300 ease-in-out transition-all uppercase lg:px-6 lg:py-3 lg:text-lg' onClick={open}>Đăng ký trải nghiệm</button>
        </div>
      </div>
      <Services services={services} />
      <ProjectSection projects={projects} />
      <Statictis member={commons[0]?.member}
        total_client={commons[0]?.total_client}
        years={commons[0]?.years}
        province={commons[0]?.province} />
      <News allNews={allNews} />
      <div className='bg-gray-100'>
        <Testimonials testimonials={testimonials} />
      </div>
      <Partner partners={partners} />
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['common'], getCommon)
  await queryClient.prefetchQuery(['links'], getLinks)
  await queryClient.prefetchQuery(['courses'], getCourses)
  await queryClient.prefetchQuery(['carousels'], getCarousels)
  await queryClient.prefetchQuery(['all-news'], getAllNews)
  await queryClient.prefetchQuery(['services'], getServices)
  await queryClient.prefetchQuery(['projects'], getProjects)
  await queryClient.prefetchQuery(['cooperation'], getCooperation)
  await queryClient.prefetchQuery(['partners'], getPartner)
  await queryClient.prefetchQuery(['testimonials'], getTestimonials)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10
  }
}
