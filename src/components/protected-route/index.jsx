import { Navigate, useLocation } from "react-router-dom";
import { Spiner } from "../spiner";
import { useSelector } from "react-redux";

function ProtectedRoute({onlyUnAuth, children}) {
  const user = useSelector(state => state.user.data);
  const isAuthChecked = useSelector(state => state.user.isAuthChecked);;
  const location = useLocation();
  if (!isAuthChecked) return <Spiner />
  //debugger
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } }
    const { backgroundLocation } = location?.state?.from?.state || { backgroundLocation: null }
    return <Navigate replace to={from} state={{ backgroundLocation }} />
  }

  if (!onlyUnAuth && !user) {
    console.log('NAVIGATE LOGIN');
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