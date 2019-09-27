# my-drag-box
一个可拖动和改变大小的插件

## usage

在script标签里引入js文件

``` javascript
var drag = new MyDrag({
    width: 100,
    height: 150,
    onChange: function(obj) {
        // do something...
    }
});
var container = document.querySelector('#container');
container.appendChild(drag.elem);

drag.update({
  width: 150,
  height: 120,
  left: 100,
  top: 30
});
```

## Options

构造函数属性

| name        | default        | description                            |
| ------------|----------------|----------------------------------------|
| elem        | HTMLDivElement | 可指定是哪个dom元素，如不指定，会默认生成  |
| width       | 100            | 盒子的初始宽度                           |
| height      | 100            | 盒子的初始高度                           |
| left        | 0              | 盒子初始的left值                         |
| top         | 0              | 盒子初始的top值                          |
| zIndex      | 10             | 盒子的zIndex                            |
| isFixAspect | false          | 是否在改变盒子大小的时候固定宽高比         |
| isShowRotate| false          | 是否显示旋转条                           |
| onChange    | null           | 在盒子改变时候触发的事件                  |
| rotate      | 0              | 初始旋转角度，单位是度数                  |

onchange返回的obj包括以下属性

| 属性名       | 描述     |
|-------------|--------|
| width       | 宽度    |
| height      | 高度    |
| left        | 当前的left值 |
| top         | 当前的top值   |
| rotate      | 当前旋转的度数 |
| type        | 事件类型：有9种，包括，move、scale和rotate还有对应的start和end事件 |
| name        | 当前操作点的名称，盒子为box，左边为l，上边为t，右边为r，下边为b，左上为lt，右上为rt，左下为lb，右下为rb |
| sourceEvent | 当前源事件    |

update方法可更新的属性包括：width，height，left，top，zIndex，rotate，isFixAspect