const { Wordle } = require('discord-gamecord');

module.exports = {
    name: 'wordle',
    description: 'Play a game of Wordle!',
    async execute(client, message, args) {
        const Game = new Wordle({
            message: message,
            isSlashGame: false, // This ensures it's a regular prefix-based command, not slash
            embed: {
                title: 'Wordle',
                color: '#f7931e',
            },
            customWord: null, // You can customize the word here or let it choose randomly
            timeoutTime: 60000, // Timeout for the game
            winMessage: ':tada: You won! The word was **{word}**.',
            loseMessage: ':stuck_out_tongue_closed_eyes: You lost! The word was **{word}**.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
        });

        Game.startGame();

        Game.on('gameOver', result => {
            console.log(result); // Logs the result (win/lose) to the console
        });
    },
};
