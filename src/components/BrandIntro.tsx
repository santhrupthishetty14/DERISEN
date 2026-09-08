import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { createDeRisenLogoShapes } from "../utils/logoShapes";

interface BrandIntroProps {
  onComplete: () => void;
}

// Generates the rich purple-to-magenta-violet gradient texture
function createGradientTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 1024, 0);
    grad.addColorStop(0, "#3b0764");
    grad.addColorStop(0.18, "#6320ee");
    grad.addColorStop(0.45, "#8b5cf6");
    grad.addColorStop(0.72, "#a855f7");
    grad.addColorStop(1, "#d946ef");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete }) => {
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

    // Pure Studio White Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera initial high-angle perspective looking down at 3D De.risen logo on the floor
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 4.4, isMobile ? 8.4 : 6.8);
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
    renderer.toneMappingExposure = 1.15;

    if (mountRef.current) {
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(renderer.domElement);
    }

    // High-End Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xf8fafc, 1.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(6, 12, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -7;
    keyLight.shadow.camera.right = 7;
    keyLight.shadow.camera.top = 7;
    keyLight.shadow.camera.bottom = -7;
    keyLight.shadow.bias = -0.001;
    keyLight.shadow.radius = 3.5;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd946ef, 1.2);
    rimLight.position.set(-6, 7, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x8b5cf6, 2.2, 18);
    fillLight.position.set(0, 3, 5);
    scene.add(fillLight);

    // Studio White Ground Plane with Soft Contact Shadows
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const groundGeo = new THREE.PlaneGeometry(40, 40);
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Exact Official De.risen 3D Extruded Logo
    const logoShapes = createDeRisenLogoShapes();
    const extrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const logoGeo = new THREE.ExtrudeGeometry(logoShapes, extrudeSettings);
    logoGeo.center();

    const gradientTexture = createGradientTexture();

    const logoMat = new THREE.MeshPhysicalMaterial({
      map: gradientTexture,
      roughness: 0.12,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.9,
    });

    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.castShadow = true;
    logoMesh.receiveShadow = true;

    // Logo Pivot Group
    const logoGroup = new THREE.Group();
    logoGroup.add(logoMesh);
    scene.add(logoGroup);

    // Initial State: 3D De.risen Logo lies flat in perspective on the floor (like the reference video)
    logoGroup.position.set(0, 0.22, 0);
    logoGroup.rotation.set(-Math.PI / 2.2, 0, -0.15);

    // GSAP Initial Component State
    gsap.set(textGroupRef.current, { opacity: 0, y: 25 });
    gsap.set(taglineRef.current, { opacity: 0, y: 15, letterSpacing: "0.2em" });
    gsap.set(sublineRef.current, { opacity: 0, y: 10 });
    gsap.set(skipBtnRef.current, { opacity: 0, y: -10 });

    // Camera object for tweening
    const camTarget = {
      posX: 0,
      posY: 4.4,
      posZ: isMobile ? 8.4 : 6.8,
      lookX: 0,
      lookY: 0.2,
      lookZ: 0,
    };

    // Master Cinematic GSAP Timeline
    const masterTl = gsap.timeline({
      delay: 0.25,
      onComplete: () => {
        finishIntro();
      },
    });

    // 0. Fade in Skip button
    masterTl.to(skipBtnRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.3);

    // Phase 1: Subtle initial floating oscillation while lying in perspective on the floor (0.0s - 2.0s)
    masterTl.to(
      logoGroup.rotation,
      {
        z: -0.12,
        duration: 2.0,
        ease: "sine.inOut",
      },
      0.2
    );

    // Phase 2: 3D De.risen Logo Smoothly Rotates & Stands Upright (2.0s - 5.0s)
    masterTl.to(
      logoGroup.rotation,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.8,
        ease: "power2.inOut",
      },
      2.0
    );

    masterTl.to(
      logoGroup.position,
      {
        x: 0,
        y: 0.85,
        z: 0,
        duration: 2.8,
        ease: "power2.inOut",
      },
      2.0
    );

    // Camera smoothly adjusts to center the standing 3D De.risen logo straight-on
    masterTl.to(
      camTarget,
      {
        posX: 0,
        posY: 0.45,
        posZ: isMobile ? 8.0 : 6.2,
        lookX: 0,
        lookY: 0.45,
        lookZ: 0,
        duration: 2.8,
        ease: "power2.inOut",
      },
      2.0
    );

    // Specular light sweep across beveled letter edges as logo rises
    masterTl.to(
      keyLight.position,
      {
        x: -5,
        y: 12,
        z: 10,
        duration: 2.5,
        ease: "power2.inOut",
      },
      2.5
    );

    // Phase 3: Tagline & Subtitle Reveals Below Standing 3D Logo (4.8s - 6.8s)
    masterTl.to(
      textGroupRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      4.8
    );

    masterTl.to(
      taglineRef.current,
      {
        opacity: 1,
        y: 0,
        letterSpacing: "0.32em",
        duration: 1.6,
        ease: "power2.out",
      },
      5.0
    );

    masterTl.to(
      sublineRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      5.6
    );

    // Phase 4: Savor the Complete Official 3D Brand Reveal (6.8s - 8.8s)
    masterTl.to({}, { duration: 2.0 }, 6.8);

    // Phase 5: Smooth Glide into Navbar
    masterTl.to(skipBtnRef.current, { opacity: 0, duration: 0.3 }, 8.5);
    masterTl.to(
      textGroupRef.current,
      {
        opacity: 0,
        y: -15,
        duration: 0.6,
        ease: "power2.in",
      },
      8.6
    );

    masterTl.to(
      logoGroup.scale,
      {
        x: 0.24,
        y: 0.24,
        z: 0.24,
        duration: 0.9,
        ease: "power2.inOut",
      },
      8.7
    );

    masterTl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      },
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
        logoGeo.dispose();
        logoMat.dispose();
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
      {/* 3D WebGL Canvas for 3D De.risen Logo Standing Up */}
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

      {/* Center Stage: Tagline Reveal right below the standing 3D De.risen Logo */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 sm:pb-28 md:pb-32 z-20 pointer-events-none">
        <div
          ref={textGroupRef}
          className="relative flex flex-col items-center justify-center text-center px-4"
        >
          {/* Subtitle / Tagline display */}
          <p
            ref={taglineRef}
            className="text-[11px] sm:text-[13px] font-bold tracking-[0.32em] uppercase text-brand-dark/85"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            Creative Design &bull; Branding &bull; Marketing &bull; IT Solutions
          </p>

          <p
            ref={sublineRef}
            className="mt-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-purple/75"
          >
            Rise Above &bull; Redefine
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandIntro;