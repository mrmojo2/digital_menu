import React, { useState } from 'react';
import styled from 'styled-components';
import { useMyContext } from '../../context/AppContext';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const TableManagement = () => {
    const { tables, createTable, deleteTable } = useMyContext();
    const [newTable, setNewTable] = useState({ table_number: '', capacity: '' });
    const [isAddingTable, setIsAddingTable] = useState(false);
    const [sortColumn, setSortColumn] = useState('table_number');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSubmit = (e) => {
        e.preventDefault();
        createTable(newTable);
        setNewTable({ table_number: '', capacity: '' });
        setIsAddingTable(false);
    };

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedTables = [...tables].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return '#28a745';
            case 'occupied': return '#dc3545';
            case 'reserved': return '#ffc107';
            default: return '#6c757d';
        }
    };

    return (
        <TableManagementWrapper>
            <Section>
                <SectionHeader>
                    <SectionTitle>Tables</SectionTitle>
                    <AddButton onClick={() => setIsAddingTable(true)}>
                        <Plus size={20} />
                        Add New Table
                    </AddButton>
                </SectionHeader>
                {isAddingTable && (
                    <FormCard>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                placeholder="Table Number"
                                value={newTable.table_number}
                                onChange={(e) => setNewTable({ ...newTable, table_number: e.target.value })}
                                required
                            />
                            <Input
                                type="number"
                                placeholder="Capacity"
                                value={newTable.capacity}
                                onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                                required
                            />
                            <ButtonGroup>
                                <SubmitButton type="submit">Add Table</SubmitButton>
                                <CancelButton type="button" onClick={() => setIsAddingTable(false)}>Cancel</CancelButton>
                            </ButtonGroup>
                        </Form>
                    </FormCard>
                )}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell onClick={() => handleSort('table_number')}>
                                Table Number {sortColumn === 'table_number' && (sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                            </TableHeaderCell>
                            <TableHeaderCell onClick={() => handleSort('capacity')}>
                                Capacity {sortColumn === 'capacity' && (sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                            </TableHeaderCell>
                            <TableHeaderCell onClick={() => handleSort('status')}>
                                Status {sortColumn === 'status' && (sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                            </TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedTables.map(table => (
                            <TableRow key={table._id}>
                                <TableCell>{table.table_number}</TableCell>
                                <TableCell>{table.capacity}</TableCell>
                                <TableCell>
                                    <StatusIndicator status={table.status}>
                                        {table.status}
                                    </StatusIndicator>
                                </TableCell>
                                <TableCell>
                                    <ActionButton><Edit size={16} /></ActionButton>
                                    <ActionButton onClick={() => deleteTable(table._id)}><Trash2 size={16} /></ActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Section>
        </TableManagementWrapper>
    );
};

const TableManagementWrapper = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Section = styled.section`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: grid;
  gap: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f8f9fa;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TableHeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  cursor: pointer;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;

const StatusIndicator = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6c757d;
  padding: 4px;
  margin-right: 8px;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

export default TableManagement;

