import React, { Component, Fragment } from 'react';
import AdminService from '../services/admin-service';
import CompleteRoundForm from '../components/CompleteRound/complete-round-form';

const ErrorMessagesToRender = [
    'There are no active rounds, please set up a new round!',
    'More than one active round, please contact your db admin!'
]

class CompleteRound extends Component {
    static AdminService = new AdminService();

    constructor(props) {
        super(props)

        this.state = {
            fixture: null,
            isDataFetched: false,
            hasError: false,
            error: ''
        }
    }

    async componentWillMount() {
        try {
            let response = await CompleteRound.AdminService.getActiveRound();

            if(ErrorMessagesToRender.includes(response.message)) {
                this.setState({
                    hasError: true,
                    error: response.message,
                    isDataFetched: true
                })
            }

            if (!response.success) {
                throw new Error(response.message);
            }

            console.log(response.data)

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
        const { isDataFetched, fixture, hasError, error } = this.state
        console.log(hasError, error)

        if(!isDataFetched) {
            return (
                <span>Loading...</span>
            );
        }

        if(hasError) {
            return (
                <h3>{error}</h3>
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