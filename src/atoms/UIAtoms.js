import { atom } from "recoil";

export const pageFadeActiveState = atom({
    key: "pageFadeActive",
    default: false
});

export const pageFadeCallbackState = atom({
    key: "pageFadeCallback",
    default: () => () => {}
});



export const boardsMenuOpenState = atom({
    key: "boardsMenuOpen",
    default: false
});



export const actionsMenuOpen = atom({
    key: "actionsMenuOpen",
    default: false
});