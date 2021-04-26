import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePlayer } from '../../contexts/PlayerContext'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import styles from './styles.module.scss'
import { convertDurationToTimeString } from '../../utils/convetDurationToTimeString'

export function Player() {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setPogrees] = useState(0)

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        toggleShuffle,
        isShuffling,
        clearPlayerState
    }
        = usePlayer();

    //efeitos colaterais
    useEffect(() => {
        if (!audioRef.current) {//se não tiver (false) retorna nada
            return;
        }
        if (isPlaying) {//se tiver (true) retorna play
            audioRef.current.play();
        } else {//se não tiver (false) retorna pause
            audioRef.current.pause();
        }
    }, [isPlaying])//Dispara quando valor de isPlaying for alterado 

    //Progresso tempo atual
    function setupProgressListener() {
        //Sempre começa em 0
        audioRef.current.currentTime = 0

        audioRef.current.addEventListener('timeupdate', () => {
            setPogrees(Math.floor(audioRef.current.currentTime))
        })
    }

    function handleSeek(amount:number){
        audioRef.current.currentTime= amount;//Mostrar no audio
        setPogrees(amount);//Mostrar progresso
    }

    function handleEpisodeEnded(){
        if(hasNext){//Se tiver proxima tocar
            playNext();
        }else{//se não limpar
            clearPlayerState(); 
        }
    }

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
                    {/* se tiver episode mostrar o duration se não mostrar 0 */}
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: '#84d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#84d361', borderWidth: 4 }}
                            />)

                            : (
                                <div className={styles.empetySlider} />
                            )}

                    </div>
                    {/* se tiver episode mostrar o duration se não mostrar 0 */}
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onEnded={handleEpisodeEnded}
                        loop={isLooping}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                    />
                )}

                <div className={styles.buttons}>

                    {/* se não tiver episódio ou tiver so um episódio ficar disabled  */}
                    <button
                        type="button"
                        disabled={!episode || episodeList.length === 1}
                        onClick={toggleShuffle}
                        className={isShuffling ? styles.isActive : ''}>

                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>

                    {/* Disabled se não tiver episódio ou se não tiver episódio anterior */}
                    <button
                        type="button"
                        onClick={playPrevious}
                        disabled={!episode || !hasPrevious}>

                        <img
                            src="/play-previous.svg"
                            alt="Tocar anterior" />
                    </button>

                    <button
                        className={styles.palyButton} disabled={!episode}
                        type="button"
                        onClick={togglePlay}>

                        {isPlaying ?
                            <img src="/pause.svg" alt="Tocar" />

                            : (<img src="/play.svg" alt="Tocar" />)

                        }


                    </button>

                    {/* Disabled se não tiver episódio ou se não tiver episódio próxima */}
                    <button
                        type="button"
                        onClick={playNext}
                        disabled={!episode || !hasNext}>

                        <img
                            src="/play-next.svg"
                            alt="Tocar próxima" />
                    </button>

                    <button
                        type="button"
                        disabled={!episode}
                        onClick={toggleLoop}
                        className={isLooping ? styles.isActive : ''}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>

                </div>
            </footer>


        </div>
    )

}