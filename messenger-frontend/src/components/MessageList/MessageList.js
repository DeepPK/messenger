import React from 'react';
import { ListGroup, Badge, Button } from 'react-bootstrap';

const MessageList = ({ messages, onDelete }) => {
    return (
        <div data-testid="message-list">
            <h3>Messages</h3>
            <ListGroup as="ul">
                {messages.map(message => (
                    <ListGroup.Item
                        key={message.id}
                        as="li"
                        role="listitem"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                {message.sender} → {message.recipient}
                                <Badge bg="secondary" className="ms-2">
                                    {new Date(message.timestamp).toLocaleString()}
                                </Badge>
                            </div>
                            {message.content}
                        </div>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete(message.id)}
                            aria-label={`Delete message from ${message.sender}`}
                        >
                            Delete
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default MessageList;