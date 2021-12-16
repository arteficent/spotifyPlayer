import React, {useState, useEffect} from 'react'
import {HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon} from "@heroicons/react/outline";
import {signOut, useSession} from 'next-auth/react';
import UseSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';

function Sidebar() {
    const {data, status} = useSession();
    const spotifyApi =  UseSpotify();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    
    // console.log(playlistId);
    
    useEffect(()=>{
        if(spotifyApi.getAccessToken())
        {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [data, spotifyApi]);
    return (
        <div className='text-customGrey p-5 text-xs lg:text-sm border-r border-customGrey overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex'>
            <div className='space-y-4'>
                
                <button className='flex items-center space-x-2 hover:text-crimson'>
                    <HomeIcon className='h-5, w-5'/> <p>Home</p>
                </button>                 
                <button className='flex items-center space-x-2 hover:text-crimson'>
                    <SearchIcon className='h-5, w-5'/> <p>Search</p>
                </button>                
                <button className='flex items-center space-x-2 hover:text-crimson'>
                    <LibraryIcon className='h-5, w-5'/> <p>Library</p>
                </button>                
                <hr className='border-t-[0.1px] border-customGrey'/>
                
                <button className='flex items-center space-x-2 hover:text-crimson'>
                    <PlusCircleIcon className='h-5, w-5'/> <p>Create playlist</p>
                </button>                 
                <button className='flex items-center space-x-2 hover:text-crimson'>
                    <HeartIcon className='h-5, w-5'/> <p>Liked songs</p>
                </button>                
                <button className='flex items-center space-x-2 hover:text-crimson'>
                    <RssIcon className='h-5, w-5'/> <p>Your episodes</p>
                </button>                
                <hr className='border-t-[0.1px] border-customGrey'/>
                
                {/* {playlists} */}
                {playlists.map((playlist) => (
                    <p key={playlist.id} onClick={()=>setPlaylistId(playlist.id)} className='cursor-pointer hover:text-crimson'>{playlist.name}</p>
                ))}
                
            </div>
        </div>
    )
}

export default Sidebar;
