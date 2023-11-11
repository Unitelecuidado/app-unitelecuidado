import { Search } from '@mui/icons-material'

import React, { useState } from 'react'
import unidecode from 'unidecode'

import {
  Autocomplete,
  Divider,
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
  setEncaminhamento?: (value: string) => void
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
}: //setEncaminhamento,
SearchBoxProps) => {
  const [encaminhamentos, setEncaminhamentos] = useState([])

  function removeAccents(str: string) {
    return unidecode(str)
  }

  const handleSearch = (searchTerm: string) => {
    setBuscando(searchTerm)

    setPacientesFiltrados(
      allPacientes?.filter(paciente =>
        removeAccents(paciente.nome.toLowerCase()).includes(
          removeAccents(searchTerm.toLowerCase())
        )
      )
    )
  }

  /*  const handleSearchLote = (searchTerm: PropsLotes | null) => {
    setLote(searchTerm)

    if (searchTerm) {
      setFilteredTarefas(
        allTarefas?.filter(tarefa => tarefa.id_lote == searchTerm.id)
      )
    }
  } */

  return (
    <div className='w-full flex items-center justify-end'>
      <div className='w-full flex items-center gap-1 bg-padrao-gray rounded-md'>
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
          placeholder={'Buscar paciente por nome'}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Divider />
        {/* <Autocomplete
            options={lotes}
            getOptionLabel={option => option.numero_lote}
            ListboxProps={{
              style: { maxHeight: 190, fontFamily: 'Montserrat' },
            }}
            size='medium'
            onChange={(event, newValue) => {
              handleSearchLote(newValue)
            }}
            renderInput={params => (
              <PadraoTextField
                {...params}
                placeholder='Lote'
                variant='outlined'
                sx={{
                  '.MuiFormLabel-root': {
                    alignItems: 'center',
                    display: 'flex',
                    height: '25px',
                    color: 'black',
                    fontWeight: 600,
                    fontFamily: 'Montserrat',
                  },
                  width: '200px',
                }}
              />
            )}
          /> */}
      </div>
    </div>
  )
}

export default SearchBox
