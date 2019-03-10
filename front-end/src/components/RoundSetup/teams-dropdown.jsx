import React, { Component } from 'react';

class TeamsDropDown extends Component {

    render() {
        const { teamsData, handleChange, idProp } = this.props;

        return (
            <select id={idProp} onChange={handleChange}>
                <option value="" disabled selected>Select team</option>
                {
                    teamsData.map(t => (
                        <option key={t.id} value={t.id}>{t.code}</option>
                    ))
                }
            </select>
        );
    }
}

export default TeamsDropDown;