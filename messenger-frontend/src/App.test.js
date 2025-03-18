import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';
import userEvent from '@testing-library/user-event';

const mock = new MockAdapter(axios);

describe('App Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('renders and fetches initial messages', async () => {
    mock.onGet('/api/messages/all').reply(200, [
      { id: 1, sender: 'User1', recipient: 'User2', content: 'Test message', timestamp: '2023-01-01' }
    ]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('User1 → User2')).toBeInTheDocument();
    });

    // Добавляем проверку отсутствия ошибок в консоль
    expect(console.error).not.toHaveBeenCalled();
  });

  // В начале файла добавьте:
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test('handles message sending', async () => {
    mock.onPost('/api/messages/send').reply(200);
    mock.onGet('/api/messages/all').reply(200, []);

    render(<App />);

    await userEvent.type(screen.getByLabelText(/sender/i), 'TestSender');
    await userEvent.type(screen.getByLabelText(/recipient/i), 'TestRecipient');
    await userEvent.type(screen.getByLabelText(/message/i), 'TestContent');
    await userEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
    });
  });

  test('handles message deletion', async () => {
    mock.onDelete('/api/messages/1').reply(200);
    mock.onGet('/api/messages/all').reply(200, [
      { id: 1, sender: 'User1', recipient: 'User2', content: 'Test message', timestamp: '2023-01-01' }
    ]);

    render(<App />);

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    });

    expect(mock.history.delete.length).toBe(1);
  });

  test('handles search functionality', async () => {
    mock.onGet('/api/messages/search?keyword=test').reply(200, [
      { id: 2, sender: 'User3', recipient: 'User4', content: 'Test search', timestamp: '2023-01-02' }
    ]);

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Search messages...'), { target: { value: 'test' } });

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText('User3 → User4')).toBeInTheDocument();
    });
  });

  test('shows error when message fetch fails', async () => {
    mock.onGet('/api/messages/all').reply(500);

    render(<App />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching messages:',
        expect.any(Error)
      );
    });
  });
});