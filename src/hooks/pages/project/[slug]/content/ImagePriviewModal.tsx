import Image from "next/image"

import { ImageModalProps } from "../lib/schema"

export default function ImagePreviewModal({
    selectedImage,
    zoomLevel,
    position,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleZoomIn,
    handleZoomOut,
    handleDownload,
    closeModal,
    setZoomLevel
}: ImageModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 animate-in fade-in duration-300 flex items-center justify-center"
            onClick={closeModal}
        >
            <div
                className="relative container flex items-center justify-center p-2 sm:p-4 md:p-8
                    animate-in zoom-in-90 duration-300 ease-out"
            >
                {/* Modal Container */}
                <div
                    className="relative containe mx-auto bg-zinc-900/50 backdrop-blur-md 
                        rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 py-4 
                        bg-zinc-900/50 border-b border-white/5 z-10 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/90 hover:bg-red-400 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/90 hover:bg-yellow-400 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-green-500/90 hover:bg-green-400 transition-colors" />
                            </div>
                            <div className="text-sm text-white/70 font-mono truncate max-w-[250px] md:max-w-[400px]">
                                {(() => {
                                    const zoom = !isNaN(zoomLevel) && zoomLevel !== null ? zoomLevel : 1;
                                    const percentage = Math.round(zoom * 100);
                                    return `${selectedImage?.split('/').pop()} • ${percentage}%`;
                                })()}
                            </div>
                        </div>
                        <button
                            className="p-2.5 hover:bg-white/10 rounded-full transition-all duration-300
                                hover:rotate-90 transform active:scale-90 hover:text-white"
                            onClick={closeModal}
                        >
                            <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Image Container */}
                    <div className="h-full py-20">
                        <div
                            className={`w-full h-full flex items-center justify-center select-none
                                ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onWheel={(e) => {
                                e.preventDefault();
                                if (zoomLevel >= 0.5 && zoomLevel <= 3) {
                                    const delta = e.deltaY * -0.01;
                                    const newZoom = Math.min(Math.max(zoomLevel + delta, 0.5), 3);
                                    setZoomLevel(newZoom);
                                }
                            }}
                        >
                            <div
                                style={{
                                    transform: `translate(${position.x}px, ${position.y}px)`,
                                    transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                                }}
                                className="w-full h-full flex items-center justify-center"
                            >
                                <Image
                                    src={selectedImage}
                                    alt="Preview"
                                    width={1920}
                                    height={1080}
                                    className="w-full h-full object-contain transition-transform duration-200"
                                    style={{
                                        transform: `scale(${zoomLevel})`,
                                        cursor: zoomLevel > 1 ? isDragging ? 'grabbing' : 'grab' : 'default'
                                    }}
                                    priority
                                    draggable={false}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Zoom indicator */}
                    {zoomLevel > 1 && (
                        <div className="absolute top-20 left-5 z-10
                            px-4 py-2 bg-zinc-900/50 backdrop-blur-sm rounded-full
                            text-sm text-white/70 border border-white/5 shadow-lg">
                            Drag to pan
                        </div>
                    )}

                    {/* Controls */}
                    <div className="absolute bottom-0 inset-x-0 flex justify-center gap-2 px-5 py-3 
                        bg-zinc-900/50 backdrop-blur-sm border-t border-white/5">
                        <button
                            onClick={handleZoomIn}
                            className="group p-3 hover:bg-white/10 rounded-full
                                transition-all duration-300
                                text-white/70 hover:text-white
                                hover:scale-105 active:scale-90 hover:shadow-lg
                                disabled:opacity-30 disabled:cursor-not-allowed"
                            disabled={zoomLevel >= 3}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                            </svg>
                        </button>
                        <button
                            onClick={handleZoomOut}
                            className="group p-3 hover:bg-white/10 rounded-full
                                transition-all duration-300
                                text-white/70 hover:text-white
                                hover:scale-105 active:scale-90 hover:shadow-lg
                                disabled:opacity-30 disabled:cursor-not-allowed"
                            disabled={zoomLevel <= 0.5}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                            </svg>
                        </button>

                        <div className="w-px h-full bg-white/10" />

                        <button
                            onClick={() => handleDownload(selectedImage)}
                            className="group p-3 hover:bg-white/10 rounded-full
                                transition-all duration-300
                                text-white/70 hover:text-white
                                hover:scale-105 active:scale-90 hover:shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}