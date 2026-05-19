## 属性

src 属性：source资源

alt 属性：当图片损坏时显示的文字

## 和 a 元素连用

点击图片跳转

```html
<a>
	<img />
</a>
```

## map 连用

将图片当成地图

给 map 设置 name 属性

然后在 img 中 usemap

通过 map 的子元素 area 划分区域分流跳转

area 自己的 href

area 的 shape 有三种

circle

rect 矩形

poly 多边形 - 多点连续设置

左边原点是图片左上角

向右 x 增加

向下 y 增加

ps , pxcook, https://github.com/ceilf6/ScreenSniper

## figure 元素连用

“指代”

通常用于将图片、图片标题、图片描述包裹，实现语义化