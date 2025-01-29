import React from 'react';
import styled from 'styled-components';

const Sidebar = ({ activeSection, setActiveSection }) => {
    const navItems = [
        { name: 'Overview', key: 'overview' },
        { name: 'Orders', key: 'orders' },
        { name: 'Menu', key: 'menu' },
        { name: 'Tables', key: 'tables' },
    ];

    return (
        <SidebarWrapper>
            <Nav>
                {navItems.map((item) => (
                    <NavItem
                        key={item.key}
                        isActive={activeSection === item.key}
                        onClick={() => setActiveSection(item.key)}
                    >
                        {item.name}
                    </NavItem>
                ))}
            </Nav>
        </SidebarWrapper>
    );
};

const SidebarWrapper = styled.aside`
  background-color: #2d3748;
  color: white;
  width: 16rem;
  height: 100vh;
  padding: 1.75rem 0.5rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.a`
  padding: 0.625rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  margin-bottom: 0.25rem;

  background-color: ${props => props.isActive ? '#4299e1' : 'transparent'};
  &:hover {
    background-color: ${props => props.isActive ? '#4299e1' : '#4a5568'};
  }
`;

export default Sidebar;

