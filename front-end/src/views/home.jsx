import React, { Component } from 'react';

//const EplLogo = require.context('../static/images/content', true);

class Home extends Component {
    render() {
        return (
            <div className="container col-sm-offset-1 col-sm-10">
            <br />
                <h3 className="text-center">Welcome to our betting site</h3>
                <hr />
                
                <p className="text-center">Rules.......................................</p>
                <p className="text-center">More Rules..............</p>
                <p className="text-center">Even More Rules..............</p>

                {/* <img src={EplLogo('./premier-league-logo-background.png')}  /> */}
            </div>
        )
    }
}

export default Home;