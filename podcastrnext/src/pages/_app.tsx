import { Header } from '../components/Header'
import { Player } from '../components/Player'
import '../style/global.scss'
import styles from  '../style/_app.module.scss'

function MyApp({ Component, pageProps }) {
  return (
  <div className={styles.wrapper}>
    <main>
      <Header/>
      <Component {...pageProps} />
    </main>
    <Player/>

  </div>
  )
}

export default MyApp

//Colocar o Header no _app para ficar em todas as telas
