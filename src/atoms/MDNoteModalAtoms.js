import { atom } from "recoil";

export const mdNoteModalOpenState = atom({
    key: "mdNoteModalOpenState",
    default: false
});

export const mdNoteModalState = atom({
    key: "mdNoteModalState",
    default: {
        id: "",
        type: "mdnote",
        title: "",
        tags: "",
        content: ""
    }
});

export const mdNoteModalActionState = atom({
    key: "mdNoteModalActionState",
    default: "create" // create || edit
});