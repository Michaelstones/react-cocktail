import React,{useState, useEffect} from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams('')
  const[loading, setLoading] = useState(false)
  const [cocktail, setcocktail] = useState(null)
  const fetchdata = async ()=>{
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json();
      // console.log(data);
      // const{drink}=data

      if(data.drinks){
        const{strDrink:name,
          strDrinkThumb:image,
          strAlcoholic:info, 
          strGlass:glass, 
          strCategory:category,
          strInstructions:instruc,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
          }=data.drinks[0]
          const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5
          ]

          const newcocktail = {
            info,
            glass,
            category,
            image,
            instruc,
            name,
            ingredients}
            setcocktail(newcocktail)
      }else{
        setcocktail(null)
      }
      setLoading(false)




    } catch (error) {
      console.log(error)
    }

  }
  

  useEffect(()=>{
    fetchdata()

  },[id])
  if(loading){
   return <Loading/>
  }
  if(!cocktail){
    return <h2 className='section-title'>No cocktail to display</h2>
  }
  const{info,
    glass,
    category,
    image,
    instruc,
    name,
    ingredients} = cocktail;
  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        back home
      </Link>
      <h2 className='section-title'>{name} </h2>
      <div className='drink'>
        <img src={image} alt={name}/>
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>

          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>

          <p>
            <span className='drink-data'>info :</span>
            {info}
          </p>

          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>

          <p>
            <span className='drink-data'>instruction :</span>
            {instruc}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {
            ingredients.map((item, index)=>{
              return item ? <span key={index}>{item}</span>:null
            })
          }
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail;