import React, {useRef} from 'react'
import {extend, useFrame, useThree, useEffect} from '@react-three/fiber'
import {useGLTF} from '@react-three/drei'

import ParticleSystem, {
  Body,
  BoxZone,
  CrossZone,
  Emitter,
  Gravity,
  Life,
  Mass,
  MeshRenderer,
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
  console.log(geometry)
  geometry.scale(0.5, 0.5, 0.5)
  return (new THREE.Mesh(geometry, material));
}

const createZone = () => {
  const zone = new BoxZone(0, 0, 0, 100000, 0, 10000);

  zone.friction = 0.95;
  zone.max = 7;

  return zone;
};

const createEmitter = ({ position, body }) => {
  const emitter = new Emitter();
  emitter.damping = 0.8
  emitter.energy = 1000000

  const zone = createZone()

  return emitter
    .setRate(new Rate(new Span(1, 10), new Span(0.1, 0.25)))
    .addInitializers([
      new Mass(1),
      new Radius(1),
      new Life(2, 4),
      new Body(body),
      new Position(new BoxZone(1)),
      new RadialVelocity(100, new Vector3D(0, 1, 1), 30),
    ])
    .addBehaviours([
      new Rotate(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI, 1),
      new Scale(0.1, 0.1),
      new Gravity(3),
      new CrossZone(zone, 'bound')
    ])
    .setPosition(position)
    .emit();
};

const Beans = (props) => {
  const groupref = useRef()
  const ref = useRef()
  const state = useThree()

  const { nodes, materials } = useGLTF('/assets/bean.glb')
  console.log("bean")
  console.log(nodes)
  console.log(nodes["Quad_Sphere"].geometry)

  const sphereEmitter = createEmitter({
    position: {
      x: 0,
      y: 0,
    },
    body: createMesh(
      nodes["Quad_Sphere"].geometry,
      nodes["Quad_Sphere"].material
    )
  });

  const renderer = new MeshRenderer(state.scene, THREE)
  console.log(renderer)

  const system = new ParticleSystem()
  system.addEmitter(sphereEmitter)
  system.addRenderer(renderer)
  ref.current = system

  // state.camera.position.z = 400;
  // state.camera.position.y = -100;

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.update(delta)
  })

  return (
    <group ref={groupref}/>
  )
}

export {Beans}
