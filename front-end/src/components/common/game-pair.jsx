import React, { Component, Fragment } from 'react';

const ClubLogos = require.context('../../static/images/club-logos', true);

class GamePair extends Component {
    constructor(props) {
        super(props);

        this.setState({
            game: null
        })
    }

    componentWillMount() {
        const { game, gameNum, handleChange } = this.props;

        this.setState({
            game: game,
            homeGoals: game.homeTeamGoals,
            awayGoals: game.awayTeamGoals,
            gameNum: gameNum,
            handleChange: handleChange
        })
    }

    getTeamLogoUrl = (teamName) => {
        return ClubLogos(`./${teamName}.svg`)
    }

    handleGoalsChange = (e, homeOrAway) => {
        if (homeOrAway === 'home') {
            this.setState({
                homeGoals: e.target.value
            })
        } else {
            this.setState({
                awayGoals: e.target.value
            })
        }
    }

    render() {
        const { game, gameNum, handleChange } = this.state;
        const homeTeam = game.homeTeamId;
        const awayTeam = game.awayTeamId;
        //const homeGoals = game.homeTeamGoals;
        const homeGoals = this.state.homeGoals;
        const awayGoals = this.state.awayGoals;


        if (game) {
            return (
                <Fragment>
                    <div className="row">
                        <div className="row col-sm-4">
                            <img src={this.getTeamLogoUrl(homeTeam.shortName)} alt="" />
                            <div>
                                <span>{homeTeam.name}</span>
                                &nbsp;
                                <input
                                    onChange={(e) => {
                                        this.handleGoalsChange(e, 'home');
                                        handleChange(e, game._id);
                                    }}
                                    id={`home_${gameNum}`}
                                    type="number"
                                    value={homeGoals}
                                    min="0"
                                    max="9"
                                    step="1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row col-sm-2">
                            <h4 className="text-center">VS</h4>
                        </div>
                        <div className="row col-sm-4">
                            <div>
                                <input
                                    onChange={(e) => {
                                        this.handleGoalsChange(e, 'away');
                                        handleChange(e, game._id);
                                    }}
                                    id={`away_${gameNum}`}
                                    value={awayGoals}
                                    type="number"
                                    min="0"
                                    max="9"
                                    step="1"
                                    required
                                />
                                <span>{awayTeam.name}</span>
                                &nbsp;
                            </div>
                            <img src={this.getTeamLogoUrl(awayTeam.shortName)} alt="" />
                        </div>
                    </div>
                    <hr />
                </Fragment>
            );
        }
    }
}

export default GamePair;