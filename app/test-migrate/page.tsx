'use client'

export default function TestMigrate() {
  const handleMigrate = async () => {
    const response = await fetch('/api/admin/migrate', { method: 'POST' })
    const result = await response.json()
    alert(JSON.stringify(result))
  }

  return (
    <div className="p-8">
      <button 
        onClick={handleMigrate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Run Migration
      </button>
    </div>
  )
}