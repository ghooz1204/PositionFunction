import React, {Component} from 'react';
import PosGraph from './Position/PosGraph';
import PosSelector from './Position/PosSelector';
import './Position/PosGraph.css'

class PosView extends Component {

    state = {
        // 선택 여부는 인덱스로 확인
        vSelected: null, // 세로(수직) 선 선택 여부
        hSelected: null // 가로(수평) 선 선택 여부
    }

    onSelectedChange(selector, value) {
        // 선택된 카테고리 변경
        if (selector) {
            // 수직 카테고리 변경
            this.setState({vSelected: value});
        }
        else {
            // 수평 카테고리 변경
            this.setState({hSelected: value});
        }
    }

    selectedDataCalculate(data, product, category) {
        // 선택된 데이터들의 x, y좌표를 계산
        let compareData = product.map((p) => {
            return {product: p, x: 50, y: 50, image: data[0]['value'][p]};
        });
        data.map((data) => {
            if (category[this.state.hSelected] === data.category) {
                product.map((p, i) => {
                    compareData[i].x = data.value[p] ? data.value[p] : 0;
                    return true;
                });
            }
            if (category[this.state.vSelected] === data.category) {
                product.map((p, i) => {
                    compareData[i].y = data.value[p] ? data.value[p] : 0;
                    return true;
                });
            }
            return true;
        });

        let maxX = Math.max.apply(Math, compareData.map((o) => { return o.x } ));
        let maxY = Math.max.apply(Math, compareData.map((o) => { return o.y } ));
        let minX = Math.min.apply(Math, compareData.map((o) => { return o.x } ));
        let minY = Math.min.apply(Math, compareData.map((o) => { return o.y } ));
        compareData = compareData.map((data) => {
            if (maxX - minX !== 0) {
                data.x = (data.x - minX) / (maxX - minX) * 90;
            } else data.x = 45;
            data.x += 5;
            if (maxY - minY !== 0) {
                data.y = (data.y - minY) / (maxY - minY) * 90;
            } else data.y = 45;
            data.y += 5;
            return data;
        });
        return compareData;
    }

    render() {
        let category = this.props.data.map((data, i) => {
            // 데이터로부터 카테고리 명만 추출
            return data.category;
        });
        let elements = [];
        if(this.state.vSelected || this.state.hSelected) {
            // 선택된 축이 하나라도 있을 경우 x, y 위치 계산
            elements = this.selectedDataCalculate(this.props.data, this.props.products, category);
        }
        return (
            <div className="View-Element">
                <PosGraph // 그래프가 보이는 부분에 x, y좌표가 정해진 Element들을 넘겨 줌
                    vCategory={category[this.state.vSelected]}
                    hCategory={category[this.state.hSelected]}
                    elements={elements} />
                <PosSelector // x, y축을 선택하는 부분에 모든 카테고리와 선택 함수 넘겨 줌
                    category={category}
                    vSelected={this.state.vSelected}
                    hSelected={this.state.hSelected}
                    onSelectedChange={this.onSelectedChange.bind(this)} />
            </div>
        );
    }
}

export default PosView;