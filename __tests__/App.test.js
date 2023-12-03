// import React from 'react';
// import { global, render, screen, fireEvent, act } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import App from '../src/App';


// global.fetch = jest.fn(() =>
//     Promise.resolve({
//         json: () => Promise.resolve([]),
//     })
// );

// test('renders App component', async () => {
//     render(<App />);

//     expect(screen.getByText('Loading...')).toBeInTheDocument();

//     await screen.findByText('');

//     expect(screen.getByText('')).toBeInTheDocument();
// });

// test('search functionality', async () => {
//     render(<App />);

//     await screen.findByText('');

//     fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Robert' } });

//     expect(screen.getByText('Robert Openheimer')).toBeInTheDocument();
// });

// test('pagination functionality', async () => {
//     render(<App />);

//     await screen.findByText('');

//     fireEvent.click(screen.getByText('Next'));

//     expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
// });

