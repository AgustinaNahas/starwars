import logo from './logo.svg';
import {useEffect, useState} from "react";
import ReactECharts from "echarts-for-react";

function Home() {
    const [movies, setMovies] = useState([])
    const [data, setData] = useState({})

    useEffect(() => {
        fetch("https://www.swapi.tech/api/films").then((response) => {
            return response.json()
        }).then((response) => {
            setMovies(response.result)

            const data = response.result.map((movie) => {
                return {
                    name: movie.properties.title,
                    value: movie.properties.characters.length
                }
            })

            const option = {
                series: [
                    {
                        type: 'treemap',
                        data: data
                    }
                ]
            }

            setData(option)

        })
    }, [])

    return (
        <div className="App"
             style={{backgroundColor: "#030303", paddingTop: 40, paddingBottom: 40, minHeight: "100vh"}}>
            <h1 style={{fontFamily: "Jedi", color: "#ffff00", textAlign: "center", marginBottom: 20}}> Gráficos de Star
                Wars </h1>
            <div className="container">
                <div className="accordion" id="accordionExample">
                    {movies.map((movie) => {
                        return <div className="accordion-item" key={movie.uid}>
                            <h2 className="accordion-header" id={"heading" + movie.uid}>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target={"#collapse" + movie.uid}
                                        aria-expanded="false" aria-controls={"collapse" + movie.uid}>
                                    {movie.properties.title}
                                    <span className="badge rounded-pill bg-dark"
                                          style={{marginLeft: 20}}>{movie.properties.release_date.substring(0, 4)}</span>
                                </button>
                            </h2>
                            <div id={"collapse" + movie.uid} className="accordion-collapse collapse"
                                 aria-labelledby={"heading" + movie.uid}
                                 data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <i>{movie.properties.opening_crawl}</i>
                                    <div style={{marginTop: 20}}>
                                        <a href={"pelicula/" + movie.uid} className="btn btn-dark">Ver</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <ReactECharts
                option={data}
                notMerge={true}
                lazyUpdate={true}
                theme={"light"}
            />
            );
        </div>
    );
}

export default Home;
