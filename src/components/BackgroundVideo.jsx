export default function BackgroundVideo() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-800" />

      <video
        className="h-full w-full object-cover"
        src="/videos/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      />

      <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 transition-colors duration-300" />
    </div>
  );
}
