import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export type AppRole = 'worker' | 'manager' | 'admin' | 'owner'
export interface AuthUser { id: string; email: string; name: string; role: AppRole }
interface AuthContextValue { user: AuthUser | null; loading: boolean; signIn: (email: string, password: string) => Promise<void>; signOut: () => Promise<void> }

const AuthContext = createContext<AuthContextValue | null>(null)
const roles: AppRole[] = ['worker', 'manager', 'admin', 'owner']

function mapUser(user: User): AuthUser {
  const metadataRole = user.user_metadata?.role
  const role = roles.includes(metadataRole) ? metadataRole : 'manager'
  return { id: user.id, email: user.email ?? '', name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Manager', role }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setUser(data.session?.user ? mapUser(data.session.user) : null)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? mapUser(session.user) : null)
      setLoading(false)
    })
    return () => { active = false; listener.subscription.unsubscribe() }
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    signIn: async (email, password) => { const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) throw error },
    signOut: async () => { const { error } = await supabase.auth.signOut(); if (error) throw error },
  }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Auth hook is colocated so the provider and consumer share one private context.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
