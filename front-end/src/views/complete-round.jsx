import React, { Component, Fragment } from 'react';
import AdminService from '../services/admin-service';


class CompleteRound extends Component {
    static AdminService = new AdminService();

    constructor(props) {
        super(props)

        this.state = {
            fixtureData: null,
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
                fixtureData: response.data,
                isDataFetched: true
            })

            console.log(this.state)

        } catch (err) {
            console.log(err)
            this.setState({
                error: err.message
            })
        }
    }

    render() {
        const { isDataFetched } = this.state

        if(!isDataFetched) {
            return (
                <span>Loading...</span>
            );
        }

        return (
            <h1>Round complete page</h1>
        )
    }
}

export default CompleteRound;