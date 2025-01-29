import React from 'react';
import styled from 'styled-components';
import { useMyContext } from '../../context/AppContext.js';

const Header = ({ user }) => {
    const { logout } = useMyContext();

    return (
        <HeaderWrapper>
            <HeaderContent>
                <Title>Admin Dashboard</Title>
                <UserSection>
                    <Username>{user.username}</Username>
                    <LogoutButton onClick={logout}>
                        Logout
                    </LogoutButton>
                </UserSection>
            </HeaderContent>
        </HeaderWrapper>
    );
};

const HeaderWrapper = styled.header`
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  margin-right: 1rem;
  color: #4a5568;
`;

const LogoutButton = styled.button`
  background-color: #f56565;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #e53e3e;
  }
`;

export default Header;
