import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import Forbidden from '../components/Forbidden';

const AdminRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const {role,roleLoading} = useRole();
     
    if(loading || !user || roleLoading){
    
        return <Loading/>
    
    }
    if(role !== 'admin' && role !== 'manager' ){
        return <Forbidden/>
    }
    return children
};

export default AdminRoutes;