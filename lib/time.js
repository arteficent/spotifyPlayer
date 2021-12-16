export default function Time(mil) {
    const min = Math.floor(mil/60000);
    const sec = ((mil % 60000) / 1000).toFixed(0);
    return sec === 60 ? min+1+':00':min+':'+(sec<10?'0':'')+sec;
}
