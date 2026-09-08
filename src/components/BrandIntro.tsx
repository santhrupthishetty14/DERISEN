import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import * as THREE from "three";

interface BrandIntroProps {
  onComplete: () => void;
}

// Generates the rich purple-to-magenta gradient texture matching the reference video
function createGradientTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 512, 512, 0);
    grad.addColorStop(0, "#4c1d95");
    grad.addColorStop(0.3, "#6320ee");
    grad.addColorStop(0.65, "#a855f7");
    grad.addColorStop(1, "#d946ef");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const brandNameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
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

    // Pure Studio White Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera initial high-angle perspective looking down at emblem lying on the ground
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 3.8, isMobile ? 6.2 : 5.0);
    camera.lookAt(0, 0.1, 0);

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
    renderer.toneMappingExposure = 1.1;

    if (mountRef.current) {
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(renderer.domElement);
    }

    // High-End Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xf1f5f9, 1.3);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.bias = -0.0008;
    keyLight.shadow.radius = 3.5;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd946ef, 1.2);
    rimLight.position.set(-5, 6, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xa855f7, 2.0, 15);
    fillLight.position.set(0, 3, 4);
    scene.add(fillLight);

    // Studio White Ground Plane with Soft Contact Shadows
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // 3D Emblem Geometry (Curved teardrop/loop shape matching reference video)
    const emblemShape = new THREE.Shape();
    emblemShape.moveTo(0, -1.4);
    emblemShape.bezierCurveTo(1.6, -1.4, 2.1, -0.3, 1.7, 0.7);
    emblemShape.bezierCurveTo(1.4, 1.6, 0.5, 1.9, -0.2, 1.55);
    emblemShape.bezierCurveTo(-1.1, 1.9, -1.8, 1.0, -1.8, 0);
    emblemShape.bezierCurveTo(-1.8, -0.9, -1.0, -1.4, 0, -1.4);

    const hole = new THREE.Path();
    hole.moveTo(0, -0.7);
    hole.bezierCurveTo(0.8, -0.7, 1.0, -0.15, 0.85, 0.35);
    hole.bezierCurveTo(0.7, 0.8, 0.25, 0.95, -0.1, 0.75);
    hole.bezierCurveTo(-0.5, 0.95, -0.9, 0.5, -0.9, 0);
    hole.bezierCurveTo(-0.9, -0.45, -0.5, -0.7, 0, -0.7);
    emblemShape.holes.push(hole);

    const extrudeSettings = {
      depth: 0.38,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };

    const emblemGeo = new THREE.ExtrudeGeometry(emblemShape, extrudeSettings);
    emblemGeo.center();

    const gradientTexture = createGradientTexture();

    const emblemMat = new THREE.MeshPhysicalMaterial({
      map: gradientTexture,
      roughness: 0.12,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.85,
    });

    const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
    emblemMesh.castShadow = true;
    emblemMesh.receiveShadow = true;

    // The Emblem Pivot Group
    const emblemGroup = new THREE.Group();
    emblemGroup.add(emblemMesh);
    scene.add(emblemGroup);

    // Initial State: Emblem lies flat in 3D perspective on the floor (like ref_frame_04)
    emblemGroup.position.set(0, 0.22, 0);
    emblemGroup.rotation.set(-Math.PI / 2.3, 0, -0.32);

    // GSAP Initial Component State
    gsap.set(textGroupRef.current, { opacity: 0, y: 25 });
    gsap.set(brandNameRef.current, { opacity: 0, y: 15, letterSpacing: "0.1em" });
    gsap.set(taglineRef.current, { opacity: 0, y: 10 });
    gsap.set(skipBtnRef.current, { opacity: 0, y: -10 });

    // Camera object for tweening
    const camTarget = {
      posX: 0,
      posY: 3.8,
      posZ: isMobile ? 6.2 : 5.0,
      lookX: 0,
      lookY: 0.1,
      lookZ: 0,
    };

    // Master Cinematic GSAP Timeline (matching reference video pacing ~8.2s)
    const masterTl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        finishIntro();
      },
    });

    // 0. Fade in Skip button
    masterTl.to(skipBtnRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.3);

    // Phase 1: Subtle initial floating oscillation while lying in perspective on the floor (0.0s - 2.0s)
    masterTl.to(
      emblemGroup.rotation,
      {
        z: -0.28,
        duration: 2.0,
        ease: "sine.inOut",
      },
      0.2
    );

    // Phase 2: 3D Emblem Smoothly Rotates & Stands Up Right (2.2s - 4.8s) (Matches ref_frame_06 to 09)
    masterTl.to(
      emblemGroup.rotation,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.6,
        ease: "power2.inOut",
      },
      2.2
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
      2.2
    );

    // Camera smoothly adjusts to center the standing 3D emblem straight-on
    masterTl.to(
      camTarget,
      {
        posX: 0,
        posY: 0.5,
        posZ: isMobile ? 5.8 : 4.6,
        lookX: 0,
        lookY: 0.5,
        lookZ: 0,
        duration: 2.6,
        ease: "power2.inOut",
      },
      2.2
    );

    // Specular light sweep across top curved bevel as it rises
    masterTl.to(
      keyLight.position,
      {
        x: -4,
        y: 11,
        z: 8,
        duration: 2.4,
        ease: "power2.inOut",
      },
      2.8
    );

    // Phase 3: Brand Name & Tagline Expands Smoothly Below (4.6s - 6.5s) (Matches ref_frame_10 & 11)
    masterTl.to(
      textGroupRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      4.6
    );

    masterTl.to(
      brandNameRef.current,
      {
        opacity: 1,
        y: 0,
        letterSpacing: "0.38em",
        duration: 1.6,
        ease: "power2.out",
      },
      4.8
    );

    masterTl.to(
      taglineRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      5.4
    );

    // Phase 4: Savor the Complete 3D Brand Reveal (6.5s - 8.2s)
    masterTl.to({}, { duration: 1.8 }, 6.5);

    // Phase 5: Smooth Glide into Navbar
    masterTl.to(skipBtnRef.current, { opacity: 0, duration: 0.3 }, 8.0);
    masterTl.to(
      textGroupRef.current,
      {
        opacity: 0,
        y: -15,
        duration: 0.6,
        ease: "power2.in",
      },
      8.1
    );

    masterTl.to(
      emblemGroup.scale,
      {
        x: 0.22,
        y: 0.22,
        z: 0.22,
        duration: 0.9,
        ease: "power2.inOut",
      },
      8.2
    );

    masterTl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      },
      8.4
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
        emblemGeo.dispose();
        emblemMat.dispose();
        gradientTexture.dispose();
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

    // Render loop
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
      {/* 3D WebGL Canvas for 3D Emblem Standing Up */}
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

      {/* Center Stage: Typography Reveal right below the standing 3D emblem (matches ref_frame_10 & 11) */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 sm:pb-28 md:pb-32 z-20 pointer-events-none">
        <div
          ref={textGroupRef}
          className="relative flex flex-col items-center justify-center text-center px-4"
        >
          {/* Brand Name Typography */}
          <h1
            ref={brandNameRef}
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-brand-dark transition-all duration-300"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              letterSpacing: "0.38em",
            }}
          >
            De<span className="text-brand-purple">.</span>risen
          </h1>

          {/* Subtitle / Tagline display */}
          <p
            ref={taglineRef}
            className="mt-3 sm:mt-4 text-[10px] sm:text-[12px] font-bold tracking-[0.3em] uppercase text-brand-purple/80"
          >
            Creative Design &bull; Branding &bull; Marketing &bull; IT Solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandIntro;