import React, {useRef} from 'react';

const Lights = (props) => {
  const group = useRef()
  return (
    <group ref={group}>
      <ambientLight color={0x101010}/>
      <pointLight position={[0, 200, 200]} color={0xffffff} intensity={2} distance={1000} decay={1}/>
      <spotLight position={[0, 500, 1000]} color={0xffffff} intensity={0.5}/>
    </group>
  )
}

export {Lights};