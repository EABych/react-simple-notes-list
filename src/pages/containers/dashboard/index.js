import React, {useContext, useEffect, useState} from 'react';
import {StateContext} from '../../../App'
import Dashboard from '../../components/dashboard'
import {initialImageProps} from "../../../constants";

function DashboardContainer() {
    const now = new Date()
    const initialNoteInfo = {
        name: '',
        date: now.toDateString(),
        img: initialImageProps,
    }
    const {globalStore, setGlobalStore} = useContext(StateContext);
    const [activeNote, setActiveNote] = useState(globalStore.notes.notesList
        .find(note => note.id === globalStore.notes.activeNote) || initialNoteInfo)

    useEffect(()=>{
        if(!!globalStore.notes.activeNote){
            setActiveNote(globalStore.notes.notesList.find(note => note.id === globalStore.notes.activeNote))
        } else {
            setActiveNote( initialNoteInfo)
        }
    },[globalStore.notes.activeNote])

    const changeTemporaryData = event => {
        const {id, value} = event.currentTarget
        setActiveNote({
            ...activeNote,
            [id]: value,
        })
    }

    const onFileUpload = e => {
        let formData   = new FormData(),
            file       = e.target.files[0],
            fileReader = new FileReader()

        if (file) {
            if (file.type.split('/')[0] !== 'image') {
                // Only files with the following extension JPG, JPEG and PNG are allowed
            } else {
                fileReader.onload = function(ev) {
                    setActiveNote({
                        ...activeNote,
                        img: {
                            ...initialImageProps,
                            src: ev.target.result,
                        },
                    })
                }
                fileReader.readAsDataURL(file)
                formData.append('avatar', file)
            }
        }
    }

    const refreshDataGlobal = () => {
        setGlobalStore({type: !!activeNote.id ? 'saveNodeChange':'addNewNote', payload: activeNote})
        clearTemporaryData()
    }

    const clearTemporaryData = () => {
        setActiveNote(initialNoteInfo)
    }

    const closeTopDrawer = () => {
        setGlobalStore({type: 'closeTopDrawer'})
        clearTemporaryData()
    }

    const editNote = id => {
        setGlobalStore({type: 'editNote', payload: {id}})
    }

    const deleteNote = id => {
        setGlobalStore({type: 'deleteNote', payload: {id}})
    }

    const setImgTransform = event => {
        setActiveNote({
            ...activeNote,
            img: {...activeNote.img,
                imgTransform: event.currentTarget.id === 'Increment' ?  activeNote.img.imgTransform + 90 : activeNote.img.imgTransform - 90
            }
        })
    }

    const setImgScale = event => {
        setActiveNote({
            ...activeNote,
            img: {...activeNote.img,
                imgScale: event.currentTarget.id === 'Increment' ?  activeNote.img.imgScale + 0.1 : activeNote.img.imgScale - 0.1
            }
        })
    }

    const deleteImg = event => {
        setActiveNote({
            ...activeNote,
            img: initialImageProps,
        })
    }

    return (
        <Dashboard
            closeTopDrawer={closeTopDrawer}
            changeTemporaryData={changeTemporaryData}
            refreshDataGlobal={refreshDataGlobal}
            onFileUpload={onFileUpload}
            activeNote={activeNote}
            editNote={editNote}
            deleteNote={deleteNote}
            setImgTransform={setImgTransform}
            setImgScale={setImgScale}
            deleteImg={deleteImg}
        />
    );
}

export default DashboardContainer;
