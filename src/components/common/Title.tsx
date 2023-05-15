import React from 'react'

type Props = {
  title: string
}

function Title({ title }: Props) {
  return (
    <h1 className='mb-5 uppercase text-center font-semibold text-green-700 text-xl md:text-2xl relative before:absolute before:w-[150px] before:-translate-x-1/2 before:h-0.5 before:bg-green-700 before:-bottom-2 before:left-1/2'>{title}</h1>
  )
}

export default Title