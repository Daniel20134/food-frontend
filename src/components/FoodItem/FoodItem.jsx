import React, { useContext} from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const FoodItem = ({ id, name, price, description, image }) => {

  
  const {cartItems , setCartItems , addToCart , removeCart , url} = useContext(StoreContext)
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-img' src={url+"/images/"+image} alt="" />
        {!cartItems?.[id] ? <img src={assets.add_icon_white} onClick={() => addToCart(id)} className='add' /> 
        : <div className='food-item-counter'>
           <img src={assets.remove_icon_red} onClick={() => removeCart(id)} />
           <p>{cartItems[id]}</p>
           <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="" />
        </div>
              }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>k
        <p className="food-item-desc">
          {description}
        </p>
        <p className="food-item-price">
          ${price}
        </p>
      </div>
    </div>
  )
}

export default FoodItem
