import React, { Component } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import '../styles/Home.css';

export class Home extends Component {

  state = {
    isLoading: true,
    movies : [],
  }

  componentDidMount(){
    // setTimeout(() => {
    //   this.setState({isLoading:false});
    // }, 6000)
    this.getMovies();
  }

  getMovies = async () => {
    const {
      data: {
        data : {
          movies
        }
      }
    } =
    await axios.get('https://yts-proxy.now.sh/list_movies.json?genre=animation&sort_by=like_count')
    
    this.setState({
      isLoading:false,
      movies, 
  })

  }
  render() {
    const{isLoading, movies} = this.state; //구조분해할당
    return (
      
      <section className="container">
        {isLoading ? 
        <div className="loader">
            <span className="loder_text">'Loading...'</span>
        </div>
        :
        <div className="movies">
          {movies.map((movie, index) => <Movie
                                          key={index}
                                          id={movie.id}
                                          year={movie.year}
                                          title={movie.title}
                                          summary={movie.summary}
                                          poster={movie.medium_cover_image}
                                          genres={movie.genres}
                                        />
                                        
                      )
          }
          
        </div>
        }
      </section>
      
    )
  }
}

export default Home;