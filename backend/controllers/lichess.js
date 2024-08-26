const axios = require('axios');

exports.getDailyPuzzle = async (req, res) => {
    try {
        // Fetch the daily puzzle from Lichess API
        const response = await axios.get('https://lichess.org/api/puzzle/daily');
        
        // Log the entire response data to check the structure
        console.log("Lichess API Response:", response.data);

        // Extract the puzzle data, including the FEN string
        const puzzleData = {
            id: response.data.puzzle.id,
            fen: response.data.puzzle.fen,  // Ensure the fen field is correctly extracted
            solution: response.data.puzzle.solution,
        };
        
        res.json(puzzleData);
    } catch (error) {
        console.error("Error fetching Lichess daily puzzle:", error);
        res.status(500).json({ message: 'Failed to fetch Lichess daily puzzle' });
    }
};
