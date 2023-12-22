import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Results() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    // Fetch poll details from Django backend
    axios.get(`http://127.0.0.1:8000/api/polls/${pollId}/`)
      .then(response => setPoll(response.data))
      .catch(error => console.error(error));
  }, [pollId]);

  if (!poll) {
    return <div>Loading...</div>;
  }

  const total = poll.option_one_count + poll.option_two_count + poll.option_three_count;


  return (
    <div>
      <h3>{poll.question}</h3>
      <ul>
        <li>{poll.option_one} — <strong>{poll.option_one_count}</strong></li>
        <li>{poll.option_two} — <strong>{poll.option_two_count}</strong></li>
        <li>{poll.option_three} — <strong>{poll.option_three_count}</strong></li>
      </ul>
      <p>Total — <strong>{total}</strong></p>
    </div>
  );
}

export default Results;
