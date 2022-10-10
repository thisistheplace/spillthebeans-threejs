import PropTypes from 'prop-types';

import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {useGLTF, Loader, TrackballControls} from '@react-three/drei'

// import {Can} from '../model/can'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Can({ ...props }) {
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

function Bean(props){
    return (
        <>
            <Canvas>
                <TrackballControls/>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <Can/>
                </Suspense>
            </Canvas>
            <Loader />
        </>
    )
}

// createRoot(document.getElementById('root')).render(
function SpillthebeansThreejs(props) {
    return (
        <>
            <Bean args={props}/>
        </>
    )
}

SpillthebeansThreejs.defaultProps = {};

SpillthebeansThreejs.propTypes = {
    /**
     * The ID used to identify the container for the IFC viewer component.
     */
    id: PropTypes.string,
};

export default SpillthebeansThreejs;