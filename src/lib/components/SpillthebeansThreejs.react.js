// import React, {Component, useEffect, useState, useCallback, setProps} from 'react';
// import {Canvas} from '@react-three/fiber/native';
// import PropTypes from 'prop-types';
// // import {Can} from './../model/can.js';

// export default class SpillthebeansThreejs extends Component {

//     // build the model once!
//     constructor(props){
//         super(props);
//     }
  
//     render () {
//         const {
//             id,
//             beans,
//             selected
//         } = this.props

//         return (
//             // <Can/>
//             <div id={id}>
//                 <Canvas id="canvas_holder">
//                     <ambientLight />
//                     <pointLight position={[10, 10, 10]} />
//                     <boxGeometry args={[2, 2, 2]} />
//                 </Canvas>
//             </div>
//         )
//     }
// }

import React, { Suspense } from 'react'
import { useFBX } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

function Model(props) {
  const { scene } = useFBX("assets/can.fbx")
  return <primitive {...props} object={scene} />
}

export default function SpillthebeansThreejs() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  )
}

SpillthebeansThreejs.defaultProps = {};

SpillthebeansThreejs.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string.isRequired,

    /**
     * The beans!
     */
    beans: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            url: PropTypes.string
        })
    ),

    /**
     * The selected bean.
     */
    selected: PropTypes.string
};