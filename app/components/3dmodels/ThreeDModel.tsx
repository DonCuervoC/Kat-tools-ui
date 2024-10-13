// components/ThreeDModel.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDModel: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
        let computeUpdate: any;

        const init = () => {
            camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10);
            camera.position.set(0, 0, 2);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x333333);

            const loader = new GLTFLoader();
            loader.load('/models/gltf/LeePerrySmith.glb', (gltf) => {
                const mesh = gltf.scene.children[0] as THREE.Mesh;
                mesh.scale.setScalar(0.1);
                mesh.material = new THREE.MeshNormalMaterial();
                scene.add(mesh);
            });

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            if (mountRef.current) {
                mountRef.current.appendChild(renderer.domElement);
            }

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.minDistance = 0.7;
            controls.maxDistance = 2;

            window.addEventListener('resize', onWindowResize);
        };

        const onWindowResize = () => {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);
            if (renderer && scene && camera) {
                renderer.render(scene, camera);
            }
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            if (mountRef.current && renderer) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} />;
};

export default ThreeDModel;
