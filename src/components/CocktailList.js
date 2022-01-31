import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const{loading, cockTail} =useGlobalContext()
  // console.log(cockTail);
  if(loading){
    return(
      <Loading />
    )
  }
  if(cockTail.length < 1){
    return(
      <h1 className='section-title'>
        no cocktail matched your search criteria
      </h1>
    )
  }

  return (
  <section className='section'>
      <h2 className='section-title'>cocktails</h2>
      <div className='cocktails-center'>
        {cockTail.map((item)=>{
          return <Cocktail key={item.id} {...item} />
        })}
      </div>
    </section>
  )
}

export default CocktailList
