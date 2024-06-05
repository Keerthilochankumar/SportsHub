import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Game from './Game';
import { API_ENDPOINT } from '../../../config/constants';

type Match = {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: Array<{ id: number; name: string }>;
  score: {
    Thunderbolts: string;
    Dragonslayers: string;
  };
  story: string;
};

const GameDetailsPopup: React.FC<{ match: Match; onClose: () => void }> = ({ match, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white p-5 rounded shadow-lg w-3/4 max-w-xl overflow-auto max-h-full relative">
        <button className="absolute top-2 right-2" onClick={onClose}>Close</button>
        <h2 className="text-xl mb-2">{match.name}</h2>
        <div className="mb-2"><strong>Location:</strong> {match.location}</div>
        <div className="mb-2"><strong>Sport:</strong> {match.sportName}</div>
        <div className="mb-2"><strong>Ends At:</strong> {new Date(match.endsAt).toLocaleString()}</div>
        <div className="mb-2"><strong>Score:</strong> {match.score.Thunderbolts} - {match.score.Dragonslayers}</div>
        <div className="mb-2"><strong>Story:</strong> {match.story}</div>
        <div><strong>Teams:</strong> {match.teams.map(team => team.name).join(', ')}</div>
      </div>
    </Dialog>
  );
};

const Games: React.FC<{ data: Match }> = ({ data }) => {
  return (
    <div className="border-2 border-black p-2 mb-4"> {/* Added margin-bottom for spacing */}
      <div>{data.name}</div>
      <div>{data.location}</div>
    </div>
  );
};

const LiveGames = () => {
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [selectedGame, setSelectedGame] = useState<Match | null>(null);

  const fetchMatches = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const matchData = await response.json();
      setMatches(matchData.matches as unknown as Match[]);
    } catch (error) {
      console.error("Error occurred when fetching matches:", error);
    }
  };

  const fetchGameDetails = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const gameData = await response.json();
      setSelectedGame(gameData);
    } catch (error) {
      console.error("Error occurred when fetching game details:", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mt-3">Live Games</div>
      <div className="w-full overflow-x-scroll max-h-[200px] mt-5 border-2 border-black flex space-x-5 p-2">
        {matches?.map((match, index) => (
          <div className="flex mr-7 cursor-pointer" key={index} onClick={() => fetchGameDetails(match.id)}>
            <Game data={match} />
          </div>
        ))}
      </div>
      {selectedGame && (
        <GameDetailsPopup match={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
};

export default LiveGames;
