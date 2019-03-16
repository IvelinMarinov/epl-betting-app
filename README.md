# EPL Betting

Project assignment for SoftUni's React Fundamentals course.

It allows users to bet on football games from the English Premier League and compete with other users, based on their results.

## Installation

Restore node modules for both projects.
```
npm install
```
Run the back-end
```
node index.js
```
Run the front-end
```
npm start
```

## Initial setup

App depends on certain data to be available in the database when starting. .json files and seed methods available in server. There's no need to anything special, but it's a good idea to check if the data is there, when starting for the first time.

## Functionality

App provides basic functionality to users, based on their authentication and roles.

Anonymous users can: 
* Register / Login
* View the Premier League standings
* View the Bet standings of all users

Authorized users can:
* Place their bets for the football games of the current active round

Admins can:
* Setup the upcoming fixtures
* Set final scores of games, when over
* Complete rounds and update league and bet standings

## Build with:
Front-end:
* [react](https://reactjs.org/) v.16.8
* [react-toastify](https://github.com/fkhadra/react-toastify) v.4.5
* [react-loading](https://github.com/fakiolinho/react-loading) v.2.0
* [bootstrap](https://getbootstrap.com/) v.4.3

Back-end:
* [Node.js](https://nodejs.org/en/) v.11.6
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) v.8.3
* [mongoose](https://mongoosejs.com/) v.4.10
* [mongodb](https://www.mongodb.com/) v.4.0

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
