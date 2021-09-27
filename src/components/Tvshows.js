import React from 'react';
import Row from './Row';
import Banner from './Banner';

function Tvshows() {
    return (
        <div>
            <Banner />
            <Row title="Original TV Shows" filterGenre="original" filterCat="tvshows" isLargeRow={true} />
            <Row title="Horror TV Shows" filterGenre="horror" filterCat="tvshows" />
            <Row title="Comedy TV Shows" filterGenre="comedy" filterCat="tvshows" />
            <Row title="Thriller TV Shows" filterGenre="thriller" filterCat="tvshows" />
        </div>
    )

}

export default Tvshows