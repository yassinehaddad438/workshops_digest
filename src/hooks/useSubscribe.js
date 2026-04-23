import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function useSubscribe() {
  const [status, setStatus] = useState(null)
  // null | 'loading' | 'success' | 'error'

  const subscribe = async (email) => {
    if (!email || !email.includes('@')) {
      setStatus('invalid')
      return
    }
    setStatus('loading')
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }])

    setStatus(error ? 'error' : 'success')
  }

  const reset = () => setStatus(null)

  return { status, subscribe, reset }
}