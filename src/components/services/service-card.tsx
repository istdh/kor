import Image from 'next/image'
import React from 'react'
import { Tooltip } from '@mantine/core';
import Link from 'next/link';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

type Props = {
  image_url: string
  title: string,
  slug: string
  sub_description: string
  type: string
}
function ServiceCard({ image_url, title, slug, sub_description, type }: Props) {
  return (
    <div className="rounded overflow-hidden box-shadow !bg-white">
      <div className='w-full h-[300px] relative flex justify-center items-center border-b'>
        <Image className="mx-auto w-full h-full" src={image_url} fill alt={title} />
      </div>

      <div className="px-6 py-4">
        <Tooltip label={title}>
          <h1 className="font-bold text-xl mb-2 uppercase text-green-700">{`${title.slice(0, 20)} ${title.length > 20 ? "..." : ""}`}</h1>
        </Tooltip>
        <p className="text-gray-700 text-sm">
          {sub_description.length > 200 ? sub_description.slice(0, 200) + "..." : sub_description}
        </p>
      </div>

      <div className="px-6 pb-4 flex justify-between items-center">
        <div className='flex gap-2'>
          <FacebookShareButton quote={title} hashtag='#vienmoitruong' url={`https://vienmoitruong.com/${type}/${slug}`} ><FacebookIcon size={30} /></FacebookShareButton>
          <TwitterShareButton url={`https://vienmoitruong.com/${type}/${slug}`} ><TwitterIcon size={30} /></TwitterShareButton>
          <LinkedinShareButton url={`https://vienmoitruong.com/${type}/${slug}`} ><LinkedinIcon size={30} /></LinkedinShareButton>
        </div>

        <Link href={`/${type}/${slug}`} className='uppercase text-sm font-semibold text-blue-700' type='button'>Xem chi tiết</Link>
      </div>
    </div>
  )
}

export default ServiceCard