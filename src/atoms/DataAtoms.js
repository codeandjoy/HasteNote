import { atom, selector } from "recoil";

export const activeBoardIdAtom = atom({
    key: "acitveBoardIdAtom",
    default: Promise.resolve(localStorage.getItem('activeBoardId') || 0)
});
export const activeBoardIdState = selector({
    key: "activeBoardIdState",
    get: ({get}) => get(activeBoardIdAtom),
    set: ({set}, value) => {
        localStorage.setItem('activeBoardId', value);
        set(activeBoardIdAtom, value);
    }
});


export const activeFilterTagsState = atom({
    key: "activeFilterTagsState",
    default: []
});