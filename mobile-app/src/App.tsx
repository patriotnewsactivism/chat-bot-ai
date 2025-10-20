import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useMobileDetection } from './hooks/useMobileDetection'
import { MobileLayout } from './components/layout/MobileLayout'
import { HomePage } from './pages/HomePage'
import { BotBuilderPage } from './pages/BotBuilderPage'
import { BotsPage } from './pages/BotsPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { ProfilePage } from './pages/ProfilePage'
import { OnboardingPage } from './pages/OnboardingPage'
import { SettingsPage } from './pages/SettingsPage'
import { SplashScreen } from './components/SplashScreen'
import { PullToRefresh } from './components/PullToRefresh'

function App() {
  const { isMobile, isReady } = useMobileDetection()
  const [showSplash, setShowSplash] = React.useState(true)
  const [hasOnboarded, setHasOnboarded] = React.useState(() => {
    return localStorage.getItem('hasOnboarded') === 'true'
  })

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = async () => {
    // Simulate refresh action
    await new Promise(resolve => setTimeout(resolve, 1000))
    window.location.reload()
  }

  if (!isReady) {
    return <SplashScreen />
  }

  if (showSplash) {
    return <SplashScreen />
  }

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-secondary-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">BuildMyBot Mobile</h1>
          <p className="text-secondary-400 mb-6">Please view this app on a mobile device for the best experience.</p>
          <div className="bg-secondary-900 rounded-xl p-4 text-left">
            <h3 className="font-semibold text-white mb-2">Mobile Features:</h3>
            <ul className="space-y-2 text-sm text-secondary-300">
              <li>• Touch-optimized interface</li>
              <li>• Gesture-based navigation</li>
              <li>• Mobile-first design</li>
              <li>• Native app experience</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  if (!hasOnboarded) {
    return <OnboardingPage onComplete={() => setHasOnboarded(true)} />
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/builder" element={<BotBuilderPage />} />
          <Route path="/bots" element={<BotsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </MobileLayout>
    </PullToRefresh>
  )
}

export default App