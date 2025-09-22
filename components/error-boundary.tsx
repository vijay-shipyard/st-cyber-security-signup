"use client"

import React from 'react'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
  error?: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: any) {
    // Log error to console for now — developer can integrate Sentry or other tools
    console.error('ErrorBoundary caught an error:', error)
    console.error(info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-lg p-8 shadow">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">An unexpected error occurred while rendering the dashboard. Check the console for details.</p>
            <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto max-h-40">{String(this.state.error)}</pre>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
