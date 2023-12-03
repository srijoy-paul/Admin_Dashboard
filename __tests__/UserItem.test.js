import React from 'react';
import { expect, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserItem from '../src/components/UserItem';


jest.mock('../App', () => ({
    usersContext: { Consumer: ({ children }) => children({ users: [], setUsers: jest.fn() }) },
    selectedUsersIdContext: { Consumer: ({ children }) => children({ selectedUsersId: [], setSelectedUsersId: jest.fn() }) },
    isSelectAllContext: { Consumer: ({ children }) => children({ isSelectAll: false, setIsSelectAll: jest.fn() }) },
    currentUsersContext: { Consumer: ({ children }) => children([]) },
}));

test('renders UserItem component', () => {
    render(<UserItem values={{ heading: true }} />);

    expect(screen.getByText('Your heading text')).toBeInTheDocument();
});

test('renders UserItem component with user data', () => {
    render(<UserItem values={{ heading: false, id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' }} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
});


