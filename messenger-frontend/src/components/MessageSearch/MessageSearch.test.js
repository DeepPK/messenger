import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageSearch from './MessageSearch';

describe('MessageSearch', () => {
  test('triggers search with input value', () => {
    const mockOnSearch = jest.fn();
    render(<MessageSearch onSearch={mockOnSearch} />);

    fireEvent.change(screen.getByPlaceholderText(/search messages/i), {
      target: { value: 'test' }
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});