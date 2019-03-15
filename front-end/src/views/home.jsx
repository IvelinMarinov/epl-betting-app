import React, { Component } from 'react';

//const EplLogo = require.context('../static/images/content', true);

class Home extends Component {
    render() {
        return (
            <div className="container col-sm-offset-1 col-sm-10">
            <br />
                <h3 className="text-center">Welcome to our betting site</h3>
                <hr />
                
                <p className="text-center">EPL Betting is a free, non-commercial website. This is the perfect office game among colleagues.</p>
                <p className="text-center"><strong><u>In order to use EPL Betting you must be at least 18 years old.</u></strong></p>
                <br/>
                <p className="text-center">Each user can bet on the final result of each English Preamier League game.</p>
                <p className="text-center">Each guessed sign (1, 2 or X) brings you <strong>1 point</strong>. If you guess the exact result of a game, you get <strong>3 points</strong></p>
                <br/>
                <p className="text-center">The winner is picked at the end of the season. There are no rewards guys, sorry :)</p>



                {/* <img src={EplLogo('./premier-league-logo-background.png')}  /> */}
            </div>
        )
    }
}

export default Home;