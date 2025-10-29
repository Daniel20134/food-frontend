import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'


const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onchangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  // useEffect(() => {
  //  console.log(data )
  // },[data])

  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address : data,
      items : orderItems,
      amount : getTotalCartAmount() + 2
    }
    let response = await axios.post(url + "/api/order/place" , orderData , {headers :  {token}})
    if (response.data.success) {
      const {session_url} = response.data
    }
  }

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" required placeholder='First Name' name='firstName' value={data.firstName} onChange={onchangeHandler} />
          <input type="text" required placeholder='Last Name' name='lastName' value={data.lastName} onChange={onchangeHandler} />
        </div>
        <input type="text" required placeholder='Email Address' name='email' value={data.email} onChange={onchangeHandler} />
        <input type="text" required placeholder='Street' name='street' value={data.street} onChange={onchangeHandler} />
        <div className="multi-fields">
          <input type="text" required placeholder='City' name='city' value={data.city} onChange={onchangeHandler} />
          <input type="text" required placeholder='State' name='state' value={data.state} onChange={onchangeHandler} />
        </div>
        <div className="multi-fields">
          <input type="text" required placeholder='Zip Code' name='zipcode' value={data.zipcode} onChange={onchangeHandler} />
          <input type="text" required placeholder='Country' name='country' value={data.country} onChange={onchangeHandler} />
        </div>
        <input type="text" required placeholder='Phone' name='phone' value={data.phone} onChange={onchangeHandler} />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type='submit' onClick={() => navigate("/order")}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
