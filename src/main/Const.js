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
    HALLWAY1: {
        name: "hallway1",
        type: "hallway",
        rightSquare: "Hall",
        leftSquare: "Study",
        downSquare: "hallway4",
        upSquare: null,
        secretPassage: null
    },
    HALL: {
        name: "Hall",
        type: "room",
        rightSquare: "hallway2",
        leftSquare: "hallway1",
        downSquare: "hallway4",
        upSquare: null,
        secretPassage: null
    },
    HALLWAY2: {
        name: "hallway2",
        type: "hallway",
        rightSquare: "Lounge",
        leftSquare: "Hall",
        downSquare: null,
        upSquare: null,
        secretPassage: null
    },
    LOUNGE: {
        name: "Lounge",
        type: "room",
        rightSquare: null,
        leftSquare: "hallway2",
        downSquare: "hallway5",
        upSquare: null,
        secretPassage: "Conservatory"
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
    HALLWAY4: {
        name: "hallway4",
        type: "hallway",
        rightSquare: null,
        leftSquare: null,
        downSquare: "Billiard Room",
        upSquare: "Hall",
        secretPassage: null
    },
    HALLWAY5: {
        name: "hallway5",
        type: "hallway",
        rightSquare: null,
        leftSquare: null,
        downSquare: "Dining Room",
        upSquare: "Lounge",
        secretPassage: null
    },
    LIBRARY: {
        name: "Library",
        type: "room",
        rightSquare: "hallway6",
        leftSquare: null,
        downSquare: "hallway8",
        upSquare: "hallway3",
        secretPassage: null
    },
    HALLWAY6: {
        name: "hallway6",
        type: "hallway",
        rightSquare: "Billiard Room",
        leftSquare: "Library",
        downSquare: null,
        upSquare: null,
        secretPassage: null
    },
    BILLIARDROOM: {
        name: "Billiard Room",
        type: "room",
        rightSquare: "hallway7",
        leftSquare: "hallway6",
        downSquare: "hallway9",
        upSquare: "hallway4",
        secretPassage: null
    },
    HALLWAY7: {
        name: "hallway7",
        type: "hallway",
        rightSquare: "Dining Room",
        leftSquare: "Billiard Room",
        downSquare: null,
        upSquare: null,
        secretPassage: null
    },
    DININGROOM: {
        name: "Dining Room",
        type: "room",
        rightSquare: null,
        leftSquare: "hallway7",
        downSquare: "hallway10",
        upSquare: "hallway5",
        secretPassage: null
    },
    HALLWAY8: {
        name: "hallway8",
        type: "hallway",
        rightSquare: null,
        leftSquare: null,
        downSquare: "Conservatory",
        upSquare: "Library",
        secretPassage: null
    },
    HALLWAY9: {
        name: "hallway9",
        type: "hallway",
        rightSquare: null,
        leftSquare: null,
        downSquare: "Ballroom",
        upSquare: "Billiard Room",
        secretPassage: null
    },
    HALLWAY10: {
        name: "hallway10",
        type: "hallway",
        rightSquare: null,
        leftSquare: null,
        downSquare: "Kitchen",
        upSquare: "Dining Room",
        secretPassage: null
    },
    CONSERVATORY: {
        name: "Conservatory",
        type: "room",
        rightSquare: "hallway11",
        leftSquare: null,
        downSquare: null,
        upSquare: "hallway8",
        secretPassage: "Lounge"
    },
    HALLWAY11: {
        name: "hallway11",
        type: "hallway",
        rightSquare: "Ballroom",
        leftSquare: "Conservatory",
        downSquare: null,
        upSquare: null,
        secretPassage: null
    },
    BALLROOM: {
        name: "Ballroom",
        type: "room",
        rightSquare: "hallway12",
        leftSquare: "hallway11",
        downSquare: null,
        upSquare: "hallway9",
        secretPassage: null
    },
    HALLWAY12: {
        name: "hallway12",
        type: "hallway",
        rightSquare: "Kitchen",
        leftSquare: "Ballroom",
        downSquare: null,
        upSquare: null,
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

export const E_WEAPONS = {
    ROPE: "Rope",
    PIPE: "Pipe",
    KNIFE: "Knife",
    WRENCH: "Wrench",
    CANDLESTICK: "Candlestick",
    REVOLVER: "Revolver"
}

export const E_CHARACTERS = {
    COLONEL: {
        name: "Colonel Mustard", location: E_ROOMS.HALLWAY5, taken: false
    },
    PEACOCK: {
        name: "Mrs. Peacock", location: E_ROOMS.HALLWAY8, taken: false
    },
    GREEN: {
        name: "Reverend Green", location: E_ROOMS.HALLWAY11, taken: false
    },
    PLUM: {
        name: "Professor Plum", location: E_ROOMS.HALLWAY3, taken: false
    },
    SCARLET: {
        name: "Miss Scarlet", location: E_ROOMS.HALLWAY2, taken: false
    },
    WHITE: {
        name: "Mrs. White", location: E_ROOMS.HALLWAY12, taken: false
    }
}

export const E_CARDS = {
    COLONEL: {
        name: E_CHARACTERS.COLONEL.name, type: "character"
    },
    PEACOCK: {
        name: E_CHARACTERS.PEACOCK.name, type: "character"
    },
    GREEN: {
        name: E_CHARACTERS.GREEN.name, type: "character"
    },
    PLUM: {
        name: E_CHARACTERS.PLUM.name, type: "character"
    },
    SCARLET: {
        name: E_CHARACTERS.SCARLET.name, type: "character"
    },
    WHITE: {
        name: E_CHARACTERS.WHITE.name, type: "character"
    },
    STUDY: {
        name: E_ROOMS.STUDY.name, type: "room"
    },
    HALL: {
        name: E_ROOMS.HALL.name, type: "room"
    },
    LOUNGE: {
        name: E_ROOMS.LOUNGE.name, type: "room"
    },
    LIBRARY: {
        name: E_ROOMS.LIBRARY.name, type: "room"
    },
    BILLIARDROOM: {
        name: E_ROOMS.BILLIARDROOM.name, type: "room"
    },
    DININGROOM: {
        name: E_ROOMS.DININGROOM.name, type: "room"
    },
    CONSERVATORY: {
        name: E_ROOMS.CONSERVATORY.name, type: "room"
    },
    BALLROOM: {
        name: E_ROOMS.BALLROOM.name, type: "room"
    },
    KITCHEN: {
        name: E_ROOMS.KITCHEN.name, type: "room"
    },
    ROPE: { 
        name: E_WEAPONS.ROPE, type: "weapon"
    },
    PIPE: {
        name: E_WEAPONS.PIPE, type: "weapon"
    },
    KNIFE: {
        name: E_WEAPONS.KNIFE, type: "weapon"
    },
    WRENCH: {
        name: E_WEAPONS.WRENCH, type: "weapon"
    },
    CANDLESTICK: {
        name: E_WEAPONS.CANDLESTICK, type: "weapon"
    },
    REVOLVER: {
        name: E_WEAPONS.REVOLVER, type: "weapon"
    }
}

export const E_TURNACTIONS = {
    MOVE: "move",
    SUGGEST: "suggest",
    ACCUSE: "accuse",
    REFUTE: "refute"
}

export function locationMap(location) {
    if (location === "hallway1") {
        return E_ROOMS.HALLWAY1;
    }
    if (location === "hallway2") {
        return E_ROOMS.HALLWAY2;
    }
    if (location === "hallway3") {
        return E_ROOMS.HALLWAY3;
    }
    if (location === "hallway4") {
        return E_ROOMS.HALLWAY4;
    }
    if (location === "hallway5") {
        return E_ROOMS.HALLWAY5;
    }
    if (location === "hallway6") {
        return E_ROOMS.HALLWAY6;
    }
    if (location === "hallway7") {
        return E_ROOMS.HALLWAY7;
    }
    if (location === "hallway8") {
        return E_ROOMS.HALLWAY8;
    }
    if (location === "hallway9") {
        return E_ROOMS.HALLWAY9;
    }
    if (location === "hallway10") {
        return E_ROOMS.HALLWAY10;
    }
    if (location === "hallway11") {
        return E_ROOMS.HALLWAY11;
    }
    if (location === "hallway12") {
        return E_ROOMS.HALLWAY12;
    }
    if (location === "Study") {
        return E_ROOMS.STUDY;
    }
    if (location === "Hall") {
        return E_ROOMS.HALL;
    }
    if (location === "Lounge") {
        return E_ROOMS.LOUNGE;
    }
    if (location === "Library") {
        return E_ROOMS.LIBRARY;
    }
    if (location === "Billiard Room") {
        return E_ROOMS.BILLIARDROOM;
    }
    if (location === "Dining Room") {
        return E_ROOMS.DININGROOM;
    }
    if (location === "Conservatory") {
        return E_ROOMS.CONSERVATORY;
    }
    if (location === "Ballroom") {
        return E_ROOMS.BALLROOM;
    }
    if (location === "Kitchen") {
        return E_ROOMS.KITCHEN;
    }
}

