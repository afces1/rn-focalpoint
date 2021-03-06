'use strict';

import React from 'react-native';

const { View } = React;

class FocalPoints extends React.Component {
    constructor(props){
        super(props);
        this.fpoints = [];
    }
    getChildContext(){
        return {
            addFocalPoint: this.addFocalPoint.bind(this),
            removeFocalPoint: this.removeFocalPoint.bind(this),
            focusOnPoint: this.focusOnPoint.bind(this),
            getFocalPointOptions: this.getFocalPointOptions.bind(this)
        };
    }
    addFocalPoint(point, index){
        if(index === undefined){ index = this.fpoints.length; }
        this.fpoints[index] = point;
    }
    removeFocalPoint(point){
        const index = this.fpoints.indexOf(point);
        if(index === -1){ return; }
        delete this.fpoints[index];
    }
    focusOnPoint(current){
        const index = this.fpoints.indexOf(current);
        const fpoints = this.fpoints;
        const next = index + 1;
        if(next > fpoints.length - 1 || !fpoints[next]){ return; }
        const nextFocalPoint = fpoints[next];
        const fpReference = nextFocalPoint.fpReference;
        nextFocalPoint.refs[fpReference].focus();
    }
    getFocalPointOptions(){
        return {
            onDone: this.props.onDone,
            blurOnSubmit: this.props.blurOnSubmit,
            kbNextKey: this.props.kbNextKey,
            kbDoneKey: this.props.kbDoneKey
        };
    }
    render(){
        return (
            <View style={this.props.style}>
                {this.props.children}
            </View>
        );
    }
}

FocalPoints.childContextTypes = {
    addFocalPoint: React.PropTypes.func,
    removeFocalPoint: React.PropTypes.func,
    focusOnPoint: React.PropTypes.func,
    getFocalPointOptions: React.PropTypes.func
};

FocalPoints.propTypes = {
    style: View.propTypes.style,
    children: React.PropTypes.any,
    onDone: React.PropTypes.func,
    blurOnSubmit: React.PropTypes.bool,
    kbNextKey: React.PropTypes.string,
    kbDoneKey: React.PropTypes.string
};

FocalPoints.defaultProps = {
    blurOnSubmit: false,
    kbNextKey: 'next',
    kbDoneKey: 'done'
};

export default FocalPoints;
