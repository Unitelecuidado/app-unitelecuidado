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

const SideBar = () => {
  const router = useRouter()

  // Função para verificar se o usuário está na página de "pacientes"
  const isOnPacientesPage = router.pathname === '/pacientes'

  const isOnCadastroPage = router.pathname === '/cadastro_pacientes'

  const isOnCadastroUsuariosPage =
    router.pathname === '/cadastro_usuarios'

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
        </div>
        <div className='md:pb-3 pb-1'>
          <hr />
          {isOnCadastroUsuariosPage ? (
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
                  <span className='font-normal'> Cadastro Usuários </span>
                </div>
              </div>
            </Link>
          )}

          <Link href={'/perfil'}>
            <div className='hover:bg-padrao-green-light py-0.5 '>
              <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
                <span>
                  <AccountCircleOutlined />
                </span>
                <span className='font-normal'> Perfil </span>
              </div>
            </div>
          </Link>
          <Link href={'/configuracoes'}>
            <div className='hover:bg-padrao-green-light py-0.5 '>
              <div className='text-md text-padrao-blue flex items-center gap-2 m-4 '>
                <span>
                  <SettingsOutlined />
                </span>
                <span className='font-normal'> Configurações </span>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default SideBar
