import Minesweeper from "./Minesweeper"
import { useState, useEffect } from 'react';

export default function Leaderboard() {
    const [time, setTime] = useState(0);
    const [user, setUser] = useState(0);

    //need to call get request for user and time
    
    return (
        <div className="text-center">
            <h1>Minesweeper Leaderboards</h1>
            <div>
                <div>
                    User: {user}
                </div>
                <div>
                    Time: {time}
                </div>
            </div>
        </div>
    );
}