import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export function useWorkshops({ source, search } = {}) {
  return useQuery({
    queryKey: ['workshops', source, search],
    queryFn: async () => {
      let query = supabase
        .from('workshops')
        .select('*')
        .order('created_at', { ascending: false })

      if (source && source !== 'All') {
        query = query.eq('source', source)
      }
      if (search) {
        query = query.ilike('title', `%${search}%`)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
    staleTime: 5 * 60 * 1000
  })
}