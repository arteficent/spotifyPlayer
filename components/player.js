import { RewindIcon, SwitchHorizontalIcon, FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { HeartIcon, VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import UseSongInfo from '../hooks/useSongInfo';
import UseSpotify from '../hooks/useSpotify';
import { debounce } from 'lodash';

function Player() {
    
    const spotifyApi = UseSpotify();
    const {data: session, status} = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [vol, setVol] = useState(25);
    const songInfo = UseSongInfo();
    
    const fetchCurrentSong = () =>{
        if(!songInfo)
        {
            spotifyApi.getMyCurrentPlayingTrack().then(data =>{
                setCurrentTrackId(data.body?.item?.id)
            })
            spotifyApi.getMyCurrentPlaybackState().then(data => {
                setIsPlaying(data.body?.is_playing)
            })
        }
    }
    
    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if(data.body?.is_playing)
            {
                spotifyApi.pause();
                setIsPlaying(false);
            }
            else
            {
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    }
    
    const debounceVol = useCallback(
        debounce((vol) => {
            spotifyApi.setVolume(vol);
        }, 500),
        []
    );
    
    const skipPrevious = async () => {
            spotifyApi.skipToPrevious()
            .then(function() {
            console.log('skip to previous');
            }, function(err) {    
            console.log('Something went wrong!', err);
            });
            spotifyApi.getMyCurrentPlayingTrack().then(data =>{
                setCurrentTrackId(data.body?.item?.id)
            })
            spotifyApi.getMyCurrentPlaybackState().then(data => {
                setIsPlaying(data.body?.is_playing)
            })
    }
    
    const skipNext = async () => {
        spotifyApi.skipToNext()
        .then(function() {
        console.log('skip to next');
        }, function(err) {    
        console.log('Something went wrong!', err);
        });
        spotifyApi.getMyCurrentPlayingTrack().then(data =>{
            setCurrentTrackId(data.body?.item?.id)
        })
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            setIsPlaying(data.body?.is_playing)
        })
    }

    
    useEffect(() => {
        if(spotifyApi.getAccessToken() && !currentTrackId)
        {
            fetchCurrentSong();
            setVol(25);
        }
    }, [currentTrackId, spotifyApi, session])
    
    useEffect(() => {
        if(vol>0 && vol<100)
        {
            debounceVol(vol)
        }
    },[vol])
    
    
    return (
        <div className='h-24 bg-gradient-to-t from-black text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>            
            
            <div className='flex items-center space-x-4'>
                <img className='hidden md:inline h-10 w-10' src={songInfo?.album.images[0]?.url} alt=''/>
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>                
            </div>
            
            <div className='flex items-center justify-evenly'>
                {/* <SwitchHorizontalIcon className='button'/> */}
                <RewindIcon className='button' onClick={skipPrevious}/>
                {isPlaying?<PauseIcon className='button h-10 w-10' onClick={handlePlayPause}/>:<PlayIcon className='button h-10 w-10' onClick={handlePlayPause}/>}
                <FastForwardIcon className='button' onClick={skipNext}/>
                {/* <ReplyIcon className='button'/> */}
            </div>
            
            <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
                <VolumeDownIcon className='button' onClick={() => vol>0?setVol(vol-10):vol}/>
                <input className='w-14 md:w-28' type='range' value={vol} onChange={(e) => setVol(Number(e.target.value))} min={0} max={100}/>
                <VolumeUpIcon className='button' onClick={() => vol<100?setVol(vol+10):vol}/>
            </div>
        </div>
    )
}

export default Player;