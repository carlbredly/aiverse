import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { MainPage } from './pages/MainPage'
import { GlobePage } from './pages/GlobePage'
import { ToolDetailPage } from './pages/ToolDetailPage'
import { SubmitToolPage } from './pages/SubmitToolPage'
import { PrelaunchPage } from './pages/PrelaunchPage'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminTools } from './pages/admin/AdminTools'
import { AdminSubmissions } from './pages/admin/AdminSubmissions'
import { useRealtimeSync } from './hooks/useTools'
import { isPrelaunchActive } from './lib/launch'

function RealtimeSyncProvider() {
  useRealtimeSync()
  return null
}

export default function App() {
  const prelaunch = isPrelaunchActive()

  return (
    <BrowserRouter>
      {!prelaunch && <RealtimeSyncProvider />}
      <Routes>
        {prelaunch ? (
          <Route path="*" element={<PrelaunchPage />} />
        ) : (
          <>
            <Route path="/" element={<MainPage />} />
            <Route path="/globe" element={<GlobePage />} />
            <Route path="/tool/:slug" element={<ToolDetailPage />} />
            <Route path="/submit" element={<SubmitToolPage />} />

            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="tools" element={<AdminTools />} />
              <Route path="submissions" element={<AdminSubmissions />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
