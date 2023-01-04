import React, { useState } from 'react';
import { requestUserInfo } from './Requests'; 
import { Follow } from './Follow';

export const UserSearchBar = ({ token }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make API request to search for users
    requestUserInfo(token, searchTerm)
      .then((response) => {
        // Update the search results in the state
        setSearchResults(response.data);
      });
  };

  return (
    <>
    <div className='dash-component'>
      <h3 className='indent'>Search for more Users:</h3>
      <form className='indent' onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
      {searchResults.length === 0 ? <p>No search results found</p> :<>{searchResults.map((profile, idx) => (
        <div className='dash-component'>
        <div className="profile-top" key={idx}>
            <div className="avatar">
                {profile.avatar && <img src={profile.avatar} alt={profile.username}/>}
            </div>
            <div className="profile-info">
                <p className="profile-name">{profile.username}</p>
                {profile.full_name === true ? <p>{profile.name}</p> : <p>fill name out</p>}   
            </div> 
            
        </div>
        <p>{profile.id}</p>
        <Follow token={token} friendId={profile.id}/>
        <p className="wins">Number of Completed Habits: </p>
        </div>
      ))}</>
           }

    </>
  );
}


