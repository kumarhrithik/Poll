// Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    // Fetch polls from Django backend
    axios.get('http://127.0.0.1:8000/api/polls/')
      .then(response => setPolls(response.data))
      .catch(error => console.error(error));
  }, []);

  const isPollActive = (poll) => {
    // Check if the poll has an end date and if it's in the future
    const endDate = new Date(poll.end_date);
    const currentDate = new Date();

    if (endDate && endDate <= currentDate) {
      return false; // Poll has ended
    } else {
      return true; // Poll is active
    }
  };

  return (
    <div>
      <Link to="/create" className="btn btn-info" style={{ marginTop: '10px', marginLeft: '10px', display: 'inline-block' }}>Create a New Poll</Link>
      <h1>Available Polls</h1>
      <ul>
        {polls.map(poll => (
          <li key={poll.id}>
            <strong>{poll.question}</strong>
            <br />
            <br />

            <span>
              {!isPollActive(poll) && <span>Poll Ended</span>}
              {isPollActive(poll) ? (
                <>
                  <Link to={`/vote/${poll.id}`} className={`btn btn-info btn-xs ${!isPollActive(poll) ? 'disabled' : ''}`}>Vote</Link>
                  &nbsp;
                  <Link to={`/results/${poll.id}`} className="btn btn-default btn-xs">View Results</Link>
                </>
              ) : null}
              &nbsp;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
