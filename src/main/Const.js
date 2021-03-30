export const E_ROOMS = {
    STUDY: {
        name: "Study",
        type: "room",
        rightSquare: "hallway1",
        leftSquare: null,
        downSquare: "hallway3",
        upSquare: null,
        secretPassage: "Kitchen"
    },
    HALLWAY3: {
        name: "hallway3",
        type: "hallway",
        rightSquare: null,
        leftSquare: null,
        downSquare: "Library",
        upSquare: "Study",
        secretPassage: null
    },
    KITCHEN: {
        name: "Kitchen",
        type: "room",
        rightSquare: null,
        leftSquare: "hallway12",
        downSquare: null,
        upSquare: "hallway10",
        secretPassage: "Study"
    }
};

export const E_CHARACTERS = {
    COLONEL: {
        name: "Colonel", location: E_ROOMS.STUDY
    },
    PEACOCK: {
        name: "Peacock", location: E_ROOMS.KITCHEN
    }
}