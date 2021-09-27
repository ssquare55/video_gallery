import React from 'react';
import Row from './Row';
import Banner from './Banner';

function Movies() {
    return (
        <div>
            <Banner />
            {/* to render all the rows wrt Genre and Category */}
            <Row title="Original Movie" filterGenre="original" filterCat="movies" isLargeRow={true} />
            <Row title="Horror movie" filterGenre="horror" filterCat="movies" />
            <Row title="Comedy movie" filterGenre="comedy" filterCat="movies" />
            <Row title="Thriller movie" filterGenre="thriller" filterCat="movies" />
        </div>
    )

}

export default Movies