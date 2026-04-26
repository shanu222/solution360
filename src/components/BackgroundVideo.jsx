export default function BackgroundVideo() {
  return (
    <div className="pointer-events-none fixed top-0 left-0 h-full w-full -z-10 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="background-video-element h-full w-full object-cover"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 h-full w-full bg-black/40" />
    </div>
  );
}
