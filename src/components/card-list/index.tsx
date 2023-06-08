import { TProductResponseDto } from '../../utils/api';
import { Card } from '../card';
import './styles.css';

interface ICardListProps {
  goods: TProductResponseDto[]
}

export function CardList({goods}:ICardListProps) {
  
  return (
    <div className='cards content__cards'>
      {goods.map((cardItem, index) => <Card key={index} {...cardItem}/>)}
      
    </div>
  );
}
