## video

### 通过 controls 属性控制控件显示

取值只能是 controls（布尔属性）

布尔属性：取值只有两种状态

1. 不写
2. 取值为属性名（ html5 中可以不写）

autoplay 也是布尔属性：自动播放

muted 布尔属性：静音播放

loop 布尔属性：循环播放

## audio 音频

和 video 一模一样

## 兼容性

HTML5新增的

不同浏览器支持的音视频格式可能不一致

mp4, webm

用 video 包多个 resource 的方式

```html
        <!-- 兼容性 -->
        <video>
            <source src="../../../上海大学王景宏-Android&iOS-DayMate/产品演示/视频2-RN优化补丁.mov">
            <source src="../../../上海大学王景宏-Android&iOS-DayMate/产品演示/视频2-RN优化补丁.mop4">
            <p>
                对不起，你的浏览器不支持该视频播放，请点击这里下载最新的浏览器
            </p>
        </video>
```