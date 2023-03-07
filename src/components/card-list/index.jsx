

import { Card } from '../card';

import './styles.css';

export function CardList({goods}) {
  return (
    <div className='cards content__cards'>
      {goods.map((cardItem, index) => <Card key={index} {...cardItem}/>)}
      
    </div>
  );
}
