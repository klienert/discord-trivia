module.exports = {
    name: 'starttrivia',
    description: 'Starts a trivia game',
    async execute(interaction) {
        // Get topic selection and fetch questions
        const topic = interaction.options.getString('topic');
        const questions = await require('../api/triviaApiHandler').getTriviaQuestions(topic);

        // Present first question to participants
        await interaction.reply(`Starting trivia on ${topic}!`);
        for (const question of questions) {
            await interaction.channel.send(question.question);
            // Implement response handling logic and timing
        }
    }
};
