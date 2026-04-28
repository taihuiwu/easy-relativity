export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Quiz {
  chapterId: number
  title: string
  questions: QuizQuestion[]
}

export const quizzes: Quiz[] = [
  {
    chapterId: 1,
    title: '光速的奥秘 - 测验',
    questions: [
      {
        id: 1,
        question: '光速大约是多少？',
        options: ['3×10⁶ 米/秒', '3×10⁸ 米/秒', '3×10¹⁰ 米/秒', '3×10⁵ 米/秒'],
        correctAnswer: 1,
        explanation: '光速约为 3×10⁸ 米/秒，即每秒约30万公里。这是宇宙中最快的速度。',
      },
      {
        id: 2,
        question: '光速不变原理说的是什么？',
        options: [
          '光速随观察者的速度变化',
          '光速在真空中恒定，与观察者的运动状态无关',
          '光速在不同介质中相同',
          '光速随时间变化',
        ],
        correctAnswer: 1,
        explanation: '光速不变原理是狭义相对论的基本假设：无论观察者如何运动，测量到的光速都是相同的。',
      },
      {
        id: 3,
        question: '光从太阳到达地球大约需要多长时间？',
        options: ['1秒', '8秒', '8分钟', '1小时'],
        correctAnswer: 2,
        explanation: '太阳到地球的距离约1.5亿公里，光速约30万公里/秒，所以光需要约8分钟才能到达地球。',
      },
      {
        id: 4,
        question: '为什么没有物质能达到光速？',
        options: [
          '因为技术限制',
          '因为达到光速需要无穷大的能量',
          '因为光速会变化',
          '因为物质会消失',
        ],
        correctAnswer: 1,
        explanation: '根据相对论，当物体速度接近光速时，其质量趋向无穷大，加速需要无穷大的能量，因此有质量的物体永远不能达到光速。',
      },
    ],
  },
  {
    chapterId: 2,
    title: '时间的魔法 - 测验',
    questions: [
      {
        id: 1,
        question: '时间膨胀效应是什么？',
        options: [
          '运动的时钟走得比静止的时钟快',
          '运动的时钟走得比静止的时钟慢',
          '所有时钟走得一样快',
          '时钟的速度与运动无关',
        ],
        correctAnswer: 1,
        explanation: '时间膨胀是狭义相对论的预言：运动的时钟走得比静止的时钟慢，速度越快，时间膨胀越明显。',
      },
      {
        id: 2,
        question: '在双生子佯谬中，为什么旅行者返回后更年轻？',
        options: [
          '因为他在太空中',
          '因为他经历了加速和减速',
          '因为他吃得好',
          '因为时间对所有人都变慢了',
        ],
        correctAnswer: 1,
        explanation: '关键在于旅行者经历了加速和减速（转弯返回），这打破了对称性。只有他真正改变了运动状态，所以他的时间确实变慢了。',
      },
      {
        id: 3,
        question: 'GPS卫星为什么需要相对论修正？',
        options: [
          '卫星的电子设备需要校准',
          '卫星上的时钟因相对论效应与地面时钟不同步',
          '卫星的轨道不稳定',
          '大气层影响信号传输',
        ],
        correctAnswer: 1,
        explanation: 'GPS卫星高速运动且处于较弱引力场中，两种相对论效应使卫星时钟每天比地面快约38微秒，必须修正否则定位误差会达数公里。',
      },
    ],
  },
  {
    chapterId: 3,
    title: '空间的变形 - 测验',
    questions: [
      {
        id: 1,
        question: '长度收缩效应是什么？',
        options: [
          '物体在任何方向上都变短',
          '运动物体在运动方向上变短',
          '物体温度降低时变短',
          '物体被压缩时变短',
        ],
        correctAnswer: 1,
        explanation: '长度收缩是相对论效应：运动物体在运动方向上会变短，垂直于运动方向的尺寸不变。',
      },
      {
        id: 2,
        question: '洛伦兹变换描述的是什么？',
        options: [
          '物体的形状变化',
          '不同参考系中时间和空间坐标的关系',
          '温度的变化',
          '能量的转化',
        ],
        correctAnswer: 1,
        explanation: '洛伦兹变换是连接不同惯性参考系中时间和空间坐标的数学工具，它揭示了时间和空间的相互关联。',
      },
      {
        id: 3,
        question: '"同时性的相对性"是什么意思？',
        options: [
          '不同的人对时间的感觉不同',
          '对一个观察者同时发生的事，对另一个观察者可能不同时',
          '时钟的精度有限',
          '时间是不可测量的',
        ],
        correctAnswer: 1,
        explanation: '同时性的相对性是相对论的重要结论：没有绝对的"同时"，同时性依赖于观察者的参考系。',
      },
    ],
  },
  {
    chapterId: 4,
    title: '质能方程 - 测验',
    questions: [
      {
        id: 1,
        question: 'E=mc² 这个方程说明了什么？',
        options: [
          '能量和质量是独立的',
          '质量和能量等价，可以相互转化',
          '只有光有能量',
          '质量越大速度越快',
        ],
        correctAnswer: 1,
        explanation: '质能方程揭示了质量和能量的等价性：质量可以转化为能量，能量也可以转化为质量。',
      },
      {
        id: 2,
        question: '太阳的能量主要来自什么过程？',
        options: ['化学燃烧', '核裂变', '核聚变', '放射性衰变'],
        correctAnswer: 2,
        explanation: '太阳的能量来自核聚变：氢原子核聚合成氦，释放出巨大能量。每秒约400万吨物质转化为能量。',
      },
      {
        id: 3,
        question: '为什么有质量的物体不能达到光速？',
        options: [
          '技术限制',
          '物体质量随速度增加，达到光速需要无穷大能量',
          '光速会变化',
          '物体会分解',
        ],
        correctAnswer: 1,
        explanation: '根据相对论，物体质量随速度增加。当速度接近光速时，质量趋向无穷大，加速需要无穷大能量，因此有质量的物体永远不能达到光速。',
      },
    ],
  },
  {
    chapterId: 5,
    title: '等效原理 - 测验',
    questions: [
      {
        id: 1,
        question: '等效原理说的是什么？',
        options: [
          '所有力都等效',
          '引力效应与加速度效应在局部无法区分',
          '所有能量都等效',
          '所有质量都等效',
        ],
        correctAnswer: 1,
        explanation: '等效原理是广义相对论的基础：在局部范围内，引力效应与加速度效应无法区分。',
      },
      {
        id: 2,
        question: '在封闭电梯中，你如何区分是受引力还是被加速？',
        options: [
          '通过测量加速度',
          '通过观察光线弯曲',
          '无法区分',
          '通过测量温度',
        ],
        correctAnswer: 2,
        explanation: '根据等效原理，在局部范围内，引力效应与加速度效应完全等效，无法区分。',
      },
      {
        id: 3,
        question: '等效原理预言了什么现象？',
        options: ['光的波粒二象性', '光线在引力场中弯曲', '电子的自旋', '量子纠缠'],
        correctAnswer: 1,
        explanation: '等效原理预言光线在引力场中会弯曲，这已被1919年的日食观测证实。',
      },
    ],
  },
  {
    chapterId: 6,
    title: '时空弯曲 - 测验',
    questions: [
      {
        id: 1,
        question: '广义相对论中，引力是什么？',
        options: [
          '一种超距作用力',
          '时空弯曲的几何效应',
          '一种粒子',
          '一种能量',
        ],
        correctAnswer: 1,
        explanation: '广义相对论认为引力不是一种力，而是时空弯曲的几何效应。物质告诉时空如何弯曲，时空告诉物质如何运动。',
      },
      {
        id: 2,
        question: '地球绕太阳运动是因为什么？',
        options: [
          '太阳吸引地球',
          '地球在弯曲时空中沿测地线运动',
          '宇宙膨胀推动',
          '暗能量作用',
        ],
        correctAnswer: 1,
        explanation: '太阳弯曲了周围的时空，地球在这个弯曲时空中沿测地线（弯曲时空中的"直线"）运动，看起来就是椭圆轨道。',
      },
      {
        id: 3,
        question: '什么是测地线？',
        options: [
          '地球表面的线',
          '弯曲时空中两点之间的最短路径',
          '经纬线',
          '光线',
        ],
        correctAnswer: 1,
        explanation: '测地线是弯曲空间中两点之间的最短路径。在弯曲时空中，物体沿测地线自由运动。',
      },
    ],
  },
  {
    chapterId: 7,
    title: '引力透镜 - 测验',
    questions: [
      {
        id: 1,
        question: '引力透镜是什么现象？',
        options: [
          '光线被玻璃透镜折射',
          '大质量天体弯曲光线',
          '光线被大气散射',
          '光线被镜子反射',
        ],
        correctAnswer: 1,
        explanation: '引力透镜是大质量天体弯曲光线的现象。当光线经过大质量天体附近时，时空弯曲使光线发生偏折。',
      },
      {
        id: 2,
        question: '爱因斯坦环是什么？',
        options: [
          '爱因斯坦发明的环形装置',
          '光源、透镜、观察者完美对齐时形成的圆环',
          '黑洞的形状',
          '星系的形状',
        ],
        correctAnswer: 1,
        explanation: '当光源、透镜天体和观察者完美对齐时，光源会被拉伸成一个完美的圆环，称为爱因斯坦环。',
      },
      {
        id: 3,
        question: '引力透镜有什么科学应用？',
        options: [
          '只能拍照',
          '测量暗物质、发现系外行星、观测早期宇宙',
          '只能测量距离',
          '没有实际应用',
        ],
        correctAnswer: 1,
        explanation: '引力透镜是强大的科学工具：可以测量暗物质分布、发现系外行星、观测早期宇宙。',
      },
    ],
  },
  {
    chapterId: 8,
    title: '黑洞探秘 - 测验',
    questions: [
      {
        id: 1,
        question: '黑洞是什么？',
        options: [
          '一个黑色的洞',
          '时空弯曲极端到连光都无法逃脱的区域',
          '一种暗物质',
          '宇宙的尽头',
        ],
        correctAnswer: 1,
        explanation: '黑洞是时空弯曲最极端的天体，引力强大到连光都无法逃脱。它由大质量恒星坍缩形成。',
      },
      {
        id: 2,
        question: '事件视界是什么？',
        options: [
          '黑洞的表面',
          '光无法逃脱的边界',
          '黑洞的中心',
          '黑洞的照片',
        ],
        correctAnswer: 1,
        explanation: '事件视界是黑洞的边界，任何东西（包括光）一旦越过这个边界就无法逃脱。',
      },
      {
        id: 3,
        question: '我们如何探测黑洞？',
        options: [
          '直接观察黑洞本身',
          '通过引力效应、引力波、吸积盘辐射等间接方法',
          '黑洞无法探测',
          '用望远镜直接看',
        ],
        correctAnswer: 1,
        explanation: '虽然黑洞不发光，但我们可以通过引力效应（周围恒星运动）、引力波（黑洞合并）、吸积盘辐射等方法探测。',
      },
      {
        id: 4,
        question: '霍金辐射是什么？',
        options: [
          '黑洞发出的可见光',
          '量子效应使黑洞缓慢蒸发',
          '黑洞的吸积盘',
          '黑洞的引力波',
        ],
        correctAnswer: 1,
        explanation: '霍金辐射是量子效应使黑洞缓慢蒸发的过程。黑洞不是完全"黑"的，会缓慢释放辐射，最终可能消失。',
      },
    ],
  },
]

export const getQuiz = (chapterId: number): Quiz | undefined => {
  return quizzes.find((q) => q.chapterId === chapterId)
}
