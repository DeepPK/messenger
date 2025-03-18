import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
                <Form.Group className="mb-3" controlId="formSender">
                    <Form.Label>Sender</Form.Label>
                    <Form.Control
                        type="text"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        placeholder="Enter sender name"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRecipient">
                    <Form.Label>Recipient</Form.Label>
                    <Form.Control
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Enter recipient name"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Type your message"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Send
                </Button>
            </Form>
        </div>
    );
};

MessageForm.propTypes = {
  onSend: PropTypes.func.isRequired
};

export default MessageForm;