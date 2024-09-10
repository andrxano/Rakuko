const { Trivia } = require('discord-gamecord');

module.exports = {
    name: 'trivia',
    aliases: ["tr"],
    description: 'Trivia game!',
    async execute(client, message, args) {
        // Default difficulty to 'easy' if none is provided
        const difficulty = args[0] ? args[0].toLowerCase() : 'easy';

        // Valid difficulties
        const validDifficulties = ['easy', 'medium', 'hard'];

        // Check if the provided difficulty is valid
        if (!validDifficulties.includes(difficulty)) {
            return message.channel.send(`Invalid difficulty! Please choose one of the following: ${validDifficulties.join(', ')}`);
        }

        const Game = new Trivia({
            message: message,
            isSlashGame: false,
            embed: {
                title: 'Trivia',
                color: '#f7931e',
                description: 'You have 60 seconds to guess the answer.'
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            trueButtonStyle: 'SUCCESS',
            falseButtonStyle: 'DANGER',
            mode: 'multiple',  // multiple || single
            difficulty: difficulty,  // Set difficulty from args
            winMessage: ':tada: You won! The correct answer is **{answer}**.',
            loseMessage: ':stuck_out_tongue_closed_eyes: You lost! The correct answer was **{answer}**.',
            errMessage: 'Unable to fetch question data! Please try again.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
        });

        Game.startGame();
        Game.on('gameOver', result => {
            // Optional: handle game over logic here
        });
    }
};
