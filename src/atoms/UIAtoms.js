import { atom } from "recoil";

export const pageFadeActiveState = atom({
    key: "pageFadeActiveState",
    default: true
});

export const pageFadeCallbackState = atom({
    key: "pageFadeCallbackState",
    default: () => () => {}
});



export const boardsMenuOpenState = atom({
    key: "boardsMenuOpenState",
    default: true
});



export const actionsMenuOpenState = atom({
    key: "actionsMenuOpenState",
    default: false
});