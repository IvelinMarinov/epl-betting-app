import React, { Component } from 'react';
import { toast } from 'react-toastify';
import GamePair from '../common/game-pair';
import BetsService from '../../services/bets-service';

const SuccessMsg = 'Your bets have been successfully submitted';

class PlaceBetsForm extends Component {
    static BetsService = new BetsService();

    constructor(props) {
        super(props)

        this.state = {
            home_1: '', away_1: '', id_1: '',
            home_2: '', away_2: '', id_2: '',
            home_3: '', away_3: '', id_3: '',
            home_4: '', away_4: '', id_4: '',
            home_5: '', away_5: '', id_5: '',
            home_6: '', away_6: '', id_6: '',
            home_7: '', away_7: '', id_7: '',
            home_8: '', away_8: '', id_8: '',
            home_9: '', away_9: '', id_9: '',
            home_10: '', away_10: '', id_10: '',
        }
    }

    showError = (error) => {
        toast.error(error);
    }

    showSuccess = (message) => {
        toast.success(message);
    }

    handleChange = (event, gameId) => {
        const [homeOrAway, gameNum] = event.target.id.split('_');

        this.setState({
            [`id_${gameNum}`]: gameId,
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        // const values = Object.values(this.state);
        // if (values.filter(v => v === '').length) {
        //     console.log('All scores are required');
        //     return;
        // }

        let reqBody = this.transformStateToRequestBody();

        try {
            var response = await PlaceBetsForm.BetsService.submitBets(reqBody);
            if (!response.success) {
                throw new Error(response.message);
            }

            this.showSuccess(SuccessMsg);

        } catch (err) {
            this.showError(err.message)
        }
    }

    transformStateToRequestBody() {
        let games = {}
        for (let [key, value] of Object.entries(this.state)) {
            const [prop, gameNum] = key.split('_');

            let gameNumAdded = Object.keys(games).filter(k => k === gameNum);
            if (gameNumAdded.length === 0) {
                games[gameNum] = {
                    homeTeamGoals: '0',
                    awayTeamGoals: '0'
                }
            }

            if (prop.trim() === 'home') {
                games[gameNum].homeTeamGoals = value
            } else if (prop.trim() === 'away') {
                games[gameNum].awayTeamGoals = value
            } else {
                games[gameNum].gameId = value
            }

            //set sign
            for (let game of Object.values(games)) {
                let homeGoals = Number(game.homeTeamGoals);
                let awayGoals = Number(game.awayTeamGoals);

                if (homeGoals > awayGoals) {
                    game.sign = '1'
                } else if (homeGoals < awayGoals) {
                    game.sign = '2'
                } else {
                    game.sign = 'X'
                }
            }
        }

        console.log(games);
        return games;
    }

    render() {
        const { fixture } = this.props

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container col-sm-offset-1 col-sm-10">
                    <br />
                    <h3>Your bets for round {fixture.round}</h3>
                    <hr />
                    {
                        fixture.gameStats.map((g, i) => (<GamePair
                            key={g._id}
                            game={g}
                            gameNum={i + 1}
                            handleChange={this.handleChange}
                        />))
                    }
                    <button className="btn btn-lg btn-outline-success">Save</button>
                </div>
            </form>
        );
    }
}

export default PlaceBetsForm;