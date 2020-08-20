import {initialImageProps, topDrawerFillingConstants} from "../constants";

export const initialGlobalState = {
    user: {
        id: 1,
        name: 'alena'
    },
    notes: {
        notesList: [
            {
                id: 1,
                name: 'First note',
                date: 'Wed Aug 19 2020',
                img: initialImageProps
            },
            {
                id: 2,
                name: 'Second note',
                date: 'Wed Aug 19 2020',
                img: initialImageProps
            },
        ],
        activeNote: '',
    },
    screenToggleElementsState: {
      topDrawer: {
          isOpen: false,
          filling: '',
      }
    },
}

export default function globalStateReducer(state, action) {
    switch (action.type) {
        case 'logout':
            console.log('Add logout action')
            return state;
        case 'addNewNote':
            return {
                ...state,
                notes: {
                    ...state.notes,
                    notesList: [
                        ...state.notes.notesList,
                        {
                            id: '123',
                             ...action.payload
                        }
                    ]
                },
                screenToggleElementsState:
                    {
                        ...state.screenToggleElementsState,
                        topDrawer: initialGlobalState.screenToggleElementsState.topDrawer
                    }
            };
        case 'editNote':
            return {
                ...state,
                notes: {
                    ...state.notes,
                    activeNote: action.payload.id
                },
                screenToggleElementsState:
                    {
                        ...state.screenToggleElementsState,
                        topDrawer: {
                            isOpen: true,
                            filling: topDrawerFillingConstants.EDIT_NOTE,
                        }
                    }
            };
        case 'saveNodeChange':
            const notesListWithDiff = state.notes.notesList.map(note => {
                if(note.id !== action.payload.id){
                    return note
                } else {
                    return action.payload
                }
            })
            return {
                ...state,
                notes: {
                    ...state.notes,
                    activeNote: '',
                    notesList: notesListWithDiff,
                },
                screenToggleElementsState:
                    {
                        ...state.screenToggleElementsState,
                        topDrawer: initialGlobalState.screenToggleElementsState.topDrawer
                    }
            };
        case 'deleteNote':
            const notesList = state.notes.notesList.filter(note=> note.id !== action.payload.id )
            return {
                ...state,
                notes: {
                    ...state.notes,
                    notesList
                }
            };
        case 'openTopDrawer':
            return {
                ...state,
                screenToggleElementsState:
                    {
                        ...state.screenToggleElementsState,
                        topDrawer: {
                            isOpen: true,
                            filling: action.payload.filling,
                        }
                    }
            }
        case 'closeTopDrawer':
            return {
                ...state,
                screenToggleElementsState:
                    {
                        ...state.screenToggleElementsState,
                        topDrawer: initialGlobalState.screenToggleElementsState.topDrawer
                    }
            }
        default:
            throw new Error();
    }
}
