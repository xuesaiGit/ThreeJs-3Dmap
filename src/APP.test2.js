import { useEffect } from "react";
import "./App.css";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 引入动画库
// import gsap from "gsap";

// 导入Gui
import * as dat from "dat.gui";

function App() {
  const ThreeCreate = () => {
    // 创建场景
    const scene = new THREE.Scene();
    //创建相机

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    //给相机添加位置（三维向量）
    camera.position.set(0, 3, 6);
    //在场景里面添加相机
    scene.add(camera);

    // 创建、添加物体
    // 几何体
    const geometry = new THREE.SphereGeometry(1, 30, 30);
    // 材质
    const material = new THREE.MeshStandardMaterial();
    //根据集合体和材质创建三维物体
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    //在场景里面添加物体
    scene.add(cube);

    const box = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    // 导入纹理-(皮肤)
    const door = new THREE.TextureLoader().load("./images/crate.jpg");
    const xiangzi = new THREE.MeshStandardMaterial({
      color: "#fff",
      map: door, // 导入纹理-(皮肤)
    });
    const zhnegfangti = new THREE.Mesh(box, xiangzi);
    zhnegfangti.castShadow = true; //物体开启投射阴影
    scene.add(zhnegfangti);
    //修改物体位置
    zhnegfangti.position.set(0, 2, 2);

    // 创建平面
    const dibangeometry = new THREE.PlaneGeometry(60, 60);
    // 导入纹理-(皮肤)
    const diban = new THREE.TextureLoader().load("./images/mudiban.jpg");
    const muduban = new THREE.MeshStandardMaterial({
      color: "#fff",
      map: diban, // 导入纹理-(皮肤)
    });
    const DiBan = new THREE.Mesh(dibangeometry, muduban);
    DiBan.rotation.x = -Math.PI / 2;
    DiBan.position.y = -1;

    DiBan.receiveShadow = true; //平面接受阴影

    scene.add(DiBan);

    // 创建环境光
    const Huanjing = new THREE.AmbientLight("#fff", 0.2);
    scene.add(Huanjing);

    // const light = new THREE.DirectionalLight("#fff", 1.2);//平行光
    const light = new THREE.SpotLight("#fff", 2.2); //聚光灯
    light.position.set(10, 10, 10);
    light.castShadow = true; //开启光照阴影
    light.shadow.radius = 5; //阴影贴图模糊度
    light.shadow.mapSize.set(2048, 2048); //阴影贴图分辨率/精细度

    light.target = cube; //聚光灯指向物体（球体）
    light.angle = Math.PI / 6; //聚光灯角度
    light.distance = 0; //灯光距离
    light.penumbra = 0; //灯光衰减
    light.decay = 0; //真实物理灯光衰弱，近亮远暗（需要在physicallyCorrectLights模式下生效）

    scene.add(light);

    //应用图形用户界面
    const gui = new dat.GUI();
    gui.add(cube.position, "x").min(-10).max(10).step(0.1);
    gui
      .add(light, "angle")
      .min(0)
      .max(Math.PI / 2)
      .step(0.1);
    gui.add(light, "distance").min(0).max(500).step(0.01);
    gui.add(light, "penumbra").min(0).max(1).step(0.01);
    gui.add(light, "decay").min(0).max(1).step(0.01);

    // 初始化渲染器
    const renderer = new THREE.WebGL1Renderer();

    renderer.shadowMap.enabled = true; //渲染器开启阴影效果
    renderer.physicallyCorrectLights = true;

    //设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    //将webGL渲染的canvas内容添加到body
    document.body.appendChild(renderer.domElement);

    // 使用渲染器，通过相机、场景渲染出来
    // renderer.render(scene, camera);

    //创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置轨道控制器阻尼 注：必须在动画循环函数里面调用update()
    controls.enableDamping = true;

    // 添加辅助坐标线
    const axeshelper = new THREE.AxesHelper(8); //参数为xyz轴长度
    scene.add(axeshelper);

    //动画循环函数
    const render = () => {
      controls.update();
      renderer.render(scene, camera);
      // 每帧调用一次渲染
      requestAnimationFrame(render);
    };

    render();

    //监听页面尺寸大小变化，更新渲染视图
    window.addEventListener("resize", () => {
      //   console.log(666);
      // 更新摄像头
      camera.aspect = window.innerWidth / window.innerHeight;
      // 更新摄像机的投影矩阵
      camera.updateProjectionMatrix();

      //更新渲染器
      renderer.setSize(window.innerWidth, window.innerHeight);
      //设置渲染器的像素比
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  };
  useEffect(() => {
    ThreeCreate();
  }, []);
  return <div className="App"></div>;
}

export default App;
