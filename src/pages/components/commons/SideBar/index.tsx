import {
  ContactPhoneOutlined,
  PersonAddAlt1Outlined,
  LibraryAddCheckOutlined,
  AccountCircleOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import cookies from 'js-cookie'

const SideBar = () => {
  const router = useRouter()
  const [cargo, setCargo] = useState('')

  useEffect(() => {
    const userCookie = cookies.get('user')
    setCargo(userCookie?.length && JSON.parse(userCookie)[0].cargo)
  }, [])

  // Função para verificar se o usuário está na página de "pacientes"
  const isOnPacientesPage = router.pathname === '/pacientes'

  const isOnCadastroPage = router.pathname === '/cadastro_pacientes'

  const isOnCadastroUsuariosPage = router.pathname === '/cadastro_usuarios'

  const isOnPendenciasPage = router.pathname === '/pendencias'

  return (
    <div className='flex bg-white h-tela w-1/4 md:w-1/6 shadow-md rounded-lg flex-col'>
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
          {isOnPacientesPage ? (
            <div className='bg-padrao-green-light py-0.5 '>
              <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
                <span>
                  <ContactPhoneOutlined />
                </span>
                <span className='font-normal'> Pacientes </span>
              </div>
            </div>
          ) : (
            <Link href={'/pacientes'}>
              <div className='hover:bg-padrao-green-light py-0.5 '>
                <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
                  <span>
                    <ContactPhoneOutlined />
                  </span>
                  <span className='font-normal'> Pacientes </span>
                </div>
              </div>
            </Link>
          )}

          {isOnCadastroPage ? (
            <div className='bg-padrao-green-light py-0.5 '>
              <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
                <span>
                  <PersonAddAlt1Outlined />
                </span>
                <span className='font-normal'> Cadastro Pacientes </span>
              </div>
            </div>
          ) : (
            <Link href={'/cadastro_pacientes'}>
              <div className='hover:bg-padrao-green-light py-0.5 '>
                <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
                  <span>
                    <PersonAddAlt1Outlined />
                  </span>
                  <span className='font-normal'> Cadastro Pacientes </span>
                </div>
              </div>
            </Link>
          )}

          {isOnPendenciasPage ? (
            <div className='bg-padrao-green-light py-0.5 '>
              <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
                <span>
                  <LibraryAddCheckOutlined />
                </span>
                <span className='font-normal'> Pendências </span>
              </div>
            </div>
          ) : (
            <Link href={'/pendencias'}>
              <div className='hover:bg-padrao-green-light py-0.5 '>
                <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
                  <span>
                    <LibraryAddCheckOutlined />
                  </span>
                  <span className='font-normal'> Pendências </span>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className='md:pb-3 pb-1'>
          <hr />
          {cargo != 'MONITOR' ? (
            isOnCadastroUsuariosPage ? (
              <div className='bg-padrao-green-light py-0.5 '>
                <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
                  <span>
                    <PersonAddAlt1Outlined />
                  </span>
                  <span className='font-normal'> Cadastro Usuários </span>
                </div>
              </div>
            ) : (
              <Link href={'/cadastro_usuarios'}>
                <div className='hover:bg-padrao-green-light py-0.5 '>
                  <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
                    <span>
                      <PersonAddAlt1Outlined />
                    </span>
                    <span className='font-normal'>Cadastro Usuários</span>
                  </div>
                </div>
              </Link>
            )
          ) : null}

          <div className='hover:bg-padrao-green-light py-0.5 hover:cursor-not-allowed '>
            <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
              <span>
                <AccountCircleOutlined />
              </span>
              <span className='font-normal'> Perfil </span>
            </div>
          </div>

          <div className='hover:bg-padrao-green-light py-0.5 hover:cursor-not-allowed '>
            <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
              <span>
                <SettingsOutlined />
              </span>
              <span className='font-normal'> Configurações </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default SideBar
