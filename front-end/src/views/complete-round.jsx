import React, { Component, Fragment } from 'react';
import AdminService from '../services/admin-service';
import CompleteRoundForm from '../components/CompleteRound/complete-round-form';


class CompleteRound extends Component {
    static AdminService = new AdminService();

    constructor(props) {
        super(props)

        this.state = {
            fixture: null,
            isDataFetched: false,
            error: ''
        }
    }

    async componentWillMount() {
        try {
            let response = await CompleteRound.AdminService.getActiveRound();
            if (!response.success) {
                throw new Error(response.message);
            }

            this.setState({
                fixture: response.data,
                isDataFetched: true
            })
        } catch (err) {
            console.log(err)
            this.setState({
                error: err.message
            })
        }
    }

    render() {
        const { isDataFetched, fixture } = this.state

        if(!isDataFetched) {
            return (
                <span>Loading...</span>
            );
        }

        return (
                <CompleteRoundForm
                    fixture={fixture}
                />
        )
    }
}

export default CompleteRound;