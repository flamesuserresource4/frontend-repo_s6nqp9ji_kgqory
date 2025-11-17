export default function Header(){
  return (
    <div className="w-full py-4 px-6 bg-white/80 backdrop-blur border-b sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-blue-600"></div>
          <div className="font-semibold">Survey Platform</div>
        </div>
        <div className="text-sm text-gray-500">Demo build</div>
      </div>
    </div>
  )
}
