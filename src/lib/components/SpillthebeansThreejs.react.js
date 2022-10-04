import React, {Component, useEffect} from 'react';
import {Canvas} from '@react-three/fiber';
import PropTypes from 'prop-types';
// import {CameraControls} from './../model/controls.js';
// import {SpotLight} from './../model/lights.js';
// import ModelBuilder from './../model/model.js';
// import {color_limits} from './../model/contours.js';
// import Loader from './../utils/loader';
// import HandleExport from './../utils/exporter';
// import {ContextBridge, ResultsContext} from './../model/context_management.js';

const getWindowRatio = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const ratio = width / height
    return ratio
  };

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
// class SpillthebeansThreejs extends Component {

//     static defaultProps = {
//         opacity: "1",
//         loader: "hidden",
//     }

//     // build the model once!
//     constructor(props){
//         super(props);
//         this.state = {
//             model: ModelBuilder(this, props.members, props.nacelle, props.rotor_diameter, props.num_blades),
//             tooltip: {display: 'none', text: ""},
//             value: null,
//             time: 0.0,
//             play: false,
//             contours: color_limits(),
//             mouse: {x: 0.0, y: 0.0},
//         }
//     }


//     render() {
//         const {id} = this.props;

//         return (
//             <div id={id} className="threejs-block">
//                 <div className="loader">
//                     <Loader/>
//                 </div>
//                 <div className="cmpt_tooltip">
//                     {this.state.tooltip.text}
//                     <br />
//                     {this.state.value}
//                 </div>
//                 <div className="canvas_holder">
//                     <Canvas id="threejs_canvas">
//                         <HandleExport export_obj={this.props.export_obj}/>
//                         <axesHelper size={100} />
//                         <ambientLight intensity={0.5} />
//                         <SpotLight color={0xffffff} position={[1000, 1000, 1000]} intensity={1.3} distance={5000} />
//                         <SpotLight color={0xffffff} position={[-1000, -1000, -1000]} intensity={1.3} distance={5000} />
//                         <ambientLight color={0x222222} />
//                         {/* <ContextBridge> */}
//                         {this.state.model}
//                         {/* </ContextBridge> */}
//                         <perspectiveCamera makeDefault fov={75} aspect={getWindowRatio} near={0.1} far={1000}/>
//                         <CameraControls />
//                     </Canvas>
//                 </div>
//                 <style jsx>{`
//                     .canvas_holder {
//                         height: 1100px;
//                         width: 100%;
//                         background: white;
//                         z-index: 1;
//                     }
//                     .cmpt_tooltip {
//                         color: white;
//                         background: rgba(0, 0, 0, 0.8);
//                         border-radius: 20px;
//                         position: absolute;
//                         font-family: Verdana;
//                         z-index: 2;
//                         text-align: right;
//                         padding: 20px;
//                         display: ${this.state.tooltip.display};
//                         left: ${this.state.mouse.x}px;
//                         top: ${this.state.mouse.y}px;
//                     }
//                     .threejs-block {
//                         width: 50%;
//                         flex: 50%;
//                         opacity: ${this.props.opacity};
//                     }
//                     .loader {
//                         top: 50%;
//                         left: 25%;
//                         display: ${this.props.loader};
//                         position: absolute;
//                         z-index: 3;
//                     }
//                 `}</style>
//             </div>
//         );
//     }
// }

const SpillthebeansThreejs = (props) => {
    const {
      id,
      beans,
      selected
    } = props
  
    const [currentNodes, setNodes] = useState(id)
    const [currentEdges, setEdges, onEdgesChange] = useEdgesState(beans)
  
    useEffect(() => {
      setNodes(props.beans)
    }, [props.beans])
  
    const onNodesChange = useCallback(
      (changes) => {
        setNodes(
          (nds) => {
            const newnodes = applyNodeChanges(changes, nds)
            return newnodes
          }
        )
      },
      [setProps, setNodes]
    )
  
    // Update node props when component has been dragged
    const onNodeDragStop = useCallback(
      (clicked) => {
        setProps({ beans: currentNodes })
      },
      [setProps, currentNodes]
    )
  
    const onConnect = useCallback(
      (connection) => {
        setEdges(
          (eds) => {
            const neweds = addEdge(connection, eds)
            setProps({ edges: neweds })
            return neweds
          }
        )
      },
      [setProps, setEdges]
    )
  
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
        </Canvas>
    )
  }

PybvThreejs.defaultProps = {};

PybvThreejs.propTypes = {
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

export default SpillthebeansThreejs;