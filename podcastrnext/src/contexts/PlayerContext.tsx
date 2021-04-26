import { createContext, useState,ReactNode, useContext } from 'react'


type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;//qual episode esta tocando
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode:Episode) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    playList:(list:Episode[],index:number) => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
    hasNext:boolean;
    hasPrevious:boolean;

}

type PlayerContextProps ={
    children:ReactNode;
}

export const PlayContext = createContext({} as PlayContextData);

export function PlayerContextProvider({children}:PlayerContextProps) {

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsplaying] = useState(false);//Já toca
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, seIsShuffling] = useState(false);

    //Mostrar um episode
    function play(episode:Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsplaying(true)
    }

    //Lista de episode e index
    function playList(list:Episode[],index:number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsplaying(true);//Começar a tocar
    }

    function togglePlay() {
        setIsplaying(!isPlaying);
    }


    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        seIsShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean) {
        setIsplaying(state);
    }

    function clearPlayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0 ;
    const hasNext = isShuffling || (currentEpisodeIndex +1) < episodeList.length;

    //Pergar episódio atual e somar + 1
    function playNext(){
        const nextEpisodeIndex = currentEpisodeIndex +1;

        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        }else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex +1);
        }
    }

    //Votar um index
    function playPrevious(){
        if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex -1);
        }
    }


    return (
        <PlayContext.Provider
            value={
                {
                    episodeList, 
                    currentEpisodeIndex, 
                    play, 
                    isPlaying, 
                    togglePlay,
                    setPlayingState,
                    playList,
                    playNext,
                    playPrevious,
                    hasNext,
                    hasPrevious,
                    isLooping,
                    toggleLoop,
                    isShuffling,
                    toggleShuffle,
                    clearPlayerState
                }
            }>

                {children}
        </PlayContext.Provider>
    )
}

export const usePlayer = () =>{
    return useContext(PlayContext);
}

//Passar conteudo para um componente que e interna passar a propriedade children 