import { atom, selector } from "recoil";

export const boardsState = atom({
    key: "boardsState",
    default: [
        {
            id: "0",
            name: "Board",
            notes: [
                {
                    id: "1",
                    type: "quicknote",
                    title: "Note",
                    tags: "#tag",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                },
                {
                    id: "2",
                    type: "quicknote",
                    title: "Note",
                    tags: "#tag",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                },
                {
                    id: "3",
                    type: "quicknote",
                    title: "Note",
                    tags: "#tag",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                },
                {
                    id: "4",
                    type: "quicknote",
                    title: "Note",
                    tags: "#tag",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                },
                {
                    id: "5",
                    type: "quicknote",
                    title: "Note",
                    tags: "#tag",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                },
                {
                    id: "6",
                    type: "quicknote",
                    title: "Note",
                    tags: "#tag",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                },
                {
                    id: "7",
                    type: "quicknote",
                    title: "Note",
                    tags: "#tag",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                },
                {
                    id: "8",
                    type: "quicknote",
                    title: "Note",
                    tags: "#tag",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                }
            ]
        }
    ]
});

export const activeBoardIdState = atom({
    key: "acitveBoardIdState",
    default: "0"
});

export const activeFilterTagsState = atom({
    key: "activeFilterTagsState",
    default: []
});

export const activeBoardState = selector({
    key: "activeBoardState",
    get: ({get}) => {
        const boards = get(boardsState);
        const activeBoardId = get(activeBoardIdState);

        if(boards.length){
            return boards.find(board => board.id === activeBoardId);
        }
        return null;
    }
});

export const activeBoardNotesState = selector({
    key: "activeBoardNotesState",
    get: ({get}) => {
        const boards = get(boardsState);
        const activeBoardId = get(activeBoardIdState);
        
        if(boards.length){
            return boards.find(board => board.id === activeBoardId).notes;
        }
        return [];
    },
    set: ({get, set}, newValue) => {
        const boards = get(boardsState);
        const activeBoardId = get(activeBoardIdState);

        set(
            boardsState,
            boards.map(board => {
                if(board.id === activeBoardId){
                    return {
                        ...board,
                        notes: newValue
                    }
                }
                return board;
            })
        )
    }
});

// export const activeBoardNotesFilteredByTagsState = selector({
//     key: "activeBoardNotesFilteredByTagsState",
//     get: ({get}) => {
//         const activeBoardNotes = get(activeBoardNotesState);
//         const boardFilterTags = get(boardFilterTagsState);

//         // if no filter tags -> return all notes
//         if(boardFilterTags.length === 0) return activeBoardNotes;

//         // return notes that contain boardFilterTag(s)
//         return activeBoardNotes.filter(note => boardFilterTags.some(filterTag => note.tags.split(" ").includes(filterTag)));
//     }
// });

export const activeBoardTagsState = selector({
    key: "activeBoardTagsState",
    get: ({get}) => {
        const boards = get(boardsState);
        const activeBoardId = get(activeBoardIdState);
        
        if(boards.length){
            // return all unique tags present in current active board
            return [...new Set(boards.find(board => board.id === activeBoardId).notes.map(note => note.tags.split(" ")).flat())];
        }
        return null;
    }
});