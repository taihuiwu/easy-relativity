import { useState, Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useProgressStore } from '@/store/progressStore'
import { getChapter } from '@/data/chapters'
import { getQuiz } from '@/data/quizzes'
import { Quiz } from '@/components/chapter/Quiz'
import { AnalogyBox } from '@/components/common/AnalogyBox'
import { SceneContainer } from '@/scenes/SceneContainer'

export function Chapter() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const chapterId = parseInt(id || '1')
  const chapter = getChapter(chapterId)
  const quiz = getQuiz(chapterId)
  const { completeSection, completeChapter, chapters: progressChapters } = useProgressStore()

  const [currentSection, setCurrentSection] = useState(() => {
    const progress = progressChapters.find((c) => c.id === chapterId)
    return progress?.lastVisitedSection || 0
  })
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(() => {
    const progress = progressChapters.find((c) => c.id === chapterId)
    return progress?.completed || false
  })

  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-xl text-muted-foreground">章节不存在</p>
      </div>
    )
  }

  const currentSectionData = chapter.sections[currentSection]
  const progress = ((currentSection + 1) / chapter.sections.length) * 100

  const handleNextSection = () => {
    if (currentSection < chapter.sections.length - 1) {
      completeSection(chapterId, currentSection + 1)
      setCurrentSection(currentSection + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleQuizComplete = (score: number) => {
    completeChapter(chapterId, score)
    setQuizCompleted(true)
    setShowQuiz(false)
  }

  const handleNextChapter = () => {
    if (chapterId < 8) {
      navigate(`/chapter/${chapterId + 1}`)
    }
  }

  if (showQuiz && quiz) {
    return (
      <div className="ml-64 pt-16">
        <div className="container mx-auto px-6 py-8 max-w-3xl">
          <Quiz
            quiz={quiz}
            onComplete={handleQuizComplete}
            onBack={() => setShowQuiz(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="ml-64 pt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={chapter.part === 'special' ? 'default' : 'secondary'}>
                  {chapter.part === 'special' ? '狭义相对论' : '广义相对论'}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  约 {chapter.estimatedTime} 分钟
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                第{chapter.id}章：{chapter.title}
              </h1>
              <p className="text-muted-foreground">{chapter.subtitle}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>学习进度</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                        {currentSection + 1}
                      </span>
                      {currentSectionData.title}
                    </h2>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {currentSectionData.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                          {paragraph.split('**').map((part, i) =>
                            i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                          )}
                        </p>
                      ))}
                    </div>

                    {currentSectionData.analogy && (
                      <AnalogyBox analogy={currentSectionData.analogy} />
                    )}

                    <div className="mt-6">
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        本节要点
                      </h3>
                      <ul className="space-y-2">
                        {currentSectionData.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevSection}
                disabled={currentSection === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                上一节
              </Button>

              {quizCompleted && currentSection === chapter.sections.length - 1 ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowQuiz(true)} className="gap-2">
                    重新测验
                  </Button>
                  {chapterId < 8 && (
                    <Button onClick={handleNextChapter} className="gap-2">
                      下一章
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ) : (
                <Button onClick={handleNextSection} className="gap-2">
                  {currentSection === chapter.sections.length - 1 ? '开始测验' : '下一节'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 relative">
                <Suspense
                  fallback={
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                    </div>
                  }
                >
                  <SceneContainer scene={chapter.scene} />
                </Suspense>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground text-center">
                  拖动鼠标旋转视角，滚轮缩放
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
