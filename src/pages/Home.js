import React from 'react'

import { Link } from 'react-router-dom';

export default function Home() {
    return <div>
        WELCOME TO GEUSS THE ARTIST
        <Link to={'/music'}>Start Playing!</Link>
    </div>
}