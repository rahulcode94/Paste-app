import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

const ViewPaste = () => {
  const {id} = useParams()

  const allPastes = useSelector((state)=> state.paste.pastes)

  const paste = allPastes.find((p) => p._id === id)

  if (!paste) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
          Paste not found.
        </p>
      </main>
    )
  }

  const createdDate = new Date(paste.createdAt)
  const formattedDate = Number.isNaN(createdDate.getTime())
    ? 'Date unavailable'
    : createdDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Paste</p>
            <h1 className="mt-1 break-words text-2xl font-bold text-slate-900">
              {paste.title}
            </h1>
          </div>
          <button
            type="button"
            aria-label="Copy paste content"
            title="Copy content"
            className="group flex shrink-0 items-center justify-center rounded-lg p-2 text-slate-500 transition-all duration-300 ease-in-out hover:bg-slate-100 hover:text-emerald-600"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(paste.content)
                toast.success('Copied to Clipboard')
              } catch {
                toast.error('Could not copy content')
              }
            }}
          >
            <Copy className="transition-colors group-hover:text-emerald-600" size={20} />
          </button>
        </header>

        <div className="p-5 sm:p-6">
          <pre className="min-h-64 whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-4 font-sans text-sm leading-6 text-slate-700">
            {paste.content}
          </pre>
          <p className="mt-4 text-xs text-slate-400">Created {formattedDate}</p>
        </div>
      </article>
    </main>
  )
}

export default ViewPaste
