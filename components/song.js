import React from 'react'
import Time from '../lib/time';
function Song({track, order}) {
    const imageUrl = track.track.album.images[0]?.url;
    const name = track.track.name;
    const artist = track.track.artists[0].name;
    const album = track.track.album.name;
    const duration = Time(track.track.duration_ms);
    return (
        <div className='grid grid-cols-2 px-5 py-4 hover:bg-crimson rounded-lg'>
            <div className='flex items-center space-x-4'>
                <p className='hidden md:inline'>{order+1}</p>
                <img className='h-10 w-10' src={imageUrl} alt=''/>                
                <div>
                    <p className='w-26 lg:w-64 truncate'>{name}</p>
                    <p className='text-customGrey'>{artist}</p>
                </div>
            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <p className='hidden md:inline text-customGrey'>{album}</p>
                <p>{duration}</p>
            </div>
        </div>    
    )
}
//https://youtu.be/3xrko3GpYoU?t=10814
export default Song;
