import { useEffect, useState } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
    CSS2DRenderer,
    CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

import * as d3 from "d3";

import { gsap } from "gsap";

import { Reflector } from "three/examples/jsm/objects/Reflector";

function Map() {
    const [mapData, setmapData] = useState([
        {
            name: "济南市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "德州市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "滨州市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "东营市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "聊城市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "泰安市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "淄博市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "菏泽市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "济宁市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "枣庄市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "临沂市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "日照市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "潍坊市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "青岛市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "烟台市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
        {
            name: "威海市",
            value: Math.floor(Math.random() * (100 - 11)) + 10,
        },
    ]);

    useEffect(() => {
        // 将经纬度解析为空间坐标
        const offsetXY = d3.geoMercator();
        // 创建场景
        const scene = new THREE.Scene();

        // const axesHelper = new THREE.AxesHelper(5);
        // scene.add(axesHelper);
        const ambientLight = new THREE.AmbientLight(0xd4e7fd, 4);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xe8eaeb, 0.2);
        directionalLight.position.set(0, 30, 50);
        const directionalLight2 = directionalLight.clone();
        directionalLight2.position.set(0, 30, -50);
        const directionalLight3 = directionalLight.clone();
        directionalLight3.position.set(-50, 30, 0);
        const directionalLight4 = directionalLight.clone();
        directionalLight4.position.set(50, 30, 0);
        const directionalLight5 = directionalLight.clone();
        directionalLight5.position.set(35, 60, 50);
        const directionalLight6 = directionalLight.clone();
        directionalLight6.position.set(-35, 60, 50);
        const directionalLight7 = directionalLight.clone();
        directionalLight7.position.set(-35, 60, -50);
        const directionalLight8 = directionalLight.clone();
        directionalLight8.position.set(25, 50, -50);
        const directionalLight9 = directionalLight.clone();
        directionalLight9.position.set(0, 60, -60);
        const directionalLight10 = directionalLight.clone();
        directionalLight10.position.set(0, 60, 40);
        scene.add(directionalLight);
        scene.add(directionalLight2);
        scene.add(directionalLight3);
        scene.add(directionalLight4);
        // scene.add(directionalLight5);
        // scene.add(directionalLight6);
        // scene.add(directionalLight7);
        // scene.add(directionalLight8);
        // scene.add(directionalLight9);
        // scene.add(directionalLight10);

        scene.background = new THREE.Color(0x000000); //设置背景色

        const cubetextureloader = new THREE.CubeTextureLoader();

        const huanjing = cubetextureloader.load([
            "/1/px.jpg", //把文件存放在public文件夹下，这个是公共的文件夹，只需要/就可以获取到资源文件
            "/1/nx.jpg",
            "/1/py.jpg",
            "/1/ny.jpg",
            "/1/pz.jpg",
            "/1/nz.jpg",
        ]);

        // scene.background = huanjing;

        // 使用点材质创建星空效果
        const vertices = [];

        for (let i = 0; i < 500; i++) {
            const vertex = new THREE.Vector3();
            vertex.x = Math.floor(Math.random() * 61) - 30;
            vertex.y = Math.floor(Math.random() * 50);
            vertex.z = Math.floor(Math.random() * 61) - 30;
            vertices.push(vertex.x, vertex.y, vertex.z);
        }
        // 星空效果
        let starsGeometry = new THREE.BufferGeometry();
        starsGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(new Float32Array(vertices), 3)
        );
        // 加载点材质纹理
        const starsTexture = new THREE.TextureLoader().load("./image/stars.png");
        const starsMaterial = new THREE.PointsMaterial({
            size: 0.2,
            sizeAttenuation: true, // 尺寸衰减
            color: "#fff",
            // color: 0x4d76cf,
            transparent: true,
            opacity: 1,
            map: starsTexture,
        });

        let stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        // 创建地图板块
        const createMesh = (data, color, depth) => {
            const shape = new THREE.Shape();
            data.forEach((item, idx) => {
                const [x, y] = offsetXY(item);

                if (idx === 0) shape.moveTo(x, -y);
                else shape.lineTo(x, -y);
            });

            const geometry = new THREE.ExtrudeGeometry(shape, {
                depth: depth,
                bevelEnabled: false,
            });
            const material = new THREE.MeshStandardMaterial({
                color: color,
                emissive: 0x000000,
                roughness: 0.45,
                metalness: 0.8,
                // transparent: true,
                side: THREE.DoubleSide,
            });
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(0, 0, 0);

            return mesh;
        };
        // 创建边界线
        const createLine = (data, depth) => {
            const points = [];
            data.forEach((item) => {
                const [x, y] = offsetXY(item);
                points.push(new THREE.Vector3(x, -y, 0));
            });
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const uplineMaterial = new THREE.LineBasicMaterial({
                color: "#00ffc4",
                linewidth: 5,
            });
            const downlineMaterial = new THREE.LineBasicMaterial({
                color: "#00ffc4",
            });

            const upLine = new THREE.Line(lineGeometry, uplineMaterial);
            const downLine = new THREE.Line(lineGeometry, downlineMaterial);
            downLine.position.z = 0;
            downLine.name = "downLine";
            upLine.position.z = depth + 0.01;
            upLine.name = "upLine";
            return [upLine, downLine];
        };

        // 创建名称
        const createLabel = (name, point, depth) => {
            const div = document.createElement("div");
            div.style.color = "#fff";
            div.style.fontSize = "12px";
            div.style.textShadow = "1px 1px 2px #047cd6";
            div.textContent = name;
            const label = new CSS2DObject(div);
            label.scale.set(0.01, 0.01, 0.01);
            const [x, y] = offsetXY(point);
            label.position.set(x, -y, depth + 0.2);
            return label;
        };
        // 创建图标
        const createIcon = (point, depth) => {
            const url = new URL("../../assets/img/icon.png", import.meta.url).href;
            const map = new THREE.TextureLoader().load(url);
            const material = new THREE.SpriteMaterial({
                map: map,
                transparent: true,
            });
            const sprite = new THREE.Sprite(material);
            const [x, y] = offsetXY(point);
            sprite.scale.set(0.5, 0.5, 0.5);
            sprite.position.set(x, -y, depth + 0.3);
            sprite.renderOrder = 1;

            return sprite;
        };
        // 创建光柱
        const createLightColumn = (point, depth, name) => {
            // 获取地区数值
            const mapValue = mapData.find((city) => city.name === name).value;
            //取最大值
            const arr = mapData.map(({ value }) => value);
            let max = arr[0];
            arr.forEach((item) => (max = item > max ? item : max));

            let lightPillarTexture = new THREE.TextureLoader().load(
                "./image/light_column.png"
            );
            let lightPillarGeometry = new THREE.PlaneGeometry(
                (mapValue / max) * 1,
                (mapValue / max) * 6
            );
            let lightPillarMaterial = new THREE.MeshBasicMaterial({
                color: "#00ffc4",
                map: lightPillarTexture,
                alphaMap: lightPillarTexture,
                transparent: true, //使用背景透明的png贴图，注意开启透明计算
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide, //双面可见
                depthWrite: false, //禁止写入深度缓冲区数据
            });

            let lightPillar = new THREE.Mesh(
                lightPillarGeometry,
                lightPillarMaterial
            );
            lightPillar.add(lightPillar.clone().rotateY(Math.PI / 2));

            // 创建波纹扩散效果
            let circlePlane = new THREE.PlaneGeometry(0.8, 0.8);
            let circleTexture = new THREE.TextureLoader().load("./image/label.png");
            let circleMaterial = new THREE.MeshBasicMaterial({
                color: "#00ffc4",
                map: circleTexture,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                side: THREE.DoubleSide,
            });
            const circleMesh = new THREE.Mesh(circlePlane, circleMaterial);
            circleMesh.rotation.x = -Math.PI / 2;
            circleMesh.position.set(0, -1, 0);
            // 给光柱添加波纹扩散效果
            lightPillar.add(circleMesh);

            // 创建光柱数值
            const div = document.createElement("div");
            div.style.color = "#fff";
            div.style.width = "40px";
            div.style.height = "25px";
            div.style.borderWidth = "1px";
            div.style.borderStyle = "solid";
            div.style.borderColor = "#00ffc4";
            div.style.borderRadius = "5px";
            div.style.fontSize = "14px";
            div.style.fontWeight = 600;
            div.style.textShadow = "1px 1px 6px #fff";
            div.style.textAlign = "center";
            div.style.lineHeight = "25px";
            div.textContent = `${mapValue}万`;
            const tip = new CSS2DObject(div);
            tip.scale.set(0.01, 0.01, 0.01);
            tip.position.set(0, (mapValue / max) * 3, 0);
            // 给光柱添加数值
            lightPillar.add(tip);

            gsap.to(circleMesh.scale, {
                duration: 1 + Math.random() * 0.5,
                x: 2,
                y: 2,
                z: 2,
                repeat: -1,
                delay: Math.random() * 0.5,
                yoyo: true,
                ease: "power2.inOut",
            });

            // 设置光柱的位置

            // lightPillar.position.set(0, 50, 0);

            const [x, y] = offsetXY(point);
            lightPillar.rotation.x = Math.PI / 2;
            lightPillar.position.set(x, -y, depth + 1.1);

            // lightPillar.quaternion.setFromUnitVectors(
            //     new THREE.Vector3(0, 1, 0),
            //     position.clone().normalize()
            // );

            // lightPillar.name = "lightPillar"

            return lightPillar;
        };
        // 获取区块中心点
        const setCenter = (map) => {
            map.rotation.x = -Math.PI / 2;
            const box = new THREE.Box3().setFromObject(map);
            const center = box.getCenter(new THREE.Vector3());

            const offset = [0, 0];
            map.position.x = map.position.x - center.x - offset[0];
            map.position.z = map.position.z - center.z - offset[1];
        };

        const createMap = (data) => {
            const map = new THREE.Object3D();
            const center = data.features[0].properties.centroid;
            offsetXY.center(center).translate([0, 0]);
            data.features.forEach((feature) => {
                const unit = new THREE.Object3D();
                const { centroid, center, name } = feature.properties;
                const { coordinates, type } = feature.geometry;
                const point = centroid || center || [0, 0];

                // const color = new THREE.Color(`hsl(${233},${Math.random() * 30 + 55}%,${Math.random() * 30 + 55}%)`).getHex();
                const color = new THREE.Color("#02518d").getHex();
                // const depth = Math.random() * 0.6 + 0.3;
                const depth = 1;

                const label = createLabel(name, point, depth);
                const icon = createIcon(center, depth, name); //创建图标
                const light_column = createLightColumn(center, depth, name); //创建光柱以及波纹

                coordinates.forEach((coordinate) => {
                    if (type === "MultiPolygon") coordinate.forEach((item) => fn(item));
                    if (type === "Polygon") fn(coordinate);

                    function fn(coordinate) {
                        unit.name = name;
                        const mesh = createMesh(coordinate, color, depth);
                        const line = createLine(coordinate, depth);
                        unit.add(mesh, ...line);
                    }
                });
                map.add(unit, label, icon, light_column);
                setCenter(map);
            });
            return map;
        };

        //创建相机
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        // camera.position.set(0, 1.5, 6);
        camera.position.set(5, -10, 30);
        camera.lookAt(0, 3, 0);

        const labelRenderer = new CSS2DRenderer();
        labelRenderer.domElement.style.position = "absolute";
        labelRenderer.domElement.style.top = "0px";
        labelRenderer.domElement.style.pointerEvents = "none";
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("App").appendChild(labelRenderer.domElement);

        // 加入辅助轴
        // const axesHelper = new THREE.AxesHelper(5);
        // scene.add(axesHelper);

        // 添加光阵视屏
        let video = document.createElement("video");
        video.src = "./video/zp2.mp4";
        video.loop = true;
        video.muted = true;
        video.play();

        let videoTexture = new THREE.VideoTexture(video);
        const videoGeoPlane = new THREE.PlaneBufferGeometry(55, 30);
        const videoMaterial = new THREE.MeshBasicMaterial({
            map: videoTexture,
            transparent: true,
            side: THREE.DoubleSide,
            alphaMap: videoTexture,
        });

        const videoMesh = new THREE.Mesh(videoGeoPlane, videoMaterial);
        videoMesh.position.set(0, 0, 0);
        videoMesh.rotation.set(-Math.PI / 2, 0, 0);
        scene.add(videoMesh);

        // 添加镜面反射
        let reflectorGeometry = new THREE.PlaneBufferGeometry(100, 100);
        let reflectorPlane = new Reflector(reflectorGeometry, {
            textureWidth: window.innerWidth,
            textureHeight: window.innerHeight,
            color: 0x332222,
        });
        reflectorPlane.position.set(0, -0.1, 0);
        reflectorPlane.rotation.x = -Math.PI / 2;
        scene.add(reflectorPlane);

        // 初始化渲染器
        const renderer = new THREE.WebGLRenderer({
            alpha: true, // 设置抗锯齿
            antialias: true,
            // 设置物理灯光模拟效果
            physicallyCorrectLights: true,
            // 设置对数深度缓冲区
            logarithmicDepthBuffer: true,
        });
        // 设置渲染尺寸大小
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("App").appendChild(renderer.domElement);

        //<------控制器 ------->
        // 初始化控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        // 设置控制器阻尼
        controls.enableDamping = true;
        controls.update();

        //上下翻转的最大角度
        controls.maxPolarAngle = 1.2;
        //上下翻转的最小角度
        controls.minPolarAngle = 0;

        // 禁止相机平移
        controls.enablePan = false;

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            // 使用渲染器渲染相机看这个场景的内容渲染出来
            renderer.render(scene, camera);
            labelRenderer.render(scene, camera);
        };
        animate();

        // 监听屏幕大小改变的变化，设置渲染的尺寸
        window.addEventListener("resize", () => {
            // 更新摄像头
            camera.aspect = window.innerWidth / window.innerHeight;
            // 更新摄像机的投影矩阵
            camera.updateProjectionMatrix();
            // 更新渲染器
            renderer.setSize(window.innerWidth, window.innerHeight);
            //   设置渲染器的像素比例
            renderer.setPixelRatio(window.devicePixelRatio);
            labelRenderer.setSize(window.innerWidth, window.innerHeight);
        });

        //获取地图边界
        const url = "https://geo.datav.aliyun.com/areas_v3/bound/370000_full.json";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const map = createMap(data);
                scene.add(map);

                let intersect = null;
                window.addEventListener("mousemove", (event) => {
                    const mouse = new THREE.Vector2();
                    //将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                    const raycaster = new THREE.Raycaster();
                    // 通过摄像机和鼠标位置更新射线
                    // 计算物体和射线的焦点
                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster
                        .intersectObjects(map.children)
                        .filter((item) => item.object.type !== "Line");

                    if (intersects.length > 0) {
                        if (intersects[0].object.parent.name !== "") {
                            if (intersects[0].object.parent.name === "lightPillar") {
                            } else {
                                if (intersect) isAplha(intersect, 0);
                                intersect = intersects[0].object.parent;
                                isAplha(intersect, 0.5);
                                console.log(intersect);
                            }
                        }
                    } else {
                        // 匹配所有地图板块
                        for (let i = 0; i < map.children.length; i++) {
                            for (let j = 0; j < mapData.length; j++) {
                                if (map.children[i].name === mapData[j].name) {
                                    isAplha(map.children[i], 0);
                                }
                            }
                        }
                    }
                    function isAplha(intersect, zIndex) {
                        intersect.children.forEach((item) => {
                            if (item.type === "Mesh") {
                                gsap.to(item.position, 0.5, { z: zIndex });
                            }
                            if (item.name === "upLine") {
                                gsap.to(item.position, 0.5, { z: 1.01 + zIndex });
                            }
                            if (item.name === "downLine") {
                                gsap.to(item.position, 0.5, { z: zIndex });
                            }
                        });
                    }
                });
            });
    }, []);
    return <div id="App"></div>;
}

export default Map;
