import {
  HomeOutlined,
  ContactPhoneOutlined,
  PersonAddAlt1Outlined,
  LibraryAddCheckOutlined,
} from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'

const SideBar = () => {
  return (
    <div className='flex bg-white h-96vh w-1/4 md:w-1/6 shadow-md rounded-lg flex-col'>
      <div className='flex justify-center w-full my-7'>
        <div>
          <Image
            src='/logos/logoVertical.png'
            alt='Icone'
            width={80}
            height={80}
            priority
          />
        </div>
      </div>
      <nav className='flex flex-col justify-between h-full'>
        <div>
          <Link href={'/'}>
            <div className='hover:bg-padrao-green-light py-0.5 '>
              <div className='text-lg text-padrao-blue flex items-center gap-2 m-4 '>
                <span>
                  <HomeOutlined />
                </span>
                <span className='font-medium'> Home </span>
              </div>
            </div>
          </Link>

          <Link href={'/pacientes'}>
            <div className='hover:bg-padrao-green-light py-0.5 '>
              <div className='text-lg text-padrao-blue flex items-center gap-2 m-4 '>
                <span>
                  <ContactPhoneOutlined />
                </span>
                <span className='font-medium'> Pacientes </span>
              </div>
            </div>
          </Link>

          <Link href={'/cadastro_pacientes'}>
            <div className='hover:bg-padrao-green-light py-0.5 '>
              <div className='text-lg text-padrao-blue flex items-center gap-2 m-4 '>
                <span>
                  <PersonAddAlt1Outlined />
                </span>
                <span className='font-medium'> Cadastro Pacientes </span>
              </div>
            </div>
          </Link>

          <Link href={'/pendencias'}>
            <div className='hover:bg-padrao-green-light py-0.5 '>
              <div className='text-lg text-padrao-blue flex items-center gap-2 m-4 '>
                <span>
                  <LibraryAddCheckOutlined />
                </span>
                <span className='font-medium'> Pendências </span>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <hr></hr>
          <Link href={'/perfil'}>
            <div className='hover:bg-padrao-green-light pt-0.5 '>
              <div className='text-lg text-padrao-blue flex items-center gap-2 m-4 '>
                <span>
                  <HomeOutlined />
                </span>
                <span className='font-medium'> Perfil </span>
              </div>
            </div>
          </Link>
          <Link href={'/configuracoes'}>
            <div className='hover:bg-padrao-green-light pb-0.5 '>
              <div className='text-lg text-padrao-blue flex items-center gap-2 m-4 '>
                <span>
                  <HomeOutlined />
                </span>
                <span className='font-medium'> Configurações </span>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default SideBar
