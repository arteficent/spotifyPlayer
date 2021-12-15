import React, {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react';
import {ChevronDownIcon} from '@heroicons/react/outline';
import { shuffle } from 'lodash';

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
    const {data} = useSession();
    const [color, setColor] = useState(null);
    
    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [])
    return (
        <div className='flex-grow text-white'>
            <header className='absolute top-5 right-8'>
                <div className='flex items-center space-x-3 cursor-pointer p-1 pr-2'>
                    <img className='rounded-full h-20 w-20 bg-crimson p-0.5' src={data?.user.image} alt=''/>
                    <div className='bg-crimson flex items-center rounded-full p-2 hover:opacity-80'>
                    <h2>{data?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5'/>
                    </div>
                </div>
            </header>
            
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <p>hello
                https://youtu.be/3xrko3GpYoU?t=7573
                </p>
            </section>
        </div>
    )
}

export default Center;