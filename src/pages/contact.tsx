import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ContactPage: React.FC = () => {
  useEffect(() => {
    const previous = document.title
    document.title = 'Contact - IONIXX Diff & Validate'
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Have questions, feedback, or need support? We'd love to hear from you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">support@ionixx.com</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">GitHub</h3>
                    <p className="text-gray-600">github.com/ionixx</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Support</h2>
                <p className="text-gray-600 mb-4">
                  For technical support or feature requests, please include:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Browser version and OS</li>
                  <li>Steps to reproduce the issue</li>
                  <li>Expected vs actual behavior</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ContactPage
