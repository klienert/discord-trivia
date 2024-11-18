const axios = require('axios');

async function getTriviaQuestions(topipc) {
    // replace with actual API endpoint
    const resp = await axios.get(`https://api.trivia`)
    return resp.data;   
}

module.exports = { getTriviaQuestions };

/**
 * trivia database
 * https://opentdb.com/api_config.php
 * 
 * select categories, number of questions, difficulty, type of questions, etc.
 * 
 * Here's an example of 5 random questions:
 * https://opentdb.com/api.php?amount=5
 * 
 */
