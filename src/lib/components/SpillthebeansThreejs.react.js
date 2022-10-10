import PropTypes from 'prop-types';

import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {Loader, OrbitControls} from '@react-three/drei'

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

const Bean = (props) => {
    return (
        <>
            <Canvas style={{'background':'white'}}>
                <perspectiveCamera makeDefault position={[- 500, 500, 1500]} />
                <Lights/>
                <OrbitControls/>
                <axesHelper />
                <Suspense fallback={null}>
                    <Can />
                </Suspense>
                {/* <BeanSauce {...props}/> */}
                <Beans />
            </Canvas>
            <Loader />
        </>
    )
}

function SpillthebeansThreejs(props) {
    console.log(props)
    return (
        <div id={props.id}>
            <Bean {...props}/>
        </div>
    )
}

SpillthebeansThreejs.defaultProps = {};

SpillthebeansThreejs.propTypes = {
    /**
     * The ID used to identify the container for the IFC viewer component.
     */
    id: PropTypes.string.isRequired,

    numBeans: PropTypes.number.isRequired
};

export default SpillthebeansThreejs;