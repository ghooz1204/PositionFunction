import React from 'react'

class ViewElement extends React.Component {
    render() {
        return (
            <div className="View-PosGraph-Element"
                style={{
                    left: this.props.x + '%', bottom: this.props.y + '%',
                    backgroundImage: "url(" + this.props.image + ")"
                    }}> 
                {/* 이미지가 존재하면 이미지 출력, 없다면 제품 명 출력 */}
                {this.props.image ? '' : this.props.product}
            </div>
        )
    }
}

export default ViewElement;