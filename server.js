const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT | 3000;
const SPOTIFY_CLIENT_ID = process.env.CLIENT_ID

app.get('/login', (req, res) => {
    const REDIRECT_URI = `${process.env.HOSTNAME}:${PORT}${process.env.REDIRECT_ENDPOINT}`

    const spotifyAuthParams = new URLSearchParams({
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope: 'user-top-read',
        redirect_uri: REDIRECT_URI,
        //state: state
    })

    const spotifyAuthURL = new URL('https://accounts.spotify.com/authorize?' + spotifyAuthParams.toString())
    
    res.redirect(spotifyAuthURL.toString());
})

app.get(process.env.REDIRECT_ENDPOINT, (req, res) => {
    res.send(req.query)
    /*
        1. Check for success
        2. Get and save access token
        3. Redirect to frontend
    */
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})