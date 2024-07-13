import axios from 'axios'
import React, { useState } from 'react'
import { API_BASE_URL } from '../../Constant/apiConstant'
import {  useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const [state, setState] = useState({name:'',image:'',price:'',category:'',description:''});
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const sendDetailToServer = async() =>{
            try{
                const payload = {
                    'name':state.name,
                    'image':state.image,
                    'price':state.price,
                    'category':state.category,
                    'description':state.description                }
                
                const response = await axios.post(`${API_BASE_URL}/api/product/add`,payload);
                if(response.status===201){
                    redirectToHome('/home');
                }
                else{
                    console.log('else statement')
                    setError('Failed to add product. Please try again.');
                }
            }                       
            catch(err){
                setError('An error occurred. Please try again.');
                console.log(err.message)
            }
    }

    const handleChange =(e)=>{
        setState(prevState =>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        sendDetailToServer();
    }

    const redirectToHome =()=>{
        navigate('/home')
    }
  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        
        <label className="block text-gray-700 text-sm font-bold mb-2">
          <input 
            name='name' 
            placeholder='Enter Product Name' 
            value={state.name} 
            onChange={handleChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        
        <label className="block text-gray-700 text-sm font-bold mb-2">
          <input 
            name='image' 
            placeholder='Enter Product Image URL' 
            value={state.image} 
            onChange={handleChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        
        <label className="block text-gray-700 text-sm font-bold mb-2">
          <input 
            name='price' 
            placeholder='Enter Product Price' 
            value={state.price} 
            onChange={handleChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        
        <label className="block text-gray-700 text-sm font-bold mb-2">
          <input 
            name='category' 
            placeholder='Enter Product Category' 
            value={state.category} 
            onChange={handleChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        
        <label className="block text-gray-700 text-sm font-bold mb-2">
          <input 
            name='description' 
            placeholder='Enter Product Description' 
            value={state.description} 
            onChange={handleChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        
        <input 
          type='submit' 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />
      </form>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  )
}

export default AddProduct