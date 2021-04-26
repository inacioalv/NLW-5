import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContextProvider } from '../contexts/PlayerContext'

import '../style/global.scss'
import styles from  '../style/_app.module.scss'

function MyApp({ Component, pageProps }) {

  

  return (
      <PlayerContextProvider>
        <div className={styles.wrapper}>
          <main>
            <Header/>
            <Component {...pageProps} />
          </main>
          <Player/>

        </div>
        </PlayerContextProvider>
    
  )
}

export default MyApp

//Colocar o Header no _app para ficar em todas as telas
//Colocar o contexts em volta dos elemtos que tenha acesso
//Para alterar valores do contexts tem que ser variaveis de estado