import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Home, BarChart3, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useProgressStore } from '@/store/progressStore'

export function Header() {
  const location = useLocation()
  const { totalProgress } = useProgressStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Rocket className="w-8 h-8 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                相对论探索之旅
              </h1>
              <p className="text-xs text-muted-foreground">从零开始理解时空奥秘</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/">
              <Button
                variant={location.pathname === '/' ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                首页
              </Button>
            </Link>
            <Link to="/progress">
              <Button
                variant={location.pathname === '/progress' ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                学习进度
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">总进度</span>
              <div className="w-24">
                <Progress value={totalProgress} className="h-2" />
              </div>
              <span className="text-sm font-medium">{totalProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
