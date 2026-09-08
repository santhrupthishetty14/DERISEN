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
  const brandTitleRef = useRef<HTMLHeadingElement>(null);
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

    // 1. Pristine Studio White Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Initial Camera: Low-angle isometric floor perspective
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 4.2, isMobile ? 8.4 : 6.8);
    camera.lookAt(0, 0.2, 0);

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
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0xf1f5f9, 1.4);
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

    const softFill = new THREE.DirectionalLight(0xffffff, 1.0);
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

    // 4. Motion Trails on the Floor (thin glowing curved arcs)
    const trailGroup = new THREE.Group();
    scene.add(trailGroup);

    const yellowTrailGeo = createTrailGeometry(2.3, (140 * Math.PI) / 180, (25 * Math.PI) / 180);
    const yellowTrailMat = new THREE.LineBasicMaterial({ color: 0xfbbc05, transparent: true, opacity: 0 });
    const yellowTrail = new THREE.Line(yellowTrailGeo, yellowTrailMat);
    trailGroup.add(yellowTrail);

    const greenTrailGeo = createTrailGeometry(2.5, (220 * Math.PI) / 180, (140 * Math.PI) / 180);
    const greenTrailMat = new THREE.LineBasicMaterial({ color: 0x34a853, transparent: true, opacity: 0 });
    const greenTrail = new THREE.Line(greenTrailGeo, greenTrailMat);
    trailGroup.add(greenTrail);

    const blueTrailGeo = createTrailGeometry(2.4, (315 * Math.PI) / 180, (220 * Math.PI) / 180);
    const blueTrailMat = new THREE.LineBasicMaterial({ color: 0x4285f4, transparent: true, opacity: 0 });
    const blueTrail = new THREE.Line(blueTrailGeo, blueTrailMat);
    trailGroup.add(blueTrail);

    const redTrailGeo = createTrailGeometry(2.2, 0, (315 * Math.PI) / 180);
    const redTrailMat = new THREE.LineBasicMaterial({ color: 0xea4335, transparent: true, opacity: 0 });
    const redTrail = new THREE.Line(redTrailGeo, redTrailMat);
    trailGroup.add(redTrail);

    // 5. Google 3D G Letter Emblem Assembly
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

    // Google Brand Materials (Rich candy-gloss finish with high clearcoat)
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

    const yellowMat = createSegmentMaterial(0xfbbc05); // Google Yellow
    const greenMat = createSegmentMaterial(0x34a853);  // Google Green
    const blueMat = createSegmentMaterial(0x4285f4);   // Google Blue
    const redMat = createSegmentMaterial(0xea4335);    // Google Red

    const yellowGeo = new THREE.ExtrudeGeometry(shapes.yellow, extrudeSettings);
    const greenGeo = new THREE.ExtrudeGeometry(shapes.green, extrudeSettings);
    const blueGeo = new THREE.ExtrudeGeometry(shapes.blue, extrudeSettings);
    const redGeo = new THREE.ExtrudeGeometry(shapes.red, extrudeSettings);

    const yellowMesh = new THREE.Mesh(yellowGeo, yellowMat);
    const greenMesh = new THREE.Mesh(greenGeo, greenMat);
    const blueMesh = new THREE.Mesh(blueGeo, blueMat);
    const redMesh = new THREE.Mesh(redGeo, redMat);

    [yellowMesh, greenMesh, blueMesh, redMesh].forEach((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    // Parent group for complete assembled emblem
    const googleGroup = new THREE.Group();
    googleGroup.add(yellowMesh);
    googleGroup.add(greenMesh);
    googleGroup.add(blueMesh);
    googleGroup.add(redMesh);
    scene.add(googleGroup);

    // Initial state: lying in perspective on the floor
    googleGroup.position.set(0, 0.22, 0);
    googleGroup.rotation.set(-Math.PI / 2.3, 0, 0);

    // Spread the 4 pieces outwards along the floor initially (like the reference video at 06.6s)
    yellowMesh.position.set(-1.4, 0.05, -1.2);
    yellowMesh.rotation.z = 0.35;

    greenMesh.position.set(-2.0, 0.05, 0.8);
    greenMesh.rotation.z = -0.4;

    blueMesh.position.set(0.9, 0.05, 1.5);
    blueMesh.rotation.z = 0.5;

    redMesh.position.set(2.2, 0.05, -0.4);
    redMesh.rotation.z = -0.3;

    // GSAP DOM Initial States
    gsap.set(textGroupRef.current, { opacity: 0, y: 25 });
    gsap.set(brandTitleRef.current, { opacity: 0, y: 15, letterSpacing: "0.15em" });
    gsap.set(taglineRef.current, { opacity: 0, y: 10, letterSpacing: "0.22em" });
    gsap.set(sublineRef.current, { opacity: 0, y: 8 });
    gsap.set(skipBtnRef.current, { opacity: 0, y: -10 });

    const camTarget = {
      posX: 0,
      posY: 4.2,
      posZ: isMobile ? 8.4 : 6.8,
      lookX: 0,
      lookY: 0.2,
      lookZ: 0,
    };

    // Master Timeline
    const masterTl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        finishIntro();
      },
    });

    // Show Skip Button
    masterTl.to(skipBtnRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.2);

    // Reveal motion trail lines on the floor
    masterTl.to(
      [yellowTrailMat, greenTrailMat, blueTrailMat, redTrailMat],
      { opacity: 0.65, duration: 0.8, ease: "power2.out" },
      0.2
    );

    // ==========================================
    // Phase 1: Pieces Slide In Along Floor Tracks (0.4s - 3.0s)
    // ==========================================
    masterTl.to(
      yellowMesh.position,
      { x: 0, y: 0, z: 0, duration: 2.6, ease: "power3.out" },
      0.4
    );
    masterTl.to(
      yellowMesh.rotation,
      { z: 0, duration: 2.6, ease: "power3.out" },
      0.4
    );

    masterTl.to(
      greenMesh.position,
      { x: 0, y: 0, z: 0, duration: 2.6, ease: "power3.out" },
      0.45
    );
    masterTl.to(
      greenMesh.rotation,
      { z: 0, duration: 2.6, ease: "power3.out" },
      0.45
    );

    masterTl.to(
      blueMesh.position,
      { x: 0, y: 0, z: 0, duration: 2.6, ease: "power3.out" },
      0.5
    );
    masterTl.to(
      blueMesh.rotation,
      { z: 0, duration: 2.6, ease: "power3.out" },
      0.5
    );

    masterTl.to(
      redMesh.position,
      { x: 0, y: 0, z: 0, duration: 2.6, ease: "power3.out" },
      0.55
    );
    masterTl.to(
      redMesh.rotation,
      { z: 0, duration: 2.6, ease: "power3.out" },
      0.55
    );

    // Fade out trails as pieces dock
    masterTl.to(
      [yellowTrailMat, greenTrailMat, blueTrailMat, redTrailMat],
      { opacity: 0, duration: 0.8, ease: "power2.in" },
      2.0
    );

    // ==========================================
    // Phase 2: Docking Settle & Liquid Glass Highlight (2.7s - 4.2s)
    // ==========================================
    // Subtle locking bounce
    masterTl.to(
      googleGroup.scale,
      { x: 1.04, y: 1.04, z: 1.04, duration: 0.25, ease: "power1.out" },
      2.9
    );
    masterTl.to(
      googleGroup.scale,
      { x: 1.0, y: 1.0, z: 1.0, duration: 0.45, ease: "power2.inOut" },
      3.15
    );

    // Liquid Glass Sheen Light Sweep
    sheenLight.intensity = 3.5;
    masterTl.fromTo(
      sheenLight.position,
      { x: -5, y: 2.5, z: 3 },
      { x: 5, y: 2.5, z: 3, duration: 1.6, ease: "power2.inOut" },
      2.8
    );
    masterTl.to(sheenLight, { intensity: 0, duration: 0.4 }, 4.0);

    // ==========================================
    // Phase 3: Standing Upright & Front Elevation (3.0s - 5.8s)
    // ==========================================
    masterTl.to(
      googleGroup.rotation,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.8,
        ease: "power2.inOut",
      },
      3.0
    );

    masterTl.to(
      googleGroup.position,
      {
        x: 0,
        y: 0.95,
        z: 0,
        duration: 2.8,
        ease: "power2.inOut",
      },
      3.0
    );

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
        duration: 2.8,
        ease: "power2.inOut",
      },
      3.0
    );

    // Keylight adjusts to illuminate the front face
    masterTl.to(
      keyLight.position,
      { x: -4, y: 10, z: 8, duration: 2.6, ease: "power2.inOut" },
      3.2
    );

    // ==========================================
    // Phase 4: Brand Typography Reveal Below Assembled Emblem (4.8s - 7.0s)
    // ==========================================
    masterTl.to(
      textGroupRef.current,
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      4.8
    );

    masterTl.to(
      brandTitleRef.current,
      {
        opacity: 1,
        y: 0,
        letterSpacing: "0.28em",
        duration: 1.4,
        ease: "power2.out",
      },
      5.0
    );

    masterTl.to(
      taglineRef.current,
      {
        opacity: 1,
        y: 0,
        letterSpacing: "0.32em",
        duration: 1.5,
        ease: "power2.out",
      },
      5.4
    );

    masterTl.to(
      sublineRef.current,
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      5.8
    );

    // ==========================================
    // Phase 5: Savor Reveal & Transition to Website (7.0s - 9.2s)
    // ==========================================
    masterTl.to({}, { duration: 1.8 }, 7.0);

    masterTl.to(skipBtnRef.current, { opacity: 0, duration: 0.3 }, 8.5);
    masterTl.to(
      textGroupRef.current,
      { opacity: 0, y: -12, duration: 0.6, ease: "power2.in" },
      8.6
    );

    masterTl.to(
      googleGroup.scale,
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
        yellowGeo.dispose();
        greenGeo.dispose();
        blueGeo.dispose();
        redGeo.dispose();
        yellowMat.dispose();
        greenMat.dispose();
        blueMat.dispose();
        redMat.dispose();
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
      {/* 3D WebGL Canvas for Google 3D Reveal */}
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

      {/* Center Stage: Typography Reveal beneath the standing 3D Google Emblem */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 sm:pb-24 md:pb-28 z-20 pointer-events-none">
        <div
          ref={textGroupRef}
          className="relative flex flex-col items-center justify-center text-center px-4"
        >
          {/* Main Brand Title */}
          <h1
            ref={brandTitleRef}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.28em] uppercase text-[#1e293b]"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            DE<span className="text-[#4285f4]">.</span>RISEN
          </h1>

          {/* Subtitle / Tagline display */}
          <p
            ref={taglineRef}
            className="mt-3 text-[11px] sm:text-[13px] font-bold tracking-[0.32em] uppercase text-gray-600"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            Creative Design &bull; Branding &bull; Marketing &bull; IT Solutions
          </p>

          <p
            ref={sublineRef}
            className="mt-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.4em] uppercase text-[#4285f4]"
          >
            Rise Above &bull; Redefine
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandIntro;