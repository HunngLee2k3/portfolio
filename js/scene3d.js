/* ==========================================================================
   Lê Văn Hùng — 3D WebGL Background, 3D Tilt & Depth Parallax Engine
   (js/scene3d.js)
   ========================================================================== */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

/**
 * 1. Khởi tạo không gian 3D WebGL (Three.js)
 *    - Hạt sáng 3D (Particles) bay trong chiều sâu Z
 *    - Lưới không gian Cyber-Timeline chuyển động theo nhịp cuộn trang
 *    - Các khối đa diện Wireframe 3D (Icosahedron, Torus, Octahedron) phản hồi theo chuột
 */
export function init3DBackground() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let canvas = document.getElementById('bg3dCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'bg3dCanvas';
    document.body.prepend(canvas);
  }

  const isMobile = window.innerWidth < 768;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isMobile,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080d18, 0.028);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    120
  );
  camera.position.set(0, 1.5, isMobile ? 19 : 16);

  // ----- Nhóm chứa toàn bộ vật thể 3D -----
  const worldGroup = new THREE.Group();
  scene.add(worldGroup);

  // ----- 1. Lưới không gian 3D (Timeline Floor Grid) -----
  const gridHelper = new THREE.GridHelper(90, 45, 0x4dd8ff, 0x1b3e9e);
  gridHelper.position.y = -6.5;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = isMobile ? 0.16 : 0.22;
  scene.add(gridHelper);

  // ----- 2. Hệ thống hạt sáng 3D (Particle Field) -----
  const particleCount = isMobile ? 320 : 850;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorCyan = new THREE.Color(0x4dd8ff);
  const colorBlue = new THREE.Color(0x2f6fed);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 55;
    positions[i3 + 1] = (Math.random() - 0.5) * 36;
    positions[i3 + 2] = (Math.random() - 0.5) * 50;

    const mixed = Math.random() > 0.45 ? colorCyan : colorBlue;
    colors[i3] = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.14,
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  worldGroup.add(particleSystem);

  // ----- 3. Các khối đa diện 3D nghệ thuật (Floating 3D Shapes) -----
  const shapes = [];

  // Khối 1: Icosahedron Wireframe + Lõi phát sáng
  const icoGroup = new THREE.Group();
  const icoGeo = new THREE.IcosahedronGeometry(isMobile ? 1.7 : 2.4, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x4dd8ff,
    wireframe: true,
    transparent: true,
    opacity: isMobile ? 0.18 : 0.26
  });
  const icoInnerGeo = new THREE.IcosahedronGeometry(isMobile ? 0.95 : 1.35, 0);
  const icoInnerMat = new THREE.MeshBasicMaterial({
    color: 0x2f6fed,
    wireframe: true,
    transparent: true,
    opacity: isMobile ? 0.28 : 0.4
  });
  icoGroup.add(new THREE.Mesh(icoGeo, icoMat));
  icoGroup.add(new THREE.Mesh(icoInnerGeo, icoInnerMat));
  icoGroup.position.set(isMobile ? 3.2 : 8.5, isMobile ? 4.8 : 3.2, -3);
  worldGroup.add(icoGroup);
  shapes.push({ mesh: icoGroup, speedX: 0.003, speedY: 0.005, floatOffset: 0 });

  // Khối 2: Vòng Lens / Cuộn phim 3D (Torus + Ring)
  const lensGroup = new THREE.Group();
  const torusGeo = new THREE.TorusGeometry(isMobile ? 1.5 : 2.1, 0.06, 16, 64);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x4dd8ff,
    transparent: true,
    opacity: isMobile ? 0.22 : 0.35
  });
  const torus2Geo = new THREE.TorusGeometry(isMobile ? 1.1 : 1.6, 0.04, 12, 48);
  const torus2Mat = new THREE.MeshBasicMaterial({
    color: 0x2f6fed,
    wireframe: true,
    transparent: true,
    opacity: isMobile ? 0.2 : 0.3
  });
  const meshT1 = new THREE.Mesh(torusGeo, torusMat);
  const meshT2 = new THREE.Mesh(torus2Geo, torus2Mat);
  meshT2.rotation.x = Math.PI / 3;
  lensGroup.add(meshT1, meshT2);
  lensGroup.position.set(isMobile ? -3.2 : -9.2, isMobile ? -3.5 : -1.2, -4);
  worldGroup.add(lensGroup);
  shapes.push({ mesh: lensGroup, speedX: 0.004, speedY: -0.004, floatOffset: 2.1 });

  // Khối 3: Các tinh thể Octahedron rải theo chiều sâu
  const octaGeo = new THREE.OctahedronGeometry(0.95, 0);
  const octaPositions = [
    [-6.5, 5.5, -8],
    [7.2, -3.8, -7],
    [-4.8, -5.0, -3],
    [5.5, 6.2, -11]
  ];
  octaPositions.forEach((pos, idx) => {
    const mat = new THREE.MeshBasicMaterial({
      color: idx % 2 === 0 ? 0x4dd8ff : 0x2f6fed,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.16 : 0.24
    });
    const m = new THREE.Mesh(octaGeo, mat);
    m.position.set(pos[0], pos[1], pos[2]);
    worldGroup.add(m);
    shapes.push({
      mesh: m,
      speedX: 0.005 + idx * 0.001,
      speedY: 0.006 - idx * 0.001,
      floatOffset: idx * 1.5
    });
  });

  // ----- Tương tác Chuột & Cuộn trang -----
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let scrollY = window.scrollY || 0;

  window.addEventListener(
    'mousemove',
    (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  window.addEventListener(
    'scroll',
    () => {
      scrollY = window.scrollY || 0;
    },
    { passive: true }
  );

  let lastW = window.innerWidth;
  window.addEventListener(
    'resize',
    () => {
      // Trên điện thoại, thanh địa chỉ ẩn/hiện làm thay đổi innerHeight liên tục.
      // Chỉ resize nặng khi chiều ngang thay đổi hoặc chênh lệch chiều cao lớn để tránh giật.
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w === lastW && Math.abs(h - renderer.domElement.height) < 120) return;
      lastW = w;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    },
    { passive: true }
  );

  // ----- Vòng lặp Render 60/120fps -----
  let clock = 0;
  function animate() {
    requestAnimationFrame(animate);
    if (document.hidden) return;

    clock += 0.012;

    // Nội suy mượt vị trí chuột (Smooth Damping)
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Xoay nhẹ không gian 3D theo góc nhìn chuột
    worldGroup.rotation.y = mouseX * 0.22;
    worldGroup.rotation.x = -mouseY * 0.14;

    // Di chuyển chiều sâu Z & lưới theo cuộn trang
    const scrollFactor = scrollY * 0.004;
    gridHelper.position.z = (scrollY * 0.015) % 2;
    particleSystem.rotation.y = clock * 0.06 + scrollFactor * 0.08;
    particleSystem.position.z = (scrollY * 0.008) % 12;

    // Xoay các khối đa diện 3D
    for (let i = 0; i < shapes.length; i++) {
      const s = shapes[i];
      s.mesh.rotation.x += s.speedX;
      s.mesh.rotation.y += s.speedY;
      s.mesh.position.y += Math.sin(clock + s.floatOffset) * 0.004;
    }

    renderer.render(scene, camera);
  }

  animate();
}

/**
 * 2. Hiệu ứng nghiêng thẻ 3D (3D Perspective Tilt + Specular Glare)
 *    Chỉ kích hoạt trên thiết bị dùng chuột (PC/Laptop) để không ảnh hưởng cảm ứng trên điện thoại
 */
export function bind3DTilt(root = document) {
  if (!window.matchMedia('(pointer: fine)').matches || window.innerWidth <= 960) return;

  const selectors = '.card, .reel, .avatar, .skills-panel, .edu-row, .contact-cta, .tool-card';
  const elements = root.querySelectorAll ? root.querySelectorAll(selectors) : [];

  elements.forEach((el) => {
    if (el.dataset.tiltBound === 'true') return;
    el.dataset.tiltBound = 'true';
    el.classList.add('tilt-3d');

    // Thêm lớp ánh sáng phản chiếu 3D (Glare)
    if (!el.querySelector('.tilt-glare')) {
      const glare = document.createElement('div');
      glare.className = 'tilt-glare';
      el.appendChild(glare);
    }

    const isLargePanel =
      el.classList.contains('skills-panel') ||
      el.classList.contains('contact-cta') ||
      el.classList.contains('tool-card') ||
      el.classList.contains('edu-row');
    const maxTilt = isLargePanel ? 4 : 8;

    let rafId = null;

    el.addEventListener(
      'mousemove',
      (e) => {
        if (el.classList.contains('is-playing') || window.innerWidth <= 960) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const pctX = x / rect.width;
        const pctY = y / rect.height;

        const rotateY = (pctX - 0.5) * (maxTilt * 2);
        const rotateX = (0.5 - pctY) * (maxTilt * 2);

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          el.classList.remove('is-resetting');
          el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`;
          el.style.setProperty('--glare-x', `${(pctX * 100).toFixed(1)}%`);
          el.style.setProperty('--glare-y', `${(pctY * 100).toFixed(1)}%`);
        });
      },
      { passive: true }
    );

    el.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.classList.add('is-resetting');
      el.style.transform = '';
    });
  });
}

/**
 * 3. Hiệu ứng cuộn trang chiều sâu 3D (chỉ áp dụng cho các section gọn trên PC,
 *    bỏ qua trên điện thoại và các section quá dài như #work để tránh biến dạng/lỗi cảm ứng)
 */
export function init3DScrollParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sections = Array.from(document.querySelectorAll('section'));
  if (!sections.length) return;

  let ticking = false;

  function updateDepth() {
    ticking = false;
    // Trên điện thoại/tablet: tắt biến dạng 3D trên section để giao diện chuẩn xác tuyệt đối
    if (window.innerWidth <= 960) {
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].style.transform) sections[i].style.transform = '';
      }
      return;
    }

    const vh = window.innerHeight;
    const centerVh = vh * 0.5;

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      if (!sec.classList.contains('in-view')) continue;

      const rect = sec.getBoundingClientRect();
      // Không xoay 3D với section có chiều cao lớn (như danh sách Dự án #work)
      if (rect.height > vh * 1.15) {
        if (sec.style.transform) sec.style.transform = '';
        continue;
      }

      const secCenter = rect.top + rect.height * 0.5;
      const distRatio = (secCenter - centerVh) / vh;
      const clamped = Math.max(-1, Math.min(1, distRatio));

      const translateZ = Math.abs(clamped) * -20;
      const rotateX = clamped * -2.2;
      sec.style.transform = `perspective(1400px) translate3d(0, 0, ${translateZ.toFixed(1)}px) rotateX(${rotateX.toFixed(2)}deg)`;
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(updateDepth);
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener('resize', updateDepth, { passive: true });
}
