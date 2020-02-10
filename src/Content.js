import React, { Component } from 'react';
import View from './View/View';
import Controller from './Controller/Controller';

class Content extends Component {
    state = {
        products: ['Product1', 'Product2', 'Product3', 'Product4'], // 제품 목록
        data: [ // 각 제품에 제시된 데이터
            {
                category: 'Image',
                value: {
                    Product1: null,
                    Product2: null,
                    Product3: null,
                    Product4: null
                }
            },
            {
                category: 'Category1',
                value: {
                    Product1: 0,
                    Product2: 0,
                    Product3: 0,
                    Product4: 0
                }
            },
            {
                category: 'Category2',
                value: {
                    Product1: 0,
                    Product2: 0,
                    Product3: 0,
                    Product4: 0
                }
            }
        ]
    }
    onDataUpdateListener(products, data) {
        this.setState({ products: products, data: data }); // 새로 들어온 데이터로 값 갱신
    }

    render() {
        return (
            <div className="Content">
                <View
                    products={this.state.products}
                    data={this.state.data} />
                <Controller
                    products={this.state.products}
                    data={this.state.data}
                    onDataUpdateListener={this.onDataUpdateListener.bind(this)} />
            </div>
        )
    }
}

export default Content;