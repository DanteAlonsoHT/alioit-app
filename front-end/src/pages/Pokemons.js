import React, { useState, useEffect } from 'react'

const Pokemons = () => {
  const [pokemonData, setPokemonData] = useState([]);
  let url = 'http://localhost:8008/api/get_all_pokemon_from_urls/';

  const get_all_pokemon_from_urls = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => (data.json()).replace("'", `"`))
      .then((data) => {
        setPokemonData(data);
        console.log(data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };


  useEffect(()=>{
    get_all_pokemon_from_urls();
  }, [])

  return (
    <div className="container mt-5 pt-5">
      <div className="row mt-5 pt-5 d-flex justify-content-center align-items-center">
        <h1 className="text-center">Welcome to API App!</h1>
        <p className="mt-3 fs-6" style={{maxWidth: '500px'}}>Get all data from Pokemon API can be a long time task to do, but with aiohttp we can make more than 40 HTTP requests at once!</p>
        <span>
          {
            pokemonData && pokemonData.total_time
          }
          seconds.
        </span>
        <span>
          {
            pokemonData && pokemonData.total_requests
          }
          Requests done.
        </span>
      </div>
    </div>
  )
}

export default Pokemons;