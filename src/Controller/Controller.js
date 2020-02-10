import React from 'react';
import ControllerPreset from './ControllerPreset';
import ControllerTable from './ControllerTable'
import './Controller.css';

class Controller extends React.Component {
    
    slideState = false;

    constructor(props) {
        super(props);
        // 리스너는 한 번만 전달되도 되기 때문에 미리 저장해둠
        this.onDataUpdateListener = this.props.onDataUpdateListener;
    }

    onSlideListener(e) {
        let ct = e.target.parentNode;
        if (this.slideState) {
            ct.style.transform = "translateY(0px)";
            e.target.innerHTML = '▲'
            this.slideState = false;
        }
        else {
            ct.style.transform = "translateY(-100%)";
            e.target.innerHTML = '▼'
            this.slideState = true;
        }
    }

    render() {
        return (
            <div className="Controller">
                <span className="Controller-Sliding"
                    onClick={this.onSlideListener.bind(this)}>▲
                </span>
                <ControllerPreset
                    onDataUpdateListener={this.onDataUpdateListener}/>
                {/* Preset List */}
                <ControllerTable
                    products={this.props.products}
                    data={this.props.data}
                    onDataUpdateListener={this.onDataUpdateListener}/>
                {/* 테이블 */}
            </div>
        )
    }
}

Controller.defaultProps = {
    data: [],
    products: []
}

export default Controller;