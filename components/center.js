import React, {useState, useEffect} from 'react'
import {useSession, signOut} from 'next-auth/react';
import {ChevronDownIcon, LogoutIcon} from '@heroicons/react/outline';
import { shuffle } from 'lodash';
import { useRecoilValue, useRecoilState } from 'recoil';
import { playlistIdState, playlistAtomState } from '../atoms/playlistAtom';
import UseSpotify from '../hooks/useSpotify';
import Songs from './songs';

const colors = [
    'from-[#b205a6]',
    'from-[#adb316]',
    'from-[#fb93d6]',
    'from-[#a51163]',
    'from-[#7d5208]',
    'from-[#c04230]',
    'from-[#93e9ce]',
    'from-[#4f5451]',
    'from-[#ca8b2a]',
    'from-[#318b67]',
    'from-[#56056b]',
    'from-[#d045bf]',
    'from-[#53e1d2]',
    'from-[#3513ce]',
    'from-[#0edb5c]'
];

function Center() {
    const {data:session, status} = useSession();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistAtomState);
    const spotifyApi =  UseSpotify();   
    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId])    
    useEffect(() => {
        if(spotifyApi._credentials.accessToken){
            spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        }).catch((error) => console.log("saomething went wrong", error))
    }
    }, [spotifyApi, playlistId])
    
    return (
        <div className='flex-grow text-white h-screen overflow-y-scroll scrollbar-hide'>
            <header className=''>
                <button className='h-10 w-10 bg-crimson rounded-full shadow-3xl hover:opacity-80 absolute top-10 sm:left-8 md:left-52 lg:left-64 p-2' onClick={() => signOut()}><LogoutIcon className='text-white'/></button>
                <div className='flex items-center space-x-3 cursor-pointer p-1 pr-2 absolute top-5 right-8'>
                    <img className='rounded-full h-20 w-20 bg-crimson p-0.5 shadow-3xl' src={session?.user.image} alt=''/>
                    <div className='bg-crimson flex items-center rounded-full p-2 hover:opacity-80 shadow-3xl'>
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5'/>
                    </div>
                </div>
            </header>
            
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img className='h-40 w-40 bg-crimson p-1 rounded-md' src={playlist?.images?.[0]?.url} alt=''/>
                <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>               
            </section>
            
            <div>
                <Songs/>
            </div>
        </div>
    )
}

export default Center;