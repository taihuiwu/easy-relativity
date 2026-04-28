import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { Quiz as QuizType } from '@/data/quizzes'

interface QuizProps {
  quiz: QuizType
  onComplete: (score: number) => void
  onBack: () => void
}

export function Quiz({ quiz, onComplete, onBack }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  const handleSelectAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      const correctCount = newAnswers.filter(
        (answer, index) => answer === quiz.questions[index].correctAnswer
      ).length
      const score = Math.round((correctCount / quiz.questions.length) * 100)
      setIsCompleted(true)
      onComplete(score)
    }
  }

  const handleCheckAnswer = () => {
    setShowResult(true)
  }

  if (isCompleted) {
    const correctCount = answers.filter(
      (answer, index) => answer === quiz.questions[index].correctAnswer
    ).length
    const score = Math.round((correctCount / quiz.questions.length) * 100)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card>
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="mx-auto mb-4"
            >
              {score >= 80 ? (
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
              ) : score >= 60 ? (
                <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-yellow-500" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
              )}
            </motion.div>
            <CardTitle className="text-2xl">测验完成！</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold mb-2">{score}%</p>
            <p className="text-muted-foreground mb-6">
              答对 {correctCount}/{quiz.questions.length} 题
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {score >= 80
                ? '太棒了！你已经很好地掌握了这一章的内容！'
                : score >= 60
                ? '不错！建议再复习一下错题相关的内容。'
                : '加油！建议重新学习这一章的内容。'}
            </p>
            <Button onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回章节
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div>
      <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
        <ArrowLeft className="w-4 h-4" />
        返回
      </Button>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>{quiz.title}</span>
          <span>第 {currentQuestion + 1}/{quiz.questions.length} 题</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrect = index === question.correctAnswer
                  const showCorrect = showResult && isCorrect
                  const showWrong = showResult && isSelected && !isCorrect

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={showResult}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        showCorrect
                          ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                          : showWrong
                          ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                          : isSelected
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'bg-muted/50 border-2 border-transparent hover:bg-muted'
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                    </button>
                  )
                })}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-muted"
                >
                  <p className="text-sm font-medium mb-1">解析</p>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-end gap-3">
        {!showResult ? (
          <Button
            onClick={handleCheckAnswer}
            disabled={selectedAnswer === null}
          >
            确认答案
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-2">
            {currentQuestion === quiz.questions.length - 1 ? '完成测验' : '下一题'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
