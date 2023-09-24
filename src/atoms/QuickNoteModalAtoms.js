import { atom } from "recoil";

export const quickNoteModalOpenState = atom({
    key: "quickNoteModalOpenState",
    default: false
});

export const quickNoteModalAnimationPosState = atom({
    key: "quickNoteModalAnimationPosState",
    default: {x:0, y:0}
});

export const quickNoteModalState = atom({
    key: "quickNoteModalState",
    default: {
        id: "",
        type: "quicknote",
        title: "",
        tags: "",
        content: ""
    }
});

export const quickNoteModalActionState = atom({
    key: "quickNoteModalActionState",
    default: "create" // create || edit
});