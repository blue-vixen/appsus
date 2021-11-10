import { storageService } from "../../../services/async-storage-service.js";

const NOTES_KEY = 'notes';

const gNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n103",
        type: "note-todos",
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
        }
    }
];

export const noteService = {
    query,
    getById,
    makeId,
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

function getById(noteId) {
    return storageService.get(NOTES_KEY, noteId)
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