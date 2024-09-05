const { FastType } = require('discord-gamecord');

// List of sentences
const sentences = [
    'The quick brown fox jumps over the lazy dog.',
    'Discord bots are really fun to code!',
    'JavaScript is a versatile programming language.',
    'Typing fast requires a lot of practice.',
    'Bots can automate tasks on your server.',
    'Practice makes perfect when it comes to typing.',
    'Programming is a valuable skill in today’s digital world.',
    'Fast typing can help improve productivity.',
    'It is important to learn how to debug code.',
    'Automation can save time and reduce human error.',
    'Writing clean code is essential for maintainable projects.',
    'Learning new coding languages expands your skill set.',
    'Reading code is just as important as writing it.',
    'Consistent practice leads to better performance.',
    'Syntax errors are the most common mistakes in programming.',
    'Technology is constantly evolving with new tools.',
    'The sun sets beautifully over the horizon.',
    'A cat jumped onto the table and knocked over a glass of water.',
    'The rain tapped lightly on the window as the storm passed.',
    'She picked up the colorful seashell from the sandy beach.',
    'Birds were chirping as the morning dew glistened on the grass.',
    'The old oak tree stood tall in the middle of the field.',
    'A warm cup of tea is the perfect remedy for a cold day.',
    'They wandered through the forest, marveling at the tall trees.',
    'The distant mountains were covered in a layer of soft, white snow.',
    'The dog barked happily as it chased the ball across the yard.',
    'The fireworks lit up the sky in vibrant colors.',
    'She smiled as the cool breeze brushed against her face.',
    'The cozy blanket wrapped around her as she read her favorite book.',
    'The scent of freshly baked cookies filled the kitchen.',
    'The river flowed gently, its surface sparkling in the sunlight.',
    'The carnival was filled with laughter and the smell of popcorn.',
    'The stars twinkled brightly in the clear night sky.',
    'A butterfly landed softly on the blooming flower.',
    'They danced under the twinkling lights, lost in the music.',
    'The campfire crackled as they roasted marshmallows and shared stories.',
    'The city skyline gleamed as the sun began to rise.',
    'A mysterious figure appeared in the fog, slowly walking toward them.',
    'The soft hum of the train lulled them to sleep on their journey.',
    'A gentle snowfall blanketed the town in a layer of white.',
    'The bustling market was filled with the chatter of vendors and customers.',
    'The smell of fresh rain lingered in the air after the storm passed.',
    'She plucked a single red rose from the garden and held it close.',
    'The children laughed as they ran through the sprinklers on a hot day.',
    'The clock ticked loudly in the quiet room, marking each passing second.',
    'The plane soared high above the clouds, leaving the world below.',
    'He stared out at the ocean, lost in his thoughts as the waves crashed.',
    'A rainbow appeared in the sky after the sudden downpour.',
    'The coffee shop buzzed with the sound of conversations and clinking cups.',
    'The hot air balloon rose slowly, offering a breathtaking view of the valley.',
    'The ice cream truck’s familiar jingle echoed through the neighborhood.',
    'The lighthouse stood tall, guiding ships safely through the dark night.',
    'She gently placed the feather back on the windowsill.',
    'The distant sound of thunder hinted at an approaching storm.',
    'A deer darted across the trail, disappearing into the trees.',
    'The market was alive with the smells of spices and freshly baked bread.',
    'The waves lapped against the shore, creating a peaceful rhythm.',
    'The streetlights flickered as the city began to quiet down for the night.',
    'The aroma of freshly brewed coffee filled the air.',
    'The band played lively tunes as people danced in the square.',
    'The autumn leaves crunched beneath their feet as they walked through the park.',
    'She blew out the candles on her birthday cake, making a silent wish.',
    'The paper airplane soared across the room before gently landing on the floor.',
    'The snowy landscape stretched as far as the eye could see.',
    'The owl hooted softly in the distance as the forest came alive at night.'
];

module.exports = {
    name: 'fasttype',
    description: 'Play a game of FastType!',
    async execute(client, message, args) {
        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

        const Game = new FastType({
            message: message,
            isSlashGame: false,
            embed: {
                title: 'Fast Type',
                color: '#f7931e',
                description: 'You have {time} seconds to type the sentence below.'
            },
            timeoutTime: 60000,
            sentence: randomSentence, // Use the random sentence
            winMessage: ':tada: You won! You finished the type race in **{time} seconds** with wpm of **{wpm}**.',
            loseMessage: ':stuck_out_tongue_closed_eyes: You lost! You didn\'t type the correct sentence in time.',
        });

        Game.startGame();
        Game.on('gameOver', result => {
            //console.log(result);  // =>  { result... }
        });
    },
};
