import { eventBus } from '../../../../../services/event-bus-service.js'
import noteEditorEditBar from '../../../cmps/note-editor-edit-bar.cmp.js';

export default {
    props: ['note'],
    template: `
        <section class="note-editor modal-editor" :style="{ 'background-color': getColor}">
            <div class="editor-header">
                <input class="title-input" type="text" :placeholder="titlePlaceholder" v-model="editedNote.info.title" @keyup.enter="createNewNote">
                <button class="edit-pin edit-btns" @click="pinNote(note.id)" :style="{ color: pinnedNoteStyle}"></button>
            </div>
            <div class="editor-main">
                <textarea class="txt-input" cols="30" rows="5" v-model="editedNote.info.txt"></textarea>
            </div>
            <div class="editor-footer">
                <note-editor-edit-bar :note="note"/>
                <button class="close-editor-btn" @click="closeEditor">X</button>
            </div>
        </section>
    `,
    data() {
        return {
            editedNote: null,
            titlePlaceholder: "Enter your KEEP title here...",
        };
    },
    created() {
        this.editedNote = this.note;
    },
    computed:{
        getColor(){
            return this.note.style.backgroundColor
        },
        pinnedNoteStyle() {
            if (this.note.isPinned)
                return '#ffa500'
        }
    },
    methods:{
        closeEditor(){
            eventBus.$emit('toggleModal')
        },
        pinNote(noteId) {
            eventBus.$emit('pinNote', noteId)
        },
    },

    components: {
        noteEditorEditBar,
        eventBus
    },
}