import { pageConstants } from '../constants';

export const pageActions = {
    openTopDrawer,
    closeTopDrawer
};

function openTopDrawer(payload) {
    return { type: pageConstants.OPEN_TOP_DRAWER, payload };
}

function closeTopDrawer() {
    return { type: pageConstants.CLOSE_TOP_DRAWER };
}