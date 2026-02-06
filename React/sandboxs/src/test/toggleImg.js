import React from "react";
import ReactDOM from 'react-dom';
// 作为模块导入资源而不是拼接路径，否则打包后出问题
import img1 from '../assets/ceilf6.png'
import img2 from '../assets/maqima.jpeg'

const imgs = [img1, img2]

let index = 0; //显示的图片索引

const container = document.getElementById('root');

let timer; //计时器

/**
 * 根据index的值，显示某张图片
 */
function render() {
    ReactDOM.render(<img src={imgs[index]} alt="" />, container);
}

/**
 * 启动计时器，每隔一段时间，切换图片
 */
function start() {
    stop();
    timer = setInterval(() => {
        index = (index + 1) % 3; //改变index
        render(); // 每次都需要重新构建React元素对象
    }, 2000);
}

/**
 * 停止计时器
 */
function stop() {
    clearInterval(timer);
}

render();

start();

container.onmouseenter = function () {
    stop();
}

container.onmouseleave = function () {
    start();
}
