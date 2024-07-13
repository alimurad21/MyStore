import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import axios from 'axios'
import { API_BASE_URL } from '../../Constant/apiConstant'
import { Link } from 'react-router-dom'

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchProduct=async ()=>{
      try{
        const response = await axios.get(`${API_BASE_URL}/api/product`);
        setProducts(response.data);
      }catch(err){
        console.log(err.message)
      }
    }
    fetchProduct();
  },[])
    

  
 

  return (
    <div className='block p-4'>
      <div className='flex justify-end mb-4"' >
      <Link to={'/product/add'} className='mb-4 inline-block bg-blue-500 text-white py-2 px-4 rounded  hover:bg-blue-700'>Add Product</Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
        {
        products.map((product)=>(
          <Card key={product._id} product={product} />
        ))
      }
      </div>
        
    </div>
  )
}

export default Product;