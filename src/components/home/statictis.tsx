import React from 'react'
type Props = {
  member: string
  total_client: string
  years: string
  province: string
}

function Statictis({ member, total_client, years, province }: Props) {
  return (
    <div className='py-10 px-4 lg:px-10 xl:px-10'>
      <div>
        <h1 className="xl:text-5xl md:text-4xl text-2xl font-semibold leading-tight text-center text-gray-800 sm:mb-0 mb-12">
          HƠN 3 NĂM PHÁT TRIỂN VÀ CUNG CẤP DỊCH VỤ <br className="md:block hidden" />
          VỀ MÔI TRƯỜNG
        </h1>
        <div className="md:mt-14 mt-4 relative sm:flex items-center justify-center">
          <img src="https://i.ibb.co/KjrPCyW/map.png" alt="world map image" className="w-full xl:h-[600px] h-96 object-cover  sm:block hidden" />
          <img src="https://i.ibb.co/SXKj9Mf/map-bg.png" alt="mobile-image" className="sm:hidden -mt-10 block w-[600px] h-96 object-cover absolute z-0" />
          <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-green-700 sm:absolute relative z-20 mt-4 left-0 xl:ml-56 sm:ml-12 xl:-mt-40 sm:-mt-12">
            <p className="text-3xl font-semibold text-white">{years}+</p>
            <p className="text-base leading-4 xl:mt-4 mt-2 text-white uppercase font-semibold">Năm phát triển</p>
          </div>
          <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-green-700 sm:absolute relative z-20 mt-4 left-0 lg:ml-[600px] xl:ml-[800px] sm:ml-72 xl:-mt-72 sm:-mt-56">
            <p className="text-3xl font-semibold text-white">{total_client}+</p>
            <p className="text-base leading-4 xl:mt-4 mt-2 text-white uppercase font-semibold">Khách hàng</p>
          </div>
          <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-green-700 sm:absolute relative z-20 sm:mt-12 mt-4 xl:mt-80 xl:-ml-0 sm:-ml-0">
            <p className="text-3xl font-semibold text-white">{province}</p>
            <p className="text-base leading-4 xl:mt-4 mt-2 text-white uppercase font-semibold">Tỉnh thành</p>
          </div>
          <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-green-700 sm:absolute relative z-20 md:mt-0 sm:-mt-5 mt-4 right-0 xl:mr-56 sm:mr-24">
            <p className="text-3xl font-semibold text-white">{member}+</p>
            <p className="text-base leading-4 xl:mt-4 mt-2 text-white uppercase font-semibold">Thành viên</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Statictis