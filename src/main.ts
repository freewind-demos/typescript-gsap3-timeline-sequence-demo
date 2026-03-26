import { gsap } from 'gsap';

// ============================================
// Demo 1: 基础 Timeline 序列
// ============================================
const box1 = document.getElementById('box1')!;
const box2 = document.getElementById('box2')!;
const box3 = document.getElementById('box3')!;
const time1 = document.getElementById('time1')!;
const duration1 = document.getElementById('duration1')!;

const basicTimeline = gsap.timeline({
  onUpdate: () => {
    time1.textContent = basicTimeline.time().toFixed(2);
  }
});

basicTimeline
  .to(box1, { x: 200, rotation: 360, duration: 1, ease: 'power2.out' })
  .to(box2, { x: 200, rotation: -360, duration: 1, ease: 'power2.out' }, '-=0.5')
  .to(box3, { x: 200, rotation: 360, duration: 1, ease: 'power2.out' }, '-=0.5');

duration1.textContent = basicTimeline.duration().toFixed(2);

// ============================================
// Demo 2: 交错动画 (Stagger)
// ============================================
const staggerItems = document.querySelectorAll('.stagger-item');

const staggerTimeline = gsap.timeline();

staggerTimeline
  .from(staggerItems, {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  })
  .to(staggerItems, {
    y: -50,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power1.out'
  })
  .to(staggerItems, {
    y: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power1.in'
  })
  .to(staggerItems, {
    scale: 0.8,
    rotation: 45,
    duration: 0.3,
    stagger: 0.08,
    ease: 'power2.in'
  })
  .to(staggerItems, {
    scale: 1,
    rotation: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: 'elastic.out(1, 0.5)'
  });

// ============================================
// Demo 3: 时间线嵌套
// ============================================
const boxNested1 = document.getElementById('box-nested1')!;
const boxNested2 = document.getElementById('box-nested2')!;

// 创建子时间线
const subTimeline1 = gsap.timeline();
subTimeline1
  .to(boxNested1, { x: 150, duration: 1, ease: 'power2.out' })
  .to(boxNested1, { rotation: 180, duration: 0.8, ease: 'power1.inOut' })
  .to(boxNested1, { x: 0, y: -50, duration: 0.6, ease: 'power2.out' })
  .to(boxNested1, { x: 0, y: 0, duration: 0.5, ease: 'bounce.out' });

const subTimeline2 = gsap.timeline();
subTimeline2
  .to(boxNested2, { x: -150, duration: 1, ease: 'power2.out' })
  .to(boxNested2, { rotation: -180, duration: 0.8, ease: 'power1.inOut' })
  .to(boxNested2, { x: 0, y: 50, duration: 0.6, ease: 'power2.out' })
  .to(boxNested2, { x: 0, y: 0, duration: 0.5, ease: 'bounce.out' });

// 父时间线控制子时间线
const nestedTimeline = gsap.timeline();
nestedTimeline
  .add(subTimeline1, 'phase1')
  .add(subTimeline2, 'phase1')
  .to({}, { duration: 0.5 })
  .add(subTimeline1.reverse(), 'phase2')
  .add(subTimeline2.reverse(), 'phase2');

// ============================================
// Demo 4: 时间线标签
// ============================================
const boxLabel = document.getElementById('box-label')!;

const labelTimeline = gsap.timeline();

labelTimeline
  .to(boxLabel, { scale: 1.5, duration: 0.5, ease: 'power2.out' })
  .add('intro')
  .to(boxLabel, { x: 100, duration: 1, ease: 'power1.inOut' }, 'intro')
  .add('main')
  .to(boxLabel, { rotation: 360, x: 100, duration: 1.5, ease: 'power2.inOut' }, 'main')
  .to(boxLabel, { scale: 1, duration: 0.5, ease: 'back.in(3)' }, 'main+=1')
  .add('outro')
  .to(boxLabel, { x: 0, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }, 'outro');

export {};
