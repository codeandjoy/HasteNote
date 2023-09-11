import { atom } from "recoil";

export const noteModalOpenState = atom({
    key: "noteModalOpenState",
    default: false
});

export const noteModalAnimationPosState = atom({
    key: "noteModalAnimationPosState",
    default: {x:0, y:0}
});

export const noteModalState = atom({
    key: "noteModalState",
    default: {
        id: "",
        title: "",
        tags: "",
        content: ""
    }
});

export const noteModalActionTypeState = atom({
    key: "noteModalActionState",
    default: ""
});