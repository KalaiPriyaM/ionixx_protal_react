import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AboutPage: React.FC = () => {
  useEffect(() => {
    const previous = document.title
    document.title = 'About - IONIXX Diff & Validate'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-br from-blue-500 via-violet-400 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                <span className="text-lg font-bold text-blue-600">IX</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">IONIXX</h1>
                <p className="text-sm text-white/80">Diff & Validate</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About IONIXX Diff & Validate</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              IONIXX Diff & Validate is a powerful, privacy-focused tool for comparing and validating
              JSON, XML, and text content. All processing happens locally in your browser, ensuring
              your data never leaves your device.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>JSON validation and comparison</li>
              <li>XML validation and comparison</li>
              <li>Text comparison with diff highlighting</li>
              <li>Configurable comparison options (whitespace, case sensitivity, key order)</li>
              <li>File upload support (up to 2MB per file)</li>
              <li>Copy and download functionality</li>
              <li>Persistent storage of your work</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy</h2>
            <p className="text-gray-600 mb-6">
              Your data is processed entirely in your browser. We don't collect, store, or transmit
              any of your content. Your work is automatically saved locally using browser storage
              for your convenience.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology</h2>
            <p className="text-gray-600">
              Built with React, TypeScript, Vite, and TailwindCSS for a modern, responsive experience.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AboutPage
