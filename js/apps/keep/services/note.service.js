import { storageService } from "../../../services/async-storage-service.js";

const NOTES_KEY = 'notes';

const gNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: { backgroundColor: "#aecbfa" }
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: false,
        info: {
            url: "https://i.pinimg.com/236x/56/e8/71/56e8715f113c1244257bff1e45e539f6--rupaul-drag-drag-race.jpg",
            title: " Yekaterina Lobaznyuk"
        },
        style: { backgroundColor: "#f5f5f5" }
    },
    {
        id: "n103",
        type: "note-img",
        isPinned: false,
        info: {
            url: "https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/2020BenDeLaCreme-Earnest-1585074372.jpg",
            title: "BenDeLaCreme"
        },
        style: { backgroundColor: "#f28b82" }
    },

    {
        id: "n104",
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                {
                    txt: "Driving liscence",
                    doneAt: null
                },
                {
                    txt: "Coding power",
                    doneAt: 187111111
                }
            ]
        },
        style: { backgroundColor: "#cbf0f8" }
    },
    {
        id: "n105",
        type: "note-img",
        isPinned: true,
        info: {
            url: "https://dynamicmedia.livenationinternational.com/Media/n/a/c/5f9eeadd-cc3d-45aa-80dd-905ea5c3dd75.jpg",
            title: "Trixie Mattel"
        },
        style: { backgroundColor: "#ccff90" }
    },
    {
        id: "n106",
        type: "note-img",
        isPinned: false,
        info: {
            url: "https://img.wcdn.co.il/f_auto,q_auto,w_1200,t_54/2/7/2/1/2721521-46.jpg",
            title: "Alaska Thunderfuck"
        },
        style: { backgroundColor: "#ffa07a" }
    },

    {
        id: "n107",
        type: "note-todos",
        isPinned: true,
        info: {
            label: "Get my stuff together",
            todos: [
                {
                    txt: "Driving liscence",
                    doneAt: null
                },
                {
                    txt: "Coding power",
                    doneAt: 187111111
                }
            ]
        },
        style: { backgroundColor: "#fff475" }
    },
];

export const noteService = {
    query,
    getById,
    makeId,
    remove,
    changeBgColor,
    pinNote,
}

function query() {
    let notes = _createNotes()
    return notes;
}

function _createNotes() {
    let notes = loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = gNotes;
        saveToStorage(NOTES_KEY, gNotes);
    }
    return notes;
}

function changeBgColor(noteId, color) {
    return getById(noteId)
        .then(note => {
            note.style.backgroundColor = color
            storageService.put(NOTES_KEY, note)
        });
}

function pinNote(noteId){
    return getById(noteId)
    .then(note => {
        note.isPinned = !note.isPinned
        storageService.put(NOTES_KEY, note)
    });
}

function getById(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}