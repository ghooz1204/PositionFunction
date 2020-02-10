import React, {Component} from 'react';
import PosView from './ViewElement/PosView';
import './View.css'


class View extends Component {
    state = {
        elements: [
            "PosView"
        ]
    }

    onAddListener() {
        let newElements = this.state.elements;
        newElements.push("PosView");
        this.setState(newElements);
    }
    render() {
        let makeViewElements = this.state.elements.map((element, i) => {
            return (
                <PosView
                    key={i}
                    products={this.props.products}
                    data={this.props.data}/>
            )
        });
        return (
            <div className="View">
                {makeViewElements}
                {/* <div className="View-Add-Button"
                    onClick={this.onAddListener.bind(this)}>
                </div> */}
            </div>
        );
    }
}

export default View;