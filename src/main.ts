import { gsap } from 'gsap';

// 获取 DOM 元素
const box1 = document.getElementById('box1')!;
const box2 = document.getElementById('box2')!;
const box3 = document.getElementById('box3')!;
const timeDisplay = document.getElementById('time')!;
const durationDisplay = document.getElementById('duration')!;
const progressDisplay = document.getElementById('progress')!;

// ============================================
// Demo 1: 基础 Timeline 序列
// ============================================
function createBasicTimeline(): gsap.core.Timeline {
  const tl = gsap.timeline();

  // 依次让三个盒子移动
  tl.to(box1, { x: 200, rotation: 360, duration: 1, ease: 'power2.out' })
    .to(box2, { x: 200, rotation: -360, duration: 1, ease: 'power2.out' }, '-=0.5') // 从0.5s处开始（重叠）
    .to(box3, { x: 200, rotation: 360, duration: 1, ease: 'power2.out' }, '-=0.5');

  return tl;
}

// ============================================
// Demo 2: 复杂动画编排
// ============================================
function createComplexTimeline(): gsap.core.Timeline {
  const tl = gsap.timeline();

  // 第一阶段：准备
  tl.set([box1, box2, box3], { scale: 0.5, opacity: 0 });

  // 第二阶段：同时放大淡入
  tl.to([box1, box2, box3], {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    stagger: 0.1, // 每个延迟0.1s
    ease: 'back.out(1.7)'
  });

  // 第三阶段：依次跳舞
  tl.to(box1, { y: -50, duration: 0.3, ease: 'power1.out' })
    .to(box1, { y: 0, duration: 0.3, ease: 'power1.in' })
    .to(box2, { y: -50, duration: 0.3, ease: 'power1.out' }, '-=0.2')
    .to(box2, { y: 0, duration: 0.3, ease: 'power1.in' })
    .to(box3, { y: -50, duration: 0.3, ease: 'power1.out' }, '-=0.2')
    .to(box3, { y: 0, duration: 0.3, ease: 'power1.in' });

  // 第四阶段：旋转扩散
  tl.to([box1, box2, box3], {
    x: (i) => (i - 1) * 150,
    rotation: 720,
    scale: 0.3,
    duration: 1,
    stagger: 0.15,
    ease: 'power2.in'
  });

  // 第五阶段：回归
  tl.to([box1, box2, box3], {
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'elastic.out(1, 0.5)'
  });

  return tl;
}

// ============================================
// 全局 timeline 实例
// ============================================
let currentTimeline: gsap.core.Timeline | null = null;

// 更新显示信息
function updateDisplay(tl: gsap.core.Timeline) {
  const time = tl.time().toFixed(2);
  const duration = tl.duration().toFixed(2);
  const progress = (tl.progress() * 100).toFixed(1);

  timeDisplay.textContent = time;
  durationDisplay.textContent = duration;
  progressDisplay.textContent = progress;
}

// ============================================
// 按钮事件处理
// ============================================
(window as any).playSequence = function() {
  if (currentTimeline) {
    currentTimeline.kill();
  }
  resetBoxes();
  currentTimeline = createBasicTimeline();
  trackTimeline(currentTimeline);
};

(window as any).playComplex = function() {
  if (currentTimeline) {
    currentTimeline.kill();
  }
  resetBoxes();
  currentTimeline = createComplexTimeline();
  trackTimeline(currentTimeline);
};

(window as any).reverseSequence = function() {
  if (currentTimeline) {
    currentTimeline.reverse();
  }
};

(window as any).pauseAll = function() {
  if (currentTimeline) {
    currentTimeline.pause();
  }
};

(window as any).resetAll = function() {
  if (currentTimeline) {
    currentTimeline.kill();
  }
  resetBoxes();
  timeDisplay.textContent = '0';
  durationDisplay.textContent = '0';
  progressDisplay.textContent = '0';
};

function resetBoxes() {
  gsap.set([box1, box2, box3], { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0 });
}

// 跟踪 timeline 进度
function trackTimeline(tl: gsap.core.Timeline) {
  updateDisplay(tl);
  tl.eventCallback('onUpdate', () => updateDisplay(tl));
}

// 初始显示
durationDisplay.textContent = '点击按钮开始';
