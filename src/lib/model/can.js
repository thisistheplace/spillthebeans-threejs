import React, {useRef, useEffect, useState} from 'react'
import {extend, useFrame} from '@react-three/fiber'
import {useGLTF, ContactShadows, Environment} from '@react-three/drei'
import * as THREE from 'three'

extend({THREE})

const material = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#bb86a1').convertSRGBToLinear(),
  roughness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0,
  metalness: 1,
  side: THREE.DoubleSide
})

const Can = (props) => {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/assets/open_can.glb')
  const [rotation, setRotation] = useState(props.rotation);
  const [axis, setAxis] = useState(props.axis)
  const [angle, setAngle] = useState(0.)
  const [maxAngle, setMaxAngle] = useState(props.maxAngle)

  const can = nodes["Can001"].geometry
  const lid = nodes["Can002"].geometry

  useEffect(() => {
    can.scale(15, 15, 15)
    can.rotateZ(Math.PI * -0.75)
    can.translate(0, 1.5, 0)

    lid.scale(15, 15, 15)
    lid.rotateZ(Math.PI * -0.75)
    lid.translate(0, 1.5, 0)
  }, [])

  useEffect(() => {
    if (!ref.current) return
    if (angle > maxAngle){
      setRotation(0.)
    }
  }, [angle])

  useFrame((state, delta) => {
    if (!ref.current) return
    if (rotation > 0.){
      // ref.current.rotateOnWorldAxis(axis, rotation)
      setAngle(angle + rotation)
    }
  })

  return (
  <group ref={ref} dispose={null}>
      <mesh geometry={can} material={material} castShadow/>
      <mesh geometry={lid} material={material} castShadow/>
      <ContactShadows scale={10} blur={5} far={10} frames={1}/>
  </group>
  )
}

export {Can}