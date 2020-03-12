import React from 'react';

export default function AlbumPreview(props) {

    const title = props.album['im:name'].label;
    const image = props.album['im:image'][2].label;
    
    return (
        <div className="card flex justify-center align-center column">
            <img src={image} alt={title}></img>
        </div>
    )
}

