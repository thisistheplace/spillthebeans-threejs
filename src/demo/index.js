import * as THREE from 'three';
import React from 'react';
import {extend} from '@react-three/fiber';
import {createRoot} from 'react-dom/client';
import App from './App';

extend(THREE)
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
