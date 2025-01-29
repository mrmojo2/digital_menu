import React, { useState } from 'react';
import styled from 'styled-components';
import { useMyContext } from '../../context/AppContext.js';

const OrderManagement = () => {
    const { orders, updateOrderStatus } = useMyContext();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filteredOrders = orders
        .filter(order => filter === 'all' || order.status === filter)
        .filter(order => order.order_number.toLowerCase().includes(search.toLowerCase()));

    const handleStatusChange = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
    };

    return (
        <OrderManagementWrapper>
            <ControlsWrapper>
                <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="served">Served</option>
                </Select>
                <SearchInput
                    type="text"
                    placeholder="Search orders..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </ControlsWrapper>
            <OrderList>
                {filteredOrders.map(order => (
                    <OrderItem key={order._id}>
                        <OrderInfo>
                            <OrderNumber>{order.order_number}</OrderNumber>
                            <OrderDetails>Table: {order.table.table_number}</OrderDetails>
                            <OrderDetails>Total: ${order.total_amount.toFixed(2)}</OrderDetails>
                        </OrderInfo>
                        <StatusSelect
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="served">Served</option>
                        </StatusSelect>
                    </OrderItem>
                ))}
            </OrderList>
        </OrderManagementWrapper>
    );
};

const OrderManagementWrapper = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background-color: white;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
`;

const OrderList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OrderItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const OrderInfo = styled.div`
  flex: 1;
`;

const OrderNumber = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
`;

const OrderDetails = styled.p`
  font-size: 0.875rem;
  color: #4a5568;
`;

const StatusSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background-color: white;
`;

export default OrderManagement;

