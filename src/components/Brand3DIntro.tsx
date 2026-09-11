import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

interface Brand3DIntroProps {
  onComplete: () => void;
}

export const Brand3DIntro: React.FC<Brand3DIntroProps> = ({ onComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
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

    // 1. Pristine Studio White Scene Setup (Exact Reference Video Style)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Initial Camera: Dramatic slow-moving isometric perspective looking down at floor
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camera.position.set(0, 3.6, isMobile ? 8.4 : 7.0);
    camera.lookAt(0, 0.35, 0);

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
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(renderer.domElement);
    }

    // 2. High-End Studio Lighting for 3D Glossy Acrylic & Metal
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0xf1f5f9, 1.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(6, 11, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 28;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.0006;
    keyLight.shadow.radius = 3.5;
    scene.add(keyLight);

    const softFill = new THREE.DirectionalLight(0xede9fe, 1.15);
    softFill.position.set(-6, 7, -3);
    scene.add(softFill);

    // Dynamic Moving Specular Sheen Light (glides across the 3D letters)
    const sheenLight = new THREE.PointLight(0xffffff, 0, 16);
    sheenLight.position.set(-6, 2.2, 3.5);
    scene.add(sheenLight);

    // 3. Studio White Floor with Soft Contact Shadows
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.005;
    ground.receiveShadow = true;
    scene.add(ground);

    // Soft Ambient Floor Reflection Glow
    const floorGlowGeo = new THREE.PlaneGeometry(8, 8);
    const floorGlowCanvas = document.createElement("canvas");
    floorGlowCanvas.width = 128;
    floorGlowCanvas.height = 128;
    const ctx = floorGlowCanvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(99, 32, 238, 0.12)");
      grad.addColorStop(0.5, "rgba(176, 99, 255, 0.05)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const floorGlowTex = new THREE.CanvasTexture(floorGlowCanvas);
    const floorGlowMat = new THREE.MeshBasicMaterial({
      map: floorGlowTex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const floorGlow = new THREE.Mesh(floorGlowGeo, floorGlowMat);
    floorGlow.rotation.x = -Math.PI / 2;
    floorGlow.position.y = 0.001;
    scene.add(floorGlow);

    // 4. Large 3D Glossy Brand Dot
    const dotGeo = new THREE.SphereGeometry(0.38, 48, 48);
    const dotMat = new THREE.MeshPhysicalMaterial({
      color: 0x490365, // Official De.risen Deep Brand Plum
      roughness: 0.04,
      metalness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.95,
    });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.castShadow = true;
    dotMesh.receiveShadow = true;
    scene.add(dotMesh);

    // Starts high up above the floor
    dotMesh.position.set(-0.92, 4.6, -1.2);
    dotMesh.scale.set(1.4, 1.4, 1.4);

    // Floor Shockwave Ripple Rings
    const rippleGeo = new THREE.RingGeometry(0.1, 0.18, 48);
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0x6320ee,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ripple = new THREE.Mesh(rippleGeo, rippleMat);
    ripple.rotation.x = -Math.PI / 2;
    ripple.position.y = 0.002;
    scene.add(ripple);

    // 5. Parent 3D Group for the Assembled Name
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);
    logoGroup.position.set(0, 0.22, 0);
    logoGroup.rotation.set(-Math.PI / 2.3, 0, 0);

    const deGroup = new THREE.Group();
    const risenGroup = new THREE.Group();
    logoGroup.add(deGroup);
    logoGroup.add(risenGroup);

    // Brand Materials for Real 3D Extruded Letters
    const plumMat = new THREE.MeshPhysicalMaterial({
      color: 0x3d0059, // Official De.risen Deep Plum
      roughness: 0.04,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.95,
    });

    const lilacMat = new THREE.MeshPhysicalMaterial({
      color: 0xb063ff, // Electric Lavender / Lilac Accent
      roughness: 0.03,
      metalness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.95,
    });

    const violetMat = new THREE.MeshPhysicalMaterial({
      color: 0x9333ea, // Vibrant Electric Violet for "risen"
      roughness: 0.04,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.95,
    });

    // 6. Ambient 3D Floating Metallic Purple Spheres
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const createMetallicSphere = (color: number, size: number, x: number, y: number, z: number) => {
      const geo = new THREE.SphereGeometry(size, 32, 32);
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.08,
        metalness: 0.4,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        reflectivity: 0.95,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      sphereGroup.add(mesh);
      return mesh;
    };

    const sphere1 = createMetallicSphere(0x934bf8, 0.35, -3.8, 1.4, 1.2); // Left
    const sphere2 = createMetallicSphere(0x6320ee, 0.28, 3.8, 2.6, -1.2); // Top-Right
    const sphere3 = createMetallicSphere(0x7e34f4, 0.30, 4.2, 0.9, 1.6);  // Far Right

    let clock = 0;

    // 7. Floor Motion Trails (Reference Video Curved Paths)
    const createTrail = (curvePts: THREE.Vector3[], color: number) => {
      const curve = new THREE.CatmullRomCurve3(curvePts);
      const points = curve.getPoints(48);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0 });
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      return { line, mat, geo };
    };

    const trail1 = createTrail(
      [
        new THREE.Vector3(-7.5, 0.01, -3.2),
        new THREE.Vector3(-5.2, 0.01, -1.8),
        new THREE.Vector3(-3.2, 0.01, -0.6),
        new THREE.Vector3(-2.15, 0.01, 0),
      ],
      0x490365
    );
    const trail2 = createTrail(
      [
        new THREE.Vector3(7.5, 0.01, 3.2),
        new THREE.Vector3(5.2, 0.01, 1.8),
        new THREE.Vector3(3.2, 0.01, 0.6),
        new THREE.Vector3(1.25, 0.01, 0),
      ],
      0xb063ff
    );

    // GSAP Initial States
    gsap.set(textGroupRef.current, { opacity: 0, y: 16 });
    gsap.set(taglineRef.current, { opacity: 0, y: 10, letterSpacing: "0.22em" });
    gsap.set(sublineRef.current, { opacity: 0, y: 8 });
    gsap.set(skipBtnRef.current, { opacity: 0, y: -10 });

    const camTarget = {
      posX: 0,
      posY: 3.6,
      posZ: isMobile ? 8.4 : 7.0,
      lookX: 0,
      lookY: 0.35,
      lookZ: 0,
    };

    let masterTl: gsap.core.Timeline | null = null;

    // Synchronous Font Load & Build so NO POPPING occurs
    fetch("/assets/droid_sans_bold.typeface.json")
      .then((res) => res.json())
      .then((fontJson) => {
        if (isTerminated) return;

        const font = new FontLoader().parse(fontJson);

        const textConfig = {
          font,
          size: 1.18,
          depth: 0.32,
          curveSegments: 16,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.035,
          bevelSegments: 5,
        };

        // 1. 3D "De" Geometry
        const deGeo = new TextGeometry("De", textConfig);
        deGeo.computeBoundingBox();
        const deBox = deGeo.boundingBox!;
        const deW = deBox.max.x - deBox.min.x;
        deGeo.translate(-deBox.min.x - deW / 2, -deBox.min.y, 0);

        const deMesh = new THREE.Mesh(deGeo, plumMat);
        deMesh.castShadow = true;
        deMesh.receiveShadow = true;
        deGroup.add(deMesh);

        // Lilac vertical accent bar on the left of "D"
        const accentGeo = new THREE.CylinderGeometry(0.09, 0.09, 1.22, 24);
        accentGeo.translate(0, 0.61, 0);
        const accentMesh = new THREE.Mesh(accentGeo, lilacMat);
        accentMesh.position.set(-deW / 2 - 0.12, 0, 0.16);
        accentMesh.castShadow = true;
        accentMesh.receiveShadow = true;
        deGroup.add(accentMesh);

        // 2. 3D "risen" Geometry
        const risenGeo = new TextGeometry("risen", textConfig);
        risenGeo.computeBoundingBox();
        const risenBox = risenGeo.boundingBox!;
        const risenW = risenBox.max.x - risenBox.min.x;
        risenGeo.translate(-risenBox.min.x - risenW / 2, -risenBox.min.y, 0);

        const risenMesh = new THREE.Mesh(risenGeo, violetMat);
        risenMesh.castShadow = true;
        risenMesh.receiveShadow = true;
        risenGroup.add(risenMesh);

        // Target coordinates when docked in the center:
        const dotGap = 0.46;
        const totalWidth = deW + 0.16 + dotGap + risenW;
        const startX = -totalWidth / 2;

        const targetDeX = startX + deW / 2 + 0.12;
        const targetDotX = startX + deW + 0.16 + dotGap / 2;
        const targetRisenX = startX + deW + 0.16 + dotGap + risenW / 2;
        const targetDotY = 0.16;

        // Start pieces FAR OFF-SCREEN in perspective for the sleepy curved entrance:
        deGroup.position.set(-7.5, 0, -3.2);
        deGroup.rotation.set(0, 0.3, 0.55);

        risenGroup.position.set(7.5, 0, 3.2);
        risenGroup.rotation.set(0, -0.3, -0.55);

        // Master Timeline Choreography:
        // Slow, elegant, sleepy cinematic motion FIRST before revealing the name
        masterTl = gsap.timeline({
          delay: 0.15,
          onComplete: () => {
            finishIntro();
          },
        });

        // Show Skip Button early
        masterTl.to(skipBtnRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.2);

        // =========================================================================
        // Phase 1: SLEEPY CINEMATIC MOTION (0.2s - 4.2s)
        // Pieces glide in slow, graceful, sweeping arcs across the white floor
        // =========================================================================

        // Motion trails glow on the white floor
        masterTl.to([trail1.mat, trail2.mat], { opacity: 0.7, duration: 0.8, ease: "power2.out" }, 0.2);
        masterTl.to(floorGlowMat, { opacity: 0.85, duration: 1.0, ease: "power2.out" }, 0.4);

        // 3D Brand Dot drops gracefully from the top with slow momentum
        masterTl.to(
          dotMesh.position,
          {
            y: 0.38,
            duration: 1.6,
            ease: "power2.inOut",
          },
          0.3
        );
        masterTl.to(
          dotMesh.scale,
          {
            x: 1.0,
            y: 1.0,
            z: 1.0,
            duration: 1.4,
            ease: "power2.out",
          },
          0.4
        );

        // Floor shockwave ripple expands gently
        masterTl.fromTo(
          ripple.scale,
          { x: 0.2, y: 0.2, z: 0.2 },
          { x: 8.5, y: 8.5, z: 8.5, duration: 1.6, ease: "power2.out" },
          1.2
        );
        masterTl.fromTo(
          rippleMat,
          { opacity: 0.65 },
          { opacity: 0, duration: 1.6, ease: "power2.out" },
          1.2
        );

        // 3D "De" glides in a sleepy, graceful curved path from the far left
        masterTl.to(
          deGroup.position,
          {
            x: targetDeX,
            z: 0,
            duration: 3.4,
            ease: "power2.inOut",
          },
          0.4
        );
        masterTl.to(
          deGroup.rotation,
          {
            y: 0,
            z: 0,
            duration: 3.4,
            ease: "power2.inOut",
          },
          0.4
        );

        // 3D "risen" glides in a sleepy, graceful curved path from the far right
        masterTl.to(
          risenGroup.position,
          {
            x: targetRisenX,
            z: 0,
            duration: 3.4,
            ease: "power2.inOut",
          },
          0.45
        );
        masterTl.to(
          risenGroup.rotation,
          {
            y: 0,
            z: 0,
            duration: 3.4,
            ease: "power2.inOut",
          },
          0.45
        );

        // 3D Brand Dot gently glides and docks right into its baseline spot
        masterTl.to(
          dotMesh.position,
          {
            x: targetDotX,
            y: 0.16,
            z: 0.16,
            duration: 2.2,
            ease: "power2.inOut",
          },
          1.6
        );
        masterTl.to(
          dotMesh.scale,
          {
            x: 0.42,
            y: 0.42,
            z: 0.42,
            duration: 2.2,
            ease: "power2.inOut",
          },
          1.6
        );

        // Camera slowly floats and drifts in perspective (sleepy cinematic camera)
        masterTl.to(
          camTarget,
          {
            posX: 0,
            posY: 3.4,
            posZ: isMobile ? 8.0 : 6.6,
            duration: 3.4,
            ease: "sine.inOut",
          },
          0.4
        );

        // Fade out floor trails as pieces converge
        masterTl.to([trail1.mat, trail2.mat], { opacity: 0, duration: 0.8, ease: "power2.in" }, 3.0);

        // =========================================================================
        // Phase 2: DOCKING SETTLE & SPECULAR SHEEN SWEEP (3.6s - 4.8s)
        // =========================================================================
        masterTl.to(
          logoGroup.scale,
          { x: 1.04, y: 1.04, z: 1.04, duration: 0.28, ease: "power1.out" },
          3.7
        );
        masterTl.to(
          logoGroup.scale,
          { x: 1.0, y: 1.0, z: 1.0, duration: 0.45, ease: "power2.inOut" },
          3.98
        );

        // Brilliant Specular Sheen Light slowly glides across the beveled acrylic letters
        sheenLight.intensity = 4.2;
        masterTl.fromTo(
          sheenLight.position,
          { x: -6.5, y: 2.0, z: 3.2 },
          { x: 6.5, y: 2.0, z: 3.2, duration: 1.8, ease: "power2.inOut" },
          3.6
        );
        masterTl.to(sheenLight, { intensity: 0, duration: 0.5 }, 5.2);

        // =========================================================================
        // Phase 3: MAJESTIC STAND-UP TO FRONT ELEVATION (4.4s - 6.8s)
        // (The assembled 3D logo tilts upright facing the camera!)
        // =========================================================================
        masterTl.to(
          logoGroup.rotation,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 2.4,
            ease: "power2.inOut",
          },
          4.4
        );

        masterTl.to(
          logoGroup.position,
          {
            x: 0,
            y: 0.75,
            z: 0,
            duration: 2.4,
            ease: "power2.inOut",
          },
          4.4
        );

        // Dot rises synchronously with the 3D logo
        masterTl.to(
          dotMesh.position,
          {
            x: targetDotX,
            y: 0.75 + targetDotY,
            z: 0.16,
            duration: 2.4,
            ease: "power2.inOut",
          },
          4.4
        );

        // Camera smoothly glides into commanding front hero elevation
        masterTl.to(
          camTarget,
          {
            posX: 0,
            posY: 0.55,
            posZ: isMobile ? 7.6 : 5.8,
            lookX: 0,
            lookY: 0.55,
            lookZ: 0,
            duration: 2.4,
            ease: "power2.inOut",
          },
          4.4
        );

        masterTl.to(
          keyLight.position,
          { x: -4, y: 9, z: 7, duration: 2.4, ease: "power2.inOut" },
          4.5
        );

        // =========================================================================
        // Phase 4: ONLY NOW REVEAL COMPLETE TYPOGRAPHY (6.0s - 8.0s)
        // (As requested: "SLEEPY CINEMATIC MOTION 1ST BEFORE SHOWING THE COMPLETE NAME")
        // =========================================================================
        masterTl.to(
          textGroupRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          6.0
        );

        masterTl.to(
          taglineRef.current,
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.32em",
            duration: 1.2,
            ease: "power2.out",
          },
          6.2
        );

        masterTl.to(
          sublineRef.current,
          { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
          6.6
        );

        // =========================================================================
        // Phase 5: Transition into Website (8.0s - 9.6s)
        // =========================================================================
        masterTl.to({}, { duration: 1.4 }, 7.8);

        masterTl.to(skipBtnRef.current, { opacity: 0, duration: 0.3 }, 8.8);
        masterTl.to(
          textGroupRef.current,
          { opacity: 0, y: -10, duration: 0.6, ease: "power2.in" },
          8.9
        );

        masterTl.to(
          logoGroup.scale,
          { x: 0.22, y: 0.22, z: 0.22, duration: 0.75, ease: "power2.inOut" },
          9.0
        );
        masterTl.to(
          dotMesh.scale,
          { x: 0.08, y: 0.08, z: 0.08, duration: 0.75, ease: "power2.inOut" },
          9.0
        );

        masterTl.to(
          containerRef.current,
          { opacity: 0, duration: 0.6, ease: "power2.inOut" },
          9.2
        );
      });

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
        plumMat.dispose();
        lilacMat.dispose();
        violetMat.dispose();
        groundGeo.dispose();
        groundMat.dispose();
        floorGlowGeo.dispose();
        floorGlowMat.dispose();
        floorGlowTex.dispose();
        rippleGeo.dispose();
        rippleMat.dispose();
        trail1.geo.dispose();
        trail1.mat.dispose();
        trail2.geo.dispose();
        trail2.mat.dispose();
        renderer.dispose();
      } catch {
        // Safe disposal
      }

      onCompleteRef.current();
    };

    skipRef.current = () => {
      masterTl?.kill();
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

    // 60FPS Render Loop with Dynamic Ambient Sphere Bobbing
    const renderLoop = () => {
      if (isTerminated) return;
      rafId = requestAnimationFrame(renderLoop);

      clock += 0.015;
      sphere1.position.y = 1.4 + Math.sin(clock * 1.2) * 0.12;
      sphere2.position.y = 2.6 + Math.cos(clock * 0.9) * 0.14;
      sphere3.position.y = 0.9 + Math.sin(clock * 1.5 + 1) * 0.10;

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
      document.body.style.overflow = "";
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", handleKeyDown);
      masterTl?.kill();
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
      onClick={handleSkip}
      className="fixed inset-0 z-[100] overflow-hidden select-none cursor-pointer"
      style={{ background: "#ffffff" }}
    >
      {/* 3D WebGL Canvas for Sleepy Cinematic 3D De.risen Logo Assembly */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none" />

      {/* Top Bar with Skip Button and Mobile Notice */}
      <div className="absolute top-5 left-5 right-5 sm:top-8 sm:right-8 z-30 flex items-center justify-between pointer-events-auto">
        <span className="sm:hidden text-[10px] font-bold text-gray-500 tracking-wider uppercase bg-black/5 px-3 py-1 rounded-full border border-black/10">
          Tap to skip
        </span>
        <button
          ref={skipBtnRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="ml-auto group flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 backdrop-blur-md text-gray-700 hover:text-black text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          aria-label="Skip Intro Animation"
        >
          <span>Skip</span>
          <span className="text-[10px] text-gray-400 group-hover:text-gray-600 transition-colors">ESC</span>
        </button>
      </div>

      {/* Bottom Center: Tagline & Positioning Statement (Revealed ONLY after 3D assembly!) */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 sm:pb-18 md:pb-20 z-20 pointer-events-none">
        <div
          ref={textGroupRef}
          className="relative flex flex-col items-center justify-center text-center px-4"
        >
          <p
            ref={taglineRef}
            className="text-[11px] sm:text-[13px] md:text-[14px] font-bold tracking-[0.32em] uppercase text-gray-800"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            Creative Design &bull; Branding &bull; Marketing &bull; IT Solutions
          </p>

          <p
            ref={sublineRef}
            className="mt-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.42em] uppercase text-[#6320ee]"
          >
            Rise Above &bull; Redefine
          </p>
        </div>
      </div>
    </div>
  );
};

export default Brand3DIntro;
