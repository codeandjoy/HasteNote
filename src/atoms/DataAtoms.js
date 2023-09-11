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
                },
                {
                    id: "2",
                    title: "Note 2",
                    tags: "#start #tags",
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
        
        return boards.find(board => board.id === activeBoardId).notes;
    },
    set: ({get, set}, newValue) => {
        const boards = get(boardsState);
        const activeBoardId = get(activeBoardIdState);

        // if note id present in current board -> edit
        // else -> create
        let newBoards;
        if(
            boards
            .find(board => board.id === activeBoardId)
            .notes
            .some(n => n.id === newValue.id)
        ){
            // EDIT
            newBoards = boards.map(board => {
                if(board.id === activeBoardId){
                    return {
                        ...board,
                        notes: board.notes.map(note => {
                            if(note.id === newValue.id){
                                return validateNoteTags(newValue);
                            }
                            return note;
                        })
                    }
                }
                return board;
            });
        }
        else{
            // CREATE
            newBoards = boards.map(board => {
                if(board.id === activeBoardId){
                    return {
                        ...board,
                        notes: [validateNoteTags(newValue), ...board.notes]
                    }
                }
                return board;
            });
        }

        set(boardsState, newBoards);
    }
});

export const activeBoardTagsState = selector({
    key: "activeBoardTagsState",
    get: ({get}) => {
        const boards = get(boardsState);
        const activeBoardId = get(activeBoardIdState);
        
        // return all unique tags present in current active board
        return [...new Set(boards.find(board => board.id === activeBoardId).notes.map(note => note.tags.split(" ")).flat())];
    }
});

// ! UTIL
const validateNoteTags = (note) => {
    return {
        ...note,
        tags: note.tags
            .split(" ")
            .map(tag => {
                if(tag.charAt(0)!== "#") return "#"+tag;
                return tag;
            })
            .join(" ")
    }
}


// TODO
// Selector filter by tag
//
// activeBoardNotesFilteredByTags : 
//      get(activeBoard) 