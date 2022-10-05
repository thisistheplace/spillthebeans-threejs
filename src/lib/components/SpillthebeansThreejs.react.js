import React, {Component, useCallback} from 'react';
import PropTypes from 'prop-types';

import { IfcViewerAPI } from 'web-ifc-viewer';

import Ocean from '../environment/Ocean';
import Daytime from '../environment/Daytime';

import Can from '../model/can';

class SpillthebeansThreejs extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.scene = null;
        this.viewer = null;
    }

    componentDidUpdate(prevProps){
    }

    componentDidMount() {
        const container = document.getElementById(this.props.id);
        const viewer = new IfcViewerAPI({
            container: container,
        });
        viewer.axes.setAxes();
        viewer.IFC.setWasmPath('../../');
        viewer.IFC.loader.ifcManager.applyWebIfcConfig({
            USE_FAST_BOOLS: true,
            COORDINATE_TO_ORIGIN: true
          });

        // Don't show edges
        viewer.context.renderer.postProduction.active = false;

        this.viewer = viewer;
        this.scene = this.viewer.IFC.context.getScene();

        // Create environmental components
        this.sky = this.createSky();
        this.ocean = this.createOcean(this.sky.sun);

        // Selectors
        window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
        window.onclick = () => viewer.IFC.selector.pickIfcItem(true);
        window.ondblclick = viewer.IFC.selector.highlightIfcItem(true);
        // Clear selection
        window.onkeydown = (event) => {
            if(event.code === 'KeyC') {
                viewer.IFC.selector.unpickIfcItems();
                viewer.IFC.selector.unHighlightIfcItems();
            }
        }
    }

    createOcean(sun){
        return new Ocean(this.viewer.IFC.context, sun);
    }

    createSky(){
        return new Daytime(this.viewer.IFC.context);
    }

    disposeEnvironment(){
        this.ocean.removeFromScene();
        this.sky.removeFromScene();
    }

    render() {
        return (
            <div id={this.props.id} className={"fullsize"}/>
        );
    }
}

SpillthebeansThreejs.defaultProps = {};

SpillthebeansThreejs.propTypes = {
    /**
     * The ID used to identify the container for the IFC viewer component.
     */
    id: PropTypes.string,
};

export default SpillthebeansThreejs;