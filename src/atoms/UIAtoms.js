import { atom } from "recoil";

export const pageFadeActiveState = atom({
    key: "pageFadeActiveState",
    default: false
});

export const pageFadeCallbackState = atom({
    key: "pageFadeCallbackState",
    default: () => () => {}
});



export const boardsMenuOpenState = atom({
    key: "boardsMenuOpenState",
    default: false
});



export const actionsMenuOpenState = atom({
    key: "actionsMenuOpenState",
    default: false
});