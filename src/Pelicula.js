import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Pelicula() {
    const params = useParams();
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        fetch("https://www.swapi.tech/api/films/" + params.uid).then((response) => {
            return response.json()
        }).then((response) => {
            setMovie(response.result)
        })
    }, [])
    if (!movie) return "";

    return (
        <div className="App" style={{backgroundColor: "#030303", paddingTop: 40, paddingBottom: 40, minHeight: "100vh"}}>
            <h1 style={{ fontFamily: "Jedi", color: "#ffff00", textAlign: "center", marginBottom: 20 }}> {movie.properties.title} </h1>
            <div className="container">
                <div className="card text-center">
                    <div className="card-header">
                        <nav>

                            <ul className="nav nav-tabs card-header-tabs" id="nav-tab" role="tablist">
                                <li className="nav-item">
                                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab"
                                            data-bs-target="#nav-home"
                                            type="button" role="tab" aria-controls="nav-home"
                                            aria-selected="true">Resumen
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" id="nav-production-tab" data-bs-toggle="tab"
                                            data-bs-target="#nav-production"
                                            type="button" role="tab" aria-controls="nav-production"
                                            aria-selected="false">Producción
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" id="nav-numbers-tab" data-bs-toggle="tab"
                                            data-bs-target="#nav-numbers"
                                            type="button" role="tab" aria-controls="nav-numbers"
                                            aria-selected="false">Números
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="card-body">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                 aria-labelledby="nav-home-tab">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><h5 className="card-title">Datos</h5>
                                    </li>
                                    <li className="list-group-item"><strong>Episodio {movie.properties.episode_id}</strong></li>
                                    <li className="list-group-item"><strong>Fecha de
                                        estreno:</strong> {movie.properties.release_date}</li>
                                    <li className="list-group-item"><i>{movie.properties.opening_crawl}</i></li>
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="nav-production" role="tabpanel"
                                 aria-labelledby="nav-production-tab">

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><h5 className="card-title">Producción</h5></li>
                                    <li className="list-group-item"><strong>Director: </strong> {movie.properties.director}</li>
                                    <li className="list-group-item"><strong>Productor: </strong> {movie.properties.producer}</li>
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="nav-numbers" role="tabpanel"
                                 aria-labelledby="nav-numbers-tab">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><h5 className="card-title">Números</h5></li>

                                    <li className="list-group-item"><strong>Personajes: </strong> {movie.properties.characters.length}</li>

                                    <li className="list-group-item"><strong>Vehículos: </strong> {movie.properties.vehicles.length}</li>
                                    <li className="list-group-item"><strong>Naves: </strong> {movie.properties.starships.length}
                                </li>
                                    <li className="list-group-item"><strong>Planetas: </strong> {movie.properties.planets.length}
                                </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: "center", paddingTop: 40}}>
                    <a href={"/SWgraphs/"} className="btn btn-dark">Volver</a>
                </div>
            </div>
        </div>
    );

}

export default Pelicula;
