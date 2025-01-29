import React, { useState } from 'react';
import styled from 'styled-components';
import { useMyContext } from '../../context/AppContext';

const Settings = () => {
    const { updateSettings, settings } = useMyContext();
    const [formData, setFormData] = useState({
        restaurantName: settings.restaurantName || '',
        address: settings.address || '',
        phone: settings.phone || '',
        openingTime: settings.openingTime || '',
        closingTime: settings.closingTime || '',
        taxRate: settings.taxRate || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSettings(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <SettingsWrapper>
            <SectionTitle>Restaurant Settings</SectionTitle>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input
                        type="text"
                        id="restaurantName"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="address">Address</Label>
                    <Input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="openingTime">Opening Time</Label>
                    <Input
                        type="time"
                        id="openingTime"
                        name="openingTime"
                        value={formData.openingTime}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="closingTime">Closing Time</Label>
                    <Input
                        type="time"
                        id="closingTime"
                        name="closingTime"
                        value={formData.closingTime}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                        type="number"
                        id="taxRate"
                        name="taxRate"
                        value={formData.taxRate}
                        onChange={handleChange}
                        required
                        min="0"
                        max="100"
                        step="0.01"
                    />
                </FormGroup>
                <Button type="submit">Save Settings</Button>
            </Form>
        </SettingsWrapper>
    );
};

const SettingsWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3182ce;
  }
`;

export default Settings;

