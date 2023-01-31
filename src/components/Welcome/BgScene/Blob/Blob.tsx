import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useMemo, useRef } from "react";
import { Mesh } from "three";

function Blob({
  radius,
  pos,
  u_noiseDensity,
  u_noiseStrength,
  u_frequency,
  u_amplitude,
  u_colorIntensity,
  u_colorOffset,
  u_colorPalette,
}: {
  radius: number;
  pos: [number, number, number];
  u_noiseDensity: number;
  u_noiseStrength: number;
  u_frequency: number;
  u_amplitude: number;
  u_colorIntensity: number;
  u_colorOffset: number;
  u_colorPalette: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ];
}) {
  const uniforms = useMemo(
    () => ({
      u_time: {
        type: "f",
        value: 0,
      },
      u_noiseDensity: {
        type: "float",
        value: u_noiseDensity,
      },
      u_noiseStrength: {
        type: "float",
        value: u_noiseStrength,
      },
      u_frequency: {
        type: "float",
        value: u_frequency,
      },
      u_amplitude: {
        type: "float",
        value: u_amplitude,
      },
      u_colorIntensity: {
        type: "float",
        value: u_colorIntensity,
      },
      u_colorOffset: {
        type: "float",
        value: u_colorOffset,
      },
      u_colorBrightness: {
        type: "vec3",
        value: u_colorPalette[0],
      },
      u_colorContrast: {
        type: "vec3",
        value: u_colorPalette[1],
      },
      u_colorOscilation: {
        type: "vec3",
        value: u_colorPalette[2],
      },
      u_colorPhase: {
        type: "vec3",
        value: u_colorPalette[3],
      },
    }),
    []
  );

  const blobRef: MutableRefObject<Mesh> = useRef(null!);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    blobRef.current.rotateY(0.005);
    blobRef.current.position.y = pos[1] + Math.cos(pos[0] + elapsedTime) * 0.3;

    uniforms.u_time.value = elapsedTime;
  });

  return (
    <mesh position={pos} ref={blobRef}>
      <icosahedronGeometry args={[radius, 20]}></icosahedronGeometry>
      <shaderMaterial
        // wireframe={true}
        uniforms={uniforms}
        vertexShader={`
          vec3 mod289(vec3 x)
          {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
          }

          vec4 mod289(vec4 x)
          {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
          }

          vec4 permute(vec4 x)
          {
            return mod289(((x*34.0)+10.0)*x);
          }

          vec4 taylorInvSqrt(vec4 r)
          {
            return 1.79284291400159 - 0.85373472095314 * r;
          }

          vec3 fade(vec3 t) {
            return t*t*t*(t*(t*6.0-15.0)+10.0);
          }

          // Classic Perlin noise
          float cnoise(vec3 P)
          {
            vec3 Pi0 = floor(P); // Integer part for indexing
            vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
            Pi0 = mod289(Pi0);
            Pi1 = mod289(Pi1);
            vec3 Pf0 = fract(P); // Fractional part for interpolation
            vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
            vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
            vec4 iy = vec4(Pi0.yy, Pi1.yy);
            vec4 iz0 = Pi0.zzzz;
            vec4 iz1 = Pi1.zzzz;

            vec4 ixy = permute(permute(ix) + iy);
            vec4 ixy0 = permute(ixy + iz0);
            vec4 ixy1 = permute(ixy + iz1);

            vec4 gx0 = ixy0 * (1.0 / 7.0);
            vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
            gx0 = fract(gx0);
            vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
            vec4 sz0 = step(gz0, vec4(0.0));
            gx0 -= sz0 * (step(0.0, gx0) - 0.5);
            gy0 -= sz0 * (step(0.0, gy0) - 0.5);

            vec4 gx1 = ixy1 * (1.0 / 7.0);
            vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
            gx1 = fract(gx1);
            vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
            vec4 sz1 = step(gz1, vec4(0.0));
            gx1 -= sz1 * (step(0.0, gx1) - 0.5);
            gy1 -= sz1 * (step(0.0, gy1) - 0.5);

            vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
            vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
            vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
            vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
            vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
            vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
            vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
            vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

            vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
            g000 *= norm0.x;
            g010 *= norm0.y;
            g100 *= norm0.z;
            g110 *= norm0.w;
            vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
            g001 *= norm1.x;
            g011 *= norm1.y;
            g101 *= norm1.z;
            g111 *= norm1.w;

            float n000 = dot(g000, Pf0);
            float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
            float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
            float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
            float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
            float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
            float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
            float n111 = dot(g111, Pf1);

            vec3 fade_xyz = fade(Pf0);
            vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
            vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
            float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
            return 2.2 * n_xyz;
          }

          // Classic Perlin noise, periodic variant
          float pnoise(vec3 P, vec3 rep)
          {
            vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
            vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
            Pi0 = mod289(Pi0);
            Pi1 = mod289(Pi1);
            vec3 Pf0 = fract(P); // Fractional part for interpolation
            vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
            vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
            vec4 iy = vec4(Pi0.yy, Pi1.yy);
            vec4 iz0 = Pi0.zzzz;
            vec4 iz1 = Pi1.zzzz;

            vec4 ixy = permute(permute(ix) + iy);
            vec4 ixy0 = permute(ixy + iz0);
            vec4 ixy1 = permute(ixy + iz1);

            vec4 gx0 = ixy0 * (1.0 / 7.0);
            vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
            gx0 = fract(gx0);
            vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
            vec4 sz0 = step(gz0, vec4(0.0));
            gx0 -= sz0 * (step(0.0, gx0) - 0.5);
            gy0 -= sz0 * (step(0.0, gy0) - 0.5);

            vec4 gx1 = ixy1 * (1.0 / 7.0);
            vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
            gx1 = fract(gx1);
            vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
            vec4 sz1 = step(gz1, vec4(0.0));
            gx1 -= sz1 * (step(0.0, gx1) - 0.5);
            gy1 -= sz1 * (step(0.0, gy1) - 0.5);

            vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
            vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
            vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
            vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
            vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
            vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
            vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
            vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

            vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
            g000 *= norm0.x;
            g010 *= norm0.y;
            g100 *= norm0.z;
            g110 *= norm0.w;
            vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
            g001 *= norm1.x;
            g011 *= norm1.y;
            g101 *= norm1.z;
            g111 *= norm1.w;

            float n000 = dot(g000, Pf0);
            float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
            float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
            float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
            float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
            float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
            float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
            float n111 = dot(g111, Pf1);

            vec3 fade_xyz = fade(Pf0);
            vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
            vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
            float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
            return 2.2 * n_xyz;
          }





          mat3 rotation3dY(float angle) {
            float s = sin(angle);
            float c = cos(angle);

            return mat3(
              c, 0.0, -s,
              0.0, 1.0, 0.0,
              s, 0.0, c
            );
          }
          
          vec3 rotateY(vec3 v, float angle) {
            return rotation3dY(angle) * v;
          }



          mat3 rotation3dZ(float angle) {
            float s = sin(angle);
            float c = cos(angle);
          
            return mat3(
              c, s, 0.0,
              -s, c, 0.0,
              0.0, 0.0, 1.0
            );
          }
          
          vec3 rotateZ(vec3 v, float angle) {
            return rotation3dZ(angle) * v;
          }
          
          
        
          uniform float u_time;
          uniform float u_noiseDensity;
          uniform float u_noiseStrength;
          uniform float u_frequency;
          uniform float u_amplitude;
          
          varying float v_distort;

          void main() {
            float t = u_time * 0.4;
            
            float distortion = pnoise((normal + t), vec3(10.0) * u_noiseDensity) * u_noiseStrength;
          
            // Disturb each vertex along the direction of its normal
            vec3 pos = position + (normal * distortion);
          
            float angle = sin(uv.y * u_frequency + t) * u_amplitude;
            pos = rotateY(pos, angle);
            pos = rotateZ(pos, sin(uv.y * 3.0 + t * (1.0 + u_noiseStrength)) * 1.0);
            
            v_distort = distortion;
          
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float u_colorIntensity;
          uniform float u_colorOffset;
          uniform vec3 u_colorBrightness;
          uniform vec3 u_colorContrast;
          uniform vec3 u_colorOscilation;
          uniform vec3 u_colorPhase;
        
          varying float v_distort;

          vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
            return a + b * cos(6.28318 * (c * t + d));
          }

          void main() {
            float distort = v_distort * u_colorIntensity;

            // vec3 brightness = vec3(0.5,0.5,0.5);
            // vec3 contrast =   vec3(0.5,0.5,0.5);
            // vec3 oscilation = vec3(1.0,1.0,1.0);
            // vec3 phase =      vec3(0.1,0.2,0.3);

            // vec3 color = vec3(distort);
            vec3 color = cosPalette(distort + u_colorOffset, u_colorBrightness, u_colorContrast, u_colorOscilation, u_colorPhase);

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      ></shaderMaterial>
    </mesh>
  );
}

export default Blob;
