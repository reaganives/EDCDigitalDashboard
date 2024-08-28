import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

export default function PadresRecord() {
    const [padresRecord, setPadresRecord] = useState(null);

    const padresLogo = 'https://content.sportslogos.net/logos/54/73/full/7517_san_diego_padres-primary-2020.png';

    useEffect(() => {
        // Fetch MLB standings from the backend
        axios.get('/mlb/standings')
            .then(response => {
                // Filter the San Diego Padres record
                const division = response.data.find(division =>
                    division.teamRecords.some(team => team.team.name === 'San Diego Padres')
                );
                const padres = division.teamRecords.find(team => team.team.name === 'San Diego Padres');
                setPadresRecord(padres);
            })
            .catch(error => {
                console.error('Error fetching MLB standings:', error);
            });
    }, []);

    return (
        <div className="rounded-lg h-fit flex flex-col items-center text-white">
            <h2 className="md:text-xl text-lg font-semibold mb-4 text-center font-noto tracking-wide bg-[#ffc425] w-full">SAN DIEGO PADRES</h2>
            {padresRecord ? (
                <div className="flex flex-col items-center bg-[#ffc425] w-full">
                    <p className="md:text-lg text-md font-bold ">{padresRecord.wins} - {padresRecord.losses}</p>
                </div>
            ) : (
                <p>Loading record...</p>
            )}
        </div>
    );
}
