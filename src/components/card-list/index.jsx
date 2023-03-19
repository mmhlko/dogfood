

import { Card } from '../card';

import './styles.css';

export function CardList({goods, onProductLike, currentUser}) {
  return (
    <div className='cards content__cards'>
      {goods.map((cardItem, index) => <Card key={index} {...cardItem} onProductLike={onProductLike} currentUser={currentUser}/>)}
      
    </div>
  );
}
