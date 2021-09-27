import React from 'react';
import Row from './Row';
import Banner from './Banner';


function Home() {

    return (
        <div>
            <Banner />
            {/* to render all the rows wrt Genre and Category */}
            <Row title="Original Movie" filterGenre="original" filterCat="home" isLargeRow={true} />
            <Row title="Horror movie" filterGenre="horror" filterCat="home" />
            <Row title="Comedy movie" filterGenre="comedy" filterCat="home" />
            <Row title="Thriller movie" filterGenre="thriller" filterCat="home" />
        </div>
    )

}

export default Home