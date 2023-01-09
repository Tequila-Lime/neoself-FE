import React, { useState } from 'react';
import { requestEditOwnProfileInfo } from './Requests';

export const EditOwnProfile = ({ token, props }) => {
    const [fullName, setFullName] = useState(props.fullName);
    const [bio, setBio] = useState(props.bio);
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new FormData object to send with the request
    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('bio', bio);
    formData.append('avatar', avatar);

    // Send PATCH request to Django Rest Framework API using the 
    // requestEditOwnProfileInfo function you provided
    requestEditOwnProfileInfo(props.token, formData)
        .then((response) => {
        // If the request is successful, do something here (e.g. show a success message)
        })
        .catch((error) => {
        // If the request fails, do something here (e.g. show an error message)
        });
    };

return (
    
    <form onSubmit={handleSubmit}>
        <label>
        Full Name:
        <input type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} />
        </label>
        <br />
        <label>
        Bio:
        <textarea value={bio} onChange={(event) => setBio(event.target.value)} />
        </label>
        <br />
        <label>
        Avatar:
        <input type="file" onChange={(event) => setAvatar(event.target.files[0])} />
        </label>
        <br />
        <button type="submit">Save</button>
    </form>
    );
};