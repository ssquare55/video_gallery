import React from 'react';
import Row from './Row';
import Banner from './Banner';

function Kids() {
    return (
        <div>
            <Banner />
            {/* to render all the rows wrt Genre and Category */}
            <Row title="Original Movie" filterGenre="original" filterCat="kids" isLargeRow={true} />
            <Row title="Horror movie" filterGenre="horror" filterCat="kids" />
            <Row title="Comedy movie" filterGenre="comedy" filterCat="kids" />
            <Row title="Thriller movie" filterGenre="thriller" filterCat="kids" />
        </div>
    )

}

export default Kids