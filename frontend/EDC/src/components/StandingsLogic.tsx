import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

export default function StandingsLogic() {
    const [standings, setStandings] = useState(null);

    const nlWestTeams = [
        ['Los Angeles Dodgers', 'https://content.sportslogos.net/logos/54/63/full/los_angeles_dodgers_logo_primary_20127886.png'],
        ['San Diego Padres', 'https://content.sportslogos.net/logos/54/73/full/7517_san_diego_padres-primary-2020.png'],
        ['Arizona Diamondbacks', 'https://content.sportslogos.net/logos/54/50/full/arizona_diamondbacks_logo_primary_20123733.png'],
        ['San Francisco Giants', 'https://imgs.search.brave.com/gmlftIKUfflSdFj7rRG53D6llxqBt355cLf6qr97DAA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy1kb3dubG9hZC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MTYvMDQvU2FuX0Zy/YW5jaXNjb19HaWFu/dHNfbG9nb19TRi01/MTZ4NzAwLnBuZw'],
        ['Colorado Rockies', 'https://content.sportslogos.net/logos/54/58/full/colorado_rockies_logo_primary_20171892.png']
    ];

    useEffect(() => {
        // Fetch MLB standings from the backend
        axios.get('/mlb/standings')
            .then(response => {
                setStandings(response.data);
            })
            .catch(error => {
                console.error('Error fetching MLB standings:', error);
            });
    }, []);

    // Function to calculate winning percentage
    const calculateWinningPercentage = (wins, losses) => {
        return (wins / (wins + losses)).toFixed(3); // 3 decimal places
    };

    // Function to get the logo for a specific team
    const getTeamLogo = (teamName) => {
        const team = nlWestTeams.find(([name]) => name === teamName);
        return team ? team[1] : '';
    };

    return (
        <div className="bg-white rounded-lg h-fit">
            <h2 className="md:text-xl text-lg font-semibold mb-4 text-center font-noto tracking-wide">NL West Division</h2>
            {standings ? (
                <div className="w-full">
                    {/* Table Header */}
                    <div className="grid grid-cols-5 md:text-base text-sm font-semibold border-b border-gray-300 py-2 text-gray-600">
                        <span className="col-span-2 ml-2">Team</span>
                        <span className="text-center">W</span>
                        <span className="text-center">L</span>
                        <span className="text-center">Pct</span>
                    </div>

                    {/* Teams List */}
                    <ul>
                        {standings.map((division) =>
                            division.teamRecords
                                .filter(team => nlWestTeams.some(([name]) => name === team.team.name)) // Filter NL West teams
                                .sort((a, b) => b.wins - a.wins || a.losses - b.losses) // Sort by best record
                                .map((team, idx) => (
                                    <li
                                        key={idx}
                                        className={`grid grid-cols-5 py-3 items-center border-b last:border-none ${
                                            idx % 2 === 1 ? 'bg-gray-50' : ''
                                        }`}
                                    >
                                        {/* Team Logo */}
                                        <div className="flex items-center col-span-2 justify-start ml-4">
                                            <img src={getTeamLogo(team.team.name)} alt={team.team.name} className="md:w-6 md:h-6 w-4 h-4 mr-2" />
                                            {/* <span className="font-medium text-sm">{team.team.name}</span> */}
                                        </div>
                                        {/* Wins */}
                                        <span className="text-center md:text-base text-xs">{team.wins}</span>
                                        {/* Losses */}
                                        <span className="text-center md:text-base text-xs">{team.losses}</span>
                                        {/* Winning Percentage */}
                                        <span className="text-center md:text-base text-xs">{calculateWinningPercentage(team.wins, team.losses)}</span>
                                    </li>
                                ))
                        )}
                    </ul>
                </div>
            ) : (
                <p>Loading standings...</p>
            )}
        </div>
    );
}






