import { Link, useLocation } from "react-router-dom";
import { ContentHeader } from "../../components/content-header";


function MainPage() {

    const location = useLocation();
    return ( 
        <>
            <ContentHeader title='Главная страница'/>
            <div><Link to={'/catalog'}>В каталог</Link></div>
            <div><Link replace to={'/dnd'}  state={{backgroundLocation: location, initialPath: location.pathname}}>
                Открыть защитную страницу
            </Link></div>
            
            
        </>
     );
}

export default MainPage;