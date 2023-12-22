import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Vote() {
  const [selectedOption, setSelectedOption] = useState('');
  const [email, setEmail] = useState('');
  const [pollDetails, setPollDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const pollId = window.location.pathname.split('/').pop();

    // Fetch poll details from Django backend
    axios.get(`http://127.0.0.1:8000/api/polls/${pollId}/`)
      .then(response => setPollDetails(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const pollId = window.location.pathname.split('/').pop();
  
    // Check if the poll is closed based on the end_date
    if (pollDetails.end_date && new Date(pollDetails.end_date) <= new Date()) {
      console.log('The poll is closed');
      // Optionally, you can handle this case or show a message to the user
      return;
    }

    // Continue with submitting the vote
    axios.post(`http://127.0.0.1:8000/api/polls/${pollId}/vote/`, { selectedOption, email })
      .then(response => {
        console.log(response.data);
        // Redirect to results or handle success
        navigate(`/results/${pollId}`);
      })
      .catch(error => {
        console.error('Error submitting vote:', error);
      })
      .finally(() => {
        // Check if email is not empty and update recipient_emails field in the database
        if (email && pollDetails.recipient_emails) {
          const updatedEmails = `${pollDetails.recipient_emails},${email}`;

          axios.patch(`http://127.0.0.1:8000/api/polls/${pollId}/`, { recipient_emails: updatedEmails })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error updating recipient_emails:', error));
        }
      });
  };

  if (!pollDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Cast Your Vote</h2>
      <h3>{pollDetails.question}</h3>
      <form onSubmit={handleSubmit}>
        <p>Select an option:</p>
        <div className="radio">
          {pollDetails.option_one && (
            <div>
              <label>
                <input
                  type="radio"
                  name="poll"
                  value="option_one"
                  checked={selectedOption === 'option_one'}
                  onChange={() => setSelectedOption('option_one')}
                />
                {pollDetails.option_one}
              </label>
              <br />
            </div>
          )}

          {pollDetails.option_two && (
            <div>
              <label>
                <input
                  type="radio"
                  name="poll"
                  value="option_two"
                  checked={selectedOption === 'option_two'}
                  onChange={() => setSelectedOption('option_two')}
                />
                {pollDetails.option_two}
              </label>
              <br />
            </div>
          )}

          {pollDetails.option_three && (
            <div>
              <label>
                <input
                  type="radio"
                  name="poll"
                  value="option_three"
                  checked={selectedOption === 'option_three'}
                  onChange={() => setSelectedOption('option_three')}
                />
                {pollDetails.option_three}
              </label>
              <br />
            </div>
          )}
        </div>

        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />

        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Vote;
