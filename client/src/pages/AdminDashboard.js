import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMyContext } from '../context/AppContext';
import { Header, Sidebar, Overview, OrderManagement, MenuManagement, TableManagement, Settings } from '../components/AdminDashboard';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const { user, getOrders, getTables, getMenuItems, getCategories } = useMyContext();

    useEffect(() => {
        getOrders();
        getTables();
        getMenuItems();
        getCategories();
    }, []);

    const renderSection = () => {
        switch (activeSection) {
            case 'overview':
                return <Overview />;
            case 'orders':
                return <OrderManagement />;
            case 'menu':
                return <MenuManagement />;
            case 'tables':
                return <TableManagement />;
            default:
                return <Overview />;
        }
    };

    return (
        <DashboardWrapper>
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <MainContent>
                <Header user={user} />
                <ContentArea>
                    {renderSection()}
                </ContentArea>
            </MainContent>
        </DashboardWrapper>
    );
};

const DashboardWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f7fafc;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1.5rem;
  background-color: #edf2f7;
`;

export default AdminDashboard;

