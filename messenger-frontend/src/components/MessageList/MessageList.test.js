import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageList from './MessageList';

const mockMessages = [
  { id: 1, sender: 'John', recipient: 'Alice', content: 'Hi', timestamp: '2024-03-15T12:00:00Z' },
  { id: 2, sender: 'Alice', recipient: 'John', content: 'Hello', timestamp: '2024-03-15T12:05:00Z' }
];

describe('MessageList', () => {
  test('renders messages correctly', () => {
    render(<MessageList messages={mockMessages} onDelete={() => {}} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(screen.getByText('John → Alice')).toBeInTheDocument();
    expect(screen.getByText('Hi')).toBeInTheDocument();
  });

  test('shows empty state', () => {
    render(<MessageList messages={[]} onDelete={() => {}} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});