const { RockPaperScissors } = require('discord-gamecord');

module.exports = {
    name: 'rps',
    description: 'Play a game of Rock Paper Scissors!',
    async execute(client, message, args) {
        // Get the mentioned user as the opponent
        const opponent = message.mentions.users.first();
        if (!opponent) return message.reply('Please mention someone to challenge!');

        const Game = new RockPaperScissors({
            message: message,
            isSlashGame: false,
            opponent: opponent,
            embed: {
                title: 'Rock Paper Scissors',
                color: '#f7931e',
                description: 'Press a button below to make a choice.'
            },
            buttons: {
                rock: 'Rock',
                paper: 'Paper',
                scissors: 'Scissors'
            },
            emojis: {
                rock: '🌑',
                paper: '📰',
                scissors: '✂️'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            pickMessage: 'You chose {emoji}.',
            winMessage: '**{player}** won the game! Congratulations!',
            tieMessage: 'The game ended in a tie!',
            timeoutMessage: 'The game went unfinished!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
        });

        Game.startGame();
        Game.on('gameOver', result => {
            console.log(result);  // Log the result of the game
        });
    },
};
