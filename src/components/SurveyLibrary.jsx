import { useEffect, useState } from 'react'

export default function SurveyLibrary(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const base = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    const load = async () => {
      try{
        const res = await fetch(`${base}/api/surveys`)
        const data = await res.json()
        setItems(data)
      }catch(e){
        console.error(e)
      }finally{ setLoading(false) }
    }
    load()
  },[])

  if(loading) return <div className="text-center text-gray-500">Loading surveys...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map(it => (
        <div key={it.id} className="p-4 bg-white rounded shadow border">
          <div className="font-semibold">{it.name}</div>
          <div className="text-sm text-gray-500">{it.description}</div>
          <div className="mt-2 text-xs">Status: <span className="px-2 py-1 rounded bg-gray-100">{it.status}</span></div>
        </div>
      ))}
      {items.length===0 && (
        <div className="text-gray-500">No surveys yet. Create one above.</div>
      )}
    </div>
  )
}
