import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    "access-control-allow-methods": "HEAD, POST, PUT, GET, PATCH, DELETE",
    "access-control-allow-headers": "Content-Type, X-Requested-With, accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers, X-FORWARDED-FOR, authorization",
    "access-control-expose-headers": "access-token, request-id, location",
    "access-control-allow-credentials": "true"
};

const Home = (props) => {

    const [movieList, setMovieList] = useState({
        movieName: "",
        upcomingMovies: [],
        releasedMovies: [],
        genres: [],
        artists: [],
        genresList: [],
        artistsList: [],
        releaseDateStart: "",
        releaseDateEnd: ""
    });

    useEffect(() => {
        const fetches = async() => {
        let resp = await fetch(`${props.baseUrl}movies?status=PUBLISHED`, {
            method: 'GET',
            headers
        });

        let upcomingMovieList = await resp.json();

        resp = await fetch(`${props.baseUrl}movies?status=RELEASED`, {
            method: 'GET',
            headers
        });

        let releasedMovieList = await resp.json();

        resp = await fetch(`${props.baseUrl}genres`, {
            method: 'GET',
            headers
        });

        let movieGenresList = await resp.json();

        resp = await fetch(`${props.baseUrl}artists`, {
            method: 'GET',
            headers
        });

        let movieArtistsList = await resp.json();

        setMovieList({
            ...movieList,
            upcomingMovies:upcomingMovieList.movies,
            releasedMovies:releasedMovieList.movies,
            genresList:movieGenresList.genres,
            artistsList: movieArtistsList.artists
        });
    }
    fetches();
    }, []);


    const movieNameChangeHandler = event => {
        setMovieList({ ...movieList,movieName: event.target.value });
    }

    const genreSelectHandler = event => {
        setMovieList({ ...movieList,genres: event.target.value });
    }

    const artistSelectHandler = event => {
        setMovieList({ ...movieList,artists: event.target.value });
    }

    const releaseDateStartHandler = event => {
        setMovieList({ ...movieList,releaseDateStart: event.target.value });
    }

    const releaseDateEndHandler = event => {
        setMovieList({ ...movieList,releaseDateEnd: event.target.value });
    }

    const movieClickHandler = (movieId) => {
        props.history.push('/movie/' + movieId);
    }

    const queryHandler = () => {
        let qStr = "?status=RELEASED";
       
        if (movieList.movieName !== "") {
            qStr += "&title=" + movieList.movieName;
        }
        if (movieList.genres.length > 0) {
            qStr += "&genres=" + movieList.genres.toString();
        }
        if (movieList.artists.length > 0) {
            qStr += "&artists=" + movieList.artists.toString();
        }
        if (movieList.releaseDateStart !== "") {
            qStr += "&start_date=" + movieList.releaseDateStart;
        }
        if (movieList.releaseDateEnd !== "") {
            qStr += "&end_date=" + movieList.releaseDateEnd;
        }
        
        fetch(`${props.baseUrl}movies${encodeURI(qStr)}`, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then(data => {
                setMovieList({
                    ...movieList,
                    releasedMovies: data.movies
                });
            });
    }

    return (
        <div>
            <Header baseUrl={props.baseUrl} />

            <div className={props.classes.upcomingMoviesHeading}>
                <span>Upcoming Movies</span>
            </div>

            <GridList cols={5} className={props.classes.gridListUpcomingMovies} >
                {movieList.upcomingMovies.map(movie => (
                    <GridListTile key={"upcoming" + movie.id}>
                        <img src={movie.poster_url} className="movies" alt={movie.title} />
                        <GridListTileBar title={movie.title} />
                    </GridListTile>
                ))}
            </GridList>

            <div className="flex-container">
                <div className="left">
                    <GridList cellHeight={350} cols={4} className={props.classes.gridListMain}>
                        {movieList.releasedMovies.map(movie => (
                            <GridListTile onClick={() => movieClickHandler(movie.id)} className="released-movie-grid-item" key={"grid" + movie.id}>
                                <img src={movie.poster_url} className="movies" alt={movie.title} />
                                <GridListTileBar
                                    title={movie.title}
                                    subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <div className="right">
                    <Card>
                        <CardContent>
                            <FormControl className={props.classes.formControl}>
                                <Typography className={props.classes.title} color="textSecondary">
                                    FIND MOVIES BY:
                                </Typography>
                            </FormControl>

                            <FormControl className={props.classes.formControl}>
                                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                <Input id="movieName" onChange={movieNameChangeHandler} />
                            </FormControl>

                            <FormControl className={props.classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                <Select
                                    multiple
                                    input={<Input id="select-multiple-checkbox-genre" />}
                                    renderValue={selected => selected.join(',')}
                                    value={movieList.genres}
                                    onChange={genreSelectHandler}
                                >
                                    {movieList.genresList.map(genre => (
                                        <MenuItem key={genre.id} value={genre.genre}>
                                            <Checkbox checked={movieList.genres.indexOf(genre.genre) > -1} />
                                            <ListItemText primary={genre.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={props.classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                <Select
                                    multiple
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => selected.join(',')}
                                    value={movieList.artists}
                                    onChange={artistSelectHandler} >
                                    {movieList.artistsList.map(artist => (
                                        <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                            <Checkbox checked={movieList.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                            <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={props.classes.formControl}>
                                <TextField
                                    id="releaseDateStart"
                                    label="Release Date Start"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={releaseDateStartHandler}
                                />
                            </FormControl>

                            <FormControl className={props.classes.formControl}>
                                <TextField
                                    id="releaseDateEnd"
                                    label="Release Date End"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={releaseDateEndHandler}
                                />
                            </FormControl>
                            <br /><br />
                            <FormControl className={props.classes.formControl}>
                                <Button onClick={queryHandler} variant="contained" color="primary">
                                    APPLY
                                </Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '14px'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 260,
        maxWidth: 260
    },
    title: {
        color: theme.palette.primary.light,
    }
});

export default withStyles(styles)(Home);