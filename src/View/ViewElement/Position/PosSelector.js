import React from 'react';
import arrow from './Arrow.svg'

class SelectBox extends React.Component {
    // 카테고리 선택 박스 선언
    handleClick(e) {
        this.props.onSelectedChange(e.target.id);
        // 특정 카테고리가 선택되면 선택 값을 바꿈
    }

    render() {
        let list = this.props.category.map((data, i) => {
            if (i >= 1)
                return (
                    // 카테고리 목록 모두 출력
                    <li id={i}
                        key={i}
                        className="View-PosSelector-Item"
                        onClick={this.handleClick.bind(this)}>
                        {data}
                    </li>
                );
            else return null;
        });
        return (
            <div className="View-PosSelector-Menu"
                style={ {borderBottom: "5px solid" + this.props.onColor}}>
                <span className="View-PosSelector-Selected">
                    {/* 어떤 카테고리가 선택되어 있는지 보여주는 박스 */}
                    {
                        this.props.selected && this.props.selected < this.props.category.length
                        // 선택된 번호가 카테고리 번호를 초과하지 않으면(삭제 시 예외 처리)
                        ? this.props.category[this.props.selected] : "선택 없음"}
                    {/* 선택된 목록이 없으면 "선택 없음" 출력 */}
                    <img className="View-PosSelector-Arrow" src={arrow} alt="arrow"/>
                </span>
                <ul className="View-PosSelector-List">
                    {/* 카테고리 목록 모두 출력 */}
                    {list}
                </ul>
            </div>
        )
    }
}

class PosSelector extends React.Component {

    render() {
        return (
            <div className="View-PosSelector">
                <SelectBox // 수직 선택 박스
                    category={this.props.category}
                    selected={this.props.hSelected}
                    onSelectedChange={this.props.onSelectedChange.bind(this, false)}
                    onColor="#FF1200"/>
                <SelectBox  // 수평 선택 박스
                    category={this.props.category}
                    selected={this.props.vSelected}
                    onSelectedChange={this.props.onSelectedChange.bind(this, true)}
                    onColor="#00C441"/>
            </div>
        )
    }
}

export default PosSelector;