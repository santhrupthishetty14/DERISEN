import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

interface BrandIntroProps {
  onComplete: () => void;
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const BRAND_COLORS = [0x6320ee, 0x803bf5, 0xa855f7, 0x5219c6, 0xc084fc];

const GEOMETRIES = [
  () => new THREE.BoxGeometry(1, 1, 1),
  () => new THREE.OctahedronGeometry(0.65),
  () => new THREE.IcosahedronGeometry(0.6, 0),
  () => new THREE.TetrahedronGeometry(0.75),
  () => new THREE.BoxGeometry(1.4, 0.2, 0.2),
  () => new THREE.BoxGeometry(0.2, 1.4, 0.2),
  () => new THREE.CylinderGeometry(0.1, 0.4, 1, 6),
];

interface Piece {
  mesh: THREE.Mesh;
  tx: number; ty: number; tz: number;
  sx: number; sy: number; sz: number;
  rx: number; ry: number; rz: number;
  progress: { v: number };
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.scrollY > 40) {
      setIsDone(true);
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";
    const navLogo = document.getElementById("main-nav-logo");
    if (navLogo) navLogo.style.opacity = "0";

    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 300);
    camera.position.set(0, 0, 14);

    // Lighting setup for white background
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(6, 8, 10);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x6320ee, 5, 40);
    fillLight.position.set(-8, 2, 6);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xa855f7, 3, 50);
    rimLight.position.set(0, -4, -10);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xc084fc, 4, 20);
    accentLight.position.set(0, 0, 8);
    scene.add(accentLight);

    const PIECE_COUNT = 55;
    const pieces: Piece[] = [];
    const logoWorldW = 9;
    const logoWorldH = 2.5;

    for (let i = 0; i < PIECE_COUNT; i++) {
      const geoFactory = GEOMETRIES[Math.floor(Math.random() * GEOMETRIES.length)];
      const geo = geoFactory();
      const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];

      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        metalness: 0.4,
        roughness: 0.3,
        transparent: true,
        opacity: 0.92,
      });

      const scale = rand(0.25, 1.1);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.setScalar(scale);
      mesh.castShadow = true;

      const tx = rand(-logoWorldW / 2, logoWorldW / 2);
      const ty = rand(-logoWorldH / 2, logoWorldH / 2);
      const tz = rand(-1.5, 1.5);

      const angle = Math.random() * Math.PI * 2;
      const elevAngle = rand(-Math.PI / 2.5, Math.PI / 2.5);
      const dist = rand(22, 50);
      const sx = Math.cos(angle) * Math.cos(elevAngle) * dist;
      const sy = Math.sin(elevAngle) * dist;
      const sz = Math.sin(angle) * Math.cos(elevAngle) * dist - 15;

      mesh.position.set(sx, sy, sz);
      scene.add(mesh);

      pieces.push({
        mesh, tx, ty, tz, sx, sy, sz,
        rx: rand(-0.025, 0.025),
        ry: rand(-0.025, 0.025),
        rz: rand(-0.015, 0.015),
        progress: { v: 0 },
      });
    }

    gsap.set(logoWrapperRef.current, { opacity: 0, scale: 0.88 });
    gsap.set(sheenRef.current, { xPercent: -180 });
    gsap.set(kickerRef.current, { opacity: 0, y: 14 });

    let rafId = 0;

    const masterTl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        if (navLogo) navLogo.style.opacity = "1";
        document.body.style.overflow = "";
        cancelAnimationFrame(rafId);
        renderer.dispose();
        setIsDone(true);
        onComplete();
      },
    });

    pieces.forEach((p, i) => {
      masterTl.to(p.progress, { v: 1, duration: rand(1.0, 1.6), ease: "power3.out" }, i * 0.012);
    });

    masterTl.to(renderer.domElement, { opacity: 0, duration: 0.7, ease: "power2.in" }, 1.4);
    masterTl.to(logoWrapperRef.current, { opacity: 1, scale: 1, duration: 0.75, ease: "power3.out" }, 1.5);
    masterTl.to(sheenRef.current, { xPercent: 220, duration: 0.7, ease: "power2.inOut" }, 2.1);
    masterTl.to(kickerRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 2.2);
    masterTl.to({}, { duration: 0.3 }, 2.75);
    masterTl.to(kickerRef.current, { opacity: 0, y: -8, duration: 0.28, ease: "power2.in" }, 2.9);
    masterTl.to(
      logoWrapperRef.current,
      {
        scale: () => {
          const t = document.getElementById("main-nav-logo");
          if (t && logoImgRef.current) {
            const nw = t.getBoundingClientRect().width;
            const iw = logoImgRef.current.getBoundingClientRect().width;
            return nw && iw ? nw / iw : 0.22;
          }
          return 0.22;
        },
        x: () => {
          const t = document.getElementById("main-nav-logo");
          if (t && logoImgRef.current) {
            const nr = t.getBoundingClientRect();
            const lr = logoImgRef.current.getBoundingClientRect();
            return (nr.left + nr.width / 2) - (lr.left + lr.width / 2);
          }
          return -window.innerWidth / 2 + 80;
        },
        y: () => {
          const t = document.getElementById("main-nav-logo");
          if (t && logoImgRef.current) {
            const nr = t.getBoundingClientRect();
            const lr = logoImgRef.current.getBoundingClientRect();
            return (nr.top + nr.height / 2) - (lr.top + lr.height / 2);
          }
          return -window.innerHeight / 2 + 45;
        },
        duration: 0.65,
        ease: "power3.inOut",
      },
      2.95
    );
    masterTl.to(containerRef.current, { opacity: 0, duration: 0.45, ease: "power2.inOut" }, 3.15);

    let elapsed = 0;
    let prevTime = performance.now();

    const lerp3 = (a: number, b: number, t: number) => a + (b - a) * t;

    const renderLoop = () => {
      rafId = requestAnimationFrame(renderLoop);
      const now = performance.now();
      const dt = (now - prevTime) / 1000;
      prevTime = now;
      elapsed += dt;

      accentLight.position.x = Math.sin(elapsed * 0.9) * 7;
      accentLight.position.y = Math.cos(elapsed * 0.7) * 4;
      accentLight.position.z = 8 + Math.sin(elapsed * 0.5) * 3;

      camera.position.x = Math.sin(elapsed * 0.3) * 0.4;
      camera.position.y = Math.cos(elapsed * 0.25) * 0.25;

      for (const p of pieces) {
        const prog = p.progress.v;
        const eased = prog < 0.5
          ? 4 * prog * prog * prog
          : 1 - Math.pow(-2 * prog + 2, 3) / 2;

        p.mesh.position.x = lerp3(p.sx, p.tx, eased);
        p.mesh.position.y = lerp3(p.sy, p.ty, eased);
        p.mesh.position.z = lerp3(p.sz, p.tz, eased);

        const spin = 1 - eased * 0.85;
        p.mesh.rotation.x += p.rx * spin;
        p.mesh.rotation.y += p.ry * spin;
        p.mesh.rotation.z += p.rz * spin;

        if (eased > 0.9) {
          const pulse = 1 + Math.sin(elapsed * 3 + p.tx) * 0.03 * (eased - 0.9) * 10;
          const base = (p.mesh.userData.baseScale as number) ?? p.mesh.scale.x;
          p.mesh.userData.baseScale = base;
          p.mesh.scale.setScalar(base * pulse);
        }

        const mat = p.mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.3 + Math.sin(elapsed * 2 + p.ty) * 0.1;
      }

      renderer.render(scene, camera);
    };
    renderLoop();

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      masterTl.kill();
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      document.body.style.overflow = "";
      if (navLogo) navLogo.style.opacity = "1";
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-none select-none"
      style={{ background: "#ffffff" }}
    >
      {/* Three.js WebGL canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Soft purple ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(99,32,238,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Real logo — revealed after 3D convergence */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div
          ref={logoWrapperRef}
          className="relative flex flex-col items-center justify-center origin-center will-change-transform"
        >
          <div className="relative overflow-hidden p-2 rounded-2xl">
            <img
              ref={logoImgRef}
              src="/assets/derisen-logo-transparent.png"
              alt="De.risen"
              className="w-[72vw] sm:w-[54vw] md:w-[42vw] max-w-[500px] h-auto object-contain drop-shadow-[0_12px_32px_rgba(99,32,238,0.18)]"
              loading="eager"
            />
            <div
              ref={sheenRef}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-22deg] pointer-events-none mix-blend-overlay"
            />
          </div>
          <div
            ref={kickerRef}
            className="mt-4 sm:mt-5 flex items-center gap-2.5 sm:gap-3 text-[10.5px] sm:text-[12px] font-black uppercase tracking-[0.26em] text-brand-dark/70"
          >
            <span className="w-4 sm:w-6 h-[1.5px] bg-brand-purple/40" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-dark via-brand-purple to-brand-violet">
              Creative Design &bull; Branding &bull; Digital Marketing &bull; IT Solutions
            </span>
            <span className="w-4 sm:w-6 h-[1.5px] bg-brand-purple/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandIntro;