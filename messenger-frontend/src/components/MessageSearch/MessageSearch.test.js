import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageSearch from './MessageSearch';

describe('MessageSearch', () => {
  test('triggers search on input', () => {
    const mockSearch = jest.fn();
    render(<MessageSearch onSearch={mockSearch} />);

    fireEvent.change(screen.getByPlaceholderText('Search messages...'), {
      target: { value: 'test' }
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(mockSearch).toHaveBeenCalledWith('test');
  });
});