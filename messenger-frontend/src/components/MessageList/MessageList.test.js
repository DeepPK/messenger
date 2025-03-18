import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageList from './MessageList';

describe('MessageList Component', () => {
  const messages = [
    {
      id: 1,
      sender: 'User1',
      recipient: 'User2',
      content: 'Test',
      timestamp: '2023-01-01T00:00:00Z' // UTC время
    }
  ];

  test('renders messages correctly', () => {
    render(<MessageList messages={messages} onDelete={() => {}} />);

    expect(screen.getByText('User1 → User2')).toBeInTheDocument();

    // Используем регулярное выражение для проверки формата даты
    expect(screen.getByText(/2023/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});