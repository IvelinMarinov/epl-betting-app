import React, { Component } from 'react';
import StandingsService from '../services/standings-service';

class BetStandings extends Component {
    static standingsService = new StandingsService();

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isDataFetched: false,
            error: ''
        }
    }

    processResponse(response) {
        let sortedStats = response.data.sort(function (a, b) {
            var pointsSort = b.points - a.points;
            if(pointsSort !== 0 ) {
                return pointsSort
            }

            var guessedSignsSort = b.guessedSigns - a.guessedSigns;
            if(guessedSignsSort !== 0) {
                return guessedSignsSort
            }

            return b.guessedScores - a.guessedScores;
        });

        this.setState({
            isDataFetched: true,
            data: sortedStats
        })
    }

    async componentWillMount() {
        try {
            let response = await BetStandings.standingsService.getUserStandings();
            if (!response.success) {
                throw new Error(response.message);
            }

            this.processResponse(response);
        } catch (err) {
            console.log(err)
            this.setState({
                error: err.message
            })
        }
    }

    render() {
        const { isDataFetched, data } = this.state;
        let rank = 1;

        if (!isDataFetched) {
            return (<span>Loading...</span>);
        }

        return (
            <div className="container-fluid">
                Bet Standings
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Guessed Scores</th>
                            <th>Guessed Signs</th>
                            <th>Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(user => (
                            <tr key={user._id}>
                                <td>{rank++}</td>
                                <td>{user.username}</td>
                                <td>{user.guessedScores}</td>
                                <td>{user.guessedSigns}</td>
                                <td>{user.points }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BetStandings;