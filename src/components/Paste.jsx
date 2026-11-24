import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'

const Paste = () => {
    //get all pastes form pasteSlice.js
    // here name of slice is paste and value name is pastes
    const pastes = useSelector((state) => state.paste.pastes)
    console.log(pastes)

    const [searchTerm, setSearchTerm] = useState("")

    const dispatch = useDispatch()

    //we have all pastes now we can fillter it out
    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //delete wala finction
    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId))

    }





    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
            <header className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Pastes</h1>
                <p className="mt-1 text-sm text-slate-500">Search and manage your saved notes.</p>
            </header>

            <input
                className="mb-6 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-xl"
                type='search'
                placeholder='Search pastes by title...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* show all cards here */}
            <div className='flex flex-col gap-4'>
                {
                    filteredData.length > 0 ?
                        filteredData.map(
                            (paste) => {
                                return (
                                    <article className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md' key={paste?._id}>

                                        <h2 className="text-lg font-semibold text-slate-900">
                                            {paste.title}
                                        </h2>
                                        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                                            {paste.content}
                                        </p>
                                        <div className='mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4'>

                                            <button className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
                                                {/* it will go to / route now i want to specify on home page if the pasteId change show its content in input and teaxtarea  */}
                                                <a href={`/?pasteId=${paste?._id}`}>
                                                    Edit
                                                </a>
                                            </button>

                                            <button className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                                                <a href={`/pastes/${paste?._id}`}>
                                                    view
                                                </a>
                                            </button>

                                            <button className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100" onClick={() => handleDelete(paste?._id)}>Delete</button>

                                            <button className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200" onClick={() => {
                                                navigator.clipboard.writeText
                                                    (paste?.content)
                                                toast.success("Copied to clipboard")

                                            }}>Copy</button>

                                            <button className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">Share</button>
                                        </div>

                                        <div className="mt-3 text-xs text-slate-400">
                                            Created {formatCreatedDate(paste.createdAt)}
                                        </div>

                                    </article>
                                )
                            }
                        ) : (
                            <p className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
                                {searchTerm ? 'No pastes match your search.' : 'You have no pastes yet.'}
                            </p>
                        )
                }

            </div>
        </main>
    )
}

function formatCreatedDate(createdAt) {
    if (!createdAt) return 'Date unavailable'

    const createdDate = new Date(createdAt)
    if (Number.isNaN(createdDate.getTime())) return 'Date unavailable'

    return createdDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}

export default Paste
