import * as THREE from 'three';

export interface GoogleSegmentShapes {
  yellow: THREE.Shape;
  green: THREE.Shape;
  blue: THREE.Shape;
  red: THREE.Shape;
}

/**
 * Creates the exact mathematical 2D shapes for the 4 iconic segments
 * of the Google "G" 3D emblem matching the reference video:
 * - Yellow: Top arc (from 140° down to 25°)
 * - Green: Left arc (from 220° up to 140°)
 * - Blue: Bottom arc (from 315° over to 220°)
 * - Red: Horizontal crossbar and lower-right arc (from 0° down to 315°)
 */
export function createGoogleGShapes(R = 1.6, r = 0.88): GoogleSegmentShapes {
  const barThickness = R - r; // ~0.72
  const hBar = barThickness / 2; // ~0.36

  // 1. Yellow (Top Arc: 140° down to 25°)
  const yellow = new THREE.Shape();
  const aY1 = (140 * Math.PI) / 180;
  const aY2 = (25 * Math.PI) / 180;
  yellow.absarc(0, 0, R, aY1, aY2, true);
  yellow.lineTo(r * Math.cos(aY2), r * Math.sin(aY2));
  yellow.absarc(0, 0, r, aY2, aY1, false);
  yellow.closePath();

  // 2. Green (Left Arc: 220° up to 140°)
  const green = new THREE.Shape();
  const aG1 = (220 * Math.PI) / 180;
  const aG2 = (140 * Math.PI) / 180;
  green.absarc(0, 0, R, aG1, aG2, false);
  green.lineTo(r * Math.cos(aG2), r * Math.sin(aG2));
  green.absarc(0, 0, r, aG2, aG1, true);
  green.closePath();

  // 3. Blue (Bottom Arc: 315° / -45° over to 220°)
  const blue = new THREE.Shape();
  const aB1 = (315 * Math.PI) / 180;
  const aB2 = (220 * Math.PI) / 180;
  blue.absarc(0, 0, R, aB1, aB2, true);
  blue.lineTo(r * Math.cos(aB2), r * Math.sin(aB2));
  blue.absarc(0, 0, r, aB2, aB1, false);
  blue.closePath();

  // 4. Red (Crossbar + Lower Right Arc)
  // Crossbar goes from center (0, y) out to R.
  // Then outer arc curves down to 315° (-45°).
  // Then meets inner arc and returns to (0, -hBar).
  const red = new THREE.Shape();
  red.moveTo(0, hBar);
  red.lineTo(R, hBar);
  const aR2 = (315 * Math.PI) / 180;
  red.absarc(0, 0, R, 0, aR2, true);
  red.lineTo(r * Math.cos(aR2), r * Math.sin(aR2));
  const aInnerBot = -Math.asin(Math.min(0.99, hBar / r));
  red.absarc(0, 0, r, aR2, aInnerBot, false);
  red.lineTo(0, -hBar);
  red.closePath();

  return { yellow, green, blue, red };
}

/**
 * Creates motion trail curve geometries for the sliding pieces on the floor
 */
export function createTrailGeometry(radius: number, startAngle: number, endAngle: number): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const segments = 48;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const a = startAngle + t * (endAngle - startAngle);
    points.push(new THREE.Vector3(radius * Math.cos(a), 0.005, radius * Math.sin(a)));
  }
  return new THREE.BufferGeometry().setFromPoints(points);
}
