import React from 'react'
// import Image1 from '../../public/ima1.webp';
import {useNavigate} from 'react-router-dom'
const Card = ({product}) => {
    const navigate = useNavigate();
    const redirectToProduct =()=>{
        navigate(`/product/${product.id}`);
    }
  return (
    <div className='block max-w-sm mx-3  my-4 bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105' onClick={redirectToProduct}>
      <div className='w-full h-70 overflow-hidden'>
        <img className='w-full h-full object-cover' src={product.image} alt='Product' />
      </div>
      <div className='p-4'>
        <span className='block font-bold text-lg'>{product.name}</span>
        <span className='block text-gray-600'>PKR {product.price}</span>
      </div>
    </div>
  )
}

export default Card