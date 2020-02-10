import React, {Component} from 'react';
import ViewElement from './PosElement';

class PosGraph extends Component {
    render() {
        let elements = this.props.elements.map((data, i) => {
            return (
                <ViewElement // element들을 만듬
                    key={i}
                    image={data.image}
                    product={data.product}
                    x={data.x}
                    y={data.y}/>
            )
        });
        return (
            <div className="View-PosGraph"
                // onWheel={
                //     function (e) {
                //         console.log(e);
                //         console.log(e.target);
                //         console.log(e.deltaX);
                //         console.log(e.deltaY);
                //     }
                // }
                >
                <hr className="View-PosGraph-Line-horizontal"/> {/* 수평 선 */}
                <hr className="View-PosGraph-Line-vertical"/> {/* 수직 선 */}

                <span className="View-PosGraph-Line-Guide-horizontal"
                    style={{transform: "translate(-100%, 50%)"}}>◀{this.props.hCategory}</span>
                <span className="View-PosGraph-Line-Guide-horizontal"
                    style={{transform: "translate(100%, 50%)", right: 0}}>{this.props.hCategory}▶</span>
                <span className="View-PosGraph-Line-Guide-vertical"
                    style={{transform: "translate(50%, -100%)"}}>▲{this.props.vCategory}</span>
                <span className="View-PosGraph-Line-Guide-vertical"
                    style={{transform: "translate(50%, 100%)", bottom: 0}}>{this.props.vCategory}▼</span>

                {elements} {/* x, y위치가 결정된 element들을 배치 */} 
            </div>
        )
    }
}

export default PosGraph;