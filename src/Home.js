import logo from './logo.svg';
import {useEffect, useState} from "react";
import ReactECharts from "echarts-for-react";
import './Home.css';

function Home() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        fetch("https://www.swapi.tech/api/films").then((response) => {
            return response.json()
        }).then(async (response) => {
            // await sleep(1000);

            setMovies(response.result)
            setLoading(false)

            const data = response.result.map((movie) => {
                return {
                    name: movie.properties.title,
                    value: movie.properties.characters.length
                }
            })

            // Acá seteamos las propiedades del gráfico TreeMap

            const option = {
                series: [
                    {
                        type: 'treemap',
                        data: data
                    }
                ],
                color: [
                    '#c23531',
                    '#AD7D37',
                    '#2E557C',
                    '#381010',
                    '#334E30',
                    '#8C271E',
                ],
            }

            setData(option)

        })
    }, [])

    return (
        <div className="App"
             style={{backgroundColor: "#030303", paddingTop: 40, paddingBottom: 40, minHeight: "100vh"}}>
            <h1 style={{fontFamily: "Jedi", color: "#ffff00", textAlign: "center", marginBottom: 20}}> Star Wars - Gráficos y datos </h1>
            <div style={{textAlign: "center"}}>
                <img style={{margin: "0px auto 40px auto"}} src="https://img.icons8.com/color/50/000000/r2-d2.png"/>
            </div>
            {loading && <div className="loading" style={{textAlign: "center"}}>
                <div className="inside-loading" style={{margin: "0 auto"}}>
                    <img style={{margin: "0px auto 40px auto"}}
                         src="https://img.icons8.com/color/48/000000/death-star.png"/>
                </div>
            </div>}

            {movies.length > 0 && <div>
                <div className="container">

                    <div className="accordion" id="accordionExample">
                        {movies.map((movie) => {
                            return <div className="accordion-item" key={movie.uid}>
                                <h2 className="accordion-header" id={"heading" + movie.uid}>
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse"
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
                                            <a href={"#/pelicula/" + movie.uid} className="btn btn-dark">Ver</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <ReactECharts
                        option={data}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"light"}
                    />

                </div>
            </div>
            });
        </div>
        );
    }

export default Home;
