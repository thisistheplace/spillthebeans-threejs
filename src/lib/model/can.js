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

const label = () => {
  const texture = new THREE.TextureLoader().load( "/assets/label.png" );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.rotation = Math.PI
  texture.repeat.set( 1.1, 1.2 );
  texture.offset.set(1.4, 0)
  // texture.anisotropy = 20
  const material = new THREE.MeshBasicMaterial(
    {
      map: texture
    }
  )
  material.side = THREE.FrontSide
  console.log(material)
  return material
}

const Can = (props) => {
  const ref = useRef()
  const { nodes } = useGLTF('/assets/single-can.glb')
  const [canAngle, setCanAngle] = useState(props.canAngle)

  const canBase = nodes["can-base"].children[0].geometry
  const canMid = nodes["can-middle"].children[0].geometry
  const canTop = nodes["can-top"].children[0].geometry
  const cans = [canBase, canMid, canMid.clone(), canTop]
  const lid = nodes["can-lid"].geometry

  // const materials = [material, label(), material, material]
  const materials = [material, material, material, material]


  useEffect(() => {
    cans.forEach(canPart => {
      canPart.scale(15, 15, 15)
      canPart.rotateZ(canAngle)
      canPart.translate(0, 1.5, 0)
    })

    lid.scale(15, 15, 15)
    lid.rotateZ(canAngle)
    lid.translate(0, 1.5, 0)
  }, [])

  return (
  <group ref={ref} dispose={null}>
      {cans.map((canPart, i) => {
        return (<mesh key={i} geometry={canPart} material={materials[i]} castShadow/>)
      })}
      <mesh geometry={lid} material={material} castShadow/>
      <ContactShadows scale={10} blur={5} far={10} frames={1}/>
  </group>
  )
}

export {Can}