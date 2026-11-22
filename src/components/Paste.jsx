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
        <div>
            <input
                className='p-2 rounded-2xl w-[600px] mt-5'
                type='search'
                placeholder='search here'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* show all cards here */}
            <div className='flex flex-col gap-5 mt-5'>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return (
                                <div className='border' key={paste?._id}>

                                    <div>
                                        {paste.title}
                                    </div>
                                    <div>
                                        {paste.content}
                                    </div>
                                    <div className='flex flex-row gap-5 place-content-evenly'>

                                        <button>
                                            {/* it will go to / route now i want to specify on home page if the pasteId change show its content in input and teaxtarea  */}
                                            <a href={`/?pasteId=${paste?._id}`}>
                                                Edit
                                            </a>
                                             </button>

                                        <button>
                                        <a href={`/pastes/${paste?._id}`}>
                                            view
                                        </a>
                                        </button>

                                        <button onClick={() => handleDelete(paste?._id)}> Delete</button>

                                        <button onClick={() => {
                                            navigator.clipboard.writeText
                                                (paste?.content)
                                            toast.success("Copied to clipboard")

                                        }}>Copy </button>

                                        <button>Share </button>
                                    </div>

                                    <div>
                                        {paste.createdAt}
                                    </div>

                                </div>
                            )
                        }
                    )
                }

            </div>
        </div>
    )
}

export default Paste