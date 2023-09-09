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
                    title: "Note",
                    tags: "#start",
                    content: ""
                }
            ]
        }
    ]
});

export const activeBoardIdState = atom({
    key: "acitveBoardIdState",
    default: "0"
});

// ? filter out notes ?
export const activeBoardState = selector({
    key: "activeBoardState",
    get: ({get}) => {
        const boards = get(boardsState);
        const activeBoardId = get(activeBoardIdState);

        return boards.find(board => board.id === activeBoardId);
    }
});

export const activeBoardNotesState = selector({
    key: "activeBoardNotesState",
    get: ({get}) => {
        const boards = get(boardsState);
        const activeBoardId = get(activeBoardIdState);
        
        // if(!activeBoardId) return boards[0].notes;

        return boards.find(board => board.id === activeBoardId).notes;
    }
});

export const activeBoardTagsState = selector({
    key: "activeBoardTagsState",
    get: ({get}) => {
        const boards = get(boardsState);
        const activeBoardId = get(activeBoardIdState);
        
        // return all unique tags present in current active board
        return [...new Set(boards.find(board => board.id === activeBoardId).notes.map(note => note.tags))];
    }
});

// TODO
// Selector filter by tag
//
// activeBoardNotesFilteredByTags : 
//      get(activeBoard) 