import {createContext} from 'react'


type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayContextData = {
    episodeList:Episode[];
    currentEpisodeIndex:number;//qual episode esta tocando
    isPlaying:boolean;
    play:(episode) => void;
    setPlayingState:(state:boolean) => void;
    tooglePlay:() => void;
    
}

export const PlayContext =createContext({}as PlayContextData);