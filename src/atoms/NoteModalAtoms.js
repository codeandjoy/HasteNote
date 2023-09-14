import { atom } from "recoil";

export const noteModalOpenState = atom({
    key: "noteModalOpenState",
    default: false
});

export const noteModalAnimationPosState = atom({
    key: "noteModalAnimationPosState",
    default: {x:0, y:0}
});
// TODO
// noteModalEnterAnimationPos
// noteModalExitAnimationPos

export const noteModalState = atom({
    key: "noteModalState",
    default: {
        id: "",
        title: "",
        tags: "",
        content: ""
    }
});

export const noteModalActionState = atom({
    key: "noteModalActionState",
    default: "create" // create || edit
});