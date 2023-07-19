## Concept

The concept of this app is primarily designed as a learning exercise where I aim to enhance my skills. To achieve this, I have chosen to combine some functionalities inspired by Twitter and Discord. However, it's important to note that I haven't included all the features from both platforms, as that would require an extensive amount of work and knowledge to implement.

Instead, I have selected fundamental features from Twitter and Discord, which include:

- User Registration and Authentication: Users can create an account and log in to access the app's features.

- Post System: Similar to Twitter, users can create posts to share their thoughts, updates, or engage with others.

- Instant Messaging: The app provides an instantaneous chat system that enables users to communicate with each other in real-time, resembling the chat functionality in Discord.

- Admin System: Administrators have special privileges to remove posts and ban users when necessary to maintain the platform's integrity.

- Threads: Users can participate in threads created by administrators, allowing them to engage in discussions and contribute to specific topics.

- Support System: Users have access to a support system where they can report bugs, provide feedback, or seek assistance.

By combining these selected features, I aim to create a learning environment that allows me to gain hands-on experience in developing various aspects of a social media/chat application. While the app may not include the complete range of features found in Twitter or Discord, it serves as a platform for me to acquire valuable skills and knowledge in building and implementing core functionalities.

## Outside Link

Mock up on figma: https://www.figma.com/file/sGgZ4zdIyxHTXl7HgNgFMS/Synth-Scribe?type=design&node-id=0%3A1&mode=design&t=6eiSSZVRQNuD4EJQ-1

MLP on draw.io: https://drive.google.com/file/d/1fsJHr-6812NnjaoE6jXYIcheW_v_344W/view?usp=sharing

## Setup & Use

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
- Run command `npm install`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

### Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

## Tools & Languages

- IDE: Visual Studio Code
- Framework/Library: React, Express
- Languages: HTML, CSS, Javascript and SQL
