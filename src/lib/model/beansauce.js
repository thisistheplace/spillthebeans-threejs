import React, {useRef} from 'react'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'
import {extend, useFrame} from '@react-three/fiber'
import * as THREE from 'three'

extend({MarchingCubes, THREE})

const BeanSauce = (props) => {
  const ref = useRef()
  
  useFrame((state, delta) => {
    updateCubes(ref.current, state.clock.elapsedTime, props.numBeans, true, false, false)
  })  

  const resolution = 28
  const material = new THREE.MeshPhongMaterial( { color: 0xff3300, specular: 0xff3300, shininess: 2, vertexColors: true } )
  console.log(material)
  return (
    <marchingCubes ref={ref} material={material} resolution={resolution} enableUvs={false} enableColors={true} maxPolyCount={100000} position={(0, 0, 0)} scale={(700, 700, 700)}/>
  )
}

function updateCubes( object, time, numblobs, floor, wallx, wallz ) {

  // console.log(object)
  
  object.reset();

  // fill the field with some metaballs
  const subtract = 12;
  const strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );

  for ( let i = 0; i < numblobs; i ++ ) {

    const ballx = Math.sin( i + 1.26 * time * ( 1.03 + 0.5 * Math.cos( 0.21 * i ) ) ) * 0.27 + 0.5;
    const bally = Math.abs( Math.cos( i + 1.12 * time * Math.cos( 1.22 + 0.1424 * i ) ) ) * 0.77; // dip into the floor
    const ballz = Math.cos( i + 1.32 * time * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) ) ) * 0.27 + 0.5;

    console.log([ballx, bally, ballz])

    object.addBall( ballx, bally, ballz, strength, subtract );

  }

  if ( floor ) object.addPlaneY( 2, 12 );
  if ( wallz ) object.addPlaneZ( 2, 12 );
  if ( wallx ) object.addPlaneX( 2, 12 );

  // console.log(object)

  // object.update();

}

export {BeanSauce}