/** A phone mockup screen (already framed in the artwork), with a soft contact shadow. */
function PhoneShot({ src, alt = "", className = "", eager = false }) {
  return (
    <img
      src={src}
      alt={alt}
      width="227"
      height="460"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable="false"
      className={`pointer-events-none h-auto select-none drop-shadow-[0_24px_30px_rgba(8,20,38,0.35)] ${className}`}
    />
  );
}

export default PhoneShot;
