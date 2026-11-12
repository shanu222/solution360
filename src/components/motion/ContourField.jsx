import { motion, useReducedMotion, useSpring } from "framer-motion";
import { memo, useEffect } from "react";
import { contourLevels, contourPaths, stations } from "../../data/contours";

/**
 * Topographic contour map of a procedural terrain (see scripts/generate-contours.py).
 * Every fifth line is an index contour, drawn heavier, as on a survey sheet.
 *
 * draw        lines trace themselves in on mount, lowest ground first
 * interactive the map drifts a few pixels against the pointer
 * showStations pulsing monitoring points on the summits
 */
function ContourField({ draw = false, interactive = false, showStations = false, className = "" }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 40, damping: 18 });
  const y = useSpring(0, { stiffness: 40, damping: 18 });

  useEffect(() => {
    if (!interactive || reduce) return undefined;
    const onMove = (event) => {
      x.set((event.clientX / window.innerWidth - 0.5) * -18);
      y.set((event.clientY / window.innerHeight - 0.5) * -12);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive, reduce, x, y]);

  const animateDraw = draw && !reduce;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute -inset-[3%] h-[106%] w-[106%]"
        style={{ x, y }}
      >
        <g fill="none" strokeLinejoin="round" strokeLinecap="round">
          {contourPaths.map((path, index) => {
            const isIndex = path.l % 5 === 0;
            return (
              <path
                key={index}
                d={path.d}
                pathLength={1}
                stroke={isIndex ? "var(--contour-strong)" : "var(--contour)"}
                strokeWidth={isIndex ? 1.4 : 0.9}
                vectorEffect="non-scaling-stroke"
                className={animateDraw ? "contour-draw" : undefined}
                style={animateDraw ? { animationDelay: `${120 + (path.l / contourLevels) * 1300}ms` } : undefined}
              />
            );
          })}
        </g>
        {showStations &&
          stations.map(([cx, cy], index) => (
            <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
              <circle
                r="5"
                fill="var(--station)"
                className="origin-center animate-station [transform-box:fill-box]"
                style={{ animationDelay: `${index * 0.55}s` }}
              />
              <circle r="4" fill="var(--station)" />
              <circle r="9" fill="none" stroke="var(--station)" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
            </g>
          ))}
      </motion.svg>
    </div>
  );
}

export default memo(ContourField);
