// Web Worker for Offscreen WebGL Liquid Caustics Background Shader Rendering
importScripts('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');

let glScene, glCamera, glRenderer, uniforms, mesh;
let glAnimFrameId = null;
let glInView = true;
let isHidden = false;

const vertexShader = `
    varying vec2 v_texCoord;
    void main() {
        v_texCoord = uv;
        gl_Position = vec4(position, 1.0);
    }
`;

const fragmentShader = `
    precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    #define MAX_ITER 3

    float waterCaustics(vec2 uv, float time) {
        vec2 p = mod(uv * 6.28318530718, 6.28318530718) - 250.0;
        vec2 i = vec2(p);
        float c = 1.0;
        float inten = 0.0065;

        for (int n = 0; n < MAX_ITER; n++) {
            float t = time * (1.0 - (3.5 / float(n + 1)));
            i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
            c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
        }
        c /= float(MAX_ITER);
        c = 1.17 - pow(c, 1.4);
        return max(0.0, pow(abs(c), 8.0));
    }

    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    void main() {
        vec2 uv = v_texCoord;
        vec2 aspectUv = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0) + 0.5;
        vec2 mouseUv = u_mouse / u_resolution;

        float mouseDist = distance(uv, mouseUv);
        float ripple = sin(mouseDist * 30.0 - u_time * 5.0) * exp(-mouseDist * 7.0);
        vec2 distortedUv = uv + (uv - mouseUv) * ripple * 0.025;

        vec3 abyssDeep   = vec3(0.015, 0.04, 0.10);
        vec3 oceanMid    = vec3(0.03, 0.15, 0.32);
        vec3 shallowTurq = vec3(0.0, 0.55, 0.78);
        vec3 causticGlow = vec3(0.4, 0.95, 1.0);
        vec3 sunRayColor = vec3(0.65, 0.95, 1.0);

        float waveMotion = snoise(vec2(distortedUv.x * 2.0 + u_time * 0.1, u_time * 0.08)) * 0.04;
        float depthGrad = clamp(distortedUv.y + waveMotion, 0.0, 1.0);
        vec3 color = mix(oceanMid, abyssDeep, smoothstep(0.8, 0.0, depthGrad));

        float caustic1 = waterCaustics(distortedUv * 0.7 + vec2(u_time * 0.01, u_time * 0.015), u_time * 0.9);
        float caustic2 = waterCaustics(distortedUv * 1.3 - vec2(u_time * 0.015, u_time * 0.01), u_time * 1.3);
        float causticsCombined = clamp(caustic1 * 0.65 + caustic2 * 0.45, 0.0, 2.5);

        color += causticGlow * causticsCombined * (0.2 + 0.8 * depthGrad) * 0.45;
        color = mix(color, shallowTurq, causticsCombined * 0.15 * depthGrad);

        float ray1 = pow(max(0.0, snoise(vec2(aspectUv.x * 1.5 + aspectUv.y * 0.4 + u_time * 0.03, u_time * 0.02))), 4.0);
        float ray2 = pow(max(0.0, snoise(vec2(aspectUv.x * 3.0 - aspectUv.y * 0.6 - u_time * 0.04, u_time * 0.03))), 3.0);
        float godRays = (ray1 * 0.6 + ray2 * 0.4) * (depthGrad * 0.8 + 0.2);
        color += sunRayColor * godRays * 0.35;

        float particles = snoise(distortedUv * 25.0 + vec2(u_time * 0.05, u_time * 0.1));
        particles = pow(max(0.0, particles), 16.0);
        color += vec3(0.7, 0.95, 1.0) * particles * 0.6;

        float vignette = 1.0 - smoothstep(0.45, 1.4, length(uv - 0.5));
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
    }
`;

function animate(time) {
    if (!glInView || isHidden) {
        glAnimFrameId = null;
        return;
    }
    uniforms.u_time.value = time * 0.00045;
    glRenderer.render(glScene, glCamera);
    glAnimFrameId = requestAnimationFrame(animate);
}

function startAnimation() {
    if (!glAnimFrameId && glInView && !isHidden) {
        glAnimFrameId = requestAnimationFrame(animate);
    }
}

function stopAnimation() {
    if (glAnimFrameId) {
        cancelAnimationFrame(glAnimFrameId);
        glAnimFrameId = null;
    }
}

self.onmessage = function (e) {
    const data = e.data;
    if (!data) return;

    switch (data.type) {
        case 'init': {
            const { canvas, width, height, pixelRatio } = data;
            glScene = new THREE.Scene();
            glCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            glRenderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: pixelRatio > 1.0,
                powerPreference: "high-performance"
            });
            glRenderer.setSize(width, height, false);
            glRenderer.setPixelRatio(pixelRatio);

            uniforms = {
                u_time: { value: 1.0 },
                u_resolution: { value: new THREE.Vector2(width, height) },
                u_mouse: { value: new THREE.Vector2(width / 2, height / 2) }
            };

            const geometry = new THREE.PlaneGeometry(2, 2);
            const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
            mesh = new THREE.Mesh(geometry, material);
            glScene.add(mesh);

            startAnimation();
            break;
        }
        case 'resize': {
            if (glRenderer && uniforms) {
                glRenderer.setPixelRatio(data.pixelRatio);
                glRenderer.setSize(data.width, data.height, false);
                uniforms.u_resolution.value.set(data.width, data.height);
            }
            break;
        }
        case 'mousemove': {
            if (uniforms) {
                uniforms.u_mouse.value.set(data.x, data.y);
            }
            break;
        }
        case 'visibility': {
            glInView = data.inView;
            isHidden = data.hidden;
            if (glInView && !isHidden) {
                startAnimation();
            } else {
                stopAnimation();
            }
            break;
        }
    }
};
