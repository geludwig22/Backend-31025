import React from 'react';
import {deleteProduct} from '../../service/serviceProducts';
const Card = ({id,name,image,price}) => {


    const handleDelete = async (e,id) => {
        e.preventDefault();
        await deleteProduct(id);
        
      };

     
  return (
    <div className="bg-white  rounded-lg overflow-hidden">
    <img src={image} alt="property.imageAlt"/>
    <div className="p-6 bg-gray ">
      <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide">
        {name}{/* Puede ir el timelaps */}
      </div>
      <h3 className="font-semibold text-lg leading-tight truncate">{name}</h3>
      <div className="mt-1 font-semibold text-md">
      ${price}
       
      </div>
      <div className="mt-2 flex justify-between items-center">
        <button onClick={(e)=>{console.log(e.target.id)}} id={id} className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
           BUY
        </button>
        <button onClick={(e)=>{handleDelete(e,id)}} id={id} className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            DELETE
        </button>
      </div>
    </div>
  </div>
  )
}

export default Card;