test('calls onDelete when delete button is clicked', () => {
  const mockDelete = jest.fn();
  render(<MessageList messages={mockMessages} onDelete={mockDelete} />);

  fireEvent.click(screen.getAllByText('Delete')[0]);
  expect(mockDelete).toHaveBeenCalledWith(1);
});

test('displays timestamp correctly', () => {
  render(<MessageList messages={mockMessages} onDelete={() => {}} />);
  expect(screen.getByText('3/18/2024, 12:00:00 AM')).toBeInTheDocument();
});