import { CardList } from "../../components/card-list"
import { Sort } from "../../components/sort"
import { Spiner } from "../../components/spiner";
import s from './styles.module.css';
import { ContentHeader } from "../../components/content-header";
import { TABS } from "../../utils/constants";
import { useSelector } from "react-redux";


export const CatalogPage = ({ isLoading }) => {

    
    const cards = useSelector(state => state.products.data)

    return (


        <>
            <ContentHeader title="Каталог" textButton='Главная' to='/' />
            <Sort tabs={TABS} currentSort='discount'/>
            <CardList goods={cards}/>
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