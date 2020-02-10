import React, {Component} from 'react';
import addGrey from './add_grey.svg';
import addSky from './add_sky.svg';

class ControllerTable extends Component {
    constructor(props) {
        super(props);
        // 리스너는 한 번만 전달되도 되기 때문에 미리 저장해둠
        this.onDataUpdateListener = this.props.onDataUpdateListener;
    }
    overlapCheck() {
        // 같은 product가 없도록 중복 제거
        let cnt = 0;
        while(this.props.data[0].value['newProduct'+cnt] !== undefined) cnt++;
        // newProduct 카운트가 나오지 않을 때까지 카운트 상승
        return 'newProduct'+cnt;
    }
    insertProduct() {
        // 새로운 product 삽입
        let newProducts = this.props.products; // 새로 변경될 product 목록
        let newName = this.overlapCheck(); // 중복 제거된 새로운 name을 가져옴
        newProducts.push(newName); // 새로운 product를 추가
        let newData = this.props.data.map((data) => {
            data.value[newName] = 0; // 새로 추가된 product의 값을 초기화
            return data;
        }); // 새로 변경될 data
        this.onDataUpdateListener(newProducts, newData);
    }
    updateProduct(productIdx, e) {
        // 특정 product의 이름 변경
        let newProducts = this.props.products; // 새로 변경될 product 목록
        let newData = this.props.data.map((data) => {
            /* product 이름이 변경되었기 때문에 각 카테고리 object의 key 값을 모두 변경 */
            data.value[e.target.value] = data.value[newProducts[productIdx]]; // 새로운 key값으로 이전 value 옮겨줌
            delete data.value[newProducts[productIdx]]; // 이전에 쓰던 key 값은 삭제
            return data;
        });
        newProducts[productIdx] = e.target.value; // 바뀐 product index에 새 이름 부여
        this.onDataUpdateListener(newProducts, newData);
        e.target.style.opacity = 0; // 포커스가 해제 됐으므로 안 보이게 함
    }
    deleteProduct(productIdx, e) {
        // 특정 index의 product 삭제
        let newProducts = this.props.products; // 새로 변경될 product 목록
        let newData = this.props.data.map((data) => {
            delete data.value[newProducts[productIdx]]; // 안 쓰게될 key값을 제거
            return data;
        }); // 새로 변경될 data
        newProducts.splice(productIdx, 1); // 삭제하기 위해 잘라냄
        this.onDataUpdateListener(newProducts, newData);
    }
    insertCategory(e) {
        // 새로운 category 삽입
        let newProducts = this.props.products; // 새로 변경될 product 목록
        let newData = this.props.data; // 새로 변경될 data
        let newValue = {};
        newProducts.map((product) => {
            newValue[product] = 0;
            return true;
        });
        newData.push({category: 'newCategory', value: newValue}); // 새로운 카테고리를 추가
        this.onDataUpdateListener(newProducts, newData);
    }
    updateCategory(categoryIdx, e) {
        // 특정 카테고리의 이름을 변경
        let newProducts = this.props.products; // 새로 변경될 product 목록
        let newData = this.props.data; // 새로 변경될 data
        newData[categoryIdx].category = e.target.value; // 바뀐 category index에 새 이름 부여
        this.onDataUpdateListener(newProducts, newData);
        e.target.style.opacity = 0; // 포커스가 해제 됐으므로 안 보이게 함
    }
    deleteCategory(categoryIdx, e) {
        // 특정 index의 category 삭제
        let newProducts = this.props.products; // 새로 변경될 product 목록
        let newData = this.props.data; // 새로 변경될 data
        newData.splice(categoryIdx + 1, 1); // 삭제하기 위해 잘라냄
        this.onDataUpdateListener(newProducts, newData);
    }
    updateData(categoryIdx, productIdx, e) {
        // 특정 행과 열에 있는 데이터의 값을 변경
        let newProducts = this.props.products; // 새로 변경될 product 목록
        let newData = this.props.data; // 새로 변경될 data
        let value = parseFloat(e.target.value); // 값을 정수형(실수형)으로 받아옴
        // NaN 처리
        if (value >= 0) {
            // 값이 0 이상(정상적인 숫자 입력)일 경우
            newData[categoryIdx].value[newProducts[productIdx]] = value; // 그 product가 가리키는 category 값을 변경
            this.onDataUpdateListener(newProducts, newData);
        }
        e.target.style.opacity = 0;
    }
    uploadImage(e) {
        // 이미지 업로드
        let fileName = e.target.value;
        if (/(\.gif|\.jpg|\.jpeg|\.svg|\.png|\.tif|\.tiff|\.bmp)$/i.test(fileName)) { 
            // 이미지 파일이 맞는지 체크
            // 확장자를 정규표현을 통해 확인함
            let get_file = e.target.files; // 이미지 파일이 맞으면 그 파일을 가져옴
            let id = parseInt(e.target.id.replace("file", "")); // 몇 번째 파일 업로드인지 확인
            let reader = new FileReader();
            reader.onload = (() => {
                return (e) => {
                    // 이미지를 DataURL로 변경 후에 데이터 저장
                    let newProducts = this.props.products; // 새로 변경될 product 목록
                    let newData = this.props.data; // 새로 변경될 data
                    newData[0].value[newProducts[id]] = e.target.result; // 경로 저장
                    this.onDataUpdateListener(newProducts, newData);
                }
            })();
            if (get_file[0]) {
                // 업로드된 파일이 존재하면
                reader.readAsDataURL(get_file[0]); // 그 파일을 저장하고 경로를 가져옴
            }
        }
        else alert("이미지만 업로드할 수 있습니다.");
    }
    render() {
        return (
            <table className="Controller-Table">
                <tbody>
                    {this.makeHeader(this.props.products)}
                    {this.makeImageBody(this.props.data[0], this.props.products)}
                    {this.makeBody(this.props.data, this.props.products)}
                    {this.makeFooter(this.props.products)}
                </tbody>
            </table>
        )
    }
    /* 렌더 관련 함수 */
    makeHeader(products) {
        // 제품 목록 출력(테이블의 헤더)
        return (
            <tr className="Controller-Table-Header">
                {/* 첫번째 헤더는 공란 */}
                <td className="Controller-Table-Body"></td>
                {products.map((product, i) => {
                    // 두번째 헤더부터는 Product명이 들어감
                    return (
                        <td className="Controller-Table-Body"
                            key={product}>
                            {product}
                            <button className="Controller-Table-Delete" // product 삭제 버튼
                                onClick={this.deleteProduct.bind(this, i)}
                                value={true}>X</button>
                            <input className="Controller-Table-Update" // product 변경 박스
                                type="text" defaultValue={product} // 초기 값은 product 명
                                style={{ opacity: 0 }} // 초기엔 안 보이게 지정
                                onFocus={(e) => { e.target.style.opacity = 1; }} // 포커스 됐을 경우 보이도록 만듬
                                onBlur={this.updateProduct.bind(this, i)} />
                        </td>
                    )
                })}
                <td className="Controller-Table-Add Right-Button" // product 추가 버튼 생성
                    rowSpan={this.props.data.length + 1}
                    onClick={this.insertProduct.bind(this)}>
                    <img className="Controller-Table-Addition" 
                        src={addSky} alt="Add"/>
                </td>
            </tr>
        )
    }
    makeImageBody(images, keys) {
        // 이미지칸 출력(첫번째 칸)
        return (
            <tr style={{height: "160px"}}>
                {/* 첫번째 칸에는 이미지 카테고리 명 출력 */}
                <td className="Controller-Table-Body"
                style={{background:"#C7C7C7"}}>Image</td>
                {keys.map((key, i) => {
                    let id = 'file' + i; // 각각의 이미지 파일 업로드를 위한 id 설정
                    return (
                        <td className="Controller-Table-Body"
                            key={i}>
                            <label className="Controller-Table-Image" // 이미지 업로드 라벨
                                style={{ backgroundImage: "url(" + images.value[key] + ")" }} // 이미지가 존재할 경우 이미지 출력
                                htmlFor={id}>
                                <input style={{ display: "none" }} // 실제 이미지 업로드를 위한 input
                                    id={id} type='file'
                                    onChange={this.uploadImage.bind(this)} />
                            </label>
                        </td>
                    )
                })}
                {/* <td className="Controller-Table-Body"></td> */}
            </tr>
        )
    }
    makeBody(data, keys) {
        // 각 카테고리의 값 출력
        data = data.slice(1); // 이미지를 제외한 데이터만 사용
        return (
            <React.Fragment>
                {data.map((value, i) => {
                    let v = value.value; // v에 각 카테고리에 해당하는 제품의 수치 담음
                    return (
                        <tr key={i}>
                            <td className="Controller-Table-Body"
                                // 첫 번째 칸은 회색으로 칠함
                                style={{background:"#C7C7C7"}}>
                                {value.category}
                                <button className="Controller-Table-Delete" // 카테고리 삭제 버튼 생성
                                    value={true}
                                    onClick={this.deleteCategory.bind(this)}>X</button>
                                <input className="Controller-Table-Update" // 카테고리 명 변경 입력 박스
                                    type="text" defaultValue={value.category} // 초기 값은 카테고리 명
                                    style={{ opacity: 0 }} // 초기엔 안보이게 지정
                                    onFocus={(e) => { e.target.style.opacity = 1; }} // 포커스가 되면 보이게 함
                                    onBlur={this.updateCategory.bind(this, i + 1)} />
                            </td>
                            {keys.map((key, j) => {
                                /* 두 번째 칸부터 모든 키(제품)에 대해서 그 카테고리의 값 접근 */
                                let figure = v[key] ? v[key] : 0; // undefined 혹은 null이 나올 경우 수치를 0으로 조정
                                return (
                                    <td className="Controller-Table-Body"
                                        key={j}>
                                        {figure}
                                        <input className="Controller-Table-Update" // 각 데이터를 수정할 입력 박스
                                            type="text" defaultValue={figure} // 기존에 저장되어 있던 수치로 기본 값 설정
                                            style={{ opacity: 0 }} // 초기엔 안보이게 지정
                                            onFocus={(e) => { e.target.style.opacity = 1; }} // 포커스가 되면 보이게 함
                                            onBlur={this.updateData.bind(this, i + 1, j)} />
                                    </td>
                                )
                            })}
                            {/* <td className="Controller-Table-Body"></td> */}
                        </tr>
                    )
                })}
            </React.Fragment>
        )
    }
    makeFooter(products) {
        return (
            <tr>
                <td className="Controller-Table-Add Bottom-Button" // 첫 번째 열이기 때문에 회색 배경
                    colSpan={this.props.products.length + 1}
                    onClick={this.insertCategory.bind(this)}
                    style={{background:"#C7C7C7"}}>
                    <img className="Controller-Table-Addition" 
                        src={addGrey} alt="add"/>
                </td>
                {/* {products.map((product, i) => {
                    return (
                        <td className="Controller-Table-Body"></td>
                    )
                })} */}
            </tr>
        )
    }
}

export default ControllerTable;