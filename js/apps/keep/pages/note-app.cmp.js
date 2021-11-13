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
                    <div class="edit-modal">
                        <note-edit :note="selectedNote" v-if="selectedNote"/>
                    </div>
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
        eventBus.$on('addNewNote', this.addNewNote)
        eventBus.$on('remove', this.removeNote)
        eventBus.$on('updateNote', this.onUpdateNote)

        eventBus.$on('colorChanged', this.changeBgColor)
        eventBus.$on('pinNote', this.pinNote)
        eventBus.$on('toggleModal', this.isSelectedNote)
        eventBus.$on('updateArchive', this.updateArchive)
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
            if(this.selectedNote) this.selectedNote = null
            noteService.remove(id)
                .then(() => {
                    this.notes = this.notes.filter(note => note.id !== id)
                })
        },

        onUpdateNote(note){
            noteService.updateNote(note)
        },

        changeBgColor(noteId, color) {
            console.log(noteId, color);
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

        isSelectedNote(note) {
            if (!this.selectedNote) return this.selectedNote = note
            this.selectedNote = null
            noteService.updateNote(note)
        },
        updateArchive(note) {
            note.isArchive = !note.isArchive
            noteService.updateNote(note)
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