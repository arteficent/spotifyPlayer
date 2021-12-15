import React from 'react'
import {HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon} from "@heroicons/react/outline";
import {signOut, useSession} from 'next-auth/react';

function Sidebar() {
    const {data, status} = useSession();
    return (
        <div className='text-customGrey p-5 text-sm border-r border-customGrey overflow-y-scroll scrollbar-hide h-screen'>
            <div className='space-y-4'>
                <button className='flex items-center space-x-2 hover:text-crimson' onClick={() => signOut()}>
                    <p>Logout</p>
                </button>
                
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
                
                <p className='cursor-pointer hover:text-crimson'>
                    playlist....
                </p>
                <p className='cursor-pointer hover:text-crimson'>
                    playlist....
                </p>
                <p className='cursor-pointer hover:text-crimson'>
                    playlist....
                </p>
                <p className='cursor-pointer hover:text-crimson'>
                    playlist....
                </p>
            </div>
        </div>
    )
}

export default Sidebar;
