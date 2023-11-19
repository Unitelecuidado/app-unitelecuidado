import { Search } from '@mui/icons-material'

import React from 'react'
import unidecode from 'unidecode'

import {
  Autocomplete,
  InputAdornment,
  TextField,
  styled,
} from '@mui/material'
import { Pacientes } from '../Props/DefaultProps'

interface SearchBoxProps {
  buscando: string
  allPacientes: Pacientes[]
  setBuscando: (value: string) => void
  setPacientesFiltrados: (value: Pacientes[]) => void
  setEncaminhamento?: (
    value: {
      nome: string
      value: string
    } | null
  ) => void
  isPendencias?: boolean
}

const PadraoTextField = styled(TextField)`
  input {
    color: #184066 !important; /* Defina a cor do texto */
  }

  .MuiOutlinedInput-root {
    fieldset {
      border: none;
      color: #184066;
    }
    &:hover fieldset {
      border: none;
    }
    &.Mui-focused fieldset {
      border: none;
    }
  }
`

const SearchBox = ({
  buscando,
  allPacientes,
  setBuscando,
  setPacientesFiltrados,
  setEncaminhamento,
  isPendencias,
}: SearchBoxProps) => {
  function removeAccents(str: string) {
    return unidecode(str)
  }

  const allEncaminhamentos = [
    {
      nome: 'Não Encaminhado ',
      value: 'NAO_ENCAMINHADO',
    },
    { nome: 'Medicina', value: 'MEDICINA' },
    { nome: 'Fisioterapia', value: 'FISIOTERAPIA' },
    { nome: 'Enfermagem', value: 'ENFERMAGEM' },
    { nome: 'Nutrição', value: 'NUTRICAO' },
    { nome: 'Farmácia', value: 'FARMARCIA' },
    {
      nome: 'Clínica Escola de Fisioterapia ',
      value: 'CLINICA_ESCOLA_FISIOTERAPIA',
    },
    {
      nome: 'Programa de Atenção Ampliada à Saúde (PAAS) ',
      value: 'PAAS',
    },
  ]

  const allDesfechos = [
    { nome: 'Atendido', value: 'ATENDIDO' },
    { nome: 'Não disponível', value: 'NAO_DISPONIVEL' },
    { nome: 'Não ligar', value: 'NAO_LIGAR' },
    { nome: 'Não atendeu a ligação', value: 'NAO_ATENDEU_LIGACAO' },
    { nome: 'Telefone incorreto', value: 'TELEFONE_INCORRETO' },
  ]

  const handleSearch = (searchTerm: string) => {
    setBuscando(searchTerm)

    setPacientesFiltrados(
      allPacientes?.filter(paciente => {
        const nomeLowerCase = removeAccents(paciente.nome.toLowerCase())
        const searchTermLowerCase = removeAccents(searchTerm.toLowerCase())

        const nomeIncluiTermo = nomeLowerCase.includes(searchTermLowerCase)

        const CPFIncluiTermo = paciente.cpf?.includes(searchTermLowerCase)

        const CNSIncluiTermo = paciente.cns?.includes(searchTermLowerCase)

        const desfechoCorresponde = allDesfechos.some(
          desfecho =>
            removeAccents(desfecho.nome.toLowerCase()).includes(
              searchTermLowerCase
            ) && paciente.desfecho?.includes(desfecho.value)
        )

        return (
          nomeIncluiTermo ||
          desfechoCorresponde ||
          CPFIncluiTermo ||
          CNSIncluiTermo
        )
      })
    )
  }

  const handleSearchEncaminhamento = (
    searchTerm: { nome: string; value: string } | null
  ) => {
    if (setEncaminhamento) {
      setEncaminhamento(searchTerm)

      if (searchTerm) {
        setPacientesFiltrados(
          allPacientes?.filter(paciente => {
            const encaminhamento = allEncaminhamentos.some(
              encaminhamento =>
                encaminhamento.nome?.includes(searchTerm.nome) &&
                paciente.encaminhamento?.includes(encaminhamento.value)
            )

            return encaminhamento
          })
        )
      }
    }
  }

  return (
    <div className='w-full flex items-center gap-5 justify-end'>
      {isPendencias ? (
        <>
          <div className='w-3/4 flex items-center bg-padrao-gray rounded-md'>
            <PadraoTextField
              required
              type='search'
              onChange={event => {
                handleSearch(event.target.value)
              }}
              value={buscando}
              sx={{
                '.MuiFormLabel-root': {
                  alignItems: 'center',
                  display: 'flex',
                  height: '25px',
                  fontWeight: 600,
                },
                width: '100%',
              }}
              placeholder={
                'Buscar paciente por nome, CPF, CNS ou desfecho'
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className='w-1/4 flex items-center bg-padrao-gray rounded-md'>
            <Autocomplete
              options={allEncaminhamentos}
              getOptionLabel={option => option.nome}
              ListboxProps={{
                style: { maxHeight: 190 },
              }}
              size='medium'
              onChange={(event, newValue) => {
                handleSearchEncaminhamento(newValue)
              }}
              sx={{
                '.MuiFormLabel-root': {
                  alignItems: 'center',
                  display: 'flex',
                  height: '25px',
                  fontWeight: 600,
                },
                width: '100%',
              }}
              renderInput={params => (
                <PadraoTextField
                  {...params}
                  placeholder='Encaminhamento'
                  variant='outlined'
                />
              )}
            />
          </div>
        </>
      ) : (
        <>
          <div className='w-full flex items-center bg-padrao-gray rounded-md'>
            <PadraoTextField
              required
              type='search'
              onChange={event => {
                handleSearch(event.target.value)
              }}
              value={buscando}
              sx={{
                '.MuiFormLabel-root': {
                  alignItems: 'center',
                  display: 'flex',
                  height: '25px',
                  fontWeight: 600,
                },
                width: '100%',
              }}
              placeholder={
                'Buscar paciente por nome, CPF, CNS ou desfecho'
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default SearchBox
