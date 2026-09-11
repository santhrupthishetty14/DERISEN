import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface Brand3DIntroProps {
  onComplete: () => void;
}

/**
 * 4-Second Cinematic 3D Horizontal Logo Reveal Animation for DE.RISEN
 * 
 * Concept & Choreography:
 *  - CAMERA travels smoothly horizontally from left to right through 3D depth.
 *  - Real 3D depth/extrusion, reflections, soft purple cinematic lighting, and depth of field.
 *  - Exact DE.RISEN logo typography, proportions, shape, and purple colors are 100% preserved.
 *  - Timeline (Exactly 4.0s):
 *      0.0–0.6s: Atmospheric opening. Camera is positioned on the left in depth with subtle
 *                purple ambient glow awakening on the leading mark.
 *      0.6–2.6s: Camera smoothly glides horizontally through depth while revealing the logo
 *                with a luminous purple light edge and rich 3D parallax.
 *      2.6–3.3s: Camera settles squarely in center; full logo settles sharp and solid.
 *      3.3–3.8s: Single subtle purple specular light sheen sweeps across the finished logo.
 *      3.8–4.0s: Final clean hold on the pristine centered logo before transition.
 */
export const Brand3DIntro: React.FC<Brand3DIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);

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
    let masterTl: gsap.core.Timeline | null = null;
    let rafId = 0;

    const finishIntro = () => {
      if (isTerminated) return;
      isTerminated = true;

      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", onResize);
      if (navLogo) navLogo.style.opacity = "1";
      document.body.style.overflow = "";

      // Cleanup Three.js
      try {
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
        duration: 0.35,
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

    // Accessibility prefers-reduced-motion check
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.to(containerRef.current, {
        opacity: 0,
        delay: 1.5,
        duration: 0.4,
        ease: "power2.out",
        onComplete: finishIntro,
      });
      return;
    }

    // =========================================================================
    // Three.js Cinematic 3D Scene Setup
    // =========================================================================
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    // Atmospheric dark studio fog
    scene.fog = new THREE.FogExp2(0x0a0414, 0.038);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    if (mountRef.current) {
      mountRef.current.replaceChildren(renderer.domElement);
    }

    // Exact logo aspect ratio: 1680 / 340 = 4.941176
    const LOGO_ASPECT = 1680 / 340;
    const LOGO_WIDTH = 5.2;
    const LOGO_HEIGHT = LOGO_WIDTH / LOGO_ASPECT; // ~1.052

    // Responsive Camera & Framing Calculations
    const getCameraZ = (w: number, h: number) => {
      const aspect = w / h;
      const fovRad = (camera.fov * Math.PI) / 180;
      const visibleHeightAtDist1 = 2 * Math.tan(fovRad / 2);
      
      // We want the logo to occupy ~70% of screen width on desktop, ~85% on mobile
      const targetScreenFraction = aspect < 1.0 ? 0.88 : aspect < 1.6 ? 0.78 : 0.68;
      const requiredVisibleWidth = LOGO_WIDTH / targetScreenFraction;
      const requiredVisibleHeight = requiredVisibleWidth / aspect;
      const distance = Math.max(requiredVisibleHeight / visibleHeightAtDist1, 4.4);
      return distance;
    };

    let targetBaseZ = getCameraZ(width, height);

    // Camera trajectory state managed by GSAP
    const camTarget = {
      x: -4.8,
      y: 0.35,
      z: targetBaseZ * 0.88,
      lookX: -2.8,
      lookY: -0.05,
      lookZ: 0,
    };

    // =========================================================================
    // Shader Uniforms for Precise Reveal & Specular Sheen
    // =========================================================================
    const shaderUniforms = {
      uReveal: { value: 0.0 }, // 0.0 -> 1.0 (Left to Right reveal)
      uEdgeWidth: { value: 0.055 },
      uSheen: { value: 0.0 },  // 0.0 -> 1.0 (Specular sheen pass)
      uLogoTexture: { value: null as THREE.Texture | null },
      uTint: { value: new THREE.Color(0xffffff) },
      uBrightness: { value: 1.0 },
    };

    // Load High-Res Official DE.RISEN Logo Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/assets/derisen-logo-transparent.png", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      shaderUniforms.uLogoTexture.value = tex;
    });

    // Custom Vertex & Fragment Shader for the Logo
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    const fragmentShader = `
      uniform sampler2D uLogoTexture;
      uniform float uReveal;
      uniform float uEdgeWidth;
      uniform float uSheen;
      uniform vec3 uTint;
      uniform float uBrightness;

      varying vec2 vUv;
      varying vec3 vWorldPosition;
      varying vec3 vNormal;

      void main() {
        vec4 tex = texture2D(uLogoTexture, vUv);
        if (tex.a < 0.02) discard;

        // Progressive reveal from left (0.0) to right (1.0)
        float revealEdge = uReveal;
        if (vUv.x > revealEdge) {
          discard;
        }

        // Luminous Purple Light Glow along the traveling reveal boundary
        float distToEdge = revealEdge - vUv.x;
        float edgeGlow = smoothstep(uEdgeWidth, 0.0, distToEdge) * step(0.001, revealEdge) * step(revealEdge, 0.999);

        // Specular Sheen Sweep: Diagonal streak moving left to right
        float sheenPos = uSheen * 1.5 - 0.25;
        float diagonalCoord = vUv.x + (vUv.y - 0.5) * 0.28;
        float sheenDist = abs(diagonalCoord - sheenPos);
        float sheenIntensity = smoothstep(0.09, 0.0, sheenDist) * step(0.01, uSheen);

        // Pristine original logo color combined with tint
        vec3 col = tex.rgb * uTint * uBrightness;

        // Luminous purple edge core: soft lilac edge transitioning to intense white glint
        vec3 edgeGlowCol = mix(vec3(0.72, 0.42, 1.0), vec3(1.0, 1.0, 1.0), smoothstep(uEdgeWidth * 0.45, 0.0, distToEdge));
        col = mix(col, edgeGlowCol, edgeGlow * 0.85);

        // Add Specular Sheen
        col += vec3(0.92, 0.82, 1.0) * sheenIntensity * 0.75;

        gl_FragColor = vec4(col, tex.a);
      }
    `;

    // =========================================================================
    // 3D Extruded Logo Hierarchy (Authentic Depth without warps)
    // =========================================================================
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    const planeGeo = new THREE.PlaneGeometry(LOGO_WIDTH, LOGO_HEIGHT, 1, 1);

    // 1. Subtle 3D Extrusion Slices (Creates tangible side bevels when viewed at angle)
    const EXTRUSION_SLICES = 8;
    const SLICE_DEPTH = 0.012; // Total depth ~0.096 units
    const extrusionMeshes: THREE.Mesh[] = [];

    for (let i = 1; i <= EXTRUSION_SLICES; i++) {
      const zOffset = -i * SLICE_DEPTH;
      // Darker rich plum shade for extrusion edges (#250036 to #380252)
      const darkenRatio = 1.0 - (i / EXTRUSION_SLICES) * 0.45;
      const sliceMat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uReveal: shaderUniforms.uReveal,
          uEdgeWidth: shaderUniforms.uEdgeWidth,
          uSheen: shaderUniforms.uSheen,
          uLogoTexture: shaderUniforms.uLogoTexture,
          uTint: { value: new THREE.Color(0x35084a).multiplyScalar(darkenRatio) },
          uBrightness: { value: 0.75 * darkenRatio },
        },
        transparent: true,
        depthWrite: false,
      });

      const sliceMesh = new THREE.Mesh(planeGeo, sliceMat);
      sliceMesh.position.set(0, 0, zOffset);
      logoGroup.add(sliceMesh);
      extrusionMeshes.push(sliceMesh);
    }

    // 2. Front Face Mesh (Pristine original logo colors & lighting)
    const frontMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: shaderUniforms,
      transparent: true,
      depthWrite: false,
    });
    const frontMesh = new THREE.Mesh(planeGeo, frontMat);
    frontMesh.position.set(0, 0, 0.002);
    logoGroup.add(frontMesh);

    // 3. Ambient Back Drop Shadow Plane (Soft depth grounding behind logo)
    const shadowGeo = new THREE.PlaneGeometry(LOGO_WIDTH * 1.12, LOGO_HEIGHT * 1.25);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -0.06, -0.15);
    logoGroup.add(shadowMesh);

    // =========================================================================
    // Reflective Studio Floor Plane (High-End Studio Reflection)
    // =========================================================================
    const floorGeo = new THREE.PlaneGeometry(35, 20);
    // Dark satin floor catching purple light highlights
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0618,
      roughness: 0.38,
      metalness: 0.75,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, -1.2, 0);
    scene.add(floorMesh);

    // Inverted Soft Logo Mirror Reflection on Floor
    const reflectGeo = new THREE.PlaneGeometry(LOGO_WIDTH, LOGO_HEIGHT);
    const reflectMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: `
        uniform sampler2D uLogoTexture;
        uniform float uReveal;
        uniform float uSheen;
        varying vec2 vUv;
        void main() {
          // Flip vertically for reflection
          vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
          vec4 tex = texture2D(uLogoTexture, uv);
          if (tex.a < 0.02 || vUv.x > uReveal) discard;
          
          // Soft vertical fade with distance from logo bottom
          float verticalFade = smoothstep(0.0, 0.85, 1.0 - vUv.y);
          vec3 col = tex.rgb * vec3(0.55, 0.35, 0.85);
          gl_FragColor = vec4(col, tex.a * 0.28 * verticalFade);
        }
      `,
      uniforms: {
        uLogoTexture: shaderUniforms.uLogoTexture,
        uReveal: shaderUniforms.uReveal,
        uSheen: shaderUniforms.uSheen,
      },
      transparent: true,
      depthWrite: false,
    });
    const reflectMesh = new THREE.Mesh(reflectGeo, reflectMat);
    reflectMesh.position.set(0, -1.22, 0);
    reflectMesh.scale.set(1.0, -1.0, 1.0);
    scene.add(reflectMesh);

    // =========================================================================
    // Cinematic Lighting & Volumetric Atmosphere
    // =========================================================================
    // 1. Ambient Fill Light
    const ambientLight = new THREE.AmbientLight(0x180b2a, 1.8);
    scene.add(ambientLight);

    // 2. Traveling Key Spot Light (Follows the camera and reveal boundary)
    const keySpotLight = new THREE.SpotLight(0xc084fc, 25, 16, Math.PI / 4, 0.65, 1.2);
    keySpotLight.position.set(-4.5, 2.5, 4.0);
    scene.add(keySpotLight);

    // 3. Top-Back Rim Light (Highlights subtle 3D top bevels)
    const rimLight = new THREE.DirectionalLight(0x9333ea, 4.0);
    rimLight.position.set(0, 4.5, -2.5);
    scene.add(rimLight);

    // 4. Moving Purple Glow Pool on Floor
    const floorGlowGeo = new THREE.PlaneGeometry(4.5, 3.0);
    const floorGlowTex = (() => {
      const c = document.createElement("canvas");
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext("2d")!;
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(168, 85, 247, 0.55)");
      grad.addColorStop(0.4, "rgba(126, 34, 206, 0.25)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      const t = new THREE.CanvasTexture(c);
      return t;
    })();
    const floorGlowMat = new THREE.MeshBasicMaterial({
      map: floorGlowTex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const floorGlowMesh = new THREE.Mesh(floorGlowGeo, floorGlowMat);
    floorGlowMesh.rotation.x = -Math.PI / 2;
    floorGlowMesh.position.set(-2.5, -1.18, 0.5);
    scene.add(floorGlowMesh);

    // =========================================================================
    // Depth of Field & Parallax Elements (Optical Foreground Bokeh & Background Fins)
    // =========================================================================
    // Subtle background architectural light fins for vertical motion parallax
    const bgFinsGroup = new THREE.Group();
    scene.add(bgFinsGroup);

    const finGeo = new THREE.BoxGeometry(0.04, 8.0, 0.04);
    const finMat = new THREE.MeshBasicMaterial({
      color: 0x49187a,
      transparent: true,
      opacity: 0.18,
    });
    const finPositions = [-7, -4.5, -2, 0.5, 3, 5.5, 8];
    finPositions.forEach((posX) => {
      const fin = new THREE.Mesh(finGeo, finMat);
      fin.position.set(posX, 0.5, -3.2);
      bgFinsGroup.add(fin);
    });

    // Optical Foreground Soft Bokeh Discs (Parallax depth of field)
    const bokehGroup = new THREE.Group();
    scene.add(bokehGroup);

    const bokehGeo = new THREE.PlaneGeometry(0.65, 0.65);
    const bokehTex = (() => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d")!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(230, 200, 255, 0.65)");
      grad.addColorStop(0.5, "rgba(168, 85, 247, 0.25)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();

    const bokehConfigs = [
      { x: -3.8, y: -0.4, z: 2.6, s: 1.2, o: 0.35 },
      { x: -1.2, y: 0.7, z: 2.2, s: 0.9, o: 0.25 },
      { x: 1.5, y: -0.5, z: 2.5, s: 1.4, o: 0.3 },
      { x: 3.6, y: 0.5, z: 2.1, s: 0.8, o: 0.2 },
    ];

    bokehConfigs.forEach((cfg) => {
      const bMat = new THREE.MeshBasicMaterial({
        map: bokehTex,
        transparent: true,
        opacity: cfg.o,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const bMesh = new THREE.Mesh(bokehGeo, bMat);
      bMesh.position.set(cfg.x, cfg.y, cfg.z);
      bMesh.scale.set(cfg.s, cfg.s, 1);
      bokehGroup.add(bMesh);
    });

    // =========================================================================
    // Master 4.0-Second Cinematic Choreography Timeline
    // =========================================================================
    masterTl = gsap.timeline({
      delay: 0.05,
      onComplete: () => {
        // Elegant fade into the website
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut",
          onComplete: finishIntro,
        });
      },
    });

    // Initial State setup
    gsap.set(skipBtnRef.current, { opacity: 0, y: -8 });
    gsap.set(taglineRef.current, { opacity: 0, y: 14 });
    gsap.set(sublineRef.current, { opacity: 0, y: 10 });

    // Fade in skip button gently
    masterTl.to(skipBtnRef.current, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.2);

    // -------------------------------------------------------------------------
    // Phase 1: 0.0s – 0.6s (Atmospheric Opening & Awakening Purple Rim)
    // -------------------------------------------------------------------------
    masterTl.to(
      floorGlowMat,
      {
        opacity: 0.65,
        duration: 0.6,
        ease: "power2.out",
      },
      0.1
    );

    // -------------------------------------------------------------------------
    // Phase 2: 0.6s – 2.6s (Camera Travels Horizontally Through 3D Depth)
    // "Camera smoothly travels from left to right through depth, revealing logo"
    // -------------------------------------------------------------------------
    masterTl.to(
      camTarget,
      {
        x: 0.0,
        y: 0.0,
        z: targetBaseZ,
        lookX: 0.0,
        lookY: 0.0,
        duration: 2.0,
        ease: "power2.inOut",
      },
      0.6
    );

    // Key spotlight moves horizontally in sync with camera & reveal
    masterTl.to(
      keySpotLight.position,
      {
        x: 0.0,
        y: 2.0,
        z: 4.8,
        duration: 2.0,
        ease: "power2.inOut",
      },
      0.6
    );

    // Move floor glow pool across underneath the logo
    masterTl.to(
      floorGlowMesh.position,
      {
        x: 0.0,
        duration: 2.0,
        ease: "power2.inOut",
      },
      0.6
    );

    // Reveal uniform transitions from 0.0 to 1.0 unveiling the exact DE.RISEN logo
    masterTl.to(
      shaderUniforms.uReveal,
      {
        value: 1.0,
        duration: 2.0,
        ease: "power2.inOut",
      },
      0.6
    );

    // -------------------------------------------------------------------------
    // Phase 3: 2.6s – 3.3s (Complete Centered Settle Sharp & Solid)
    // -------------------------------------------------------------------------
    // Floor glow softly dissipates to leave a pristine mirror reflection
    masterTl.to(
      floorGlowMat,
      {
        opacity: 0.15,
        duration: 0.5,
        ease: "power2.out",
      },
      2.6
    );

    // Reveal clean tagline and positioning statement below
    masterTl.to(
      taglineRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      2.7
    );

    masterTl.to(
      sublineRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      },
      2.85
    );

    // -------------------------------------------------------------------------
    // Phase 4: 3.3s – 3.8s (Subtle Purple Specular Light Sweep)
    // -------------------------------------------------------------------------
    masterTl.fromTo(
      shaderUniforms.uSheen,
      { value: 0.0 },
      {
        value: 1.0,
        duration: 0.55,
        ease: "power1.inOut",
      },
      3.25
    );

    // -------------------------------------------------------------------------
    // Phase 5: 3.8s – 4.0s (Clean Hold on the Centered Pristine DE.RISEN Logo)
    // -------------------------------------------------------------------------
    masterTl.to({}, { duration: 0.25 }, 3.75);

    // =========================================================================
    // 60FPS Render Loop with Dynamic Camera LookAt & Subtle Parallax
    // =========================================================================
    const renderLoop = () => {
      if (isTerminated) return;
      rafId = requestAnimationFrame(renderLoop);

      // Update camera position from animated camTarget
      camera.position.set(camTarget.x, camTarget.y, camTarget.z);
      camera.lookAt(camTarget.lookX, camTarget.lookY, camTarget.lookZ);

      // Subtle atmospheric motion on foreground bokeh particles
      const time = performance.now() * 0.001;
      bokehGroup.children.forEach((b, idx) => {
        b.position.y += Math.sin(time * 1.5 + idx) * 0.0008;
      });

      renderer.render(scene, camera);
    };
    renderLoop();

    // =========================================================================
    // Resize Handler
    // =========================================================================
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      targetBaseZ = getCameraZ(w, h);
      if (masterTl && masterTl.time() >= 2.6) {
        camTarget.z = targetBaseZ;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", handleKeyDown);
      masterTl?.kill();
      try {
        planeGeo.dispose();
        shadowGeo.dispose();
        floorGeo.dispose();
        reflectGeo.dispose();
        floorGlowGeo.dispose();
        floorGlowTex.dispose();
        finGeo.dispose();
        finMat.dispose();
        bokehGeo.dispose();
        bokehTex.dispose();
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none cursor-pointer overflow-hidden bg-[#0a0414]"
      aria-label="DE.RISEN 3D Cinematic Logo Reveal"
    >
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none" />

      {/* Cinematic Vignette Overlay for Depth & Studio Contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(20, 8, 40, 0.0) 35%, rgba(8, 3, 16, 0.72) 75%, rgba(5, 2, 10, 0.94) 100%)",
        }}
      />

      {/* Top Bar with Skip Button and Mobile Notice */}
      <div className="absolute top-5 left-5 right-5 sm:top-8 sm:right-8 z-30 flex items-center justify-between pointer-events-auto">
        <span className="sm:hidden text-[10px] font-bold text-gray-400 tracking-wider uppercase bg-white/5 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          Tap to skip
        </span>
        <button
          ref={skipBtnRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="ml-auto group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-gray-300 hover:text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          aria-label="Skip Intro Animation"
        >
          <span>Skip</span>
          <span className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors">ESC</span>
        </button>
      </div>

      {/* Bottom Center: Minimal Cinematic Tagline & Positioning Statement */}
      <div className="absolute inset-x-0 bottom-10 sm:bottom-14 md:bottom-16 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-20">
        <p
          ref={taglineRef}
          className="text-[10px] sm:text-[12px] md:text-[13px] font-bold tracking-[0.24em] sm:tracking-[0.35em] uppercase text-gray-300 text-center"
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          Creative Design &bull; Branding &bull; Marketing &bull; IT Solutions
        </p>

        <p
          ref={sublineRef}
          className="mt-2 text-[9px] sm:text-[11px] font-semibold tracking-[0.32em] sm:tracking-[0.42em] uppercase text-[#B063FF] text-center"
        >
          Rise Above &bull; Redefine
        </p>
      </div>
    </div>
  );
};

export default Brand3DIntro;
