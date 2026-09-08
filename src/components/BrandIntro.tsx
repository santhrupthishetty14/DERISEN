import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import * as THREE from "three";

interface BrandIntroProps {
  onComplete: () => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const fullNameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);

  const cleanupRef = useRef<(() => void) | null>(null);

  const handleSkip = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
    }
  }, []);

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, 0);
    }

    document.body.style.overflow = "hidden";
    const navLogo = document.getElementById("main-nav-logo");
    if (navLogo) navLogo.style.opacity = "0";

    let isTerminated = false;
    let rafId = 0;

    const W = window.innerWidth;
    const H = window.innerHeight;

    // Three.js Scene with Studio Lighting & Soft Contact Shadows
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f8fc);

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    // Initial isometric high-angle view looking down at the ground
    camera.position.set(0, 10, 13);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xdfe6f0, 1.2);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(8, 18, 12);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 40;
    keyLight.shadow.camera.left = -10;
    keyLight.shadow.camera.right = 10;
    keyLight.shadow.camera.top = 10;
    keyLight.shadow.camera.bottom = -10;
    keyLight.shadow.bias = -0.0008;
    keyLight.shadow.radius = 4.5;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa855f7, 0.8);
    fillLight.position.set(-10, 6, 6);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x6320ee, 4, 30);
    rimLight.position.set(0, 1, -5);
    scene.add(rimLight);

    // Studio Ground Plane with Soft Shadows
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Floor Motion Guide Lines (like the video's sleek sliding tracks)
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const createTrackLine = (p1: [number, number], p2: [number, number], color: number) => {
      const pts = [
        new THREE.Vector3(p1[0], 0.02, p1[1]),
        new THREE.Vector3(p2[0], 0.02, p2[1]),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.35,
        linewidth: 2,
      });
      const line = new THREE.Line(geo, mat);
      lineGroup.add(line);
      return line;
    };

    createTrackLine([-12, -4], [-1.4, 0], 0xa855f7);
    createTrackLine([10, 8], [1.2, 0], 0x6320ee);
    createTrackLine([-8, 10], [0, 0], 0x8b5cf6);
    createTrackLine([8, -10], [2.4, 0], 0xc084fc);

    // 3D Logo Mark Assembly Pieces (High-Gloss Beveled 3D Meshes)
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Piece 1: Vertical Accent Bar (Lilac/Purple)
    const barShape = new THREE.Shape();
    barShape.moveTo(-0.2, -1.5);
    barShape.lineTo(0.2, -1.5);
    barShape.lineTo(0.2, 1.5);
    barShape.lineTo(-0.2, 1.5);
    barShape.closePath();

    const extrudeSettings = {
      depth: 0.45,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };

    const barGeo = new THREE.ExtrudeGeometry(barShape, extrudeSettings);
    const lilacMat = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      emissive: 0x581c87,
      emissiveIntensity: 0.15,
      roughness: 0.12,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
    const barMesh = new THREE.Mesh(barGeo, lilacMat);
    barMesh.castShadow = true;
    barMesh.receiveShadow = true;
    emblemGroup.add(barMesh);

    // Piece 2: Curved 'D' Bowl (Deep Royal Purple)
    const dBowlShape = new THREE.Shape();
    dBowlShape.moveTo(0, -1.5);
    dBowlShape.absarc(0, 0, 1.5, -Math.PI / 2, Math.PI / 2, false);
    dBowlShape.lineTo(0, 1.1);
    dBowlShape.absarc(0, 0, 1.1, Math.PI / 2, -Math.PI / 2, true);
    dBowlShape.closePath();

    const dBowlGeo = new THREE.ExtrudeGeometry(dBowlShape, extrudeSettings);
    const purpleMat = new THREE.MeshPhysicalMaterial({
      color: 0x4c1d95,
      emissive: 0x3b0764,
      emissiveIntensity: 0.2,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const dBowlMesh = new THREE.Mesh(dBowlGeo, purpleMat);
    dBowlMesh.castShadow = true;
    dBowlMesh.receiveShadow = true;
    emblemGroup.add(dBowlMesh);

    // Piece 3: Glowing Accent Dot '.'
    const dotGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.45, 32);
    const dotMat = new THREE.MeshPhysicalMaterial({
      color: 0x7c3aed,
      emissive: 0xa855f7,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.3,
      clearcoat: 1.0,
    });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.rotation.x = Math.PI / 2;
    dotMesh.castShadow = true;
    dotMesh.receiveShadow = true;
    emblemGroup.add(dotMesh);

    // Piece 4: Accompanying 3D Modern Prisms/Gems (like the reference video's dynamic elements)
    const gemGeo1 = new THREE.OctahedronGeometry(0.4, 0);
    const gemMat1 = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
      roughness: 0.1,
      metalness: 0.3,
      clearcoat: 1.0,
    });
    const gem1 = new THREE.Mesh(gemGeo1, gemMat1);
    gem1.castShadow = true;
    emblemGroup.add(gem1);

    const gemGeo2 = new THREE.TetrahedronGeometry(0.45, 0);
    const gemMat2 = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.3,
      roughness: 0.1,
      metalness: 0.3,
      clearcoat: 1.0,
    });
    const gem2 = new THREE.Mesh(gemGeo2, gemMat2);
    gem2.castShadow = true;
    emblemGroup.add(gem2);

    // Initial Positions (Scatter far on the floor along motion vectors)
    // Target Assembly Coordinates (positioned comfortably in upper-middle)
    const targetBar = { x: -1.6, y: 1.0, z: 0, rotY: 0, rotX: 0, rotZ: 0 };
    const targetBowl = { x: -1.4, y: 1.0, z: 0, rotY: 0, rotX: 0, rotZ: 0 };
    const targetDot = { x: 0.7, y: -0.2, z: 0, rotY: 0, rotX: 0, rotZ: 0 };
    const targetGem1 = { x: 1.9, y: 1.4, z: 0.2, rotY: 0.4, rotX: 0.3, rotZ: 0 };
    const targetGem2 = { x: -2.5, y: -0.1, z: -0.2, rotY: -0.3, rotX: 0.2, rotZ: 0 };

    // Set initial positions off-screen on the 3D ground plane
    barMesh.position.set(-11, 0.3, -5);
    barMesh.rotation.set(-Math.PI / 2, 0, -0.6);

    dBowlMesh.position.set(11, 0.3, 9);
    dBowlMesh.rotation.set(-Math.PI / 2, 0, 0.8);

    dotMesh.position.set(-5, 9, 2);
    dotMesh.rotation.set(0, 0, 0);

    gem1.position.set(10, 0.4, -8);
    gem2.position.set(-9, 0.4, 9);

    // GSAP Initial Component State
    gsap.set(textGroupRef.current, { opacity: 0, y: 30 });
    gsap.set(fullNameRef.current, { opacity: 0, scale: 0.88, filter: "blur(14px)" });
    gsap.set(subtitleRef.current, { opacity: 0, y: 18 });
    gsap.set(sheenRef.current, { xPercent: -200 });
    gsap.set(skipBtnRef.current, { opacity: 0, y: -10 });

    // Camera object for tweening
    const camTarget = {
      posX: 0, posY: 10, posZ: 13,
      lookX: 0, lookY: 0, lookZ: 0,
    };

    // Master Slow Cinematic GSAP Timeline
    const masterTl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        finishIntro();
      },
    });

    // 0. Fade in Skip button gently
    masterTl.to(skipBtnRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.4);

    // 1. STEP 1: Slow, Elegant 3D Pieces Slide In Dynamically Across Floor (0.4s - 3.4s)
    masterTl.to(
      barMesh.position,
      {
        x: targetBar.x,
        y: targetBar.y,
        z: targetBar.z,
        duration: 2.8,
        ease: "power2.out",
      },
      0.4
    );
    masterTl.to(
      barMesh.rotation,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.8,
        ease: "power2.out",
      },
      0.4
    );

    masterTl.to(
      dBowlMesh.position,
      {
        x: targetBowl.x,
        y: targetBowl.y,
        z: targetBowl.z,
        duration: 3.0,
        ease: "power2.out",
      },
      0.5
    );
    masterTl.to(
      dBowlMesh.rotation,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 3.0,
        ease: "power2.out",
      },
      0.5
    );

    // Accent gems slide and snap in slowly
    masterTl.to(
      gem1.position,
      {
        x: targetGem1.x,
        y: targetGem1.y,
        z: targetGem1.z,
        duration: 2.8,
        ease: "power2.out",
      },
      0.6
    );
    masterTl.to(
      gem2.position,
      {
        x: targetGem2.x,
        y: targetGem2.y,
        z: targetGem2.z,
        duration: 2.8,
        ease: "power2.out",
      },
      0.7
    );

    // Dot drops in from above with slow graceful bounce
    masterTl.to(
      dotMesh.position,
      {
        x: targetDot.x,
        y: targetDot.y,
        z: targetDot.z,
        duration: 2.2,
        ease: "bounce.out",
      },
      1.4
    );

    // 2. STEP 2: Camera Slowly Swoops Up from Isometric Ground Angle to Straight-On Frontal (3.2s - 6.2s)
    masterTl.to(
      camTarget,
      {
        posX: 0,
        posY: 0.4,
        posZ: W < 768 ? 9.8 : 7.6,
        lookX: 0,
        lookY: 0.4,
        lookZ: 0,
        duration: 3.0,
        ease: "power2.inOut",
      },
      3.2
    );

    // Fade out ground guide lines as camera settles
    masterTl.to(lineGroup.position, { y: -2, duration: 1.4, ease: "power2.in" }, 3.6);

    // Slow dynamic light sweep across the beveled edges
    masterTl.to(
      keyLight.position,
      {
        x: -7,
        y: 14,
        z: 15,
        duration: 2.8,
        ease: "power2.inOut",
      },
      4.0
    );

    // 3. STEP 3: Full Brand Name "De.risen" & Tagline Displays Below (As in the video) (5.4s - 8.8s)
    masterTl.to(
      textGroupRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      5.4
    );

    masterTl.to(
      fullNameRef.current,
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power2.out",
      },
      5.6
    );

    masterTl.to(
      sheenRef.current,
      {
        xPercent: 240,
        duration: 2.0,
        ease: "power2.inOut",
      },
      6.4
    );

    masterTl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.6,
        ease: "power2.out",
      },
      7.2
    );

    // 4. STEP 4: Savor & Admire the Complete Official Brand Identity in Full Glory (8.8s - 12.0s)
    masterTl.to({}, { duration: 3.2 }, 8.8);

    // 5. STEP 5: Slow, Smooth Transition to Navbar (12.0s - 13.6s)
    masterTl.to(skipBtnRef.current, { opacity: 0, duration: 0.5 }, 11.8);
    masterTl.to(subtitleRef.current, { opacity: 0, y: -8, duration: 0.6 }, 11.9);

    masterTl.to(
      textGroupRef.current,
      {
        opacity: 0,
        y: -20,
        duration: 0.9,
        ease: "power2.in",
      },
      12.0
    );

    masterTl.to(
      emblemGroup.scale,
      {
        x: 0.25,
        y: 0.25,
        z: 0.25,
        duration: 1.4,
        ease: "power2.inOut",
      },
      12.05
    );

    masterTl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      },
      12.4
    );

    const finishIntro = () => {
      if (isTerminated) return;
      isTerminated = true;

      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", handleKeyDown);

      if (navLogo) navLogo.style.opacity = "1";
      document.body.style.overflow = "";

      try {
        barGeo.dispose();
        dBowlGeo.dispose();
        dotGeo.dispose();
        gemGeo1.dispose();
        gemGeo2.dispose();
        groundGeo.dispose();
        lilacMat.dispose();
        purpleMat.dispose();
        dotMat.dispose();
        gemMat1.dispose();
        gemMat2.dispose();
        groundMat.dispose();
        renderer.dispose();
      } catch {
        // Safe disposal
      }

      setIsDone(true);
      onComplete();
    };

    cleanupRef.current = () => {
      masterTl.kill();
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: finishIntro,
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Render loop
    let elapsed = 0;
    let prevTime = performance.now();

    const renderLoop = () => {
      if (isTerminated) return;
      rafId = requestAnimationFrame(renderLoop);

      const now = performance.now();
      const dt = (now - prevTime) / 1000;
      prevTime = now;
      elapsed += dt;

      // Update camera from tween values
      camera.position.set(camTarget.posX, camTarget.posY, camTarget.posZ);
      camera.lookAt(camTarget.lookX, camTarget.lookY, camTarget.lookZ);

      // Subtle ambient hover on the gems
      gem1.rotation.x += 0.015;
      gem1.rotation.y += 0.02;
      gem2.rotation.x -= 0.012;
      gem2.rotation.z += 0.018;

      renderer.render(scene, camera);
    };
    renderLoop();

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [onComplete, handleSkip]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden select-none"
      style={{ background: "#f6f8fc" }}
    >
      {/* 3D WebGL Canvas for Logo Pieces Assembly */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none" />

      {/* Top Bar with Skip Button */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30">
        <button
          ref={skipBtnRef}
          type="button"
          onClick={handleSkip}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 backdrop-blur-md text-gray-700 hover:text-black text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          aria-label="Skip Intro Animation"
        >
          <span>Skip</span>
          <span className="text-[10px] text-gray-400 group-hover:text-gray-600 transition-colors">ESC</span>
        </button>
      </div>

      {/* Center Stage: Typography Reveal right below the 3D mark (as in the video) */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 sm:pb-28 md:pb-32 z-20 pointer-events-none">
        <div
          ref={textGroupRef}
          className="relative flex flex-col items-center justify-center text-center px-4"
        >
          {/* Full Name "De.risen" with Official Logo Asset & Specular Light Sheen */}
          <div className="relative overflow-hidden p-2 rounded-xl">
            <div ref={fullNameRef} className="relative flex items-center justify-center">
              <img
                src="/assets/derisen-logo-transparent.png"
                alt="De.risen"
                className="w-[65vw] sm:w-[48vw] md:w-[36vw] max-w-[420px] h-auto object-contain drop-shadow-[0_12px_24px_rgba(76,29,149,0.14)]"
                loading="eager"
              />

              {/* Liquid Sheen Sweep across typography */}
              <div
                ref={sheenRef}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-22deg] pointer-events-none mix-blend-overlay"
              />
            </div>
          </div>

          {/* Subtitle / Tagline display */}
          <div
            ref={subtitleRef}
            className="mt-3 sm:mt-4 flex flex-col items-center gap-1.5"
          >
            <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-[13px] font-bold tracking-[0.24em] uppercase text-brand-dark/80">
              <span className="w-4 sm:w-6 h-[1.5px] bg-brand-purple/40" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-dark via-brand-purple to-brand-violet">
                Creative Design &bull; Branding &bull; Marketing &bull; IT Solutions
              </span>
              <span className="w-4 sm:w-6 h-[1.5px] bg-brand-purple/40" />
            </div>

            <span className="text-[9.5px] sm:text-[11px] tracking-[0.38em] uppercase font-semibold text-brand-purple/70">
              Rise Above &bull; Redefine
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandIntro;