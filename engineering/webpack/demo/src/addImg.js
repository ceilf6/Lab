import $ from 'jquery';
import imgUrl from '@/a.png'
// JS动态资源路径webpack是无法识别的，得通过模块导入
// 在css中使用url()函数获取背景图片 webpack 是自动会对 url() 进行转换的 -> assets/

export function addImg() {
    $('<img>').prop('src', imgUrl).appendTo(document.body)
}