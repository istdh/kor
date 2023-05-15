import React from 'react'
import Title from '../common/Title'
import { convertDate } from '@/ultil'
import Image from 'next/image'

type Props = {
  allNews: any[]
}

function News({ allNews }: Props) {

  return (
    <div>
      <Title title="Tin tức" />
      <div>
        <div className="padding">
          <div className="flex flex-col md:flex-row -mx-1.5">
            <a href={allNews[0]?.slug} className="h-72 md:h-auto w-full md:w-7/12 mx-1.5 mb-6 md:mb-0 group">
              <div className="h-72 md:h-full relative">
                <Image alt={allNews[0]?.title} fill priority src={allNews[0]?.thumbnail.url} className="absolute z-0 object-cover w-full h-72 md:h-full " />
                <div className='before:absolute before:top-0 before:left-0 before:!w-full before:!h-full before:bg-black/50  '>

                </div>
                <div className="absolute gradient w-full h-72 md:h-full z-10" />
                <div className="absolute left-0 right-0 bottom-0 p-4 z-30">
                  <h1 className="font-bold text-white leading-tight sm:mb-1.5 group-hover:underline text-2xl md:text-3xl">{allNews[0]?.title}</h1>
                  <div className="text-xs text-white hidden sm:block">
                    <div className="flex items-center">
                      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" className="h-3 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />
                      </svg>
                      <span className="text-xs text-white">{convertDate(allNews[0]?.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
            <div className="w-full md:w-5/12 mx-1.5 flex flex-col gap-3">
              {allNews?.slice(1).map(news => (
                <a href={news.slug} key={news.id} className="flex relative h-24 items-center group gap-3 border-b">
                  <Image alt={news.title} fill src={news.thumbnail.url} className="!relative !object-cover mr-3 !h-24 !w-24" />
                  <div className="flex-1">
                    <h2 className="font-bold text-sm lg:text-lg leading-tight group-hover:underline mb-2">{news.title}</h2>
                    <div className="flex items-center">
                      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" className="h-3 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />
                      </svg>
                      <span className="text-xs">{convertDate(news.createdAt)}</span>
                    </div>
                  </div>
                </a>
              ))}

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default News