"use client"

import { useState, useEffect } from "react"
import { AlertCircle, X } from "lucide-react"

export default function AdminNotice() {
  const [showNotice, setShowNotice] = useState(false)
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    // Check if we're using mock data
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.usingMockData) {
          setUsingMockData(true)
          setShowNotice(true)
        }
      })
      .catch(() => {
        setUsingMockData(true)
        setShowNotice(true)
      })
  }, [])

  if (!showNotice || !usingMockData) return null

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-amber-800">Using Demo Data</h3>
          <p className="mt-1 text-sm text-amber-700">
            Unable to connect to Google Sheets. To use live data, ensure your Google Sheet is publicly accessible:
          </p>
          <ol className="mt-2 text-sm text-amber-700 list-decimal list-inside space-y-1">
            <li>Open your Google Sheet</li>
            <li>Click "Share" in the top right</li>
            <li>Change access to "Anyone with the link"</li>
            <li>Set permission to "Viewer"</li>
            <li>Refresh this page</li>
          </ol>
        </div>
        <button onClick={() => setShowNotice(false)} className="ml-4 text-amber-400 hover:text-amber-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
