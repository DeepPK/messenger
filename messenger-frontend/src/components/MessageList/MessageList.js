import React from 'react';
import PropTypes from 'prop-types';
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
                        role="<li>"
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

MessageList.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            sender: PropTypes.string.isRequired,
            recipient: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            timestamp: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.instanceOf(Date)
            ]).isRequired
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default MessageList;