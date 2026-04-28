import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Home } from '@/pages/Home'
import { Chapter } from '@/pages/Chapter'
import { ProgressPage } from '@/pages/Progress'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Sidebar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapter/:id" element={<Chapter />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
