test('clears search when empty input', () => {
  const mockSearch = jest.fn();
  render(<MessageSearch onSearch={mockSearch} />);

  fireEvent.change(screen.getByPlaceholderText('Search messages...'), { 
    target: { value: '' } 
  });
  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  expect(mockSearch).toHaveBeenCalledWith('');
});

test('handles special characters in search', () => {
  const mockSearch = jest.fn();
  render(<MessageSearch onSearch={mockSearch} />);

  fireEvent.change(screen.getByPlaceholderText('Search messages...'), { 
    target: { value: 'test@123' } 
  });
  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  expect(mockSearch).toHaveBeenCalledWith('test@123');
});