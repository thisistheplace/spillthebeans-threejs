import React, {useRef, useEffect, useState} from 'react'
import {extend, useFrame} from '@react-three/fiber'
import {useGLTF} from '@react-three/drei'
import * as THREE from 'three'

extend({THREE})

const Can = (props) => {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/assets/can.glb')
  const [rotation, setRotation] = useState(props.rotation);
  const [axis, setAxis] = useState(props.axis)
  const [angle, setAngle] = useState(0.)
  const [maxAngle, setMaxAngle] = useState(props.maxAngle)

  const geom = nodes["Can001"].geometry

  useEffect(() => {
    geom.scale(15, 15, 15)
    geom.rotateZ(Math.PI * 0.25)
    geom.translate(0, 1, 0)
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
      <mesh geometry={geom} material={materials["Tin"]}/>
  </group>
  )
}

export {Can}