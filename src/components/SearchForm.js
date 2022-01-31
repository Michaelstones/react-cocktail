import React,{useRef, useEffect} from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const{setSearchTerm}=useGlobalContext()
    const inputValue = useRef('')
    // onchange handler
    const getcocktail=()=>{
      setSearchTerm(inputValue.current.value)
    }
    // focus on load on the input
    useEffect(()=>{
      inputValue.current.focus()
    },[])
    const handlesubmit=(e)=>{
      e.preventDefault()
    }
  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handlesubmit}>
        <div className='form-control'>
           <label htmlFor='name'>search for your favourite cocktail</label>
           <input type='text' id='name' ref={inputValue} onChange={getcocktail}/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
