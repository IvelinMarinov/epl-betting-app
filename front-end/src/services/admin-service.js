import { get, post } from "../data/crud";

class StandingsService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/admin';
        this.allTeamsUrl = `${this.baseUrl}/all-teams`;
        this.saveRoundUrl = `${this.baseUrl}/save-round`;
    }

    getAllTeams() {
        return get(this.allTeamsUrl, {}, {})
    }

    saveRoundData(body) {
        return post(this.saveRoundUrl, body)
    }
}

export default StandingsService;