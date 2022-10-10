import React, {useRef} from 'react'
import {useGLTF} from '@react-three/drei'

const Can = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/assets/can.glb')
  console.log(nodes)
  console.log(materials)
  return (
  <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes["Can001"].geometry} material={materials["Tin"]}/>
  </group>
  )
}

export {Can}