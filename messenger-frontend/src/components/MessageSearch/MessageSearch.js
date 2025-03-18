import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const MessageSearch = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(keyword);
    };

    return (
        <Form onSubmit={handleSearch} className="mb-3">
            <Form.Group className="d-flex">
                <Form.Control
                    type="text"
                    placeholder="Search messages..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button variant="outline-secondary" type="submit">Search</Button>
            </Form.Group>
        </Form>
    );
};

MessageSearch.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default MessageSearch;