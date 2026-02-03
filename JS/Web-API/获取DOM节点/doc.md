dom 0

- document.body：获取body元素节点
- document.head：获取head元素节点
- document.links：获取页面上所有的超链接元素节点，类数组
- document.anchors：获取页面上所有的锚链接(具有name属性)元素节点
- document.forms：获取页面中所有的form元素节点

## 新的获取元素节点的方式

### 通过方法获取

- document.getElementById：通过id获取对应id的元素
- document.getElementsByTagName: 通过元素名称获取元素
- document.getElementsByClassName：通过元素的类样式获取元素，IE9以下无效
- document.getElementsByName：通过元素的name属性值获取元素
- document.querySelector：通过CSS选择器获取元素，得到匹配的第一个，IE8以下无效
- document.querySelectorAll：通过CSS选择器获取元素，得到所有匹配的结果，IE8以下无效
- document.documentElement: 获取根元素
