import React from 'react'

type Props = {
  title: string
}

function TitleStyleTwo({ title }: Props) {
  return (
    <h1 className='mb-5 uppercase text-left font-semibold text-green-700 text-xl md:text-2xl relative before:absolute before:w-[150px]  before:h-0.5 before:bg-green-700 before:-bottom-2 before:left-0'>{title}</h1>
  )
}

export default TitleStyleTwo