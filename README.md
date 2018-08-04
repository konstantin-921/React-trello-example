## Starting the dev server

Make sure you have the latest Stable or LTS version of Node.js installed.

1. `git clone https://github.com/konstantin-921/React-trello-example.git`
2. Run `npm install` or `yarn install`
3. Start the dev server using `npm start`
3. Open [http://localhost:8080]

This is a front side application for repo Node.js-trello-example.

## Functionality overview

An application for exchanging messages between users (trello analog)

### General functionality:

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- Adding and removing boards for placing tasks
- Adding and removing tasks
- Drag and drop tasks (use react-beautiful-dnd (8.0.5))
- Having a function to share a board