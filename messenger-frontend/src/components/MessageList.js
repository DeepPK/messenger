import React from 'react';
import { ListGroup, Badge, Button } from 'react-bootstrap';

const MessageList = ({ messages, onDelete }) => {
    return (
        <div>
            <h3>Messages</h3>
            <ListGroup>
                {messages.map(message => (
                    <ListGroup.Item key={message.id} className="d-flex justify-content-between align-items-start">
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