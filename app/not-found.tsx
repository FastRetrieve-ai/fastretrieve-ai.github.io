import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text mb-4">
        Page Not Found
      </h2>
      <p className="text-primary/70 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link 
        href="/"
        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md shadow-lg shadow-primary/20 transition-all duration-300"
      >
        Return Home
      </Link>
    </div>
  )
} 