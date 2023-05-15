import React from 'react'
import Header from './header'
import { FooterLinks } from './footer'
import { TypeCommon } from '../../../type'
import { useWindowScroll } from '@mantine/hooks'
import { IconArrowUp } from '@tabler/icons-react'

interface Props {
  children: React.ReactNode
  common: TypeCommon
  projects: any
  services: any
  cooperation: any
  links: any
}

function Layout({ children, common, projects, links, services, cooperation }: Props) {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <div>
      {scroll.y > 500 && <button onClick={() => scrollTo({ y: 0 })} className="scroll-to-top w-[40px] h-[40px] fixed bottom-10 right-10 z-[100] bg-blue-700" type='button'>
        <IconArrowUp size={30} className='mx-auto' color='white' />
      </button>}
      <Header services={services} projects={projects} common={common} cooperation={cooperation} />
      <div>
        {children}
      </div>
      <FooterLinks links={links} common={common} />
    </div>
  )
}

export default Layout