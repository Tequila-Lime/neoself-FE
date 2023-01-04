import React, { useState } from 'react';
import axios from 'axios';

export const GiphyBar = ({ token }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [gifs, setGifs] = useState([]);

    async function searchGiphy(searchTerm) {
        const API_KEY = 'GSKy3RpyH0NC0Pg3mw6nVaNaLdDHf2CD';
        const response = await axios.get(
            `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=12&offset=0&rating=G&lang=en`
        );
    return response.data.data;
    }

    function handleChange(event) {
    setSearchTerm(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        searchGiphy(searchTerm).then(gifs => {
        setGifs(gifs);
    });
    }

return (
    <div>
    <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleChange} />
        <button type="submit">Search</button>
    </form>
    {gifs.map((gif, idx) => (
        <div key={idx}>
        <img src={gif.images.fixed_width.url} alt={gif.title} />
        {console.log(gif)}
        </div>
        ))}
    </div>
);
}

