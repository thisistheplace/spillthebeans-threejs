import React, {useRef} from 'react';

const Lights = (props) => {
  const group = useRef()
  return (
    <group ref={group}>
      <spotLight position={[50, 50, 10]} intensity={0.5} angle={0.2} penumbra={1} />
      <pointLight position={[0, 200, 200]} color={0xffffff} intensity={0.5} distance={1000} decay={1}/>
    </group>
  )
}

export {Lights};