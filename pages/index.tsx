// pages/index.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/questions') // 자동으로 /questions로 이동
  }, [router])

  return null
}
