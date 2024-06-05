import React, { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../../../config/constants';

type GameProps = {
  data: {
    id: number;
    name: string;
    location: string;
    sportName: string;
    endsAt: string;
    isRunning: boolean;
    teams: Array<Team>;
  };
};

interface Team {
    id: number;
    name: string;
}

interface Score {
    [key: string]: string; // Assuming scores are keyed by team name
}

const Game: React.FC<GameProps> = ({ data }) => {
    const [score, setScore] = useState<Score | null>(null);
    
    const fetchScore = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/matches/${data.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const scoreData = await response.json();
            setScore(scoreData.score);  
        } catch (error) {
            console.error("Error occurred when fetching scores:", error);
        }
    };

    useEffect(() => {
        fetchScore();
        console.log(score, "score");
    }, [data]); // Fetch scores when 'data' changes

    return (
        <div className="game-card h-full w-[350px] flex flex-col border-2 border-black m-2 p-2">
            <div className="text-lg font-bold mb-2">
                {data.sportName}
            </div>
            <div className="text-sm mb-2">
                {data.name}, {data.location}
            </div>
            {score && (
                <div className="flex flex-col">
                    {data.teams.map((team, idx) => {
                        return (
                            <div key={idx} className="flex justify-between">
                                <span className="font-bold">{team.name}</span>
                                <span>{score[team.name]}</span>
                            </div>
                        ); 
                    })}
                </div>
            )}
        </div>
    );
};

export default Game;
