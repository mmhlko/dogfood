import { useContext } from "react";
import { CardsContext } from "../../contexts/cards-context";
import { CardList } from "../../components/card-list"
import { Sort } from "../../components/sort"
import { Spiner } from "../../components/spiner";
import s from './styles.module.css';
import { ContentHeader } from "../../components/content-header";
import { TABS } from "../../utils/constants";


export const CatalogPage = ({ isLoading }) => {

    const { cards: goods } = useContext(CardsContext)

    return (


        <>
            <ContentHeader title="Каталог" textButton='Главная' to='/' />
            <Sort tabs={TABS} currentSort='discount'/>
            <CardList goods={goods}/>
        </>

        

    )
}


        {/* старая версия до скелетона карточек
        
        return (
            <> {isLoading
                ? <Spiner />
                :  <>
                    <ContentHeader title="Каталог" textButton='Главная' to='/' />
                    <CardList goods={goods}/>
                </>

            }
            </>
        )
        */}