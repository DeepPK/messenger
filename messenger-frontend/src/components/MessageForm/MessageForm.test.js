import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageForm from './MessageForm';

describe('MessageForm', () => {
    test('submits form with valid data', async () => {
        const mockOnSend = jest.fn();
        render(<MessageForm onSend={mockOnSend} />);

        // Используем точные label тексты
        fireEvent.change(screen.getByLabelText('Sender'), {
            target: { value: 'John' }
        });

        fireEvent.change(screen.getByLabelText('Recipient'), {
            target: { value: 'Alice' }
        });

        fireEvent.change(screen.getByLabelText('Message'), {
            target: { value: 'Hello World!' }
        });

        fireEvent.click(screen.getByRole('button', { name: /send/i }));

        expect(mockOnSend).toHaveBeenCalledWith({
            sender: 'John',
            recipient: 'Alice',
            content: 'Hello World!'
        });
    });

    test('shows error when fields are empty', () => {
        render(<MessageForm onSend={() => {}} />);
        fireEvent.click(screen.getByRole('button', { name: /send/i }));
        expect(screen.getByText(/All fields are required!/i)).toBeInTheDocument();
    });
});
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