import Image from 'next/image'
import Link from 'next/link'

const SideBar = () => {
  return (
    <div className='flex bg-white h-96vh w-1/4 md:w-1/6 shadow-md rounded-lg'>
      <span className='flex justify-center w-full m-7'>
        <Link href={'/'}>
          <div>
            <Image
              src='/logos/logoVertical.png'
              alt='Icone'
              width={80}
              height={80}
              priority
            />
          </div>
        </Link>
      </span>
    </div>
  )
}

export default SideBar
