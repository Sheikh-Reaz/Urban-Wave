import React from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DashboardHome = () => {
     useDocumentTitle("Dashboard");
    return (
        <div>
            <h1>This is dashboard main page</h1>
        </div>
    );
};

export default DashboardHome;