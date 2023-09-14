import { atom } from "recoil";

export const pageFadeActiveState = atom({
    key: "pageFadeActive",
    default: false
});

export const pageFadeCallback = atom({
    key: "pageFadeCallback",
    default: () => () => {}
});



export const boardsMenuOpen = atom({
    key: "boardsMenuOpen",
    default: false
});



export const actionsMenuOpen = atom({
    key: "actionsMenuOpen",
    default: false
});