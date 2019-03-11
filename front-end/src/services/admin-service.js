import { get, post } from "../data/crud";

class StandingsService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/admin';
        this.allTeamsUrl = `${this.baseUrl}/all-teams`;
        this.saveRoundUrl = `${this.baseUrl}/save-round`;
        this.getActiveRoundUrl = `${this.baseUrl}/get-active-round`;
    }

    getAllTeams() {
        return get(this.allTeamsUrl, {}, {})
    }

    saveRoundData(body) {
        return post(this.saveRoundUrl, body)
    }

    getActiveRound() {
        return get(this.getActiveRoundUrl, {}, {})
    }
}

export default StandingsService;