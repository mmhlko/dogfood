import classNames from 'classnames';
import { Button, ButtonVariant } from '../button';
import s from './styles.module.css'
import { MouseEvent, useState } from 'react';
import { ReactComponent as ArrowIcon } from './img/arrow.svg';

interface IPaginateProps {
    onClickPrev: () => void,
    onClickNext: () => void,
    onClickPage: (numberPage: number) => void,
    pages: number[],
    currentPage: number,
    firstPage: number,
    lastPage: number
}

function Paginate({ onClickPrev, onClickNext, pages, currentPage, onClickPage, firstPage, lastPage }:IPaginateProps) {
    
    
    function handleClickPage(e:MouseEvent<HTMLAnchorElement>, page: number) {
        e.preventDefault();
        onClickPage(page)
    }
    
    return ( 
        <div className={s.paginate}>
        <Button extraClass={s.paginateButton} variant={ButtonVariant.border} action={onClickPrev} disabled={currentPage === 1}>
            <ArrowIcon className={s.iconBack} style={{ transform:  "rotate(180deg)" }}/>
            Назад
        </Button>
        <ul className={s.paginationList}>
            {pages.slice(0, 1).map(page => (
                <li className={classNames(s.paginateItem, {[s.activeItem]: currentPage === page})}>
                    <a className={s.pageLink} href={`/catalog?page=${page}`} onClick={(e) => handleClickPage(e, page)}>{page}</a>
                </li>
            ))} 
            {pages.slice(firstPage - 1, lastPage).map(page => (
                <li className={classNames(s.paginateItem, {[s.activeItem]: currentPage === page})}>
                    <a className={s.pageLink} href={`/catalog?page=${page}`} onClick={(e) => handleClickPage(e, page)}>{page}</a>
                </li>
            ))}
            {pages.slice(pages.length - 1).map(page => (
                <li className={classNames(s.paginateItem, {[s.activeItem]: currentPage === page})}>
                    <a className={s.pageLink} href={`/catalog?page=${page}`} onClick={(e) => handleClickPage(e, page)}>{page}</a>
                </li>
            ))}             
        </ul>
        <Button variant={ButtonVariant.border} action={onClickNext} disabled={currentPage === pages.length}>
            Вперед
            <ArrowIcon className={s.iconBack}/>
        </Button>
        </div>
     );
}

export default Paginate;

