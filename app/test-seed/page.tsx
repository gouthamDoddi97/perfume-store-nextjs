'use client'

export default function TestSeed() {
  const handleSeed = async () => {
    const response = await fetch('/api/admin/seed', { method: 'POST' })
    const result = await response.json()
    alert(JSON.stringify(result))
  }

  return (
    <div className="p-8">
      <button 
        onClick={handleSeed}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Seed Database
      </button>
    </div>
  )
}