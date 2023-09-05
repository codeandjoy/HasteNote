import { atom } from "recoil";

export const pageFadeActive = atom({
    key: "pageFadeActive",
    default: false
});

export const pageFadeCallback = atom({
    key: "pageFadeCallback",
    default: () => () => {}
});