import Head from 'next/head'

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>
      <div className='flex justify-center items-center flex-col w-full text-padrao-blue'>
        <h1 className='text-8xl'>404</h1>
        <h2 className='text-3xl mt-10 mb-5'>Página não encontrada.</h2>
        <span className='text-xl'>
          Acesse a página inicial no menu ao lado.
        </span>
      </div>
    </>
  )
}

export default NotFound
