import React, { Component } from 'react';

export default class ArtistList extends Component {

    shuffleArtists = (artists) => {
        const shuffled = artists.sort(() => Math.random() - 0.5);
        return shuffled;
    }

    onArtistSelect = (ev) => {
        const selectedArtist = ev.target.innerText;
        let isCorrect = false;
        if (selectedArtist === this.props.currArtist){
            isCorrect = true;
            console.log('win');
            this.nextRound();
        } else {
            isCorrect = false;
            console.log('try again')
        }
        this.props.roundTrials(isCorrect);        
    }

    nextRound = () => {
        this.props.nextRound();
    }

    render() {
        let artists = [...this.props.artistsOptions];
        this.shuffleArtists(artists);
        return (
            <div className="artist-list-container flex align-center justify-center">
                <ul>
                {artists.map(artist => {
                    return <li 
                            onClick={this.onArtistSelect} 
                            key={artist}
                            className="artist-option"
                           >{artist}</li>
                })}
                </ul>
            </div>
        )
    }
}
