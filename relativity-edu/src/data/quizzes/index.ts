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
        explanation: '关键在于旅行者经历了加速和减速（转弯返回），这打破了对称性。',
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
        explanation: '太阳的能量来自核聚变：氢原子核聚合成氦，释放出巨大能量。',
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
        explanation: '广义相对论认为引力不是一种力，而是时空弯曲的几何效应。',
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
        explanation: '引力透镜是大质量天体弯曲光线的现象。',
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
        explanation: '黑洞是时空弯曲最极端的天体，引力强大到连光都无法逃脱。',
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
    ],
  },
]

export const getQuiz = (chapterId: number): Quiz | undefined => {
  return quizzes.find((q) => q.chapterId === chapterId)
}
