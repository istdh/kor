import React from 'react'
import { Box } from '@mantine/core'
import { FaAngular, FaNodeJs, FaHtml5, FaStackOverflow, FaAws, FaGoogle, FaReact } from 'react-icons/fa'
import Image from 'next/image'

type Props = {
  partners: any[]
}

function Partner({ partners }: Props) {

  return (
    <div className='py-10 px-4 lg:px-10 xl:px-10'>
      {/* <Title title="Đối tác" /> */}
      <Box mt={20} id="infinite" className="highway-slider">
        <div className="container highway-barrier">
          <ul className="highway-lane flex">
            {partners.map((item) => (
              <li key={item.id} className="highway-car relative">
                <Image width={180} height={100} src={item.logo.url} alt={item.title} />
              </li>
            ))}
          </ul>
        </div>
      </Box>
    </div>
  )
}

export default Partner