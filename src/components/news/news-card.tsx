import { convertDate } from '@/ultil'
import Image from 'next/image'
import React from 'react'

type Props = {
  title: string
  image_url: string
  date: string
}

function NewsCard({ title, image_url, date }: Props) {
  return (
    <div className='flex gap-2 items-start group'>
      <Image src={image_url} alt={title} width={110} height={80} />
      <div className='flex flex-col justify-start'>
        <h1 className='text-base xl:text-xl font-semibold group-hover:underline'>{title}</h1>
        <p className='flex-sm text-sm text-blue-700'>{convertDate(date)}</p>
      </div>
    </div>
  )
}

export default NewsCard