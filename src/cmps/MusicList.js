import React from 'react';
import AlbumPreview from './AlbumPreview';

export default function MusicList(props) {
    return (
        <div className="list-cards">
            {props.albums.map(album => {
                return <AlbumPreview
                            key={album.id.attributes['im:id']}
                            album={album}
                        />
                        
            })}
        </div>
    )
}
