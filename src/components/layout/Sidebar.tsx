import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, Lock, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProgressStore } from '@/store/progressStore'
import { chapters } from '@/data/chapters'

const partLabels = {
  special: '狭义相对论',
  general: '广义相对论',
}

export function Sidebar() {
  const location = useLocation()
  const { chapters: progressChapters, currentChapter } = useProgressStore()

  const specialChapters = chapters.filter((c) => c.part === 'special')
  const generalChapters = chapters.filter((c) => c.part === 'general')

  const getChapterStatus = (chapterId: number) => {
    const progress = progressChapters.find((c) => c.id === chapterId)
    return progress?.completed ? 'completed' : chapterId <= currentChapter ? 'available' : 'locked'
  }

  const ChapterItem = ({ chapter }: { chapter: typeof chapters[0] }) => {
    const status = getChapterStatus(chapter.id)
    const isActive = location.pathname === `/chapter/${chapter.id}`

    return (
      <Link
        to={status !== 'locked' ? `/chapter/${chapter.id}` : '#'}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
          isActive && 'bg-primary/10 text-primary',
          status === 'locked' && 'opacity-50 cursor-not-allowed',
          status !== 'locked' && !isActive && 'hover:bg-muted'
        )}
      >
        <motion.div
          whileHover={status !== 'locked' ? { scale: 1.1 } : {}}
          className="flex-shrink-0"
        >
          {status === 'completed' ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : status === 'locked' ? (
            <Lock className="w-5 h-5 text-muted-foreground" />
          ) : isActive ? (
            <Play className="w-5 h-5 text-primary" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className={cn(
            'text-sm font-medium truncate',
            isActive && 'text-primary',
            status === 'completed' && 'text-green-600 dark:text-green-400'
          )}>
            第{chapter.id}章
          </p>
          <p className="text-xs text-muted-foreground truncate">{chapter.title}</p>
        </div>
      </Link>
    )
  }

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-muted/30 border-r border-border overflow-y-auto">
      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {partLabels.special}
          </h3>
          <div className="space-y-1">
            {specialChapters.map((chapter) => (
              <ChapterItem key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            {partLabels.general}
          </h3>
          <div className="space-y-1">
            {generalChapters.map((chapter) => (
              <ChapterItem key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
