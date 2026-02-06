import React from 'react'; // 虽然也许可能没有使用，如果删了就会报错React.createElement
import ReactDOM from 'react-dom';

const computed = React.createElement("div", {}, `${250 * 250}`)

const obj = {
    att1: 1,
    att2: 2
}
const XMLObj = (<h1>nihao</h1>)

const arr = [1, 2, 3]
const XMLObjArr = new Array(3).fill(0).map((item, i) => { return (<li key={i}>{i + 1}</li>) })

let bool = true

const content = "<h1>nihao</h1>"

const el = (
    <React.Fragment>{/* <> */}

        <h1>Hello World <span>span元素</span></h1>
        <div>2th Element</div>

        <div>{250 * 250}</div>
        {computed}

        {null}
        {undefined}
        {false}
        {0}

        {/* {obj} */}
        {XMLObj}

        {arr /* 会依次遍历子元素然后加入 */}
        {/* 
        "1"
        "2"
        "3"
        */}
        <ul>
            {XMLObjArr}
        </ul>

        <h1 att={"val"}
            className={bool ? "active" : "negative"}
            style={
                { marginLeft: "50px", color: "red" }
            }
        // style 需要赋值对象
        >att={"val"}</h1>

        {content /* DOM.innerText 而不是 innerHTML */}
        <div dangerouslySetInnerHTML={
            {
                __html: content
            }
        }>
            {/* dangerouslySetInnerHTML */}
        </div>

        {/* </> */}</React.Fragment>
)

// Object.freeze
const el2 = (
    <div att="2">el2</div>
)
console.log("=== el2:", el2.props.children, el2.att)
// el2.props.children = "el1";
// el2.att = "1"
// console.log("=== el2:", el2.props.children, el2.att)
let num = 0;
setInterval(() => {
    num++;
    const el3 = (
        <div>
            {num}
        </div>
    )
    ReactDOM.render(
        <div>
            {el}
            {el2}
            {el3}
        </div>
        , document.getElementById('root'));
}, 1000)
