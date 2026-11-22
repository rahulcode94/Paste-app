import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addTopastes, updateToPastes } from '../redux/pasteSlice'

const Home = () => {
    //track title
    const [ title, setTitle ] = useState('')
    //track text area
    const [value, setValue] = useState('')

    const [searchParams, setSearchParams] = useSearchParams();

    //want to show the paste to edit
    const allPastes = useSelector((state)=> state.paste.pastes)



    //imp use of redux
    const dispatch = useDispatch()

    const pasteId = searchParams.get("pasteId")
    console.log(pasteId)


    function createPaste() {
        const paste = {
            title:title,
            content:value,
            _id:pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString
        }
        console.log(paste)

        if(pasteId){
            //update karna chahte hai

            //here we dispatch update functionality and send our paste to payload
            dispatch(updateToPastes(paste))

        }else{
            //create karna chahte hai

            //here we dispatch add functionality and send our paste to payload
            dispatch(addTopastes(paste))

        }


        //after creation and updation i want to clear the values
        setTitle('');
        setValue('');
        setSearchParams({});

    }

    
    useEffect(() => {
        console.log("i am here")
      if(pasteId){
        console.log(pasteId)
        const paste = allPastes.find((p)=> p._id === pasteId)
        console.log("page found")
        setTitle(paste.title);
        setValue(paste.content);
      }
    
     
    }, [pasteId])
    

   
    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    className='p-2 rounded-2xl mt-2 '
                    placeholder='Enter title here'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={createPaste}
                    className='p-2 rounded-2xl mt-2 bg-blue-500'>
                    {
                        pasteId ? "Update My Paste" : "Create My Paste"
                    }
                </button>
            </div>

            <div className='mt-8' >
                <textarea
                    className='rounded-2xl min-w-[500px] mt-4'
                    value={value}
                    placeholder='Enter content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}

                />
            </div>
        </div>
    )
}

export default Home