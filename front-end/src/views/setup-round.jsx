import React, { Component, Fragment } from 'react';
import AdminService from '../services/admin-service';
import SetupRoundForm from '../components/RoundSetup/setup-round-form';

const ClubLogos = require.context('../static/images', true);

class RoundSetup extends Component {
    static AdminService = new AdminService();

    constructor(props) {
        super(props);

        console.log('initializing')
        this.state = {
            selectedRound: 0,
            isRoundSelected: false,
            isDataFetched: false,
            teamsDropDownData: [],
            error: ''
        }
    }

    getRoundsArray() {
        let arr = [];
        for (let i = 1; i <= 38; i++) {
            arr.push(i);
        }

        return arr;
    }

    async componentWillMount() {
        try {
            let response = await RoundSetup.AdminService.getAllTeams();
            if (!response.success) {
                throw new Error(response.message);
            }

            const teamsData = response.data.map(function (t) {
                return {
                    code: t.code,
                    id: t._id,
                    imageUrl: ClubLogos(`./${t.shortName}.svg`)
                }
            });

            console.log(teamsData);

            this.setState({
                teamsDropDownData: teamsData
            })
        } catch (err) {
            console.log(err)
            this.setState({
                error: err.message
            })
        }
    }

    handleDropDownChange = (event) => {
        this.setState({
            selectedRound: event.target.value,
            isRoundSelected: true
        })
        }


    render() {
        const { isRoundSelected, selectedRound, teamsDropDownData } = this.state;

        if (!isRoundSelected) {
            return (
                <Fragment>
                    <h3>Please select round</h3>
                    <select onChange={this.handleDropDownChange}>
                        {
                            this.getRoundsArray().map(i => (
                                <option key={i} value={i}>Round {i}</option>
                            ))
                        }
                    </select>
                </Fragment>
            )
        }

        return (
           <SetupRoundForm 
                selectedRound={selectedRound} 
                teamsDropDownData={teamsDropDownData} 
            />
        );
    }
}

export default RoundSetup;