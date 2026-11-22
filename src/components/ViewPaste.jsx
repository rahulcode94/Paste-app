import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { addTopastes, updateToPastes } from '../redux/pasteSlice'

const ViewPaste = () => {
  const {id} = useParams()

  const allPastes = useSelector((state)=> state.paste.pastes)

  const paste = allPastes.filter((p)=> p._id === id)[0]
  console.log(paste)
  return (
     <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    className='p-2 rounded-2xl mt-2 '
                    placeholder='Enter title here'
                    type='text'
                    value={paste.title}

                    disabled

                    onChange={(e) => setTitle(e.target.value)}
                />
                
            </div>

            <div className='mt-8' >
                <textarea
                    className='rounded-2xl min-w-[500px] mt-4'
                    value={paste.content}
                    disabled
                    placeholder='Enter content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}

                />
            </div>
        </div>
  )
}

export default ViewPaste