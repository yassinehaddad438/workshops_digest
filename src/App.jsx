import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Subscribe from './pages/Subscribe'
import CahierDesCharges from './pages/CahierDesCharges'

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
            <Route path="/cahier-des-charges" element={<CahierDesCharges />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}