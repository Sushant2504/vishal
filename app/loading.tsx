export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-700 mb-4"></div>
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

