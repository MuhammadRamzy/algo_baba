import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white">
      <h1 className="text-6xl font-bold mb-4">AlgoBaba</h1>
      <p className="text-2xl mb-8">Your DSA Guru for Sorting, Searching, and Algorithmic Fun!</p>
      <Link href="/visualizer">
        <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-100">
          Start Learning
        </Button>
      </Link>
    </div>
  )
}