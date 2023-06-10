import { useAppDispatch, useAppSelector } from '../../storage/hook';
import { onClickCurrentPage, onPaginateNext, onPaginatePrev } from '../../storage/products/products-slice';
import { getProducts } from '../../storage/products/selector';
import { TProductResponseDto } from '../../utils/api';
import { Card } from '../card';
import Paginate from '../paginate';
import './styles.css';

interface ICardListProps {
  goods: TProductResponseDto[]
}

export function CardList({goods}:ICardListProps) {

  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts) //функция заменяет обращение к стейту, о
  const totalProducts = useAppSelector(state => state.products.total)
  const currentPage = useAppSelector(state => state.products.currentPage)
  const productsPerPage = useAppSelector(state => state.products.productPerPage)
  const {currentStartPage, currentEndPage, totalPages} = useAppSelector(state => state.products)
  
  
  //const pages = [...Array(totalPages + 1).keys().slice(1)] //массив из номеров страниц
  const pages = Array.from({length: totalPages}, (_, i) => i + 1)

  const indexLastProduct = currentPage + productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const productsView = products.slice(indexFirstProduct, indexLastProduct)

  function onClickPrev () {
    if (currentPage !== 1) dispatch(onPaginatePrev())
  }

  function onClickNext () {
    if (currentPage !== totalPages) dispatch(onPaginateNext())
  }

  function onClickPage (page: number) {
    dispatch(onClickCurrentPage(page))
  }

  return (
    <>
      <div className='cards content__cards'>
        {productsView.map((cardItem, index) => <Card key={index} {...cardItem} />)}
      </div>
      <Paginate
        currentPage={currentPage}
        pages={pages}
        firstPage={currentStartPage}
        lastPage={currentEndPage}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        onClickPage={onClickPage}
      />
    </>

  );
}
