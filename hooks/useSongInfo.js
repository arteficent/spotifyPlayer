import {useState, useEffect} from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import UseSpotify from './useSpotify';
function UseSongInfo() {
    
    const spotifyApi = UseSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);
    
    useEffect(() => {
        const fetchSongInfo = async () => {
            if(currentTrackId)
            {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }
                ).then(res => res.json());
                setSongInfo(trackInfo);
            }
        }
        fetchSongInfo();
    }, [currentTrackId, spotifyApi]);
    
    return songInfo;
}

export default UseSongInfo;
