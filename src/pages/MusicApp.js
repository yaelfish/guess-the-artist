import React, { Component } from 'react';
import { getRandomInt } from '../services/utils'
import musicService from '../services/musicService';
import ArtistList from '../cmps/ArtistList';
import AlbumPreview from '../cmps/AlbumPreview';

export default class MusicApp extends Component {
    state = {
        albums: [],
        artistsOptions: [],
        currAlbum: null,
        currArtist: null,
        isPlaying: false,
        round: 1,
        score: 0,
        tries: 0,
        combo: 0
    }

    componentDidMount() {
        this.loadAlbums();
    }

    loadAlbums = () => {
        musicService.query()
            .then(albums => this.setState({ albums: albums.feed.entry }))
            .catch((err) => this.props.history.push('/'));
    }

    startRound = async () => {
        const randomAlbum = await this.getRandomAlbum();
        this.setState({ currAlbum: randomAlbum });
        const currArtist = await this.getCurrArtist();
        const artistsOptions = await this.getRandomArtists();

        this.setState({
            artistsOptions: artistsOptions,
            currArtist: currArtist,
            isPlaying: true
        });
    }

    nextRound = () => {
        this.setState({ tries: 0 });

        if (this.state.round > 10) {
            alert('The End! Your score is: ' + this.state.score);
            this.setState({
                round: 1,
                score: 0,
                isPlaying: false
            });
        } else {
            this.setState(prevState => ({ round: prevState.round + 1 }));
            this.startRound();
        }
    }



    roundTrials = (isCorrect) => {
        let { tries } = this.state;
        if (tries === 3) {
            this.setState({ tries: 0 });
            this.setState(prevState => ({ score: prevState.score - 5 }));
            this.nextRound();
        }
        else if (!isCorrect) {
            this.setState(prevState => ({ tries: prevState.tries + 1 }));
            this.setState({ combo: 0 });
        }
        else {
            switch (tries) {
                case 0:
                    this.setState(prevState => ({ score: prevState.score + 10 }));
                    this.updateCombo();
                    this.setState({ tries: 0 });
                    break;
                case 1:
                    this.setState(prevState => ({ score: prevState.score + 5 }));
                    this.setState({ tries: 0 });
                    break;
                case 2:
                    this.setState(prevState => ({ score: prevState.score + 2 }));
                    this.setState({ tries: 0 });
                    break;

                default:
                    this.setState(prevState => ({ score: prevState.score - 5 }));
                    this.nextRound();
                    break;
            }
        }
    }

    updateCombo = () => {
        let { combo } = this.state;
        this.setState(prevState => ({ combo: prevState.combo + 1 }));
        console.log(combo);
        switch (combo) {
            case 2:
                this.setState(prevState => ({ score: prevState.score + 10 }));
                break;
            case 5:
                this.setState(prevState => ({ score: prevState.score + 100 }));
                break;
            case 8:
                this.setState(prevState => ({ score: prevState.score + 1000 }));
                break;
            default:
                break;
        }
    }

    getRandomAlbum = () => {
        const albumsLength = this.state.albums.length;
        const randomIdxAlbum = getRandomInt(albumsLength);
        const album = this.state.albums[randomIdxAlbum];
        return album;
    }

    getCurrArtist = () => {
        if (!this.state.currAlbum) return;
        let currArtist = this.state.currAlbum['im:artist'].label;
        return currArtist;
    }

    getRandomArtists = () => {
        let artists = [];
        let currArtist = this.getCurrArtist();
        artists.push(currArtist);
        while (artists.length < 5) {
            let album = this.getRandomAlbum();
            let artist = album['im:artist'].label;
            if (!artists.includes(artist)) artists.push(artist);
        }

        this.setState({ artistsOptions: artists });
        return artists;
    }

    render() {
        let { isPlaying, currAlbum, currArtist, artistsOptions } = this.state;
        let visible = (isPlaying ? 'hidden' : 'visible')
        return (
            <div>
                <h1>Guess The Artist</h1>
                
                <ul className="flex justify-around">
                    <li>Round: {this.state.round}</li>
                    <li>Tries: {this.state.tries}</li>
                    <li>Score: {this.state.score}</li>
                </ul>
                
                <button onClick={this.startRound}
                    style={{ visibility: visible }}
                    className="start-btn"
                >
                    Start
                </button>

                {this.state.isPlaying && <AlbumPreview album={currAlbum} />}
                {this.state.isPlaying && <ArtistList
                    artistsOptions={artistsOptions}
                    currArtist={currArtist}
                    nextRound={this.nextRound}
                    roundTrials={this.roundTrials}
                />}
            </div>
        )
    }
}
