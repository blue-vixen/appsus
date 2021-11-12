import { noteService } from "../services/note.service.js";
import { eventBus } from '../../../services/event-bus-service.js'
import { utilService } from '../../../services/utils-service.js'
import notePined from '../cmps/note-pined.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import noteAdd from '../cmps/note-add.cmp.js';
import noteEdit from '../cmps/note-edit.cmp.js';


export default {

    template: `
        <section class="note-app-layout app-main">
            <div class="side-menu">
                <button class="keeps-label"><span></span> All KEEPS</button>
                <button class="pinned-label"><span></span> Pinned KEEPS</button>
                <button class="archiv-label"><span></span> Archive</button>

            </div>
            <div class="notes-section">
                <h2>Let's KEEP it simple...</h2>
                <note-add/>
                <div class="note-app">
                    <h4 class="section-titles">Pinned KEEPS</h4>
                    <note-pined :notes="pinedToShow"/>
                    <h4 class="section-titles">Other KEEPS</h4>
                    <note-list :notes="unPinedToShow"/>
                    <note-edit :note="selectedNote" v-if="selectedNote"/>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            notes: null,
            pinedNotes: null,
            unPinedNotes: null,
            selectedNote: null,
            filterBy: null
        }
    },
    created() {
        this.notes = noteService.query()
        eventBus.$on('remove', this.removeNote)
        eventBus.$on('colorChanged', this.changeBgColor)
        eventBus.$on('pinNote', this.pinNote)
        eventBus.$on('selectedNote', this.getSelectedNote)
        eventBus.$on('addNewNote', this.addNewNote)

    },
    methods: {
        addNewNote(note) {
            note.id = utilService.makeId()
            console.log(note);
            noteService.addNewNote(note)
                .then(() => {
                    this.notes = noteService.query()
                })
        },

        removeNote(id) {
            noteService.remove(id)
                .then(() => {
                    this.notes = this.notes.filter(note => note.id !== id)
                })
        },

        changeBgColor(noteId, color) {
            noteService.changeBgColor(noteId, color)
                .then(() => {
                    this.notes = noteService.query()
                })
        },

        pinNote(noteId) {
            noteService.pinNote(noteId)
                .then(() => {
                    this.notes = noteService.query()
                })
        },

        getSelectedNote(note) {
            this.selectedNote = note
        }
    },

    computed: {
        pinedToShow() {
            return this.pinedNotes = this.notes.filter(note => note.isPinned)
        },
        unPinedToShow() {
            return this.unPinedNotes = this.notes.filter(note => !note.isPinned)
        },
    },

    watch: {

    },
    components: {
        utilService,
        eventBus,
        noteList,
        noteAdd,
        notePined,
        noteEdit
    }
}