import { useState } from 'react'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayContext } from '../contexts/PlayerContext'
import '../style/global.scss'
import styles from  '../style/_app.module.scss'

function MyApp({ Component, pageProps }) {

  const [episodeList,setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsplaying] =useState(false)//Já toca

  function play(episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsplaying(true)
  }

  function tooglePlay(){
    setIsplaying(!isPlaying);
  }

  function setPlayingState(state:boolean){
    setIsplaying(state);
  }

  return (
    <PlayContext.Provider value={{episodeList,currentEpisodeIndex,play,isPlaying,tooglePlay,
      setPlayingState}}>
        <div className={styles.wrapper}>
          <main>
            <Header/>
            <Component {...pageProps} />
          </main>
          <Player/>

        </div>
    </PlayContext.Provider> 
  )
}

export default MyApp

//Colocar o Header no _app para ficar em todas as telas
//Colocar o contexts em volta dos elemtos que tenha acesso
//Para alterar valores do contexts tem que ser variaveis de estado