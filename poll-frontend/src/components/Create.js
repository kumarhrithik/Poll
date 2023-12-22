import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [formData, setFormData] = useState({
    question: '',
    option_one: '',
    option_two: '',
    option_three: '',
    email: '',
    end_date: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to Django backend
    axios.post('http://127.0.0.1:8000/api/polls/', formData)
      .then(response => {
        console.log(response.data);
        // Redirect to home or handle success
        navigate('/');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Create A New Poll</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Enter Poll Question</label>
        <textarea
          name="question"
          value={formData.question}
          onChange={handleChange}
          rows="3"
          className="form-control"
        ></textarea>

        <label htmlFor="option_one">Option 1</label>
        <input
          type="text"
          name="option_one"
          value={formData.option_one}
          onChange={handleChange}
          className="form-control"
        />

        <label htmlFor="option_two">Option 2</label>
        <input
          type="text"
          name="option_two"
          value={formData.option_two}
          onChange={handleChange}
          className="form-control"
        />

        <label htmlFor="option_three">Option 3</label>
        <input
          type="text"
          name="option_three"
          value={formData.option_three}
          onChange={handleChange}
          className="form-control"
        />

        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />

        <label htmlFor="end_date">Poll Closing Date</label>
        <input
          type="datetime-local"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="form-control"
        />

        <button type="submit" className="btn btn-info">Submit</button>
      </form>
    </div>
  );
}

export default Create;
