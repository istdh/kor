import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillPhone, AiFillCloseCircle } from 'react-icons/ai'
import { MdOutlineMailOutline } from 'react-icons/md'
import { FaBars } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { useClickOutside, useWindowScroll } from '@mantine/hooks';
// import disableScroll from 'disable-scroll';
import Image from 'next/image'

type Props = {
  common: any
  projects: any
  services: any
  cooperation: any
}

function Header({ common, projects, services, cooperation }: Props) {

  const [isShowNavbar, setIsShowNavbar] = useState(false)
  const [scroll, scrollTo] = useWindowScroll();

  const handleShowNavbar = () => {
    setIsShowNavbar(true)
  }
  const handleHideNavbar = () => {
    setIsShowNavbar(false)
  }

  // useEffect(() => {
  //   isShowNavbar ? disableScroll.on() : disableScroll.off()
  // }, [isShowNavbar])

  const ref = useClickOutside(() => setIsShowNavbar(false));

  const name = common?.name.split('|') || ["", ""]
  return (
    <div className=''>

      {/* Started  top */}
      <div className="top relative z-50 bg-green-700 text-white text-sm flex py-2 justify-between px-4 md:px-10 lg:px-20 xl:px-44">
        <div className="left flex items-center gap-4">
          <Link href="#" className='flex items-center gap-2 text-sm hover:underline hover:text-gray-200 ease-in-out duration-300 transition-all'><AiFillPhone size={20} />{common?.hotline}</Link>
          <Link href="#" className='flex items-center gap-2 text-sm hover:underline hover:text-gray-200 ease-in-out duration-300 transition-all'><MdOutlineMailOutline size={20} />{common?.email}</Link>
        </div>
        <div className="right lg:flex hidden gap-4">
          <Link className='ease-in-out duration-300 transition-all hover:underline hover:text-gray-200' href="/tin-tuc">Tin tức</Link>
          <Link className='ease-in-out duration-300 transition-all hover:underline hover:text-gray-200' href="#">Tuyển dụng</Link>
          <Link className='ease-in-out duration-300 transition-all hover:underline hover:text-gray-200' href="#">Văn bản pháp lý</Link>
          <Link className='ease-in-out duration-300 transition-all hover:underline hover:text-gray-200' href="/lien-he">Liên hệ với chúng tôi</Link>
        </div>
      </div>
      {/* Ended  top */}

      {/* Started nav */}
      <div className='w-full relative border-t'>
        {/* <Image src="/bg.jpg" alt="bg" fill className='bg-center bg-cover' /> */}

        <div className={`${scroll.y > 500 ? "fixed top-0 z-50 w-full bg-green-700" : "relative"} px-4 md:px-10 lg:px-20 xl:px-44 py-2 flex text-white justify-between items-center bg-green-700  `}>
          <button type='button' onClick={handleShowNavbar} className='w-[40px] h-[40px] border-2 text-center rounded-md'>
            <FaBars color='white' className=' mx-auto' size={20} />
          </button>
          {/* <h1 className={`text-white text-sm lg:text-xl tracking-widest text-center uppercase font-semibold`}>Viện Công Nghệ  <br /> Môi Trường Và Cộng Đồng</h1> */}

          {/* <Link className='text-sm' href="/">IETC<sup>®</sup></Link> */}
          <Link className='relative w-[120px] h-[45px] ' href="/"><Image fill alt="logo viện môi trường" src={common?.logo.url} /></Link>

          <button><FiSearch size={25} color='white' /> </button>
        </div>



        <nav ref={ref} className={`${isShowNavbar ? "h-auto overflow-y-scroll top-0 z-50" : "h-0 overflow-x-hidden z-0 -top-full"} duration-500 ease-in-out transition-all px-4 md:px-10 lg:px-20 xl:px-44 fixed bg-green-700 text-white w-full pb-5 scrollbar-hide`}>

          <div className="nav-head flex justify-between mb-5 items-center px-2 sticky top-0 !bg-green-700 pt-5 py-5 border-b z-50">
            <h1 className='text-center uppercase font-bold text-base lg:text-lg text-white'>{name[0] || ""} <br />{name[1] || ""} </h1>
            <button onClick={handleHideNavbar} type='button'> <AiFillCloseCircle color='' size={40} className='mx-auto text-white' /></button>
          </div>

          <div className='nav-main flex flex-col md:flex-row gap-4 h-[500px] md:h-auto scrollbar-hide overflow-y-scroll  '>
            <div className="main-menu flex flex-col items-start gap-2 px-2">
              <Link href="/" className='font-semibold text-base uppercase relative after:transition-all after:ease-in-out after:duration-300 after:absolute after:w-0 after:-bottom-1 after:h-[3px] after:bg-white after:hover:w-full after:left-0'>Trang chủ</Link>

              <Link href="/ve-chung-toi" className='font-semibold text-base uppercase relative after:transition-all after:ease-in-out after:duration-300 after:absolute after:w-0 after:-bottom-1 after:h-[3px] after:bg-white after:hover:w-full after:left-0'>Về chúng tôi</Link>

              <Link href="/khoa-hoc" className='font-semibold text-base uppercase relative after:transition-all after:ease-in-out after:duration-300 after:absolute after:w-0 after:-bottom-1 after:h-[3px] after:bg-white after:hover:w-full after:left-0'>Chương trình đào tạo</Link>

              <Link href="/nckh-cgcn" className='font-semibold text-base uppercase relative after:transition-all after:ease-in-out after:duration-300 after:absolute after:w-0 after:-bottom-1 after:h-[3px] after:bg-white after:hover:w-full after:left-0'>NCKH-CGCN</Link>

              <Link href="/tin-tuc" className='font-semibold text-base uppercase relative after:transition-all after:ease-in-out after:duration-300 after:absolute after:w-0 after:-bottom-1 after:h-[3px] after:bg-white after:hover:w-full after:left-0'>Tin tức</Link>

              <Link href="/lien-he" className='font-semibold text-base uppercase relative after:transition-all after:ease-in-out after:duration-300 after:absolute after:w-0 after:-bottom-1 after:h-[3px] after:bg-white after:hover:w-full after:left-0'>Liên hệ</Link>
            </div>

            <div className="sub-menu grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-1 gap-4 ">
              <div>
                <p className='font-semibold text-base uppercase bg-green-800 p-2'>Dự án</p>
                <div className='flex flex-col mt-2'>
                  {projects?.slice(0, 5).map((project: any) => <Link key={project?.id} href={`/du-an/${project?.slug}`} className='font-normal text-gray-200 px-2 py-1 normal-case'>{project?.title}</Link>)}
                  <Link className='font-normal text-gray-200 px-2 py-1 normal-case' href="/du-an">Xem thêm ...</Link>
                </div>
              </div>

              <div>
                <p className='font-semibold text-base uppercase p-2 bg-green-800'>Dịch vụ</p>
                <div className='flex flex-col mt-2'>
                  {services?.slice(0, 5).map((service: any) => <Link key={service?.id} href={`/dich-vu/${service?.slug}`} className='font-normal text-gray-200 px-2 py-1 normal-case'>{service?.title}</Link>)}
                  <Link className='font-normal text-gray-200 px-2 py-1 normal-case' href="/dich-vu">Xem thêm ...</Link>
                </div>
              </div>

              <div>
                <p className='font-semibold text-base uppercase p-2 bg-green-800'>Hợp tác quốc tế</p>
                <div className='flex flex-col mt-2'>
                  {cooperation?.slice(0, 5).map((item: any) => <Link key={item.id} href={item.slug} className='font-normal text-gray-200 px-2 py-1 normal-case'>{item.title.slice(0, 50) + "..."}</Link>)}
                  <Link className='font-normal text-gray-200 px-2 py-1 normal-case' href="/hop-tac-quoc-te">Xem thêm ...</Link>
                </div>
              </div>

            </div>
          </div>

        </nav>

      </div>
    </div>
  )
}

export default Header