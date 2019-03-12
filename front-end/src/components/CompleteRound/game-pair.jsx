import React, { Component, Fragment } from 'react';

const ClubLogos = require.context('../../static/images', true);

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
            gameNum: gameNum,
            handleChange: handleChange
        })
    }

    getTeamLogoUrl = (teamName) => {
        return ClubLogos(`./${teamName}.svg`)
    }

    render() {
        const { game, gameNum, handleChange } = this.state;
        const homeTeam = game.homeTeamId;
        const awayTeam = game.awayTeamId;

        //console.log(game)
        console.log(gameNum)

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
                                    onChange={handleChange}
                                    id ={`home_${gameNum}`}
                                    type="number"
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
                                    onChange={handleChange}
                                    id ={`away_${gameNum}`}
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