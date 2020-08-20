import React, {useEffect, useState} from 'react';
import Dashboard from '../../components/dashboard'
import {initialImageProps, topDrawerFillingConstants} from "../../../constants";
import {alertActions, pageActions, userActions} from "../../../_actions";
import {connect} from "react-redux";

function DashboardContainer(props) {
    const now = new Date()
    const initialNoteInfo = {
        name: '',
        date: now.toDateString(),
        img: initialImageProps,
    }
    const [activeNote, setActiveNote] = useState(props.notes
        .find(note => note.id === props.activeNote) || initialNoteInfo)

    useEffect(()=>{
        if(!!props.activeNote){
            setActiveNote(props.notes.find(note => note.id === props.activeNote))
        } else {
            setActiveNote( initialNoteInfo)
        }
    },[props.activeNote, props.notes])

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
        if(!!activeNote.id){
            props.editNote({note: activeNote, id: props.id})
        } else {
            props.addNote({note: activeNote, id: props.id})
        }
        clearTemporaryData()
    }

    const clearTemporaryData = () => {
        setActiveNote(initialNoteInfo)
    }

    const closeTopDrawer = () => {
        props.closeTopDrawer()
        clearTemporaryData()
    }

    const editNote = id => {
        props.openTopDrawer({filling: topDrawerFillingConstants.EDIT_NOTE, id})
    }

    const deleteNote = id => {
        props.deleteNote({noteId: id, id: props.id})
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
            isOpen={props.isOpen}
            notes={props.notes}
            globalActiveNote={props.globalActiveNote}
        />
    );
}

const mapStateToProps = state => {
    const {notes, id} = state.authentication.user
    const {activeNote} = state.page
    const {isOpen} = state.page.topDrawer
    const globalActiveNote = state.page.activeNote


    return {notes, activeNote, id, isOpen, globalActiveNote}
};

const mapDispatchToProps = {
    clearAlerts: alertActions.clear,
    openTopDrawer: pageActions.openTopDrawer,
    closeTopDrawer: pageActions.closeTopDrawer,
    addNote: userActions.addNote,
    editNote: userActions.editNote,
    deleteNote: userActions.deleteNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)

