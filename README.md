# 💣 Modern Minesweeper 💣

A refreshed take on the classic Minesweeper computer game. The game is reskinned with fun colors and emojis and has the same basic gameplay.

Backend respository: https://github.com/kadrianne/minesweeper-express-backend


## Built With
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br>
Frontend: HTML, CSS, JavaScript, React v16.13.1, [Material UI](https://material-ui.com/)<br>
Backend: Node.js v13.8.0, Express.js v4.17.1, Knex.js v0.21.1, Objection.js v2.1.3, PostgreSQL v12.2

## Game Play

### Board Setup

On load or start of a new game, the board is setup to create a grid based on the difficulty level's number of rows and columns, randomize the placement of mines, and assign the values of cells based on adjacent mine placements.

### Classic Features

On click of a cell, a value or mine is revealed. If the cell revealed is a 0 (blank) value, the adjacent non-mine cells are also revealed.

The game header contains a Game Button to reset the game, a Timer that tracks seconds when a game is started, and a Flag Counter indicating the number of mines hidden.

On right click of a cell, the cell will be flagged and the flag counter will be reduced from the number of marked mines.

### Game Loss

On click of a mine, the game is lost indicated by the crying face emoji on the Game Button and 'YOU LOSE' appearing below the board. All of the mines are revealed on the board with the mine clicked in red.

![game-loss](https://res.cloudinary.com/kristine-and-samuel/image/upload/v1588963539/minesweeper/loss.gif)

### Game Win

The game is won when all non-mine cells are revealed. All of the unrevealed mine cells will be automatically flagged. The Game Button emoji will change to an emoji face with sunglasses and 'YOU WIN' will appear below the board as well as your score information to be posted.

![game-win](https://res.cloudinary.com/kristine-and-samuel/image/upload/v1588964201/minesweeper/win.gif)


### Account Features

A user can create an account or login with an existing account. With an account a user can see their statistics of fastest time, average time, and number of games won. While a user is logged in, on win of a game, their score will automatically be save and their statistics updated. Validation is also setup for existing usernames on account creation and incorrect username or password on login.

![account](https://res.cloudinary.com/kristine-and-samuel/image/upload/v1588964874/minesweeper/account.gif)

### High Scores

The high scores are retrieved from saved scores in the database. The top 10 scores for the selected difficulty level are shown. If a new score is posted that is one of the top 10 scores, the Scoreboard will automatically update with the posted score.

## Challenges

Being able to reset the board ended up being the last main feature implemented as my understanding of lifecycle methods was a bit limited when I started this project. As I learned hooks and understood the React lifecycle process further, this functionality clicked.

State management became very challenging as there are multiple states that needed to be shared between sibling components. So a lot of these states are currently being tracked in the parent App component and being passed down as props. Also, with conditional rendering of certain components, some Alert components had to be rendered in their parent components as well.

## Future Implementation
- Deployment to production server
- Create boards of increased difficulty (intermediate, hard)
- Add keyboard controls
- Implement Redux for state management
- Refactoring algorithms

## Collaboration

1. Fork and/or clone this repo & the backend repo - https://github.com/kadrianne/minesweeper-express-backend
2. Install dependencies: `npm install`
3. Create PostgreSQL database `createdb minesweeper`
4. Run backend server: `node index.js`
5. Migrate database tables: `npx knex migrate:latest`
6. Run frontend server: `npm start`
7. Checkout new branch
   
I have a GitHub project board with a few backlog items here: https://github.com/kadrianne/modern-minesweeper/projects/1<br>
If you'd like to collaborate on this project, please email me: kristine.a.du@gmail.com
