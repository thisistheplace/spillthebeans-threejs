import React, {useRef} from 'react'
import {extend, useFrame, useThree, useEffect} from '@react-three/fiber'

import ParticleSystem, {
  Body,
  BoxZone,
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

const createMesh = ({ geometry, material }) =>
  new THREE.Mesh(geometry, material);

const createEmitter = ({ position, body }) => {
  const emitter = new Emitter();

  return emitter
    .setRate(new Rate(new Span(5, 10), new Span(0.1, 0.25)))
    .addInitializers([
      new Mass(1),
      new Radius(10),
      new Life(2, 4),
      new Body(body),
      new Position(new BoxZone(100)),
      new RadialVelocity(200, new Vector3D(0, 1, 1), 30),
    ])
    .addBehaviours([
      new Rotate('random', 'random'),
      new Scale(1, 0.1),
      new Gravity(3),
    ])
    .setPosition(position)
    .emit();
};

const Beans = (props) => {
  const groupref = useRef()
  const ref = useRef()
  const state = useThree()

  const sphereEmitter = createEmitter({
    position: {
      x: -100,
      y: 0,
    },
    body: createMesh({
      geometry: new THREE.SphereGeometry(10, 8, 8),
      material: new THREE.MeshLambertMaterial({ color: '#ff0000' }),
    }),
  });

  const renderer = new MeshRenderer(state.scene, THREE)
  console.log(renderer)

  const system = new ParticleSystem()
  system.addEmitter(sphereEmitter)
  system.addRenderer(renderer)
  ref.current = system

  state.camera.position.z = 400;
  state.camera.position.y = -100;

  useFrame((state, delta) => {
    if (!ref.current) return
    // This function runs 60 times/second inside the global render-loop
    // ref.current.update();
    console.log(ref.current)
    ref.current.update(delta)
    // renderer.render(state.scene, state.camera);
  })

  return (
    // <customSystem ref={ref} emitters={[sphereEmitter]} renderers={[renderer]}/>
    <group ref={groupref}/>
  )
}

export {Beans}
