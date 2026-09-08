import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import * as THREE from "three";

interface BrandIntroProps {
  onComplete: () => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete }) => {
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
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
    const isMobile = W < 768;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f8fc);

    // Camera framed so all pieces are guaranteed visible in screen
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 5.2, isMobile ? 8.6 : 6.8);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    if (mountRef.current) {
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(renderer.domElement);
    }

    // Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 1.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 12, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const purpleLight = new THREE.DirectionalLight(0xa855f7, 1.2);
    purpleLight.position.set(-6, 5, 4);
    scene.add(purpleLight);

    const fillLight = new THREE.PointLight(0x6320ee, 2.5, 20);
    fillLight.position.set(0, 2, 4);
    scene.add(fillLight);

    // Studio Ground Plane with Shadows
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const groundGeo = new THREE.PlaneGeometry(40, 40);
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Floor Motion Guide Lines
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
        opacity: 0.45,
      });
      const line = new THREE.Line(geo, mat);
      lineGroup.add(line);
    };

    createTrackLine([-5, -2], [-1.0, 0], 0xa855f7);
    createTrackLine([5, 3], [0.8, 0], 0x6320ee);
    createTrackLine([-3, 4], [0, 0], 0x8b5cf6);
    createTrackLine([4, -3], [1.4, 0], 0x38bdf8);

    // 3D Logo Mark Assembly Pieces
    const emblemGroup = new THREE.Group();
    emblemGroup.position.set(0, 0.4, 0);
    scene.add(emblemGroup);

    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    };

    // Piece 1: Vertical Accent Bar (Lilac/Purple)
    const barShape = new THREE.Shape();
    barShape.moveTo(-0.18, -1.2);
    barShape.lineTo(0.18, -1.2);
    barShape.lineTo(0.18, 1.2);
    barShape.lineTo(-0.18, 1.2);
    barShape.closePath();

    const barGeo = new THREE.ExtrudeGeometry(barShape, extrudeSettings);
    const lilacMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x6b21a8,
      emissiveIntensity: 0.2,
      roughness: 0.15,
      metalness: 0.25,
    });
    const barMesh = new THREE.Mesh(barGeo, lilacMat);
    barMesh.castShadow = true;
    barMesh.receiveShadow = true;
    emblemGroup.add(barMesh);

    // Piece 2: Curved 'D' Bowl (Deep Royal Purple)
    const dBowlShape = new THREE.Shape();
    dBowlShape.moveTo(0, -1.2);
    dBowlShape.absarc(0, 0, 1.2, -Math.PI / 2, Math.PI / 2, false);
    dBowlShape.lineTo(0, 0.85);
    dBowlShape.absarc(0, 0, 0.85, Math.PI / 2, -Math.PI / 2, true);
    dBowlShape.closePath();

    const dBowlGeo = new THREE.ExtrudeGeometry(dBowlShape, extrudeSettings);
    const purpleMat = new THREE.MeshStandardMaterial({
      color: 0x4c1d95,
      emissive: 0x3b0764,
      emissiveIntensity: 0.25,
      roughness: 0.12,
      metalness: 0.3,
    });
    const dBowlMesh = new THREE.Mesh(dBowlGeo, purpleMat);
    dBowlMesh.castShadow = true;
    dBowlMesh.receiveShadow = true;
    emblemGroup.add(dBowlMesh);

    // Piece 3: Glowing Accent Dot '.'
    const dotGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.4, 24);
    const dotMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x9333ea,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.3,
    });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.rotation.x = Math.PI / 2;
    dotMesh.castShadow = true;
    dotMesh.receiveShadow = true;
    emblemGroup.add(dotMesh);

    // Piece 4: Accompanying 3D Modern Prisms/Gems
    const gemGeo1 = new THREE.OctahedronGeometry(0.35, 0);
    const gemMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
      roughness: 0.15,
      metalness: 0.35,
    });
    const gem1 = new THREE.Mesh(gemGeo1, gemMat1);
    gem1.castShadow = true;
    emblemGroup.add(gem1);

    const gemGeo2 = new THREE.TetrahedronGeometry(0.38, 0);
    const gemMat2 = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.3,
      roughness: 0.15,
      metalness: 0.35,
    });
    const gem2 = new THREE.Mesh(gemGeo2, gemMat2);
    gem2.castShadow = true;
    emblemGroup.add(gem2);

    // Target Assembly Positions
    const targetBar = { x: -1.2, y: 0.6, z: 0 };
    const targetBowl = { x: -1.05, y: 0.6, z: 0 };
    const targetDot = { x: 0.6, y: -0.4, z: 0 };
    const targetGem1 = { x: 1.5, y: 0.9, z: 0.1 };
    const targetGem2 = { x: -1.9, y: -0.3, z: -0.1 };

    // Initial Positions: Placed within screen boundary so motion is 100% visible
    barMesh.position.set(-4.5, 0.2, -1.8);
    barMesh.rotation.set(-Math.PI / 2, 0, -0.4);

    dBowlMesh.position.set(4.5, 0.2, 2.2);
    dBowlMesh.rotation.set(-Math.PI / 2, 0, 0.5);

    dotMesh.position.set(-2.0, 5.0, 1.0);
    dotMesh.rotation.set(0, 0, 0);

    gem1.position.set(4.0, 0.3, -2.5);
    gem2.position.set(-3.5, 0.3, 2.5);

    // GSAP Initial Component State
    gsap.set(textGroupRef.current, { opacity: 0, y: 25 });
    gsap.set(fullNameRef.current, { opacity: 0, scale: 0.9, filter: "blur(10px)" });
    gsap.set(subtitleRef.current, { opacity: 0, y: 15 });
    gsap.set(sheenRef.current, { xPercent: -200 });
    gsap.set(skipBtnRef.current, { opacity: 0, y: -10 });

    // Camera object for tweening
    const camTarget = {
      posX: 0,
      posY: 5.2,
      posZ: isMobile ? 8.6 : 6.8,
      lookX: 0,
      lookY: 0.4,
      lookZ: 0,
    };

    // Master Cinematic GSAP Timeline
    const masterTl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        finishIntro();
      },
    });

    // 0. Fade in Skip button gently
    masterTl.to(skipBtnRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.2);

    // 1. STEP 1: 3D Pieces Slide In Dynamically Across Floor (0.2s - 2.8s)
    masterTl.to(
      barMesh.position,
      {
        x: targetBar.x,
        y: targetBar.y,
        z: targetBar.z,
        duration: 2.2,
        ease: "power2.out",
      },
      0.2
    );
    masterTl.to(
      barMesh.rotation,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.2,
        ease: "power2.out",
      },
      0.2
    );

    masterTl.to(
      dBowlMesh.position,
      {
        x: targetBowl.x,
        y: targetBowl.y,
        z: targetBowl.z,
        duration: 2.3,
        ease: "power2.out",
      },
      0.25
    );
    masterTl.to(
      dBowlMesh.rotation,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.3,
        ease: "power2.out",
      },
      0.25
    );

    masterTl.to(
      gem1.position,
      {
        x: targetGem1.x,
        y: targetGem1.y,
        z: targetGem1.z,
        duration: 2.1,
        ease: "power2.out",
      },
      0.3
    );
    masterTl.to(
      gem2.position,
      {
        x: targetGem2.x,
        y: targetGem2.y,
        z: targetGem2.z,
        duration: 2.1,
        ease: "power2.out",
      },
      0.35
    );

    // Dot drops in and bounces softly
    masterTl.to(
      dotMesh.position,
      {
        x: targetDot.x,
        y: targetDot.y,
        z: targetDot.z,
        duration: 1.8,
        ease: "bounce.out",
      },
      0.8
    );

    // 2. STEP 2: Camera Smoothly Swoops Up to Front View (2.2s - 4.4s)
    masterTl.to(
      camTarget,
      {
        posX: 0,
        posY: 0.3,
        posZ: isMobile ? 8.2 : 6.0,
        lookX: 0,
        lookY: 0.3,
        lookZ: 0,
        duration: 2.2,
        ease: "power2.inOut",
      },
      2.0
    );

    // Fade out ground guide lines
    masterTl.to(lineGroup.position, { y: -2, duration: 1.2, ease: "power2.in" }, 2.4);

    // Light sweep across beveled edges
    masterTl.to(
      keyLight.position,
      {
        x: -5,
        y: 10,
        z: 10,
        duration: 2.0,
        ease: "power2.inOut",
      },
      2.5
    );

    // 3. STEP 3: Full Brand Name "De.risen" & Tagline Reveals (3.2s - 5.5s)
    masterTl.to(
      textGroupRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      },
      3.0
    );

    masterTl.to(
      fullNameRef.current,
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out",
      },
      3.1
    );

    masterTl.to(
      sheenRef.current,
      {
        xPercent: 240,
        duration: 1.4,
        ease: "power2.inOut",
      },
      3.6
    );

    masterTl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
      },
      4.0
    );

    // 4. STEP 4: Admire the Complete Brand Identity (5.0s - 7.5s)
    masterTl.to({}, { duration: 2.5 }, 5.0);

    // 5. STEP 5: Smooth Transition to Navbar (7.5s - 8.8s)
    masterTl.to(skipBtnRef.current, { opacity: 0, duration: 0.4 }, 7.3);
    masterTl.to(subtitleRef.current, { opacity: 0, y: -8, duration: 0.4 }, 7.4);

    masterTl.to(
      textGroupRef.current,
      {
        opacity: 0,
        y: -20,
        duration: 0.7,
        ease: "power2.in",
      },
      7.5
    );

    masterTl.to(
      emblemGroup.scale,
      {
        x: 0.25,
        y: 0.25,
        z: 0.25,
        duration: 1.0,
        ease: "power2.inOut",
      },
      7.6
    );

    masterTl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      7.8
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

      onComplete();
    };

    cleanupRef.current = () => {
      masterTl.kill();
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.35,
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

      camera.position.set(camTarget.posX, camTarget.posY, camTarget.posZ);
      camera.lookAt(camTarget.lookX, camTarget.lookY, camTarget.lookZ);

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

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden select-none"
      style={{ background: "#f6f8fc" }}
    >
      {/* 3D WebGL Canvas */}
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

      {/* Center Stage: Typography Reveal right below the 3D mark */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 sm:pb-24 md:pb-28 z-20 pointer-events-none">
        <div
          ref={textGroupRef}
          className="relative flex flex-col items-center justify-center text-center px-4"
        >
          {/* Full Name "De.risen" with Official Logo Image */}
          <div className="relative overflow-hidden p-2 rounded-xl">
            <div ref={fullNameRef} className="relative flex items-center justify-center">
              <img
                src="/assets/derisen-logo-transparent.png"
                alt="De.risen"
                className="w-[68vw] sm:w-[50vw] md:w-[38vw] max-w-[440px] h-auto object-contain drop-shadow-[0_12px_24px_rgba(76,29,149,0.12)]"
                loading="eager"
              />

              {/* Specular Liquid Sheen Sweep across typography */}
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