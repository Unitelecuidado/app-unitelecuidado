;('')
import { ReactNode } from 'react'
import SideBar from './SideBar'

interface LayoutProps {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='font-gotham flex h-full m-4'>
      <SideBar />
      {children}
    </div>
  )
}

export default Layout
