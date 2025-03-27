export default function FooterMap() {
    return (
        <div>
            <h3 className="text-white text-xl font-bold mb-8">Lokasi Kami</h3>
            <div className='w-full aspect-video md:aspect-square lg:aspect-video relative overflow-hidden rounded-xl shadow-lg'>
                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent z-[1]'></div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!4v1743114473704!6m8!1m7!1s0fmCtMl2kF4n8BDD3ejw9A!2m2!1d-6.572092024973248!2d106.6340119859566!3f81.60480941052151!4f6.510217934577568!5f0.4000000000000002"
                    className='absolute top-0 left-0 w-full h-full border-0 hover:opacity-95 transition-opacity duration-300 z-[2]'
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
            </div>
        </div>
    );
}