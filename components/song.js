import Time from '../lib/time';
import UseSpotify from '../hooks/useSpotify';
import {currentTrackIdState, isPlayingState} from '../atoms/songAtom';
import { useRecoilState } from 'recoil';
function Song({track, order}) {
    const spotifyApi = new UseSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        console.log(track);
        if(track.track.uri!==null)
        {
           spotifyApi.play({uris: [track.track.uri],})
            .then(function() {
            console.log('Playback started');
            }, function(err) {    
            console.log('Something went wrong!', err);
            });
        }
    }
    //console.log(currentTrackId, track.track.id);
    const imageUrl = track.track.album.images[0]?.url;
    const name = track.track.name;
    const artist = track.track.artists[0].name;
    const album = track.track.album.name;
    const duration = Time(track.track.duration_ms);
    return (
        <div className='grid grid-cols-2 px-5 py-4 hover:bg-crimson rounded-lg cursor-pointer' onClick={playSong}>
            <div className='flex items-center space-x-4'>
                <p className='hidden md:inline'>{order+1}</p>
                <img className='h-10 w-10' src={imageUrl} alt=''/>                
                <div>
                    <p className='w-28 lg:w-64 truncate'>{name}</p>
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
export default Song;
