import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Rocket, BookOpen, Sparkles, ChevronRight, Star, Clock, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useProgressStore } from '@/store/progressStore'
import { chapters } from '@/data/chapters'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Home() {
  const { totalProgress, currentChapter, chapters: progressChapters } = useProgressStore()

  const features = [
    { icon: Sparkles, title: '3D 可视化', description: '通过交互式 3D 动画直观理解复杂的相对论概念' },
    { icon: BookOpen, title: '系统学习', description: '从狭义相对论到广义相对论，循序渐进的学习路径' },
    { icon: Target, title: '知识检测', description: '每章配套小测验，巩固所学知识' },
  ]

  const getCurrentChapter = () => {
    const progress = progressChapters.find((c) => c.id === currentChapter)
    if (progress?.completed && currentChapter < 8) {
      return chapters.find((c) => c.id === currentChapter + 1)
    }
    return chapters.find((c) => c.id === currentChapter)
  }

  const currentChapterData = getCurrentChapter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-16"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Star className="w-4 h-4" />
            面向高中生的相对论入门课程
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
              探索时空的奥秘
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            从光速不变到黑洞，通过精美的 3D 动画和生动的比喻，让你轻松理解爱因斯坦的相对论
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={currentChapterData ? `/chapter/${currentChapterData.id}` : '/chapter/1'}>
              <Button size="lg" className="gap-2 text-lg px-8">
                <Rocket className="w-5 h-5" />
                {totalProgress > 0 ? '继续学习' : '开始探索'}
              </Button>
            </Link>
            <Link to="/progress">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                <Clock className="w-5 h-5" />
                查看进度
              </Button>
            </Link>
          </div>
        </motion.div>

        {totalProgress > 0 && (
          <motion.div variants={itemVariants} className="max-w-md mx-auto mb-16">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">学习进度</span>
                  <span className="text-sm text-muted-foreground">{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className="h-3" />
                {currentChapterData && (
                  <p className="text-sm text-muted-foreground mt-2">
                    当前：第{currentChapterData.id}章 - {currentChapterData.title}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <feature.icon className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-center mb-8">课程大纲</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                狭义相对论
              </h3>
              {chapters.filter((c) => c.part === 'special').map((chapter) => (
                <Link key={chapter.id} to={`/chapter/${chapter.id}`}>
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="flex items-center justify-between py-4">
                      <div>
                        <p className="font-medium">第{chapter.id}章：{chapter.title}</p>
                        <p className="text-sm text-muted-foreground">{chapter.subtitle}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-400" />
                广义相对论
              </h3>
              {chapters.filter((c) => c.part === 'general').map((chapter) => (
                <Link key={chapter.id} to={`/chapter/${chapter.id}`}>
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="flex items-center justify-between py-4">
                      <div>
                        <p className="font-medium">第{chapter.id}章：{chapter.title}</p>
                        <p className="text-sm text-muted-foreground">{chapter.subtitle}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
