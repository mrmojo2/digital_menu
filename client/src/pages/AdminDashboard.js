import React, { useState } from 'react'
import styled from 'styled-components'
import { Home, Utensils, Grid, ClipboardList, ChefHat, Settings } from 'lucide-react'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview')

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <ContentCard>
                        <h2>Restaurant Overview</h2>
                        <p>Key metrics and performance indicators</p>
                        <div>
                            <p>Total Orders Today: 150</p>
                            <p>Average Order Preparation Time: 15 minutes</p>
                            <p>Most Popular Item: Margherita Pizza</p>
                        </div>
                    </ContentCard>
                )
            case 'menu':
                return (
                    <ContentCard>
                        <h2>Menu Management</h2>
                        <p>Add, edit, or remove menu items</p>
                        <button className="btn">Add New Item</button>
                    </ContentCard>
                )
            case 'tables':
                return (
                    <ContentCard>
                        <h2>Table Management</h2>
                        <p>Manage restaurant tables and seating</p>
                        <button className="btn">Add New Table</button>
                    </ContentCard>
                )
            case 'orders':
                return (
                    <ContentCard>
                        <h2>Order Management</h2>
                        <p>View and manage customer orders</p>
                    </ContentCard>
                )
            case 'kitchen':
                return (
                    <ContentCard>
                        <h2>Kitchen View</h2>
                        <p>Monitor and manage food preparation</p>
                    </ContentCard>
                )
            case 'settings':
                return (
                    <ContentCard>
                        <h2>System Settings</h2>
                        <p>Configure application settings</p>
                    </ContentCard>
                )
            default:
                return <p>Select a tab</p>
        }
    }

    return (
        <Wrapper>
            <Sidebar>
                <h1>Restaurant Admin</h1>
                <nav>
                    {[
                        { name: 'Overview', icon: Home },
                        { name: 'Menu Management', icon: Utensils },
                        { name: 'Table Management', icon: Grid },
                        { name: 'Orders', icon: ClipboardList },
                        { name: 'Kitchen View', icon: ChefHat },
                        { name: 'Settings', icon: Settings },
                    ].map((item) => (
                        <NavButton
                            key={item.name.toLowerCase()}
                            className={activeTab === item.name.toLowerCase().replace(' ', '-') ? 'active' : ''}
                            onClick={() => setActiveTab(item.name.toLowerCase().replace(' ', '-'))}
                        >
                            <item.icon />
                            <span>{item.name}</span>
                        </NavButton>
                    ))}
                </nav>
            </Sidebar>
            <MainContent>
                <h2>{activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
                {renderContent()}
            </MainContent>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    background-color: #f0f2f5;
`

const Sidebar = styled.div`
    width: 250px;
    background-color: #ffffff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px;

    h1 {
        font-size: 1.5rem;
        margin-bottom: 20px;
        color: #333;
    }

    nav {
        display: flex;
        flex-direction: column;
    }
`

const NavButton = styled.button`
    display: flex;
    align-items: center;
    padding: 10px;
    border: none;
    background: transparent;
    color: #555;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }

    &.active {
        background-color: #e6e6e6;
        color: #1a73e8;
    }

    svg {
        margin-right: 10px;
    }
`

const MainContent = styled.div`
    flex: 1;
    padding: 20px;

    h2 {
        font-size: 2rem;
        margin-bottom: 20px;
        color: #333;
    }
`

const ContentCard = styled.div`
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: #333;
    }

    p {
        color: #666;
        margin-bottom: 15px;
    }

    .btn {
        background-color: #1a73e8;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #1557b0;
        }
    }
`

export default AdminDashboard