import * as THREE from 'three';

// ==================== Cursor ====================
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button, .work-card, .resource-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursorRing.style.width = '52px';
        cursorRing.style.height = '52px';
        cursorRing.style.borderColor = 'rgba(162, 155, 254, 0.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '6px';
        cursor.style.height = '6px';
        cursorRing.style.width = '36px';
        cursorRing.style.height = '36px';
        cursorRing.style.borderColor = 'rgba(162, 155, 254, 0.3)';
    });
});

// ==================== Mobile Menu ====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// ==================== Scroll Reveal ====================
const revealElements = document.querySelectorAll(
    '.section-label, .section-title, .about-text, .about-visual, .work-card, .skill-card, .resource-card, .resources-desc'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => observer.observe(el));

// ==================== Stat Counter ====================
const statNumbers = document.querySelectorAll('.stat-number');
let statsCounted = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
            statsCounted = true;
            statNumbers.forEach(num => {
                const target = parseInt(num.dataset.target);
                const duration = 1500;
                const start = performance.now();
                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    num.textContent = Math.round(target * eased);
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            });
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

// ==================== Navbar Scroll ====================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
    lastScroll = scrollY;
});

// ==================== Hero Three.js ====================
const heroCanvas = document.getElementById('hero-canvas');
const heroRenderer = new THREE.WebGLRenderer({ canvas: heroCanvas, antialias: true, alpha: true });
heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
heroRenderer.setClearColor(0x0a0a0f, 1);

const heroScene = new THREE.Scene();
const heroCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
heroCamera.position.set(0, 0, 5);

// Particles
const particleCount = 2000;
const particleGeo = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);

const palette = [
    new THREE.Color(0x6c5ce7),
    new THREE.Color(0xa29bfe),
    new THREE.Color(0x74b9ff),
    new THREE.Color(0x4834d4),
];

for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3]     = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 15 - 3;

    velocities[i3]     = (Math.random() - 0.5) * 0.003;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i3]     = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;

    sizes[i] = Math.random() * 3 + 0.5;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

const particleMat = new THREE.PointsMaterial({
    size: 2,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
});

const particles = new THREE.Points(particleGeo, particleMat);
heroScene.add(particles);

// Connection lines
const lineGeo = new THREE.BufferGeometry();
const maxLines = 300;
const linePositions = new Float32Array(maxLines * 6);
lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
lineGeo.setDrawRange(0, 0);

const lineMat = new THREE.LineBasicMaterial({
    color: 0x6c5ce7,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
});

const lines = new THREE.LineSegments(lineGeo, lineMat);
heroScene.add(lines);

// Central glow
const glowGeo = new THREE.SphereGeometry(0.8, 32, 32);
const glowMat = new THREE.MeshBasicMaterial({
    color: 0x6c5ce7,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
});
const glow = new THREE.Mesh(glowGeo, glowMat);
heroScene.add(glow);

const glowGeo2 = new THREE.SphereGeometry(1.5, 32, 32);
const glowMat2 = new THREE.MeshBasicMaterial({
    color: 0xa29bfe,
    transparent: true,
    opacity: 0.03,
    blending: THREE.AdditiveBlending,
});
const glow2 = new THREE.Mesh(glowGeo2, glowMat2);
heroScene.add(glow2);

// Mouse interaction
const mouse = { x: 0, y: 0 };
document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// ==================== About Canvas ====================
const aboutCanvas = document.getElementById('about-canvas');
const aboutRenderer = new THREE.WebGLRenderer({ canvas: aboutCanvas, antialias: true, alpha: true });
aboutRenderer.setClearColor(0x0a0a0f, 0);
aboutRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const aboutScene = new THREE.Scene();
const aboutCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
aboutCamera.position.set(0, 0, 4);

// Wireframe icosahedron
const icoGeo = new THREE.IcosahedronGeometry(1.2, 1);
const icoMat = new THREE.MeshBasicMaterial({
    color: 0x6c5ce7,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
});
const ico = new THREE.Mesh(icoGeo, icoMat);
aboutScene.add(ico);

// Inner icosahedron
const icoInnerGeo = new THREE.IcosahedronGeometry(0.8, 0);
const icoInnerMat = new THREE.MeshBasicMaterial({
    color: 0xa29bfe,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
});
const icoInner = new THREE.Mesh(icoInnerGeo, icoInnerMat);
aboutScene.add(icoInner);

// Points on vertices
const dotGeo = new THREE.BufferGeometry();
const dotPositions = icoGeo.attributes.position.array.slice();
dotGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(dotPositions), 3));
const dotMat = new THREE.PointsMaterial({
    color: 0xa29bfe,
    size: 4,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6,
});
const dots = new THREE.Points(dotGeo, dotMat);
aboutScene.add(dots);

// ==================== Resize ====================
function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    heroRenderer.setSize(w, h);
    heroCamera.aspect = w / h;
    heroCamera.updateProjectionMatrix();

    const aboutRect = aboutCanvas.parentElement.getBoundingClientRect();
    aboutRenderer.setSize(aboutRect.width, aboutRect.height);
    aboutCamera.aspect = aboutRect.width / aboutRect.height;
    aboutCamera.updateProjectionMatrix();
}

window.addEventListener('resize', onResize);
onResize();

// ==================== Animate ====================
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const dt = clock.getDelta();

    // Hero particles
    const pos = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3]     += velocities[i3];
        pos[i3 + 1] += velocities[i3 + 1];
        pos[i3 + 2] += velocities[i3 + 2];

        // Bounds
        if (Math.abs(pos[i3]) > 10) velocities[i3] *= -1;
        if (Math.abs(pos[i3 + 1]) > 10) velocities[i3 + 1] *= -1;
        if (pos[i3 + 2] > 2 || pos[i3 + 2] < -18) velocities[i3 + 2] *= -1;
    }
    particleGeo.attributes.position.needsUpdate = true;

    // Connection lines
    let lineIndex = 0;
    const linePos = lineGeo.attributes.position.array;
    const connectDist = 2.5;

    for (let i = 0; i < Math.min(particleCount, 200) && lineIndex < maxLines; i++) {
        const i3 = i * 3;
        for (let j = i + 1; j < Math.min(particleCount, 200) && lineIndex < maxLines; j++) {
            const j3 = j * 3;
            const dx = pos[i3] - pos[j3];
            const dy = pos[i3+1] - pos[j3+1];
            const dz = pos[i3+2] - pos[j3+2];
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (dist < connectDist) {
                const li = lineIndex * 6;
                linePos[li]   = pos[i3];
                linePos[li+1] = pos[i3+1];
                linePos[li+2] = pos[i3+2];
                linePos[li+3] = pos[j3];
                linePos[li+4] = pos[j3+1];
                linePos[li+5] = pos[j3+2];
                lineIndex++;
            }
        }
    }
    lineGeo.setDrawRange(0, lineIndex * 2);
    lineGeo.attributes.position.needsUpdate = true;

    // Camera follow mouse
    heroCamera.position.x += (mouse.x * 0.5 - heroCamera.position.x) * 0.02;
    heroCamera.position.y += (mouse.y * 0.3 - heroCamera.position.y) * 0.02;
    heroCamera.lookAt(0, 0, -2);

    // Glow pulse
    const pulse = Math.sin(t * 1.5) * 0.03 + 0.08;
    glowMat.opacity = pulse;
    glow.scale.setScalar(1 + Math.sin(t) * 0.1);
    glow2.scale.setScalar(1 + Math.sin(t * 0.7) * 0.15);

    particles.rotation.y = t * 0.02;
    particles.rotation.x = t * 0.01;

    heroRenderer.render(heroScene, heroCamera);

    // About canvas
    ico.rotation.x = t * 0.2;
    ico.rotation.y = t * 0.3;
    icoInner.rotation.x = -t * 0.3;
    icoInner.rotation.y = -t * 0.2;
    dots.rotation.x = t * 0.2;
    dots.rotation.y = t * 0.3;

    aboutRenderer.render(aboutScene, aboutCamera);
}

animate();

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('%c Takato Studio ', 'background: #6c5ce7; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
