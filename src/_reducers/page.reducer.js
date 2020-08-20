import {pageConstants, userConstants} from '../constants';

export function page(state = {
      topDrawer: {
        isOpen: false,
        filling: '',
      },
      activeNote: '',
  }, action) {
  switch (action.type) {
    case pageConstants.OPEN_TOP_DRAWER:
      return {
        activeNote: action.payload.id || '',
        topDrawer: {
          isOpen: true,
          filling: action.payload.filling,
        }
      };
    case userConstants.ADD_NODE_REQUEST:
    case userConstants.EDIT_NODE_REQUEST:
    case pageConstants.CLOSE_TOP_DRAWER:
      return {
        topDrawer: {
          isOpen: false,
          filling: '',
        },
        activeNote: '',
      };
    default:
      return state
  }
}