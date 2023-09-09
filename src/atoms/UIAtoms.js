import { atom } from "recoil";

export const pageFadeActive = atom({
    key: "pageFadeActive",
    default: true
});

export const pageFadeCallback = atom({
    key: "pageFadeCallback",
    default: () => () => {}
});



export const boardsMenuOpen = atom({
    key: "boardsMenuOpen",
    default: true
});



export const actionsMenuOpen = atom({
    key: "actionsMenuOpen",
    default: false
});