import { get, post } from '../data/crud';
 
class BetsService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/bets';
        this.getActiveRoundUrl = `${this.baseUrl}/get-active-round`;
    }

    getActiveRound() {
        return get(this.getActiveRoundUrl, {}, {})
    }
}

export default BetsService;