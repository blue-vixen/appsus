import { noteService } from "../services/note.service.js";
import { eventBus } from '../../../services/event-bus-service.js'
import notePined from '../cmps/note-pined.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import noteAdd from '../cmps/note-add.cmp.js';

// import noteDetails from './note-details.cmp.js';
// import noteFilter from '../cmps/note-filter.cmp.js';


export default {

    template: `
        <section class="note-app app-main">
            <h2>Let's KEEP it simple...</h2>
            <note-add/>
            <note-pined :notes="pinedToShow"/>
            <div class="line-bar"></div>
            <note-list :notes="unPinedToShow" v-if="!selectedNote"/>
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

    },
    methods: {
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

        pinNote(noteId){
            noteService.pinNote(noteId)
            .then(() => {
                this.notes = noteService.query()
            })
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
        eventBus,
        noteList,
        noteAdd,
        notePined
    }
}