import Image from 'next/image'
import { useContext, useEffect, useRef } from 'react'
import { PlayContext } from '../../contexts/PlayerContext'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import styles from './styles.module.scss'

export function Player() {

    const audioRef = useRef<HTMLAudioElement>(null);

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        tooglePlay,
        setPlayingState }
        = useContext(PlayContext)

        //efeitos colaterais
        useEffect(()=>{
            if(!audioRef.current){//se não tiver (false) retorna nada
                return;
            }
            if(isPlaying){//se tiver (true) retorna play
                audioRef.current.play();
            }else{//se não tiver (false) retorna pause
                audioRef.current.pause();
            }
        },[isPlaying])//Dispara quando valor de isPlaying for alterado 

    //episode esta tocando
    const episode = episodeList[currentEpisodeIndex]

    return (
        <div className={styles.plauerContainer}>

            <header>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>

            {episode ? (//se tiver episode 
                <div className={styles.currentEpsiode}>
                    <Image
                        width={260}
                        height={260}
                        src={episode.thumbnail}
                        objectFit="cover" />

                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
            ) : (

                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}


            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: '#84d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#84d361', borderWidth: 4 }}
                            />)

                            : (
                                <div className={styles.empetySlider} />
                            )}

                    </div>
                    <span>00:00</span>
                </div>

                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                    />
                )}

                <div className={styles.buttons}>

                    <button
                        type="button"
                        disabled={!episode} >

                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>

                    <button
                        type="button"
                        disabled={!episode}>

                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>

                    <button
                        className={styles.palyButton} disabled={!episode}
                        type="button"
                        onClick={tooglePlay}>

                        {isPlaying ?
                            <img src="/pause.svg" alt="Tocar" />

                            : (<img src="/play.svg" alt="Tocar" />)

                        }


                    </button>

                    <button
                        type="button"
                        disabled={!episode}>

                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>

                    <button
                        type="button"
                        disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>

                </div>
            </footer>


        </div>
    )

}