import { useState } from 'react'
import Header from './components/Header'
import BuilderSteps from './components/BuilderSteps'
import SurveyLibrary from './components/SurveyLibrary'

function App() {
  const [createdId, setCreatedId] = useState(null)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <section className="space-y-3">
          <h1 className="text-2xl font-bold">Create a Survey</h1>
          <p className="text-gray-600">Start with basic setup, choose response style, optionally upload a dataset, then proceed to question building.</p>
          <BuilderSteps onCreateSurvey={(id)=>setCreatedId(id)} />
          {createdId && (
            <div className="p-3 rounded bg-green-50 text-green-700 border border-green-200">Survey created! ID: {createdId}</div>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Survey Library</h2>
          <SurveyLibrary />
        </section>
      </main>
    </div>
  )
}

export default App
