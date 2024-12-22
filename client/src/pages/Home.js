import React, { useState } from 'react'
import styled from 'styled-components'

const Home = () => {
  const [tables, setTables] = useState([
    { id: 1, number: 1, seats: 2, available: true },
    { id: 2, number: 2, seats: 4, available: false },
    { id: 3, number: 3, seats: 6, available: true },
    { id: 4, number: 4, seats: 2, available: true },
    { id: 5, number: 5, seats: 4, available: false },
    { id: 6, number: 6, seats: 8, available: true },
    { id: 7, number: 7, seats: 2, available: true },
    { id: 8, number: 8, seats: 4, available: true },
  ])

  const handleTableClick = (tableId) => {
    const selectedTable = tables.find(table => table.id === tableId)
    if (selectedTable.available) {
      console.log(`Table ${selectedTable.number} selected`)
      // Here you would typically navigate to the menu or update the state
    } else {
      console.log(`Table ${selectedTable.number} is not available`)
    }
  }

  return (
    <Wrapper>
      <header>
        <h1>Welcome to Our Restaurant</h1>
        <p>Please select an available table</p>
      </header>
      <TableGrid>
        {tables.map(table => (
          <TableCard
            key={table.id}
            available={table.available}
            onClick={() => handleTableClick(table.id)}
          >
            <h2>Table {table.number}</h2>
            <p>Seats: {table.seats}</p>
            <Status available={table.available}>
              {table.available ? 'Available' : 'Occupied'}
            </Status>
          </TableCard>
        ))}
      </TableGrid>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;

    header {
        text-align: center;
        margin-bottom: 2rem;

        h1 {
            font-size: 2.5rem;
            color: #333;
        }

        p {
            font-size: 1.2rem;
            color: #666;
        }
    }
`

const TableGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
`

const TableCard = styled.div`
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: ${props => props.available ? 1 : 0.6};

    &:hover {
        transform: ${props => props.available ? 'translateY(-5px)' : 'none'};
        box-shadow: ${props => props.available ? '0 5px 15px rgba(0,0,0,0.1)' : 'none'};
    }

    h2 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: #333;
    }

    p {
        font-size: 1rem;
        color: #666;
        margin-bottom: 0.5rem;
    }
`

const Status = styled.span`
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: ${props => props.available ? '#4CAF50' : '#F44336'};
    color: white;
`

export default Home