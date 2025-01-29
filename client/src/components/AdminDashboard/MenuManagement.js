import React, { useState } from 'react';
import styled from 'styled-components';
import { useMyContext } from '../../context/AppContext';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const MenuManagement = () => {
    const { menuItems, categories, createMenuItem, createCategory, deleteMenuItem, deleteCategory } = useMyContext();
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: '', image_url: '' });
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [sortColumn, setSortColumn] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleItemSubmit = (e) => {
        e.preventDefault();
        createMenuItem(newItem);
        setNewItem({ name: '', description: '', price: '', category: '', image_url: '' });
        setIsAddingItem(false);
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        createCategory(newCategory);
        setNewCategory({ name: '', description: '' });
        setIsAddingCategory(false);
    };

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedMenuItems = [...menuItems].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    console.log('Categories:', categories);

    return (
        <MenuManagementWrapper>
            <Section>
                <SectionHeader>
                    <SectionTitle>Menu Items</SectionTitle>
                    <AddButton onClick={() => setIsAddingItem(true)}>
                        <Plus size={20} />
                        Add New Item
                    </AddButton>
                </SectionHeader>
                {isAddingItem && (
                    <FormCard>
                        <Form onSubmit={handleItemSubmit}>
                            <Input
                                type="text"
                                placeholder="Name"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                required
                            />
                            <Input
                                type="text"
                                placeholder="Description"
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                required
                            />
                            <Input
                                type="number"
                                placeholder="Price"
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                required
                            />
                            <Select
                                value={newItem.category}
                                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </Select>
                            <Input
                                type="text"
                                placeholder="Image URL"
                                value={newItem.image_url}
                                onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                            />
                            <ButtonGroup>
                                <SubmitButton type="submit">Add Item</SubmitButton>
                                <CancelButton type="button" onClick={() => setIsAddingItem(false)}>Cancel</CancelButton>
                            </ButtonGroup>
                        </Form>
                    </FormCard>
                )}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell onClick={() => handleSort('name')}>
                                Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                            </TableHeaderCell>
                            <TableHeaderCell onClick={() => handleSort('description')}>
                                Description {sortColumn === 'description' && (sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                            </TableHeaderCell>
                            <TableHeaderCell onClick={() => handleSort('price')}>
                                Price {sortColumn === 'price' && (sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                            </TableHeaderCell>
                            <TableHeaderCell>Category</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedMenuItems.map(item => (
                            <TableRow key={item._id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>Rs {item.price.toFixed(2)}</TableCell>
                                <TableCell>{item.category.name}</TableCell>
                                <TableCell>
                                    <ActionButton><Edit size={16} /></ActionButton>
                                    <ActionButton onClick={() => deleteMenuItem(item._id)}><Trash2 size={16} /></ActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Section>
            <Section>
                <SectionHeader>
                    <SectionTitle>Categories</SectionTitle>
                    <AddButton onClick={() => setIsAddingCategory(true)}>
                        <Plus size={20} />
                        Add New Category
                    </AddButton>
                </SectionHeader>
                {isAddingCategory && (
                    <FormCard>
                        <Form onSubmit={handleCategorySubmit}>
                            <Input
                                type="text"
                                placeholder="Name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                required
                            />
                            <Input
                                type="text"
                                placeholder="Description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            />
                            <ButtonGroup>
                                <SubmitButton type="submit">Add Category</SubmitButton>
                                <CancelButton type="button" onClick={() => setIsAddingCategory(false)}>Cancel</CancelButton>
                            </ButtonGroup>
                        </Form>
                    </FormCard>
                )}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Description</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories && categories.length > 0 ? (
                            categories.map(category => (
                                <TableRow key={category._id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>
                                        <ActionButton><Edit size={16} /></ActionButton>
                                        <ActionButton onClick={() => deleteCategory(category._id)}><Trash2 size={16} /></ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>No categories found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Section>
        </MenuManagementWrapper>
    );
};

const MenuManagementWrapper = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Section = styled.section`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
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

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
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

export default MenuManagement;

