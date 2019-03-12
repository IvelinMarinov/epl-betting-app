import React, { Component } from 'react';
import GamePair from '../CompleteRound/game-pair';

class CompleteRoundForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            home_1: '', away_1: '',
            home_2: '', away_2: '',
            home_3: '', away_3: '',
            home_4: '', away_4: '',
            home_5: '', away_5: '',
            home_6: '', away_6: '',
            home_7: '', away_7: '',
            home_8: '', away_8: '',
            home_9: '', away_9: '',
            home_10: '', away_10: '',
        }
    }

    handleChange = (event)  => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const values = Object.values(this.state);
        console.log(values)
        if(values.filter(v => v === '')) {
            console.log('All scores are required');
            return;
        }
      
        let games = {}
        for (let [key, value] of Object.entries(this.state)) {
            const [ homeOrAway, gameNum ] = key.split('_');

            let gameNumAdded = Object.keys(games).filter(k => k === gameNum);
            if(gameNumAdded.length === 0) {
                games[gameNum] = {
                    home_team_score: 'X',
                    away_team_score: 'X'
                }
            }

            if(homeOrAway.trim() === 'home') {
                games[gameNum].home_team_score = value
            } else {
                games[gameNum].away_team_score = value
            }

            //set sign
            for(let game of Object.values(games)) {
                let homeGoals = Number(game.home_team_score);
                let awayGoals = Number(game.away_team_score);

                if(homeGoals > awayGoals) {
                    game.sign = '1'
                } else if(homeGoals < awayGoals) {
                    game.sign = '2'
                } else {
                    game.sign = 'X'
                }
            }
        }

        console.log(games)
    }

    render() {
        const { fixture } = this.props

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container col-sm-offset-1 col-sm-10">
                    <h3 className="text-center">Complete round {fixture.round}</h3>
                    <hr />
                    {
                        fixture.gameStats.map((g, i) => (<GamePair
                            key={g._id}
                            game={g}
                            gameNum={i+1}
                            handleChange={this.handleChange}
                        />))
                    }
                    <button className="btn btn-outline-success">Complete</button>
                </div>
            </form>
        );
    }
}

export default CompleteRoundForm;