import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  merge,
  getAverage,
  getMaxActiveSequence,
  processSensorAlerts,
} from "../../utils/utils.js";

export class ProductDetails {
  constructor(parent, data) {
    this.parent = parent;

    const defaultAnalytics = {
      debitHistory: [120, 135, 110, 150, 145],
      telemetry: "1110011111011100011",
    };

    this.data = merge(data, defaultAnalytics);
  }

  getHTML() {
    const avgDebit = getAverage(this.data.debitHistory);
    const maxUptime = getMaxActiveSequence(this.data.telemetry);

    return `
      <div class="big-product-card my-2">
          <div class="product-card-bg">
              <img
                  class="product-card-bg__img"
                  src="${this.data.big_src}"
              />
          </div>
          <div class="product-card-fg">
              <div class="d-flex justify-content-end">
                <p class="product-card__title">${this.data.title}</p>
              </div>
              <p class="product-card__desc">
                ${this.data.text}
              </p>

              <div class="analytics-block mt-3 p-3" style="background: rgba(255,255,255,0.1); border-radius: 8px;">
                 <h5 style="margin-bottom: 10px;">Аналитика объекта</h5>
                 <p style="margin: 0;"><strong>Средняя добыча:</strong> ${avgDebit.toFixed(1)} баррелей/сут.</p>
                 <p style="margin: 0;"><strong>Непрерывная работа насоса (макс):</strong> ${maxUptime} ч.</p>
              </div>

          </div>
      </div>
      <div id="model-container" style="width: 100%; height: 300px; background-color: #ffffff;"></div>
    `;
  }

  render() {
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    const mockLogsQueue = [
      "Давление: Норма",
      "Температура: 60C",
      "КРИТИЧЕСКАЯ_ОСТАНОВКА",
      "Этот лог не будет прочитан",
    ];
    processSensorAlerts(mockLogsQueue);

    const container = document.getElementById("model-container");
    this.initThreeJS(container, "../../models/Drums.glb");
  }

  initThreeJS(container, modelUrl) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        model.position.x += model.position.x - center.x;
        model.position.y += model.position.y - box.min.y;
        model.position.z += model.position.z - center.z;
        scene.add(model);

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.0;

        camera.position.set(cameraZ, cameraZ / 1.5, cameraZ);
        camera.lookAt(0, size.y / 2, 0);
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error(error);
      },
    );
  }
}
