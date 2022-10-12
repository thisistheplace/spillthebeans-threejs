import React, {useRef, useState, Suspense} from 'react'
import {extend, useFrame, useThree} from '@react-three/fiber'
import {Html, useProgress, useGLTF, ContactShadows} from '@react-three/drei'

import ParticleSystem, {
  Body,
  BoxZone,
  CrossZone,
  Emitter,
  Gravity,
  Life,
  Mass,
  MeshRenderer,
  PointZone,
  Position,
  RadialVelocity,
  Radius,
  Rate,
  Rotate,
  Scale,
  Span,
  Vector3D,
} from 'three-nebula';

import * as THREE from 'three'

class CustomSystem extends ParticleSystem {}

extend({THREE, CustomSystem})

const createMesh = (geometry, material) => {
  geometry.scale(0.5, 0.5, 0.5)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  return (mesh);
}

const material = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#13261f').convertSRGBToLinear(),
  roughness: 0.8,
  clearcoat: 0.5,
  clearcoatRoughness: 0,
  // metalness: 0.2
})

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

const createZone = () => {
  const zone = new BoxZone(0, 0.1, 0, 100000, 0, 10000);

  zone.friction = 0.5;
  zone.max = 7;

  return zone;
};

const createEmitter = ({ position, body }) => {
  const emitter = new Emitter();
  emitter.damping = 0.1
  emitter.energy = 0.00001
  const zone = createZone()

  return emitter
    .setRate(new Rate(new Span(4, 8), new Span(0.01, 0.1)))
    .addInitializers([
      new Mass(10),
      new Radius(0),
      new Life(2),
      new Body(body),
      new Position(new PointZone(0, 5, 0)),
      new RadialVelocity(10, new Vector3D(0, 1, 0), 180),
    ])
    .addBehaviours([
      new Rotate('random', 'random'),
      // new Rotate(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI, 0.01, easeOutExpo),
      // new Scale(0.1, 0.1),
      new Gravity(10),
      new CrossZone(zone, 'bound')
    ])
    .setPosition(position)
    .setTotalEmitTimes(10)
    .emit()
};

const Beans = (props) => {
  const ref = useRef()
  const state = useThree()

  const [rotation, setRotation] = useState(props.rotation);
  const [axis, setAxis] = useState(props.axis)
  const [angle, setAngle] = useState(0.)
  const [maxAngle, setMaxAngle] = useState(props.maxAngle)

  const { nodes } = useGLTF('/assets/bean.glb')

  const sphereEmitter = createEmitter({
    position: {
      x: 0.75,
      y: 0,
      z: 0
    },
    body: createMesh(
      nodes["Quad_Sphere"].geometry,
      material
    )
  });

  const renderer = new MeshRenderer(state.scene, THREE)

  const system = new ParticleSystem()
  system.addEmitter(sphereEmitter)
  system.addRenderer(renderer)
  ref.current = system

  // useEffect(() => {
  //   if (!ref.current) return
  //   console.log(ref.current.emitters)
  //   // sphereEmitter.initializers[0].tha = rotation * Math.PI / 180.
  // }, [rotation])

  // state.camera.position.z = 400;
  // state.camera.position.y = -100;

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.update(delta)
  })

  return (
    <Suspense fallback={<Loader/>}>
      {/* <group ref={groupref}/> */}
      <ContactShadows scale={10} blur={5} far={20}/>
    </Suspense>
  )
}

export {Beans}
