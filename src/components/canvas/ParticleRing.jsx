// import { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Sphere } from "@react-three/drei";
// import { pointsInner, pointsOuter } from "./rings.js";

// const ParticleRing = () => {
//   return (
//     <div className="relative">
//       <Canvas
//         camera={{
//           position: [10, -7.5, -5],
//         }}
//         style={{ height: "100vh" }}
//         className="bg-[#0d1117]"
//       >
//         <OrbitControls maxDistance={30} minDistance={10} />
//         <directionalLight />
//         <pointLight position={[-30, 0, -30]} power={10.0} />
//         <PointCircle />
//       </Canvas>

//       <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-slate-200 font-medium text-2xl md:text-5xl pointer-events-none">
//         Welcome
//       </h1>
//     </div>
//   );
// };

// const PointCircle = () => {
//   const ref = useRef(null);

//   useFrame(({ clock }) => {
//     if (ref.current?.rotation) {
//       ref.current.rotation.z = clock.getElapsedTime() * 0.05;
//     }
//   });

//   return (
//     <group ref={ref}>
//       {pointsInner.map((point) => (
//         <Point key={point.idx} position={point.position} color={point.color} />
//       ))}
//       {pointsOuter.map((point) => (
//         <Point key={point.idx} position={point.position} color={point.color} />
//       ))}
//     </group>
//   );
// };

// const Point = ({ position, color }) => {
//   return (
//     <Sphere position={position} args={[0.1, 10, 10]}>
//       <meshStandardMaterial
//         emissive={color}
//         emissiveIntensity={0.5}
//         roughness={0.5}
//         color={color}
//       />
//     </Sphere>
//   );
// };

// export default ParticleRing;

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { pointsInner, pointsOuter } from "./rings.js";

const TShape = (props) => {
  return (
    <group {...props} >
      <Box args={[0.2, 1, 0.1]}>
        <meshStandardMaterial
          emissive={props.color}
          emissiveIntensity={0.5}
          roughness={0.5}
          color={props.color}
        />
      </Box>
      <Box args={[1, 0.2, 0.1]} position={[0, -0.4, 0]}>
        <meshStandardMaterial
          emissive={props.color}
          emissiveIntensity={0.5}
          roughness={0.5}
          color={props.color}
        />
      </Box>
    </group>
  );
};

const TShapeRing = () => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  // Set your limit here.
  const limitInner = 1000;
  const limitOutter = 1000;
  const scalingFactorInner = 2; 
  const scalingFactorOutter = 5; 

  return (
    <group ref={ref}>
      {/* {pointsInner.slice(0, limitInner).map((point) => (
        <TShape key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.slice(0, limitOutter).map((point) => (
        <TShape key={point.idx} position={point.position} color={point.color} />
      ))} */}

      {pointsInner.slice(0, limitInner).map((point) => 
        <TShape 
        key={point.idx} 
        position={point.position.map(p => p * scalingFactorInner)} 
        color={point.color} 
        />
      )}
      {pointsOuter.slice(0, limitOutter).map((point) => 
        <TShape 
        key={point.idx} 
        position={point.position.map(p => p * scalingFactorOutter )} 
        color={point.color} 
        />
      )}
    </group>
  );
};

const ParticleRing = () => {
  return (
    <div className="relative">
      <Canvas camera={{
          position: [10, -7.5, -5],
        }}
        style={{ height: "100vh" }}
        className="bg-[#0d1117]">
        <OrbitControls maxDistance={300} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <TShapeRing />
      </Canvas>
    </div>
  );
};

export default ParticleRing;