test('resets form after successful submission', async () => {
  const mockSubmit = jest.fn().mockResolvedValue({});
  render(<MessageForm onSend={mockSubmit} />);

  // Заполняем и отправляем форму
  fireEvent.change(screen.getByLabelText('Sender'), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText('Recipient'), { target: { value: 'Alice' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello!' } });
  fireEvent.click(screen.getByRole('button', { name: /send/i }));

  await waitFor(() => {
    expect(screen.getByLabelText('Sender').value).toBe('');
    expect(screen.getByLabelText('Recipient').value).toBe('');
    expect(screen.getByLabelText('Message').value).toBe('');
  });
});

test('shows error message on failed submission', async () => {
  const mockSubmit = jest.fn().mockRejectedValue(new Error('Failed'));
  render(<MessageForm onSend={mockSubmit} />);

  fireEvent.change(screen.getByLabelText('Sender'), { target: { value: 'John' } });
  fireEvent.click(screen.getByRole('button', { name: /send/i }));

  await waitFor(() => {
    expect(screen.getByText('Failed to send message')).toBeInTheDocument();
  });
});