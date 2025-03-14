import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import MessageSearch from './components/MessageSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://backend:8080/messages/all');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSend = async (message) => {
        try {
            const formData = new URLSearchParams();
            formData.append('sender', message.sender);
            formData.append('recipient', message.recipient);
            formData.append('content', message.content);

            await axios.post('http://backend:8080/messages/send', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            fetchMessages();
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!id || isNaN(id)) {
            alert("Invalid message ID");
            return;
        }
        try {
            await axios.delete(`http://backend:8080/messages/${id}`);
            fetchMessages();
        } catch (error) {
            console.error('Delete error:', error.response?.data);
        }
    };

    const handleSearch = async (keyword) => {
        if (!keyword) {
            setIsSearching(false);
            return;
        }

        try {
            const response = await axios.get(`http://backend:8080/messages/search?keyword=${keyword}`);
            setSearchResults(response.data);
            setIsSearching(true);
        } catch (error) {
            console.error('Error searching messages:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Messenger</h1>
            <MessageForm onSend={handleSend} />
            <MessageSearch onSearch={handleSearch} />
            <MessageList
                messages={isSearching ? searchResults : messages}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default App;