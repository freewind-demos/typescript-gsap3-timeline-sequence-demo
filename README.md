# GSAP 3 Timeline 序列动画

## 简介

本 Demo 演示 GSAP 3 中 Timeline（时间线）的核心功能：如何创建序列动画、复杂动画编排、以及时间线控制。

GSAP Timeline 就像是一个动画导演，可以精确控制多个动画的执行顺序、时间和重叠关系。

## 快速开始

### 环境要求

- Node.js 18+
- 浏览器支持 ES2020

### 运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

然后打开浏览器访问 http://localhost:5173

## 概念讲解

### 第一部分：Timeline 基础

Timeline 是 GSAP 的核心概念，它创建一个时间线容器，把多个动画添加进去后，可以统一控制它们的播放、暂停、倒放等。

```typescript
import { gsap } from 'gsap';

// 创建 timeline
const tl = gsap.timeline();

// 添加动画：默认依次执行
tl.to(box1, { x: 200, duration: 1 })
  .to(box2, { x: 200, duration: 1 })
  .to(box3, { x: 200, duration: 1 });
```

上面的代码会让三个盒子依次向右移动，每个动画间隔 1 秒。

### 第二部分：时间控制 - 重叠与间隙

使用位置参数（position）控制动画之间的重叠和间隙：

```typescript
const tl = gsap.timeline();

// "-=0.5" 表示新动画从上一个动画结束前 0.5 秒开始（重叠）
tl.to(box1, { x: 200, duration: 1 })
  .to(box2, { x: 200, duration: 1 }, '-=0.5')

// "+=0.5" 表示新动画在上一个动画结束后延迟 0.5 秒开始
  .to(box3, { x: 200, duration: 1 }, '+=0.5')

// 也可以使用绝对时间（从 timeline 开始计算）
  .to(box4, { x: 200, duration: 1 }, 2); // 在第2秒开始
```

### 第三部分：stagger 错开动画

同时对多个元素应用动画，但让它们稍有延迟：

```typescript
// 三个盒子依次淡入，每个延迟 0.1 秒
tl.to([box1, box2, box3], {
  opacity: 1,
  duration: 0.5,
  stagger: 0.1  // 每个元素延迟 0.1s
});
```

### 第四部分：Timeline 嵌套

可以把一个 timeline 作为子时间线添加到另一个 timeline 中：

```typescript
const subTimeline = gsap.timeline();
subTimeline
  .to(box1, { x: 150, duration: 1 })
  .to(box1, { rotation: 180, duration: 0.8 });

const mainTimeline = gsap.timeline();
mainTimeline
  .add(subTimeline, 'phase1')  // 添加子时间线
  .add(subTimeline.reverse(), 'phase2');  // 可以反向添加
```

### 第五部分：时间线标签

使用标签（Label）标记时间线中的特定位置，方便跳转：

```typescript
const tl = gsap.timeline();

tl.to(box, { scale: 1.5, duration: 0.5 })
  .add('intro')  // 添加标签
  .to(box, { x: 100, duration: 1 }, 'intro')
  .add('main')
  .to(box, { rotation: 360, duration: 1.5 }, 'main');

// 跳转到指定标签
tl.seek('main');
```

### 第六部分：Timeline 控制方法

```typescript
const tl = gsap.timeline();

// 播放控制
tl.play();       // 开始播放
tl.pause();      // 暂停
tl.reverse();    // 反向播放
tl.restart();    // 重新开始

// 跳转
tl.seek(2);           // 跳到第2秒
tl.seek('main');      // 跳到标签位置
tl.progress(0.5);     // 跳到50%位置

// 时间缩放
tl.timeScale(2);       // 2倍速播放
tl.timeScale(0.5);     // 0.5倍速慢放

// 获取信息
tl.time();             // 当前时间
tl.duration();         // 总时长
tl.progress();         // 进度 (0-1)
```

## 完整示例

```typescript
import { gsap } from 'gsap';

// 创建基础序列时间线
const basicTimeline = gsap.timeline();

basicTimeline
  // 第一个盒子向右移动并旋转
  .to(box1, { x: 200, rotation: 360, duration: 1, ease: 'power2.out' })
  // 第二个盒子重叠 0.5 秒开始
  .to(box2, { x: 200, rotation: -360, duration: 1, ease: 'power2.out' }, '-=0.5')
  // 第三个盒子同样重叠 0.5 秒
  .to(box3, { x: 200, rotation: 360, duration: 1, ease: 'power2.out' }, '-=0.5');

// 创建交错动画
const staggerTimeline = gsap.timeline();

staggerTimeline
  .from(staggerItems, {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,      // 每个元素延迟 0.1s
    ease: 'back.out(1.7)'
  })
  .to(staggerItems, {
    y: -50,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power1.out'
  });

// 创建带标签的时间线
const labelTimeline = gsap.timeline();

labelTimeline
  .to(boxLabel, { scale: 1.5, duration: 0.5, ease: 'power2.out' })
  .add('intro')
  .to(boxLabel, { x: 100, duration: 1, ease: 'power1.inOut' }, 'intro')
  .add('main')
  .to(boxLabel, { rotation: 360, duration: 1.5, ease: 'power2.inOut' }, 'main')
  .add('outro')
  .to(boxLabel, { x: 0, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }, 'outro');

// 使用时间线
labelTimeline.seek('main');  // 跳到 main 标签位置
```

## 完整讲解

### GSAP Timeline 是什么

GSAP Timeline 就像一条带刻度的时间轴。你可以把多个动画"放"到这条时间轴上，然后统一控制它们。

和单独使用 `gsap.to()` 的区别是：单独使用每个动画都是独立的，而 Timeline 可以让多个动画精确地按顺序或并行执行。

### 核心优势

1. **精确控制**：用秒数或标签精确定义每个动画的开始时间
2. **相对定位**：用 `-=0.5` 或 `+=0.5` 相对于上一个动画调整时间
3. **重叠动画**：让多个动画同时发生，只需设置相同的开始时间
4. **统一控制**：play、pause、reverse 一次性控制所有动画
5. **嵌套复用**：子时间线可以复用，让复杂动画模块化

### 时间位置参数详解

- `'-=0.5'`：上一个动画结束前 0.5 秒开始（重叠）
- `'+0.5'`：上一个动画结束后 0.5 秒开始（间隙）
- `'<'`：紧跟上一个动画开始
- `'>'`：上一个动画结束时
- `'2'`：在 timeline 第 2 秒开始
- `'myLabel'`：在指定标签位置开始

### 常用缓动函数

- `power1.out`：开始快，结束慢
- `power2.in`：开始慢，结束快
- `back.out(1.7)`：带有回弹效果
- `elastic.out(1, 0.5)`：弹性效果
- `bounce.out`：弹跳效果

### stagger 配置项

```typescript
// 基础用法
stagger: 0.1  // 每个元素延迟 0.1s

// 从最后一个开始反向
stagger: { each: 0.1, from: 'end' }

// 完整配置
stagger: {
  each: 0.1,           // 每个元素间隔
  from: 'center',      // 从哪个位置开始 ('start', 'center', 'end', index)
  ease: 'power2.out'   // 缓动函数
}
```

### 适用场景

- 页面加载动画
- 交互动画反馈
- 动画序列编排
- 游戏过场动画
- 数据可视化动画

## 注意事项

1. Timeline 默认自动播放，如果不想自动播放用 `paused: true` 参数
2. 小数时间如 `-=0.25` 比 `-=0.5` 更精细
3. `stagger` 只对数组内的元素生效
4. `eventCallback` 可以监听 timeline 的状态变化（onStart, onUpdate, onComplete 等）
5. 标签名称在同一 timeline 中必须唯一
