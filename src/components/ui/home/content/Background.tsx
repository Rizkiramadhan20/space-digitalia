export default function BackgroundEffects() {
    return (
        <div className='absolute -z-10 inset-0'>
            <div className='absolute top-1/4 left-1/3 w-96 h-96 bg-blue-300/20 rounded-full blur-[100px] animate-pulse'></div>
            <div className='absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-purple-300/20 rounded-full blur-[100px] animate-pulse delay-700'></div>
            <div className='absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300/20 rounded-full blur-[100px] animate-pulse delay-1000'></div>
        </div>
    );
}