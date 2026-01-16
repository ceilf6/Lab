即 CSS 属性

调试：

开发者工具 Elements 的 elements.style

user agent ：UA，用户代理，即浏览器（默认样式表）

1. color
元素内部的文字颜色
预设值：定义好的单词
三原色：色值，光学三原色 （红、绿、蓝）
  1. rgb表示法：每个颜色可以用 0~255 之间的数字来表示 256色
    
    ```html
    color: rgb( , , )
    ```
    
     2. hex 16进制表示法
    即两位16进制表示256色
    
    ```html
    color: #008c8c
    ```
    
    常见的：
    
    淘宝红 #ff4400 三种颜色个位和十位相同时可以简写为 # f40
    
    黑色 #000
    
    白色 #fff
    
    红色 #f00
    
    绿 #0f0
    
    蓝 #00f
    
    紫 #f0f
    
    青 #0ff
    
    灰 #ccc
    
2. background-color
元素背景颜色
3. font-size
元素内部文字的尺寸大小
    
    单位：
    
    1. px 像素，简单理解为文字的高度占多少像素
    2. em 相对单位，相对于父元素的字体大小，最终会被换算成绝对单位 px（可以在 Elements 的 Computed 中查看）
    每个元素必须有字体大小，如果没有声明，则直接使用父元素的字体大小，如果没有父元素(html)，则使用基准字号（例如来自谷歌浏览器的设置）
4. font-weight
字体粗细，可以取值为数字，一般用
1. normal 是 400
2. bold 加粗
strong 元素默认是加粗的
strong 表示重要的、不能忽略的内容
5. font-family
文字类型
例如 微软雅黑 等等电脑上带有的，可以同时设置多个（优先级等等）
    
    ```html
    font-family: consolas,微软雅黑,Arial,sans-serif
    ```
    
    snas-serif 非衬线字体，是一类字体，例如微软雅黑等，兜底
    
6. font-style
字体样式，通常用它设置斜体
    
    ```html
    font-style: italic
    ```
    
    i ，em 元素的默认样式是倾斜字体
    i 元素表达的语义是特殊的文本，例如术语，朗读时会有特殊的声调，通常用于表示一个图标
    
    em 表示强调的内容
    
7. text-decoration
    
    文本修饰：给文本加线
    
    line-through 穿过文字-文字中间加一条线
    
    del 元素表示错误的内容
    
    s 元素表示已经过期
    
    underline 下划线
    
    a元素
    
8. text-indent
    
    首行文本缩进
    
    1. px 像素值
    2. em
9. line-height
    
    行高：每行文本的高度，该值越大，每行文本距离越大
    
    设置行高为容器的高度 height ，可以让单行文本垂直居中（但是只能单行，现在更多用 flex 即display:flex;align-items:center
    
    行高可以设置为纯数字，表示相当于当前元素的字体大小
    
10. width
    
    宽度
    
11. height
    
    高度
    
12. letter-space
    
    文字之间的横向间隙
    
13. text-aligh
    
    元素内部文字的水平排列方式
    
    left
    
    center
    
    right