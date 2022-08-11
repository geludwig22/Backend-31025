import React from 'react';
import Card from '../Card/Card';

const ListProducts = ({items}) => {


  return (
    //List Products container 
    <div className="container flex gap-2 flex-wrap justify-around items-center mx-auto my-10">
    
      {/* List Products */}
      {items.length === 0 && <div className="text-center text-white ">No hay productos</div>}
      {items.map(item => {
        return (
          <Card
            key={item.id}
            id={item.id}
            image={item.image}
            price={item.price}
            name={item.name}
     
            />
        )}
      )}
    

    </div>

  )
}

export default ListProducts