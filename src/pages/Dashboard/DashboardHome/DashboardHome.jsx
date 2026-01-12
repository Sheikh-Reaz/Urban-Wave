import React from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import  useRole  from '../../../hooks/useRole';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import BuyerDashboard from './BuyerDashboard';

const DashboardHome = () => {
     useDocumentTitle("Dashboard");
    const {role}  = useRole();
    return (
        <div>
            {
                role === "admin" ? <AdminDashboard /> : role === "manager" ? <ManagerDashboard /> : <BuyerDashboard />
            }
        </div>
    );
};

export default DashboardHome;