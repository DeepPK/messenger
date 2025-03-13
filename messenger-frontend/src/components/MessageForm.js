import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const MessageForm = ({ onSend }) => {
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sender || !recipient || !content) {
            setError('All fields are required!');
            return;
        }

        try {
            await onSend({ sender, recipient, content });
            setSender('');
            setRecipient('');
            setContent('');
            setError('');
        } catch (err) {
            setError('Failed to send message');
        }
    };

    return (
        <div className="mb-4">
            <h3>Send Message</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Sender</Form.Label>
                    <Form.Control
                        type="text"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Recipient</Form.Label>
                    <Form.Control
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Send</Button>
            </Form>
        </div>
    );
};

export default MessageForm;