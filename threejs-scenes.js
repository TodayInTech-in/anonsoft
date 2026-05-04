// ===== TODAYINTECH THREE.JS 3D SCENES =====
// Uses Three.js (loaded via CDN importmap) for immersive scroll-driven 3D experiences

// ===== DEVICE CAPABILITY DETECTION =====
const isMobile = window.innerWidth < 768;
const isLowEnd = navigator.hardwareConcurrency <= 4 || isMobile;
// Cap pixel ratio: 1 on low-end, 1.5 on mobile, 2 on desktop
const MAX_PIXEL_RATIO = isLowEnd ? 1 : isMobile ? 1.5 : 1.5;
const USE_ANTIALIAS = !isMobile;

// ===== UTILITY: Scroll progress helper =====
function getScrollProgress(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const start = windowHeight;
    const end = -rect.height;
    const current = rect.top - offset;
    return Math.min(Math.max((start - current) / (start - end), 0), 1);
}

// ===== UTILITY: Lerp =====
function lerp(a, b, t) {
    return a + (b - a) * t;
}

// ===== UTILITY: Clamp =====
function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

// ===== UTILITY: Mouse tracker factory =====
function createMouseTracker(container) {
    const state = {
        x: 0, y: 0,
        targetX: 0, targetY: 0,
        isHovering: false,
        hoverIntensity: 0
    };

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        state.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        state.targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    container.addEventListener('mouseenter', () => {
        state.isHovering = true;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseleave', () => {
        state.isHovering = false;
        state.targetX = 0;
        state.targetY = 0;
        container.style.cursor = '';
    });

    state.update = function () {
        state.x = lerp(state.x, state.targetX, 0.08);
        state.y = lerp(state.y, state.targetY, 0.08);
        state.hoverIntensity = lerp(state.hoverIntensity, state.isHovering ? 1 : 0, 0.06);
    };

    return state;
}

// ===== UTILITY: Show/hide loading spinner on a container =====
function showLoadingSpinner(container) {
    const spinner = document.createElement('div');
    spinner.className = 'three-loading-spinner';
    spinner.innerHTML = '<div class="three-spinner-ring"></div>';
    container.appendChild(spinner);
    return spinner;
}

// ===== UTILITY: Lazy loader — calls fn() once when container is near viewport =====
function lazyInitScene(container, fn, rootMargin = '200px') {
    const observer = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
            obs.disconnect();
            fn();
        }
    }, { rootMargin });
    observer.observe(container);
}

// ===== SCENE 1: HERO PORTAL — Scroll-Driven Fly-Through =====
function initHeroPortalScene() {
    const container = document.getElementById('hero-3d-container');
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.015);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 8);
    camera.lookAt(0, 1.5, 0);

    // const renderer = new THREE.WebGLRenderer({ antialias: USE_ANTIALIAS, alpha: true });
    const renderer = new THREE.WebGLRenderer({ antialias: USE_ANTIALIAS, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    // Instant placeholder - glowing torus that shows immediately                                                   
    const torusGeometry = new THREE.TorusGeometry(1.8, 0.4, 32, 64);
    const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9
    });
    const placeholderTorus = new THREE.Mesh(torusGeometry, torusMaterial);
    placeholderTorus.position.set(0, 1.5, 0);
    scene.add(placeholderTorus);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x4444ff, 0.4);
    scene.add(ambientLight);

    const portalLight1 = new THREE.PointLight(0x7c3aed, 3, 20);
    portalLight1.position.set(0, 3, 0);
    scene.add(portalLight1);

    const portalLight2 = new THREE.PointLight(0x06b6d4, 2.5, 15);
    portalLight2.position.set(0, 1, -2);
    scene.add(portalLight2);

    const rimLight = new THREE.DirectionalLight(0xc084fc, 1.5);
    rimLight.position.set(5, 5, 5);
    scene.add(rimLight);

    const backLight = new THREE.PointLight(0xf472b6, 2, 25);
    backLight.position.set(0, 2, -5);
    scene.add(backLight);

    // Particles (fewer on low-end devices)
    const particleCount = isLowEnd ? 200 : 500;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 30;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 30;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x7c3aed,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Show spinner and load model - preloads make this faster  
    let portalModel = null;
    const spinner = showLoadingSpinner(container);
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/libs/draco/');
    const loader = new THREE.GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
        'assets/3dmodels/portal_gate_sci-fi.glb',
        (gltf) => {
            spinner.remove();
            portalModel = gltf.scene;
            portalModel.position.set(0, 0, 0);
            portalModel.scale.set(1.5, 1.5, 1.5);

            portalModel.traverse((child) => {
                if (child.isMesh) {
                    child.material.envMapIntensity = 1.5;
                    if (child.material.emissive) {
                        child.material.emissiveIntensity = 0.3;
                    }
                }
            });
            scene.remove(placeholderTorus);
            scene.add(portalModel);
        },
        undefined,
        (error) => {
            spinner.remove();
            console.warn('Portal model load error:', error);
        }
    );

    const mouse = createMouseTracker(container);
    container.style.pointerEvents = 'auto';

    let currentCameraZ = 8;
    let currentCameraY = 1.5;
    let targetCameraZ = 8;
    let targetCameraY = 1.5;
    let isVisible = true;
    let scrollProgress = 0;

    const heroSection = document.getElementById('hero');

    function updateScroll() {
        if (!heroSection) return;
        const rect = heroSection.getBoundingClientRect();
        const sectionHeight = heroSection.offsetHeight;
        scrollProgress = clamp(-rect.top / sectionHeight, 0, 1);
        targetCameraZ = lerp(8, -4, scrollProgress);
        targetCameraY = lerp(1.5, 2.5, scrollProgress);
    }

    window.addEventListener('scroll', updateScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    observer.observe(container);

    function onResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', onResize);

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        time += 0.01;
        mouse.update();

        currentCameraZ = lerp(currentCameraZ, targetCameraZ, 0.05);
        currentCameraY = lerp(currentCameraY, targetCameraY, 0.05);
        camera.position.z = currentCameraZ;
        camera.position.y = currentCameraY;
        camera.position.x = mouse.x * 0.8 * mouse.hoverIntensity;
        camera.lookAt(0, 1.5, 0);

        if (portalModel) {
            portalModel.rotation.y = Math.sin(time * 0.3) * 0.05 + mouse.x * 0.15 * mouse.hoverIntensity;
            portalModel.rotation.x = mouse.y * 0.08 * mouse.hoverIntensity;
        } else {
            placeholderTorus.rotation.y = time * 0.5;
            placeholderTorus.rotation.x = mouse.y * 0.1 * mouse.hoverIntensity;
        }

        particles.rotation.y = time * 0.05;
        particles.rotation.x = Math.sin(time * 0.2) * 0.02;

        const hoverGlow = mouse.hoverIntensity * 1.5;
        portalLight1.intensity = 3 + Math.sin(time * 2) * 0.5 + hoverGlow;
        portalLight2.intensity = 2.5 + Math.cos(time * 1.5) * 0.3 + hoverGlow;
        backLight.intensity = 2 + Math.sin(time * 2.5) * 0.5 + hoverGlow * 0.8;

        camera.fov = lerp(60, 45, scrollProgress);
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);
    }

    animate();
    updateScroll();
}

// ===== SCENE 2: SMARTPHONE — Mobile App Showcase =====
function initSmartphoneScene() {
    const container = document.getElementById('mobile-3d-container');
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: USE_ANTIALIAS, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    const boxGeometry = new THREE.BoxGeometry(1, 2, 0.2, 8, 16, 4);
    const roundedMaterial = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.3,
        metalness: 0.9,
        roughness: 0.1
    });
    const placeholderBox = new THREE.Mesh(boxGeometry, roundedMaterial);
    placeholderBox.position.set(0, -0.5, 0);
    scene.add(placeholderBox);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x7c3aed, 2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x06b6d4, 1.2);
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0xf472b6, 1.5, 20);
    backLight.position.set(0, -2, -5);
    scene.add(backLight);

    // Load model lazily when near viewport
    let phoneModel = null;
    const spinner = showLoadingSpinner(container);
    const loader = new THREE.GLTFLoader();
    loader.load(
        'assets/3dmodels/smartphone.glb',
        (gltf) => {
            spinner.remove();
            phoneModel = gltf.scene;
            phoneModel.position.set(0, -1, 0);

            const box = new THREE.Box3().setFromObject(phoneModel);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim;
            phoneModel.scale.set(scale, scale, scale);

            const center = box.getCenter(new THREE.Vector3());
            phoneModel.position.sub(center.multiplyScalar(scale));
            phoneModel.position.y -= 0.5;
            scene.remove(placeholderBox);
            scene.add(phoneModel);
        },
        undefined,
        (error) => {
            spinner.remove();
            console.warn('Smartphone model load error:', error);
        }
    );

    const mouse = createMouseTracker(container);

    let isVisible = false;
    let scrollProgress = 0;

    const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    const section = container.closest('section');

    function updateScroll() {
        if (!section) return;
        scrollProgress = getScrollProgress(section);
    }
    window.addEventListener('scroll', updateScroll, { passive: true });

    function onResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', onResize);

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        time += 0.01;
        mouse.update();

        if (phoneModel) {
            const entryProgress = clamp(scrollProgress * 2, 0, 1);
            phoneModel.position.y = lerp(-2, 0, entryProgress) + Math.sin(time * 1.5) * 0.1;
            phoneModel.position.x = mouse.x * 0.3 * mouse.hoverIntensity;
            phoneModel.rotation.y = lerp(-0.5, 0, entryProgress) + time * 0.3 + mouse.x * 0.4 * mouse.hoverIntensity;
            phoneModel.rotation.x = Math.sin(time * 0.8) * 0.05 + mouse.y * 0.25 * mouse.hoverIntensity;
            phoneModel.rotation.z = Math.sin(time * 0.6) * 0.03 - mouse.x * 0.1 * mouse.hoverIntensity;
        }
        else if (placeholderBox) {
            // Animate placeholder while model loads
            placeholderBox.rotation.y = time * 0.4 + mouse.x * 0.3 * mouse.hoverIntensity;
            placeholderBox.rotation.x = mouse.y * 0.2 * mouse.hoverIntensity;
            placeholderBox.position.y = Math.sin(time * 1.2) * 0.08 - 0.5;
        }
        const hoverGlow = mouse.hoverIntensity * 1.0;
        keyLight.intensity = 2 + Math.sin(time * 1.2) * 0.3 + hoverGlow;
        fillLight.intensity = 1.2 + Math.cos(time * 0.9) * 0.2 + hoverGlow * 0.5;

        renderer.render(scene, camera);
    }

    animate();
}

// ===== SCENE 3: AI ROBOT — AI & Automation Section =====
function initAIRobotScene() {
    const container = document.getElementById('ai-3d-container');
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: USE_ANTIALIAS, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    // Instant placeholder - glowing icosahedron robot head
    const icoGeometry = new THREE.IcosahedronGeometry(1.2, 0);
    const icoMaterial = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.4,
        metalness: 0.9,
        roughness: 0.1,
        wireframe: true
    });
    const placeholderRobot = new THREE.Mesh(icoGeometry, icoMaterial);
    placeholderRobot.position.set(0, 0, 0);
    scene.add(placeholderRobot);
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x7c3aed, 2.5);
    mainLight.position.set(3, 5, 4);
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0x06b6d4, 3, 15);
    accentLight.position.set(-3, 2, 2);
    scene.add(accentLight);

    const rimLight = new THREE.PointLight(0xf472b6, 2, 12);
    rimLight.position.set(3, 0, -3);
    scene.add(rimLight);

    const groundLight = new THREE.PointLight(0x7c3aed, 1.5, 10);
    groundLight.position.set(0, -2, 0);
    scene.add(groundLight);

    // Fewer particles on low-end
    const holoCount = isLowEnd ? 80 : 200;
    const holoGeometry = new THREE.BufferGeometry();
    const holoPositions = new Float32Array(holoCount * 3);
    for (let i = 0; i < holoCount * 3; i += 3) {
        holoPositions[i] = (Math.random() - 0.5) * 10;
        holoPositions[i + 1] = (Math.random() - 0.5) * 8;
        holoPositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    holoGeometry.setAttribute('position', new THREE.BufferAttribute(holoPositions, 3));
    const holoMaterial = new THREE.PointsMaterial({
        color: 0x06b6d4,
        size: 0.04,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });
    const holoParticles = new THREE.Points(holoGeometry, holoMaterial);
    scene.add(holoParticles);

    let robotModel = null;
    const spinner = showLoadingSpinner(container);
    const loader = new THREE.GLTFLoader();
    loader.load(
        'assets/3dmodels/ai_robot.glb',
        (gltf) => {
            spinner.remove();
            robotModel = gltf.scene;

            const box = new THREE.Box3().setFromObject(robotModel);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3.5 / maxDim;
            robotModel.scale.set(scale, scale, scale);

            const center = box.getCenter(new THREE.Vector3());
            robotModel.position.sub(center.multiplyScalar(scale));
            robotModel.position.y -= 2;

            robotModel.traverse((child) => {
                if (child.isMesh) {
                    child.material.envMapIntensity = 1.5;
                    if (child.material.metalness !== undefined) {
                        child.material.metalness = Math.min(child.material.metalness + 0.2, 1);
                        child.material.roughness = Math.max(child.material.roughness - 0.1, 0);
                    }
                }
            });
            scene.remove(placeholderRobot);
            scene.add(robotModel);
        },
        undefined,
        (error) => {
            spinner.remove();
            console.warn('AI Robot model load error:', error);
        }
    );

    const mouse = createMouseTracker(container);

    let isVisible = false;
    let scrollProgress = 0;

    const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    const section = container.closest('section');

    function updateScroll() {
        if (!section) return;
        scrollProgress = getScrollProgress(section);
    }
    window.addEventListener('scroll', updateScroll, { passive: true });

    function onResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', onResize);

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        time += 0.01;
        mouse.update();

        if (robotModel) {
            const entryProgress = clamp(scrollProgress * 2.5, 0, 1);
            robotModel.position.y = lerp(-3, 0, entryProgress) + Math.sin(time * 1.2) * 0.08;
            robotModel.position.x = mouse.x * 0.3 * mouse.hoverIntensity;
            robotModel.rotation.y = lerp(-Math.PI * 0.3, Math.PI * 0.15, entryProgress) + time * 0.2 + mouse.x * 0.5 * mouse.hoverIntensity;
            robotModel.rotation.x = Math.sin(time * 0.5) * 0.03 + mouse.y * 0.2 * mouse.hoverIntensity;
            robotModel.rotation.z = -mouse.x * 0.08 * mouse.hoverIntensity;
        }
        else if (placeholderRobot) {
            // Animate placeholder while model loads
            placeholderRobot.rotation.y = time * 0.5 + mouse.x * 0.3 * mouse.hoverIntensity;
            placeholderRobot.rotation.x = mouse.y * 0.2 * mouse.hoverIntensity;
            placeholderRobot.position.y = Math.sin(time * 0.8) * 0.1;
        }

        holoParticles.rotation.y = time * 0.08 + mouse.x * 0.05 * mouse.hoverIntensity;
        holoParticles.rotation.x = Math.sin(time * 0.15) * 0.03 + mouse.y * 0.03 * mouse.hoverIntensity;

        const hoverGlow = mouse.hoverIntensity * 1.5;
        accentLight.intensity = 3 + Math.sin(time * 1.8) * 0.5 + hoverGlow;
        rimLight.intensity = 2 + Math.cos(time * 1.3) * 0.4 + hoverGlow;
        groundLight.intensity = 1.5 + Math.sin(time * 2.2) * 0.3 + hoverGlow * 0.5;

        renderer.render(scene, camera);
    }

    animate();
}

// ===== INITIALIZE SCENES =====
document.addEventListener('DOMContentLoaded', () => {
    const isMobileSmall = window.innerWidth < 480;
    if (isMobileSmall) return;

    // Hero loads immediately (above the fold)
    initHeroPortalScene();

    // Smartphone and robot load lazily when their containers approach the viewport
    const phoneContainer = document.getElementById('mobile-3d-container');
    const robotContainer = document.getElementById('ai-3d-container');

    if (phoneContainer) {
        lazyInitScene(phoneContainer, initSmartphoneScene, '300px');
    }
    if (robotContainer) {
        lazyInitScene(robotContainer, initAIRobotScene, '300px');
    }
});
