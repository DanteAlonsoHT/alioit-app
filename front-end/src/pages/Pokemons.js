import React, { useState, useEffect } from 'react'

const Pokemons = () => {
  const [pokemonData, setPokemonData] = useState({
    total_time: 0,
    total_request: 0,
    data: {}
  });
  let url = 'http://localhost:8008/api/get_all_pokemon_from_urls/';

  const get_all_pokemon_from_urls = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
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
    <div className="container my-5 pt-5">
      <div className="row mt-5 pt-5 d-flex justify-content-center align-items-center">
        <h1 className="text-center">Welcome to API App!</h1>
        <p className="my-3 fs-6" style={{maxWidth: '500px'}}>Get all data from Pokemon API can be a long time task to do, but with aiohttp we can make more than 40 HTTP requests at once!</p>        
        <span className="card rounded shadow p-3 my-2">
          {
            pokemonData && `${pokemonData.total_request} HTTP Requests done from Pokemon API.`
          }
        </span>
        <span className="card rounded shadow p-3 my-2">
          {
            pokemonData && `${pokemonData.total_time.toFixed(6)} seconds.`
          }
        </span>
        <span className="card rounded shadow p-3 my-2 text-wrap overflow-auto" style={{maxHeight: "360px"}}>
          {
            pokemonData && JSON.stringify(pokemonData.data)
          }
        </span>
      </div>
    </div>
  )
}

export default Pokemons;