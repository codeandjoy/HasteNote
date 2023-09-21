import { atom } from "recoil";

export const pageFadeCallbackState = atom({
    key: "pageFadeCallbackState",
    default: () => () => {}
});



export const boardsMenuOpenState = atom({
    key: "boardsMenuOpenState",
    default: false
});
export const boardsMenuPageFadeActiveState = atom({
    key: "boardsMenuPageFadeActiveState",
    default: false
});



export const actionsMenuOpenState = atom({
    key: "actionsMenuOpenState",
    default: false
});
export const actionsMenuPageFadeActiveState = atom({
    key: "actionsMenuPageFadeActiveState",
    default: false
});