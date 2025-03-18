import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageForm from './MessageForm';

describe('MessageForm Component', () => {
  test('shows validation error when fields are empty', async () => {
    const mockSend = jest.fn();
    render(<MessageForm onSend={mockSend} />);

    fireEvent.click(screen.getByText('Send'));

    expect(await screen.findByText('All fields are required!')).toBeInTheDocument();
    expect(mockSend).not.toHaveBeenCalled();
  });

  test('submits valid form', async () => {
    const mockSend = jest.fn().mockResolvedValue();
    render(<MessageForm onSend={mockSend} />);

    fireEvent.change(screen.getByLabelText('Sender'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('Recipient'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Test' } });
    fireEvent.click(screen.getByText('Send'));

    expect(mockSend).toHaveBeenCalledWith({
      sender: 'Test',
      recipient: 'Test',
      content: 'Test'
    });
  });
});