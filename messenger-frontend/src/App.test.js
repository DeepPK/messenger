import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';

const mockMessages = [
  { id: 1, sender: 'John', recipient: 'Alice', content: 'Hello', timestamp: '2024-03-18' }
];

beforeEach(() => {
  axios.get.mockResolvedValue({ data: mockMessages });
  axios.post.mockResolvedValue({});
  axios.delete.mockResolvedValue({});
});

describe('App', () => {
  test('fetches and displays messages on mount', async () => {
    render(<App />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/messages/all');
      expect(screen.getByText('John → Alice')).toBeInTheDocument();
    });
  });

  test('handles message sending', async () => {
    render(<App />);

    // Заполняем форму
    fireEvent.change(screen.getByLabelText('Sender'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('Recipient'), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Content' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/messages/send',
        'sender=Test&recipient=User&content=Content',
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
    });
  });

  test('handles message deletion', async () => {
    render(<App />);

    await waitFor(() => screen.getByText('Delete'));
    fireEvent.click(screen.getAllByText('Delete')[0]);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('/api/messages/1');
    });
  });

  test('handles search functionality', async () => {
    axios.get.mockResolvedValueOnce({ data: mockMessages });
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Search messages...'), {
      target: { value: 'Hello' }
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/messages/search?keyword=Hello');
    });
  });

  test('handles errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));
    console.error = jest.fn();

    render(<App />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching messages:', expect.any(Error));
    });
  });
});