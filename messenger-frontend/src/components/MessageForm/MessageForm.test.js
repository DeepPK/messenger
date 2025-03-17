import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageForm from './MessageForm';

describe('MessageForm', () => {
  test('submits valid form data', async () => {
    const mockSubmit = jest.fn();
    render(<MessageForm onSend={mockSubmit} />);

    fireEvent.change(screen.getByLabelText('Sender'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Recipient'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      sender: 'John',
      recipient: 'Alice',
      content: 'Hello!'
    });
  });

  test('shows error when fields are empty', () => {
    render(<MessageForm onSend={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(screen.getByText(/All fields are required!/i)).toBeInTheDocument();
  });
});