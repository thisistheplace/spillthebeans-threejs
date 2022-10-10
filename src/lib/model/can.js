import React, { Suspense } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {useLoader, extend} from '@react-three/fiber';

extend({Spinner})

function LoadCan() {
  const result = useLoader(OBJLoader, "/assets/can.obj")
  // You don't need to check for the presence of the result, when we're here
  // the result is guaranteed to be present since useLoader suspends the component
  return(
  <>
    <primitive object={result.scene} />
  </>
  )
}

// function to build model
function Can(){
  return (
    <Suspense fallback={<spinner animation="border" />}>
      <LoadCan />
    </Suspense>
  );

};

export {Can};