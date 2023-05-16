import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Spiner } from "../spiner";
import { useSelector } from "react-redux";

function ProtectedRoute({onlyUnAuth, children}) {
  const user = useSelector(state => state.user.data);
  const isAuthChecked = useSelector(state => state.user.isAuthChecked);;
  const location = useLocation();
  const navigate = useNavigate();
  if (!isAuthChecked) return <Spiner />
  
  if (onlyUnAuth && user) {
    //const { from } = location?.state || { from: {pathname: '/'} } не работает
    const from  = location.state.from || {pathname: '/'};  
    const { backgroundLocation } = location?.state?.from?.state || { backgroundLocation: null }
    return <Navigate replace to={from} state={{ backgroundLocation }} />
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate replace to={{ pathname: '/login' }} state={{ from: location }} />
    )
  }
  return children
}

export default ProtectedRoute;


/* простая версия 
function ProtectedRoute({loggedIn, children}) {
  return ( 
    loggedIn === true
    ? <>{children}</>
    : <Navigate to={'/login'} />
   );
} */