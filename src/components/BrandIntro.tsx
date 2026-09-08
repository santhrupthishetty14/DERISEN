import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { createGoogleGShapes, createTrailGeometry } from "../utils/googleLogoShapes";

interface BrandIntroProps {
  onComplete: () => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const dotStageRef = useRef<HTMLDivElement>(null);
  const dotCharRef = useRef<HTMLSpanElement>(null);
  const dePrefixRef = useRef<HTMLSpanElement>(null);
  const risenSuffixRef = useRef<HTMLSpanElement>(null);
  const logoImageRef = useRef<HTMLImageElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);

  const skipRef = useRef<(() => void) | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const handleSkip = useCallback(() => {
    if (skipRef.current) {
      skipRef.current();
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

    // 1. Pristine Studio White Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Initial Camera: Isometric floor perspective
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 4.4, isMobile ? 8.6 : 7.0);
    camera.lookAt(0, 0.3, 0);

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
    renderer.toneMappingExposure = 1.18;

    if (mountRef.current) {
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(renderer.domElement);
    }

    // 2. High-End Studio Lighting for Glossy Acrylic
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0xf8fafc, 1.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(6, 12, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.0008;
    keyLight.shadow.radius = 3.0;
    scene.add(keyLight);

    const softFill = new THREE.DirectionalLight(0xede9fe, 1.2);
    softFill.position.set(-6, 8, -4);
    scene.add(softFill);

    // Moving Specular Sheen Light (glides across the curved bevels)
    const sheenLight = new THREE.PointLight(0xffffff, 0, 15);
    sheenLight.position.set(-6, 2.5, 4);
    scene.add(sheenLight);

    // 3. Studio White Floor with Soft Contact Shadow
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const groundGeo = new THREE.PlaneGeometry(50, 50);
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.005;
    ground.receiveShadow = true;
    scene.add(ground);

    // 4. Large 3D Glossy Brand Dot (Lands First Center Stage)
    // Radius ~0.42 glossy sphere in signature brand plum #490365
    const dotGeo = new THREE.SphereGeometry(0.42, 36, 36);
    const dotMat = new THREE.MeshPhysicalMaterial({
      color: 0x490365, // Deep Brand Plum from logo
      roughness: 0.05,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.95,
    });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.castShadow = true;
    dotMesh.receiveShadow = true;
    scene.add(dotMesh);

    // Starts high up above the floor
    dotMesh.position.set(0, 4.5, 0);
    dotMesh.scale.set(1.4, 1.4, 1.4);

    // 5. Motion Trails on the Floor in Brand Colors (#7C3AED, #B063FF, #490365, #6320EE)
    const trailGroup = new THREE.Group();
    scene.add(trailGroup);

    const trailGeo1 = createTrailGeometry(2.3, (140 * Math.PI) / 180, (25 * Math.PI) / 180);
    const trailMat1 = new THREE.LineBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0 });
    const trail1 = new THREE.Line(trailGeo1, trailMat1);
    trailGroup.add(trail1);

    const trailGeo2 = createTrailGeometry(2.5, (220 * Math.PI) / 180, (140 * Math.PI) / 180);
    const trailMat2 = new THREE.LineBasicMaterial({ color: 0xb063ff, transparent: true, opacity: 0 });
    const trail2 = new THREE.Line(trailGeo2, trailMat2);
    trailGroup.add(trail2);

    const trailGeo3 = createTrailGeometry(2.4, (315 * Math.PI) / 180, (220 * Math.PI) / 180);
    const trailMat3 = new THREE.LineBasicMaterial({ color: 0x490365, transparent: true, opacity: 0 });
    const trail3 = new THREE.Line(trailGeo3, trailMat3);
    trailGroup.add(trail3);

    const trailGeo4 = createTrailGeometry(2.2, 0, (315 * Math.PI) / 180);
    const trailMat4 = new THREE.LineBasicMaterial({ color: 0x6320ee, transparent: true, opacity: 0 });
    const trail4 = new THREE.Line(trailGeo4, trailMat4);
    trailGroup.add(trail4);

    // 6. 3D Emblem Segments Assembly in Exact Brand Colors
    const shapes = createGoogleGShapes(1.55, 0.85);
    const extrudeSettings = {
      depth: 0.38,
      bevelEnabled: true,
      bevelSegments: 10,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
      curveSegments: 36,
    };

    const createSegmentMaterial = (colorHex: number) => {
      return new THREE.MeshPhysicalMaterial({
        color: colorHex,
        roughness: 0.06,
        metalness: 0.04,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        reflectivity: 0.95,
      });
    };

    // Official De.risen Brand Colors:
    // - Violet: #7C3AED
    // - Electric Lavender: #B063FF
    // - Deep Plum: #490365
    // - Signature Purple: #6320EE
    const segmentMat1 = createSegmentMaterial(0x7c3aed);
    const segmentMat2 = createSegmentMaterial(0xb063ff);
    const segmentMat3 = createSegmentMaterial(0x490365);
    const segmentMat4 = createSegmentMaterial(0x6320ee);

    const geo1 = new THREE.ExtrudeGeometry(shapes.yellow, extrudeSettings);
    const geo2 = new THREE.ExtrudeGeometry(shapes.green, extrudeSettings);
    const geo3 = new THREE.ExtrudeGeometry(shapes.blue, extrudeSettings);
    const geo4 = new THREE.ExtrudeGeometry(shapes.red, extrudeSettings);

    const mesh1 = new THREE.Mesh(geo1, segmentMat1);
    const mesh2 = new THREE.Mesh(geo2, segmentMat2);
    const mesh3 = new THREE.Mesh(geo3, segmentMat3);
    const mesh4 = new THREE.Mesh(geo4, segmentMat4);

    [mesh1, mesh2, mesh3, mesh4].forEach((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    // Parent group for complete assembled emblem
    const emblemGroup = new THREE.Group();
    emblemGroup.add(mesh1);
    emblemGroup.add(mesh2);
    emblemGroup.add(mesh3);
    emblemGroup.add(mesh4);
    scene.add(emblemGroup);

    // Initial state: emblem lying in perspective on the floor
    emblemGroup.position.set(0, 0.22, 0);
    emblemGroup.rotation.set(-Math.PI / 2.3, 0, 0);

    // Spread the 4 pieces outwards along the floor initially
    mesh1.position.set(-1.8, 0.05, -1.6);
    mesh1.rotation.z = 0.35;

    mesh2.position.set(-2.4, 0.05, 1.0);
    mesh2.rotation.z = -0.4;

    mesh3.position.set(1.2, 0.05, 1.8);
    mesh3.rotation.z = 0.5;

    mesh4.position.set(2.6, 0.05, -0.6);
    mesh4.rotation.z = -0.3;

    // GSAP DOM Initial States
    gsap.set(textGroupRef.current, { opacity: 0, y: 25 });
    gsap.set(dotStageRef.current, { opacity: 0, scale: 0 });
    gsap.set(dotCharRef.current, { scale: 0, transformOrigin: "center center" });
    gsap.set(dePrefixRef.current, { opacity: 0, x: -20 });
    gsap.set(risenSuffixRef.current, { opacity: 0, x: 20 });
    gsap.set(logoImageRef.current, { opacity: 0, scale: 0.95 });
    gsap.set(taglineRef.current, { opacity: 0, y: 10, letterSpacing: "0.22em" });
    gsap.set(sublineRef.current, { opacity: 0, y: 8 });
    gsap.set(skipBtnRef.current, { opacity: 0, y: -10 });

    const camTarget = {
      posX: 0,
      posY: 4.4,
      posZ: isMobile ? 8.6 : 7.0,
      lookX: 0,
      lookY: 0.3,
      lookZ: 0,
    };

    // Master Timeline
    const masterTl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        finishIntro();
      },
    });

    // Show Skip Button
    masterTl.to(skipBtnRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.2);

    // ==========================================
    // Phase 0: LARGE DOT FIRST (0.2s - 1.8s)
    // The glossy 3D Brand Dot drops in first with a soft contact bounce
    // ==========================================
    masterTl.to(
      dotMesh.position,
      {
        y: 0.42,
        duration: 1.2,
        ease: "bounce.out",
      },
      0.2
    );

    masterTl.to(
      dotMesh.scale,
      {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 1.0,
        ease: "power2.out",
      },
      0.3
    );

    // Reveal motion trail lines on the floor as the dot lands
    masterTl.to(
      [trailMat1, trailMat2, trailMat3, trailMat4],
      { opacity: 0.7, duration: 0.6, ease: "power2.out" },
      0.9
    );

    // ==========================================
    // Phase 1: Pieces Slide In Around the Dot (1.4s - 3.4s)
    // ==========================================
    masterTl.to(
      mesh1.position,
      { x: 0, y: 0, z: 0, duration: 2.2, ease: "power3.out" },
      1.3
    );
    masterTl.to(
      mesh1.rotation,
      { z: 0, duration: 2.2, ease: "power3.out" },
      1.3
    );

    masterTl.to(
      mesh2.position,
      { x: 0, y: 0, z: 0, duration: 2.2, ease: "power3.out" },
      1.35
    );
    masterTl.to(
      mesh2.rotation,
      { z: 0, duration: 2.2, ease: "power3.out" },
      1.35
    );

    masterTl.to(
      mesh3.position,
      { x: 0, y: 0, z: 0, duration: 2.2, ease: "power3.out" },
      1.4
    );
    masterTl.to(
      mesh3.rotation,
      { z: 0, duration: 2.2, ease: "power3.out" },
      1.4
    );

    masterTl.to(
      mesh4.position,
      { x: 0, y: 0, z: 0, duration: 2.2, ease: "power3.out" },
      1.45
    );
    masterTl.to(
      mesh4.rotation,
      { z: 0, duration: 2.2, ease: "power3.out" },
      1.45
    );

    // Fade out trails as pieces dock
    masterTl.to(
      [trailMat1, trailMat2, trailMat3, trailMat4],
      { opacity: 0, duration: 0.7, ease: "power2.in" },
      2.6
    );

    // Dot integrates into assembled emblem
    masterTl.to(
      dotMesh.position,
      { y: 0.22, duration: 1.2, ease: "power2.inOut" },
      2.0
    );
    masterTl.to(
      dotMesh.scale,
      { x: 0.65, y: 0.65, z: 0.65, duration: 1.2, ease: "power2.inOut" },
      2.0
    );

    // ==========================================
    // Phase 2: Docking Settle & Liquid Glass Highlight (3.0s - 4.4s)
    // ==========================================
    masterTl.to(
      emblemGroup.scale,
      { x: 1.04, y: 1.04, z: 1.04, duration: 0.22, ease: "power1.out" },
      3.1
    );
    masterTl.to(
      emblemGroup.scale,
      { x: 1.0, y: 1.0, z: 1.0, duration: 0.4, ease: "power2.inOut" },
      3.32
    );

    // Liquid Glass Sheen Light Sweep across bevels
    sheenLight.intensity = 3.8;
    masterTl.fromTo(
      sheenLight.position,
      { x: -5, y: 2.5, z: 3 },
      { x: 5, y: 2.5, z: 3, duration: 1.6, ease: "power2.inOut" },
      3.0
    );
    masterTl.to(sheenLight, { intensity: 0, duration: 0.4 }, 4.2);

    // ==========================================
    // Phase 3: Standing Upright & Front Elevation (3.2s - 5.8s)
    // ==========================================
    masterTl.to(
      emblemGroup.rotation,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.6,
        ease: "power2.inOut",
      },
      3.2
    );

    masterTl.to(
      emblemGroup.position,
      {
        x: 0,
        y: 0.95,
        z: 0,
        duration: 2.6,
        ease: "power2.inOut",
      },
      3.2
    );

    // Fade out standalone 3D floor dot as emblem rises
    masterTl.to(dotMesh.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: "power2.in" }, 3.2);

    // Camera smoothly adjusts to front elevation view
    masterTl.to(
      camTarget,
      {
        posX: 0,
        posY: 0.55,
        posZ: isMobile ? 8.2 : 6.4,
        lookX: 0,
        lookY: 0.55,
        lookZ: 0,
        duration: 2.6,
        ease: "power2.inOut",
      },
      3.2
    );

    masterTl.to(
      keyLight.position,
      { x: -4, y: 10, z: 8, duration: 2.4, ease: "power2.inOut" },
      3.4
    );

    // ==========================================
    // Phase 4: TYPOGRAPHY: LARGE DOT FIRST, LATER FOLLOWED BY DERISEN (4.6s - 7.0s)
    // ==========================================
    masterTl.to(
      textGroupRef.current,
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      4.6
    );

    // 1. Large Dot reveals first
    masterTl.to(
      dotStageRef.current,
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
      4.7
    );
    masterTl.to(
      dotCharRef.current,
      { scale: 1.4, duration: 0.4, ease: "back.out(2)" },
      4.7
    );

    // 2. "De." joins the dot
    masterTl.to(
      dePrefixRef.current,
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
      5.1
    );

    // 3. "risen" slides out followed after the dot!
    masterTl.to(
      risenSuffixRef.current,
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
      5.4
    );

    // 4. Smooth transition into the exact crisp official logo asset
    masterTl.to(
      logoImageRef.current,
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
      5.9
    );
    masterTl.to(
      dotStageRef.current,
      { opacity: 0, duration: 0.3, ease: "power1.out" },
      6.0
    );

    // Tagline & Subline reveal
    masterTl.to(
      taglineRef.current,
      {
        opacity: 1,
        y: 0,
        letterSpacing: "0.32em",
        duration: 1.2,
        ease: "power2.out",
      },
      5.8
    );

    masterTl.to(
      sublineRef.current,
      { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
      6.2
    );

    // ==========================================
    // Phase 5: Savor Reveal & Transition to Website (7.2s - 9.2s)
    // ==========================================
    masterTl.to({}, { duration: 1.8 }, 7.2);

    masterTl.to(skipBtnRef.current, { opacity: 0, duration: 0.3 }, 8.5);
    masterTl.to(
      textGroupRef.current,
      { opacity: 0, y: -12, duration: 0.6, ease: "power2.in" },
      8.6
    );

    masterTl.to(
      emblemGroup.scale,
      { x: 0.22, y: 0.22, z: 0.22, duration: 0.85, ease: "power2.inOut" },
      8.7
    );

    masterTl.to(
      containerRef.current,
      { opacity: 0, duration: 0.7, ease: "power2.inOut" },
      8.9
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
        dotGeo.dispose();
        dotMat.dispose();
        geo1.dispose();
        geo2.dispose();
        geo3.dispose();
        geo4.dispose();
        segmentMat1.dispose();
        segmentMat2.dispose();
        segmentMat3.dispose();
        segmentMat4.dispose();
        groundGeo.dispose();
        groundMat.dispose();
        renderer.dispose();
      } catch {
        // Safe disposal
      }

      onCompleteRef.current();
    };

    skipRef.current = () => {
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
        skipRef.current?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // 60FPS Render Loop
    const renderLoop = () => {
      if (isTerminated) return;
      rafId = requestAnimationFrame(renderLoop);

      camera.position.set(camTarget.posX, camTarget.posY, camTarget.posZ);
      camera.lookAt(camTarget.lookX, camTarget.lookY, camTarget.lookZ);

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
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", handleKeyDown);
      masterTl.kill();
      try {
        renderer.dispose();
      } catch {
        // Safe disposal
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden select-none"
      style={{ background: "#ffffff" }}
    >
      {/* 3D WebGL Canvas for 3D Brand Logo Reveal */}
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

      {/* Center Stage: Large Dot First, Later Followed by Derisen */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 sm:pb-24 md:pb-28 z-20 pointer-events-none">
        <div
          ref={textGroupRef}
          className="relative flex flex-col items-center justify-center text-center px-4"
        >
          {/* Main Logo Reveal Stage */}
          <div className="relative flex items-center justify-center h-16 sm:h-20 min-w-[280px]">
            {/* 1. Sequential Text Reveal: Large Dot First, Later Followed by Derisen */}
            <div
              ref={dotStageRef}
              className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-black tracking-normal"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              <span ref={dePrefixRef} className="text-[#490365]">
                De
              </span>
              <span
                ref={dotCharRef}
                className="inline-block text-[#490365] mx-0.5 transform font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none"
              >
                .
              </span>
              <span ref={risenSuffixRef} className="text-[#b063ff]">
                risen
              </span>
            </div>

            {/* 2. Official Brand Logo Image seamlessly settled */}
            <img
              ref={logoImageRef}
              src="/assets/derisen-logo-transparent.png"
              alt="De.risen"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain drop-shadow-sm transition-all"
            />
          </div>

          {/* Subtitle / Tagline display */}
          <p
            ref={taglineRef}
            className="mt-4 text-[11px] sm:text-[13px] font-bold tracking-[0.32em] uppercase text-gray-700"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            Creative Design &bull; Branding &bull; Marketing &bull; IT Solutions
          </p>

          <p
            ref={sublineRef}
            className="mt-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.4em] uppercase text-[#6320ee]"
          >
            Rise Above &bull; Redefine
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandIntro;