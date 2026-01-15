HTML5元素周期表

https://zptcsoft.github.io/html5-elements-periodic-table/

![截屏2026-01-15 18.37.55.png](attachment:96fb9241-0d31-4c4e-8b44-f581e54f4d71:截屏2026-01-15_18.37.55.png)

![image.png](attachment:48532c04-9d3f-48db-8e1c-289895e6d54e:image.png)

## h1~h6

一级标题到六级标题

## p

paragraphs 段落

lorem乱数假文：没有任何实际含义的文字

## span【无语义】

没有语义（小段文本）

用于样式的设置，例如一段话想要区分样式，就套一个 span 作为容器

> 某些元素在显示时会独占一行（块级元素）、有些元素不会（行级元素）
但是现在已经抛弃这种说法了，MDN 说“HTML（*超文本标记语言*）元素历来被归类为“块级”元素或者“行级”元素。作为一种表现特性，现在由 CSS 来指定。”
本质就是 HTML负责内容含义表征、CSS负责展示
> 

https://developer.mozilla.org/zh-CN/docs/Glossary/Block-level_content

## pre

预格式化文本元素

空白折叠规则：在源代码中的连续空白字符（空白、换行、制表），在页面显示时会被折叠成一个空格

例外：在 pre 元素中的内容不会出现空白折叠

因为 pre 元素内部出现的内容会按照源代码格式出现在页面上

通常用于在网页中显示代码

pre 元素功能的本质：浏览器配置的默认CSS样式

```html
white-space:pre
```