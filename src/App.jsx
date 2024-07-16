import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [tableData, setTableData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchTableData();
  };

  const fetchTableData = async () => {
    try {
      let url = 'http://www.omdbapi.com/?apikey=2b671e8c';
      if (searchType === 'id') {
        url += `&i=${inputText}`;
      } else {
        url += `&t=${inputText}`;
      }
      const response = await axios.get(url);
      const data = response.data;
      setTableData([data]);
    } catch (error) {
      console.error('Error fetching the table data', error);
    }
  };

  return (
    <div className="App">
      <h1>React Table Example</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">Search by Title</option>
          <option value="id">Search by IMDb ID</option>
        </select>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Enter movie ${searchType}`}
        />
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Director</th>
            <th>Poster</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.imdbID}>
              <td>{item.Title}</td>
              <td>{item.Year}</td>
              <td>{item.Genre}</td>
              <td>{item.Director}</td>
              <td>
                <img src={item.Poster} alt={item.Title} style={{ width: '50px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
