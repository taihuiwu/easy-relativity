import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface AnalogyBoxProps {
  analogy: string
}

export function AnalogyBox({ analogy }: AnalogyBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-200 dark:border-amber-800 mt-6">
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                生活化比喻
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">{analogy}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
