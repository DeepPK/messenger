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