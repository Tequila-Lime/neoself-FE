import React, { useState } from 'react';
import { searchAllUsers } from './request';

function UserSearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make API request to search for users
    searchAllUsers(searchTerm)
      .then((response) => {
        // Update the search results in the state
        setSearchResults(response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default UserSearchBar;
