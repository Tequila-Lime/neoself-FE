import React, { useState } from 'react';
import { requestUserInfo } from './Requests'; 
import { Link } from "react-router-dom"
import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt"

export const UserSearchBar = ({ token }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Make API request to search for users
    if (searchTerm !== ''){
      requestUserInfo(token, searchTerm)
        .then((response) => {
          // Update the search results in the state
          setSearchResults(response.data);
        });}
  };

  return (
    <>
      <div className='user-search'>
          <input
            type="text"
            className='user-search-input'
            value={searchTerm}
            placeholder="Search for Users"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <SearchAlt className="comment-button" onClick={handleSubmit}/>
      </div>
  
      {searchResults.length === 0 ? <p>No search results found</p> :<>{searchResults.map((profile, idx) => (
        <div className='dash-component' key={idx}>
        <div className="profile-top" >
            <div className="avatar">
                {profile.avatar && <img src={profile.avatar} alt={profile.username}/>}
            </div>
            <div className="profile-info">
                <Link className="profile-name" to='/random-profile' state={{ id: profile.id }}>{profile.username}</Link>
                {profile.full_name !== null && <p>{profile.full_name}</p>}
            </div> 
            
        </div>
        
        </div>
      ))}</>
           }

    </>
  );
}


