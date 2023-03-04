
import { dataCard } from '../../data';
import { Card } from '../card';

import './styles.css';

export function CardList() {
  return (
    <div className='cards content__cards'>
      {dataCard.map(cardItem => <Card {...cardItem}/>)}
      
    </div>
  );
}
