import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Subscribe from './pages/Subscribe'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: '#f4f6fb' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workshops" element={<Dashboard />} />
            <Route path="/subscribe" element={<Subscribe />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}