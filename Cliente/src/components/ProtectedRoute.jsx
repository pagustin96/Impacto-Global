import { Navigate, Outlet } from 'react-router-dom'
export const ProtectedRoute = ({ children }) => {
    if(!sessionStorage.getItem('user')){
        return <Navigate to='/login' />
    }
    return children ? children : <Outlet/>
}
