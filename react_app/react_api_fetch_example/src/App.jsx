import { useState, useEffect } from 'react'
import { searchCity } from './api.js';
import './App.css'

/*

General Tips for keeping your project easy to work on:
1. Keep your children stupid (Keep your application state, in the parent component)
  - Keep your useState() calls at the top of your App Component
  - Pass in state values, and setter callback function as props to children components
  - App is for Controller and Model concerns
  - Children are for View Layer concerns
2. Pass actions into components, not state
3. Keep derived values out of state
  - My state has: Recipes
    - My derived value is: Filtered Recipes
    - Filters for: Breakfast, holiday, with Chicken

*/


function App() {
  // I have a search query input by the user
  const [currentSearchQuery, setNewSearchQuery] = useState("");

  // I have some API data that I need to use in my React app
  const [currentSearchResults, setNewSearchResults] = useState([]);

  // Render my search results in a list
  let resultsDisplay = <></>;
  resultsDisplay = <p>There are no search results.</p>

  if (currentSearchResults.length > 0) {
    resultsDisplay = currentSearchResults.map((item, i) => (
      <li key={"result-" + i}>
        {item.name} ({item.country})
      </li>
    ))
  }


  // Controller logic, handling user interaction
  function handleSearchCity(city) {
    searchCity(city, setNewSearchResults);
  }

  // ANYTIME the currentSearchQuery changes, go do an API call
  useEffect(() => {
    handleSearchCity(currentSearchQuery);
  }, [currentSearchQuery]); // Put your dependency variables in this array

  return (
    <>
      <h1>API Fetching Example with Callbacks</h1>
      <div className="card">
        <h1>Search Results Section</h1>
        <form>
          <input
            type="text"
            value={currentSearchQuery}
            onChange={(event) => setNewSearchQuery(event.target.value)}
          />
          <button type="submit">Search for City</button>
        </form>
        <button onClick={() => setNewSearchQuery('Saskatoon')}>Search for Saskatoon</button>
        <ul>
          {resultsDisplay}
        </ul>
      </div>
    </>
  )
}

export default App
