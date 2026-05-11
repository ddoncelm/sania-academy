import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'

export function useAuth() {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Envía Magic Link al email
  const sendOtp = (email) =>
    supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: 'https://sania-academy.netlify.app'
      }
    })

  // Verifica el código OTP introducido por el alumno
  const verifyOtp = (email, token) =>
    supabase.auth.verifyOtp({ email, token, type: 'email' })

  const signOut = () => supabase.auth.signOut()

  return { user, loading, sendOtp, verifyOtp, signOut }
}
