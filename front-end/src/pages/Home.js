import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container my-5 pt-5">
      <div className="row my-5 pt-5 d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">Welcome to API App!</h1>
        <p className="mt-3 fs-6" style={{maxWidth: '500px'}}> Did you know you can use a technology to make more HTTP request at once? Discover new ways to make HTTP request with Python!</p>
        <div className="mt-5 d-flex justify-content-between" style={{maxWidth: '450px'}}>
          <Link className="btn btn-danger" to="/pokemons">See Pokemon Data</Link>
          <Link className="btn btn-success" to="/user-data">Proof Websockets</Link>
        </div>
      </div>
    </div>
  )
}

export default Home;