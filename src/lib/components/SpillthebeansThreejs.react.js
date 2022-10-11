import PropTypes from 'prop-types';

import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import {Loader, OrbitControls} from '@react-three/drei'
import * as THREE from 'three'

import {Can} from '../model/can'
import {BeanSauce} from '../model/beansauce'
import {Beans} from '../model/beans'
import {Lights} from '../model/lights'

const Box = (props) => {
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

const Model = (props) => {
    const [rotation, setRotation] = useState(props.rotation);
    console.log(props)
    // useFrame((state, delta) => (setRotation(rotation + 0.01)))

    return (
        <>
            <Can {...props}/>
            {/* <BeanSauce {...props}/> */}
            <Beans {...props}/>
            {/* <Floor {...props}/> */}
        </>
    )
}

function SpillthebeansThreejs(props) {
    return (
        <div id={props.id}>
            <Canvas shadows style={{'background':'white'}}>
                <perspectiveCamera makeDefault position={[- 500, 500, 1500]} />
                <Lights/>
                <OrbitControls/>
                <axesHelper />
                <Suspense fallback={null}>
                    <Model {...props}/>
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    )
}

SpillthebeansThreejs.defaultProps = {
    axis: new THREE.Vector3(1, 0, 0)
};

SpillthebeansThreejs.propTypes = {
    /**
     * The ID used to identify the container for the IFC viewer component.
     */
    id: PropTypes.string.isRequired,

    numBeans: PropTypes.number.isRequired,

    rotation: PropTypes.number.isRequired,

    maxAngle: PropTypes.number.isRequired,
};

export default SpillthebeansThreejs;