import { convertDate } from '@/ultil'
import Image from 'next/image'
import React from 'react'
type Props = {
  title: string
  image_url: string
  date: string
}
function CooperateCard({ title, image_url, date }: Props) {
  return (
    <div className='flex gap-2 items-start group'>
      <Image src={image_url} alt={title} width={110} height={80} />
      <div>
        <h1 className='text-base xl:text-xl group-hover:underline font-semibold'>{title}</h1>
        <p className='flex-sm text-sm text-blue-700'>{convertDate(date)}</p>
      </div>
    </div>
  )
}

export default CooperateCard