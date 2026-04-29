import { motion } from 'framer-motion'
import { Trophy, Target, RotateCcw, CheckCircle, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useProgressStore } from '@/store/progressStore'
import { chapters } from '@/data/chapters'

export function ProgressPage() {
  const { totalProgress, chapters: progressChapters, resetProgress } = useProgressStore()

  const completedCount = progressChapters.filter((c) => c.completed).length
  const totalQuizScore = progressChapters.reduce((sum, c) => sum + (c.quizScore || 0), 0)
  const averageScore = completedCount > 0 ? Math.round(totalQuizScore / completedCount) : 0

  const handleReset = () => {
    if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
      resetProgress()
    }
  }

  return (
    <div className="ml-64 pt-16">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">学习进度</h1>
          <p className="text-muted-foreground">追踪你的相对论学习之旅</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总进度</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProgress}%</div>
              <Progress value={totalProgress} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已完成章节</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}/8</div>
              <p className="text-xs text-muted-foreground mt-1">继续加油！</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">测验平均分</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {averageScore >= 80 ? '优秀！' : averageScore >= 60 ? '良好' : '继续努力'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>章节详情</CardTitle>
              <CardDescription>每章的学习状态和测验成绩</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chapters.map((chapter) => {
                  const progress = progressChapters.find((c) => c.id === chapter.id)
                  const isCompleted = progress?.completed
                  const quizScore = progress?.quizScore

                  return (
                    <div key={chapter.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">第{chapter.id}章：{chapter.title}</p>
                          <p className="text-sm text-muted-foreground">{chapter.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {isCompleted ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">测验成绩</span>
                            <span className={`text-lg font-bold ${
                              (quizScore || 0) >= 80 ? 'text-green-500' :
                              (quizScore || 0) >= 60 ? 'text-yellow-500' : 'text-red-500'
                            }`}>
                              {quizScore}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">未完成</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {totalProgress > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 flex justify-end">
            <Button variant="outline" onClick={handleReset} className="gap-2 text-destructive">
              <RotateCcw className="w-4 h-4" />
              重置进度
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
