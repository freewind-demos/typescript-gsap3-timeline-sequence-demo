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

# 编译 TypeScript
npm run build

# 启动服务
npx serve .
```

然后打开浏览器访问 http://localhost:3000

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

### 第四部分：Timeline 控制方法

```typescript
const tl = gsap.timeline();

// 播放
tl.play();

// 暂停
tl.pause();

// 反向播放
tl.reverse();

// 从指定位置开始
tl.play(2); // 从第2秒开始

// 跳转百分比
tl.progress(0.5); // 跳到50%位置

// 时间缩放
tl.timeScale(2); // 2倍速
```

## 完整示例

```typescript
import { gsap } from 'gsap';

// 创建复杂的时间线
function createComplexTimeline(): gsap.core.Timeline {
  const tl = gsap.timeline();

  // 第一阶段：准备 - 缩小并隐藏
  tl.set([box1, box2, box3], { scale: 0.5, opacity: 0 });

  // 第二阶段：同时放大淡入，带有弹性效果
  tl.to([box1, box2, box3], {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    stagger: 0.1,  // 每个延迟0.1秒
    ease: 'back.out(1.7)'
  });

  // 第三阶段：依次跳舞
  tl.to(box1, { y: -50, duration: 0.3 })
    .to(box1, { y: 0, duration: 0.3 })
    .to(box2, { y: -50, duration: 0.3 }, '-=0.2')  // 重叠0.2秒
    .to(box2, { y: 0, duration: 0.3 })
    .to(box3, { y: -50, duration: 0.3 }, '-=0.2')
    .to(box3, { y: 0, duration: 0.3 });

  // 第四阶段：旋转扩散
  tl.to([box1, box2, box3], {
    x: (i) => (i - 1) * 150,  // 根据索引计算位置
    rotation: 720,
    scale: 0.3,
    duration: 1,
    stagger: 0.15,
    ease: 'power2.in'
  });

  // 第五阶段：弹性回归
  tl.to([box1, box2, box3], {
    x: 0,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'elastic.out(1, 0.5)'
  });

  return tl;
}

// 使用 timeline
const tl = createComplexTimeline();

// 控制播放
tl.play();        // 播放
tl.pause();       // 暂停
tl.reverse();     // 反向播放
tl.restart();     // 重新开始
```

## 完整讲解

### GSAP Timeline 是什么

GSAP Timeline 就像一条带刻度的时间轴。你可以把多个动画"放"到这条时间轴上，然后统一控制它们。

### 核心优势

1. **精确控制**：用秒数或标签精确定义每个动画的开始时间
2. **相对定位**：用 `-=0.5` 或 `+=0.5` 相对于上一个动画调整时间
3. **重叠动画**：让多个动画同时发生，只需设置相同的开始时间
4. **统一控制**：play、pause、reverse 一次性控制所有动画

### 时间位置参数详解

| 参数 | 含义 |
|------|------|
| `'-=0.5'` | 上一个动画结束前 0.5 秒开始（重叠） |
| `'+0.5'` | 上一个动画结束后 0.5 秒开始（间隙） |
| `'<'` | 紧跟上一个动画开始 |
| `'>'` | 上一个动画结束时 |
| `'2'` | 在 timeline 第 2 秒开始 |

### 常用缓动函数

- `power1.out`：开始快，结束慢
- `power2.in`：开始慢，结束快
- `back.out(1.7)`：带有回弹效果
- `elastic.out(1, 0.5)`：弹性效果
- `bounce.out`：弹跳效果

### 适用场景

- 页面加载动画
- 交互动画
- 动画序列编排
- 游戏过场动画

## 注意事项

1. Timeline 默认自动播放，如果不想自动播放用 `paused: true` 参数
2. 小数时间如 `-=0.25` 比 `-=0.5` 更精细
3. `stagger` 只对数组内的元素生效
4. `eventCallback` 可以监听 timeline 的状态变化
