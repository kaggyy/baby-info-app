'use client';

// top in vh (Figma frame height 883px)
// left = fraction * (90vw - 600px) where fraction = figma_center_x / 696
//   → calc(fraction*90 vw - fraction*600 px)
//   left panel width at 1440px = 90%*1440 - 600 = 696px (reference)
// width in vw (Figma frame width 1440px)
const LEAVES: { src: string; top: number; left: string; width: number; rotate: number }[] = [
  { src: '/leaf-01.png', top: 30.24, left: 'calc(14.03vw -  93.5px)', width: 2.57, rotate:   0 },
  { src: '/leaf-02.png', top: 69.08, left: 'calc(11.25vw -  75.0px)', width: 4.03, rotate:   0 },
  { src: '/leaf-03.png', top: 85.79, left: 'calc(36.08vw - 240.5px)', width: 2.64, rotate: -39.29 },
  { src: '/leaf-04.png', top: 67.84, left: 'calc(71.20vw - 474.6px)', width: 2.29, rotate:   0 },
  { src: '/leaf-05.png', top: 31.14, left: 'calc(68.80vw - 458.6px)', width: 3.06, rotate:   0 },
  { src: '/leaf-06.png', top: 10.53, left: 'calc(66.08vw - 440.5px)', width: 2.08, rotate:   0 },
];

export default function LeafBackground() {
  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {LEAVES.map((leaf, i) => (
        <img
          key={i}
          src={leaf.src}
          alt=""
          style={{
            position: 'absolute',
            top: `${leaf.top}vh`,
            left: leaf.left,
            width: `${leaf.width}vw`,
            height: 'auto',
            transform: `translate(-50%, -50%)${leaf.rotate !== 0 ? ` rotate(${leaf.rotate}deg)` : ''}`,
          }}
        />
      ))}
    </div>
  );
}
