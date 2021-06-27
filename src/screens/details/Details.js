import React, { useState,useEffect } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';

const Details = (props) => {

    const headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        "access-control-allow-methods": "HEAD, POST, OPTIONS, PUT, GET, PATCH, DELETE",
        "access-control-allow-headers": "Content-Type, X-Requested-With, accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers, X-FORWARDED-FOR, authorization",
        "access-control-expose-headers": "access-token, request-id, location",
        "access-control-allow-credentials": "true"
    };
   
   const [movieDetails,setMovieDetails] = useState({
    movie: {
        genres: [],
        trailer_url: "",
        artists: []
    },
    stars: [{
        id: 1,
        color: "black"
    },
    {
        id: 2,
        color: "black"
    },
    {
        id: 3,
        color: "black"
    },
    {
        id: 4,
        color: "black"
    },
    {
        id: 5,
        color: "black"
    }]
});

useEffect(
    () => {
        const fetches = async () => {
            let resp = await fetch(`${props.baseUrl}movies/${props.match.params.id}`, {
                method: 'GET',
                headers
            });
            let movieResp = await resp.json();

            setMovieDetails({
                ...movieDetails,
                movie: movieResp
            });
         };
        fetches();
    }
);

const starIconsClickHandler = (id) => {
    let starIconList = [];
    for (let star of movieDetails.stars) {
        let starCopy = star;
        starCopy.color = starCopy.id <= id ? "yellow" : "black";
        starIconList.push(starCopy);
    }
    setMovieDetails({ ...movieDetails,stars: starIconList });
}

const artistClickHandler = (url) => {
    //Goes to the artist wiki url
    window.location = url;
}

    return (
        <div className="details">
            <Header id={props.match.params.id} 
                    baseUrl={props.baseUrl} 
                    showBookShowButton="true" />

            <div className="back">
                <Typography>
                    <Link to="/">  &#60; Back to Home</Link>
                </Typography>
            </div>
            <div className="flex-c">

                <div className="details-left">
                    <img src={movieDetails.movie.poster_url} alt={movieDetails.movie.title} />
                </div>

                <div className="details-middle">
                    <div>
                        <Typography variant="headline" component="h2">{movieDetails.movie.title} </Typography>
                    </div>
                    <br />
                    <div>
                        <Typography>
                            <span className="bold">Genres: </span> {movieDetails.movie.genres.join(', ')}
                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Duration:</span> {movieDetails.movie.duration} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Release Date:</span> {new Date(movieDetails.movie.release_date).toDateString()} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold"> Rating:</span> {movieDetails.movie.critics_rating}  </Typography>
                    </div>
                    <div className="marginTop">
                        <Typography><span className="bold">Plot:</span> <a href={movieDetails.movie.wiki_url}>(Wiki Link)</a> {movieDetails.movie.storyline} </Typography>
                    </div>
                    <div className="tc">
                        <Typography>
                            <span className="bold">Trailer:</span>
                        </Typography>
                        <YouTube
                            videoId={movieDetails.movie.trailer_url.split("?v=")[1]}
                        />
                    </div>
                </div>

                <div className="details-right">
                    <Typography>
                        <span className="bold">Rate this movie: </span>
                    </Typography>
                    {movieDetails.stars.map(star => (
                        <StarBorderIcon
                            className={star.color}
                            key={"star" + star.id}
                            onClick={() => starIconsClickHandler(star.id)}
                        />
                    ))}

                    <div className="bold marginBottom marginTop">
                        <Typography>
                            <span className="bold">Artists:</span>
                        </Typography>
                    </div>
                    <div className="pdRight">
                        <GridList cellHeight={160} cols={2}>
                            {movieDetails.movie.artists && movieDetails.movie.artists.map(artist => (
                                <GridListTile
                                    className="ptr"
                                    onClick={() => artistClickHandler(artist.wiki_url)}
                                    key={artist.id}>
                                    <img src={artist.profile_url} alt={`${artist.first_name}  ${artist.last_name}`} />
                                    <GridListTileBar
                                        title={`${artist.first_name}  ${artist.last_name}`}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Details;