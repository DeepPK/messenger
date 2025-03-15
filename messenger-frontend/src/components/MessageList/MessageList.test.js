import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageList from './MessageList';

const mockMessages = [
    {
        id: 1,
        sender: 'John',
        recipient: 'Alice',
        content: 'Hello World',
        timestamp: '2024-03-15T12:00:00Z'
    },
    {
        id: 2,
        sender: 'Alice',
        recipient: 'John',
        content: 'Hi there!',
        timestamp: '2024-03-15T12:05:00Z'
    }
];

describe('MessageList', () => {
    test('renders list of messages', () => {
        const mockOnDelete = jest.fn();
        render(<MessageList messages={mockMessages} onDelete={mockOnDelete} />);

        // Проверка количества элементов
        const items = screen.getAllByRole('listitem');
        expect(items).toHaveLength(2);

        // Проверка содержимого
        expect(screen.getByText(/John → Alice/i)).toBeInTheDocument();
        expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
        expect(screen.getByText(/Alice → John/i)).toBeInTheDocument();
        expect(screen.getByText(/Hi there!/i)).toBeInTheDocument();
    });

    test('renders empty state when no messages', () => {
        const mockOnDelete = jest.fn();
        render(<MessageList messages={[]} onDelete={mockOnDelete} />);

        expect(screen.queryAllByRole('listitem')).toHaveLength(0);
        expect(screen.getByText(/Messages/i)).toBeInTheDocument(); // Проверяем заголовок
    });
});