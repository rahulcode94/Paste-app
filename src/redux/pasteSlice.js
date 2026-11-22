import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    // pastes: []
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : []
}
// here name of slice is paste and value name is pastes
export const pasteSlice = createSlice({
    name: "paste",
    initialState,
    reducers: {
        addTopastes: (state,action)=>{
            //extract paste 
            const paste = action.payload

            //add chekck if already exist

            //push current paste to list of pastes
            state.pastes.push(paste)

            //add it to local storage
            localStorage.setItem("pastes",JSON.stringify(state.pastes))

            toast.success("Paste Created Successfully")

        },
        updateToPastes: (state,action)=>{
            const paste = action.payload
            // find the paste if exist
            const index  = state.pastes.findIndex((item)=>
                item._id === paste._id
            )

            if(index >= 0){
                //if it find index it will replace the exiting paste with new one
                state.pastes[index] = paste;

                localStorage.setItem("pastes",JSON.stringify(state.pastes));

                toast.success("Paste Updated")
            }

        },
        resetAllPastes: (state,action)=>{
            //i want to clear all the paste
            state.pastes= []

            localStorage.removeItem("pastes")

        },
        removeFromPastes:(state,action)=>{
            const pasteId = action.payload

            console.log(pasteId)

            const index = state.pastes.findIndex((item)=>
            item._id === pasteId
            );

            if(index >= 0){
                // delete thate paste from our list
                state.pastes.splice(index,1);

                //add display the new list of paste in localstorage
                localStorage.setItem("pastes", JSON.stringify(state.pastes));

                toast.success("Paste Deleted")
            }

        },

    }

})

export const {addTopastes,updateToPastes,removeFromPastes,resetAllPastes}= pasteSlice.actions

export default pasteSlice.reducer