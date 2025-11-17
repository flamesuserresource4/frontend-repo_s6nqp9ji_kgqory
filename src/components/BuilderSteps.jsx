import { useState } from 'react'

export default function BuilderSteps({ onCreateSurvey }) {
  const [step, setStep] = useState(1)
  const [type, setType] = useState('simple')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [responseStyle, setResponseStyle] = useState('one_by_one')

  const [datasetFile, setDatasetFile] = useState(null)

  const next = () => setStep((s) => Math.min(s + 1, type === 'dataset' ? 6 : 6))
  const prev = () => setStep((s) => Math.max(s - 1, 1))

  const create = async () => {
    const base = import.meta.env.VITE_BACKEND_URL
    if (type === 'dataset' && datasetFile) {
      const form = new FormData()
      form.append('org_id', 'demo-org')
      form.append('name', name || 'Untitled Dataset')
      form.append('file', datasetFile)
      await fetch(`${base}/api/datasets/upload`, { method: 'POST', body: form })
    }
    const payload = {
      org_id: 'demo-org',
      name: name || 'Untitled Survey',
      description,
      type,
      questions: [],
      settings: { response_style: responseStyle },
    }
    const res = await fetch(`${base}/api/surveys`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    onCreateSurvey?.(data.id)
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Create Survey</h2>
        <div className="text-sm text-gray-500">Step {step} of 6</div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Survey Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="Customer Feedback" />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="Short description" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Survey Type</label>
            <div className="flex gap-3">
              <button onClick={()=>setType('simple')} className={`px-3 py-2 rounded border ${type==='simple'?'bg-blue-50 border-blue-400':'bg-gray-50'}`}>Simple</button>
              <button onClick={()=>setType('dataset')} className={`px-3 py-2 rounded border ${type==='dataset'?'bg-blue-50 border-blue-400':'bg-gray-50'}`}>Dataset-Powered</button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <label className="block text-sm font-medium">Response Style</label>
          <select value={responseStyle} onChange={(e)=>setResponseStyle(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="one_by_one">One-by-One</option>
            <option value="all_at_once">All at Once</option>
            <option value="card_shuffle">Card Shuffle</option>
          </select>
        </div>
      )}

      {step === 3 && type === 'dataset' && (
        <div className="space-y-4">
          <label className="block text-sm font-medium">Upload CSV</label>
          <input type="file" accept=".csv" onChange={(e)=>setDatasetFile(e.target.files?.[0]||null)} />
          <p className="text-sm text-gray-500">We will parse columns and distinct values automatically.</p>
        </div>
      )}

      {step >= 4 && (
        <div className="text-sm text-gray-500">Further steps like cascade config, questions, and preview will appear in subsequent iterations.</div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button onClick={prev} className="px-3 py-2 rounded border">Back</button>
        {step < 6 ? (
          <button onClick={next} className="px-4 py-2 rounded bg-blue-600 text-white">Next</button>
        ) : (
          <button onClick={create} className="px-4 py-2 rounded bg-green-600 text-white">Create Survey</button>
        )}
      </div>
    </div>
  )
}
