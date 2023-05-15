import React from 'react'
import { IconHome, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react'

function ContactInformation() {
  return (
    <div className="contact-info my-5">
      <h3 className='text-green-700 font-semibold text-xl'>LIÊN HỆ</h3>
      <h3 className='flex gap-2 font-semibold mb-4 mt-2'><IconHome /> VIỆN CÔNG NGHỆ MÔI TRƯỜNG CỘNG ĐỒNG</h3>
      <div className='grid md:grid-cols-3 gap-5 grid-cols-1'>
        <div className='bg-gray-100 p-4 text-center'>
          <IconMapPin className='mx-auto' color='blue' size={40} />
          <h1 className='text-sm mt-2 font-medium '>Số 05 ngõ 139 đường Phú Diễn, phường Phú Diễn, quận Bắc Từ Liêm, thành phố Hà Nội.</h1>
        </div>

        <div className='bg-gray-100 p-4 text-center'>
          <IconPhone className='mx-auto' color='blue' size={40} />
          <h1 className='text-sm mt-2 font-medium '>0943 841 268 - 02466 582 888</h1>
        </div>

        <div className='bg-gray-100 p-4 text-center'>
          <IconMail className='mx-auto' color='blue' size={40} />
          <h1 className='text-sm mt-2 font-medium '>info@vienmoitruong.com.vn</h1>
        </div>
      </div>
    </div>
  )
}

export default ContactInformation