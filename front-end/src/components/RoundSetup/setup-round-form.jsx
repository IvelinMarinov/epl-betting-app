import React, { Component, Fragment } from 'react';
import AdminService from '../../services/admin-service';
import TeamsDropDown from './teams-dropdown';

class SetupRoundForm extends Component {
    static AdminService = new AdminService();

    constructor(props) {
        super(props);

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

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })

        console.log(this.state)
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        // const values = Object.values(this.state);
        // if(values.filter(v => v === '').length) {
        //     console.log('All fields are required');
        //     return;
        // }

        // const uniqueValues = [...new Set(values)]
        // if(uniqueValues.length !== values.length) {
        //     console.log('The same team cannot be selected for more than one game');
        //     return; 
        // }

        let reqBody = {}
        for (let [key, value] of Object.entries(this.state)) {
            const [ homeOrAway, gameNum ] = key.split('_');

            let gameNumAdded = Object.keys(reqBody).filter(k => k === gameNum);
            if(gameNumAdded.length === 0) {
                reqBody[gameNum] = {
                    home_team_id: 'X',
                    away_team_id: 'X'
                }
            }

            if(homeOrAway.trim() === 'home') {
                reqBody[gameNum].home_team_id = value
            } else {
                reqBody[gameNum].away_team_id = value
            }
        }

        reqBody = {
            round: this.props.selectedRound,
            games: reqBody
        }

        console.log(reqBody)

        try {
            let response = await SetupRoundForm.AdminService.saveRoundData(reqBody);
            console.log(response)
            
            if (!response.success) {
                throw new Error(response.message);
            }
            
            //TODO
            //Show success message

        } catch(err) {
            console.log(err)
        }
    }

    render() {
        const { selectedRound, teamsDropDownData } = this.props;

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div className="container col-sm-offset-2 col-sm-6">
                        <h3 className="text-center">Setup games for Round {selectedRound}</h3>
                        <hr />

                        <div className="row">
                            <div className="col-sm-2">
                                <span>Game 1 </span>
                            </div>
                            <div className="col-sm-offset-2 col-sm-6">
                                <TeamsDropDown
                                    idProp="home_1"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />
                                &nbsp;&nbsp;&nbsp;
                                <span>VS</span>
                                &nbsp;&nbsp;&nbsp;
                                <TeamsDropDown
                                    idProp="away_1"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-sm-2">
                                <span>Game 2 </span>
                            </div>
                            <div className="col-sm-offset-2 col-sm-6">
                                <TeamsDropDown
                                    idProp="home_2"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />
                                &nbsp;&nbsp;&nbsp;
                            <span>VS</span>
                                &nbsp;&nbsp;&nbsp;
                                <TeamsDropDown
                                    idProp="away_2"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-sm-2">
                                <span>Game 3 </span>
                            </div>
                            <div className="col-sm-offset-2 col-sm-6">
                                <TeamsDropDown
                                    idProp="home_3"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                                &nbsp;&nbsp;&nbsp;
                            <span>VS</span>
                                &nbsp;&nbsp;&nbsp;
                                <TeamsDropDown
                                    idProp="away_3"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-sm-2">
                                <span>Game 4 </span>
                            </div>
                            <div className="col-sm-offset-2 col-sm-6">
                                <TeamsDropDown
                                    idProp="home_4"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                                &nbsp;&nbsp;&nbsp;
                            <span>VS</span>
                                &nbsp;&nbsp;&nbsp;
                                <TeamsDropDown
                                    idProp="away_4"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-sm-2">
                                <span>Game 5 </span>
                            </div>
                            <div className="col-sm-offset-2 col-sm-6">
                                <TeamsDropDown
                                    idProp="home_5"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                                &nbsp;&nbsp;&nbsp;
                            <span>VS</span>
                                &nbsp;&nbsp;&nbsp;
                                <TeamsDropDown
                                    idProp="away_5"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-sm-2">
                                <span>Game 6 </span>
                            </div>
                            <div className="col-sm-offset-2 col-sm-6">
                                <TeamsDropDown
                                    idProp="home_6"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                                &nbsp;&nbsp;&nbsp;
                            <span>VS</span>
                                &nbsp;&nbsp;&nbsp;
                                <TeamsDropDown
                                    idProp="away_6"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-sm-2">
                                <span>Game 7 </span>
                            </div>
                            <div className="col-sm-offset-2 col-sm-6">
                                <TeamsDropDown
                                    idProp="home_7"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                                &nbsp;&nbsp;&nbsp;
                            <span>VS</span>
                                &nbsp;&nbsp;&nbsp;
                                <TeamsDropDown
                                    idProp="away_7"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-sm-2">
                                <span>Game 8 </span>
                            </div>
                            <div className="col-sm-offset-2 col-sm-6">
                                <TeamsDropDown
                                    idProp="home_8"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                                &nbsp;&nbsp;&nbsp;
                            <span>VS</span>
                                &nbsp;&nbsp;&nbsp;
                                <TeamsDropDown
                                    idProp="away_8"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-sm-2">
                                <span>Game 9 </span>
                            </div>
                            <div className="col-sm-offset-2 col-sm-6">
                                <TeamsDropDown
                                    idProp="home_9"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                                &nbsp;&nbsp;&nbsp;
                            <span>VS</span>
                                &nbsp;&nbsp;&nbsp;
                                <TeamsDropDown
                                    idProp="away_9"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-sm-2">
                                <span>Game 10</span>
                            </div>
                            <div className="col-sm-offset-2 col-sm-6">
                                <TeamsDropDown
                                    idProp="home_10"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                                &nbsp;&nbsp;&nbsp;
                            <span>VS</span>
                                &nbsp;&nbsp;&nbsp;
                                <TeamsDropDown
                                    idProp="away_10"
                                    teamsData={teamsDropDownData}
                                    handleChange={this.handleChange}
                                />                            </div>
                        </div>
                        <hr />

                        <button className="btn btn-outline-success" type="submit">Submit</button>

                    </div>
                </form>
            </Fragment>
        );
    }
}

export default SetupRoundForm;