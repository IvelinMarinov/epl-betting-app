import React, { Component } from 'react';
import BetsService from '../services/bets-service';
import PlaceBetsForm from '../components/PlaceBets/place-bets-form';
import Loading from '../components/common/loading';


const ErrorMessagesToRender = [
    'There is no active round currently, please come back again later!'
]

class PlaceBets extends Component {
    static BetsService = new BetsService();

    constructor(props) {
        super(props);

        this.state = {
            fixture: null,
            isDataFetched: false,
            hasError: false,
            error: ''
        }
    }

    async componentWillMount() {      

        try {
            let response = await PlaceBets.BetsService.getActiveRound();

            if (ErrorMessagesToRender.includes(response.message)) {
                this.setState({
                    hasError: true,
                    error: response.message,
                    isDataFetched: true
                })
            }

            if (!response.success) {
                throw new Error(response.message);
            }

            //Demo purposes only
            setTimeout(() => {                
                this.setState({
                    fixture: response.data,
                    isDataFetched: true
                })
            }, 700);            
            
        } catch (err) {
            //console.log(err)
            this.setState({
                hasError: true,
                error: err.message
            })

            console.log(this.state.error)
        }
    }

    render() {
        const { isDataFetched, fixture, hasError, error } = this.state

        if (!isDataFetched) {
            return (
                <Loading />
            );
        }

        if (hasError) {
            return (
                <h3>{error}</h3>
            );
        }

        return (
            <PlaceBetsForm
                fixture={fixture}
            />
        );
    }
}

export default PlaceBets;