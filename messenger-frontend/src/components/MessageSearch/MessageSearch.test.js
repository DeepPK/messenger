import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageSearch from './MessageSearch';

describe('MessageSearch Component', () => {
  test('triggers search on submit', () => {
    const mockSearch = jest.fn();
    render(<MessageSearch onSearch={mockSearch} />);

    fireEvent.change(screen.getByPlaceholderText('Search messages...'), { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { type: 'submit' }));

    expect(mockSearch).toHaveBeenCalledWith('test');
  });
});
