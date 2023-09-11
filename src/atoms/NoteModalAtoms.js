import { atom } from "recoil";
import uuid from "react-uuid";

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
        id: uuid(), 
        title: "",
        tags: "",
        content: ""
    }
});

export const noteModalActionTypeState = atom({
    key: "noteModalActionState",
    default: ""
});