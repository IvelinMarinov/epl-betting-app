import { get } from "../data/crud";

class StandingsService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/team';
        this.allTeamsUrl = `${this.baseUrl}/all`;
    }

    getAllTeams() {
        return get(this.allTeamsUrl, {}, {})
    }
}

export default StandingsService;