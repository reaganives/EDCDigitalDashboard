import { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';  // Import chess.js
import axios from '../axiosConfig';

// Define the type for the puzzle object
interface Puzzle {
    solution: string[];  // Array of move strings
}

export default function DailyPuzzle() {
    const [position, setPosition] = useState<string>('start');  // Default to start position
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('/lichess/daily-puzzle')
            .then(response => {
                console.log('Received puzzle data:', response.data);

                const puzzle: Puzzle = response.data;  // Access the puzzle object

                // Ensure puzzle and puzzle.solution are available and that solution is an array of strings
                if (puzzle && Array.isArray(puzzle.solution) && puzzle.solution.length > 0) {
                    const game = new Chess();  // Initialize chess.js

                    // Apply each move from the solution array to the game
                    puzzle.solution.forEach(move => {
                        try {
                            game.move(move);
                        } catch (error) {
                            console.error(`Invalid move: ${move}`, error);
                            setError('Invalid move in solution');
                        }
                    });

                    // Set the final board position after applying the solution moves
                    setPosition(game.fen());
                } else {
                    setError('No valid solution available for this puzzle');
                }
            })
            .catch(error => {
                console.error("Error fetching daily puzzle:", error);
                setError('Failed to fetch the daily puzzle');
            });
    }, []);

    return (
        <div className="flex flex-col items-center">
            {error ? (
                <p>{error}</p>  // Display error message if something goes wrong
            ) : (
                <Chessboard
                    position={position}  // Chessboard uses the FEN string
                    width={400}
                />
            )}
        </div>
    );
}











