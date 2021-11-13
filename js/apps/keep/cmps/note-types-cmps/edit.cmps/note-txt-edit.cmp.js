import { eventBus } from '../../../../../services/event-bus-service.js'
import noteEditorEditBar from '../../../cmps/note-editor-edit-bar.cmp.js';

export default {
    props: ['note'],
    template: `
        <section class="note-editor modal-editor" :style="{ 'background-color': getColor}">
            <div class="editor-header">
            <button class="close-editor-btn" @click="closeEditor"></button>
                <input class="title-input" type="text" :placeholder="titlePlaceholder" v-model="editedNote.info.title" @keyup.enter="closeEditor">
                <button class="edit-pin edit-btns" @click="pinNote()" :style="{ color: pinnedNoteStyle}"></button>
            </div>
            <hr>
            <div class="editor-main">
                <textarea class="txt-input" cols="30" rows="5" v-model="editedNote.info.txt"></textarea>
            </div>
            <div class="editor-footer">
                <note-editor-edit-bar :note="note"/>
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

        eventBus.$on('changeBgColor', this.setBgColor)
        eventBus.$on('sendNote', this.sendNote)

    },
    computed: {
        getColor() {
            return this.editedNote.style.backgroundColor
        },

        pinnedNoteStyle() {
            if (this.editedNote.isPinned)
                return '#ffa500'
        }
    },
    methods: {
        saveToNote(msg) {
            console.log(msg.txt)
        },
        closeEditor() {
            eventBus.$emit('toggleModal', this.editedNote)
        },
        pinNote() {
            this.editedNote.isPinned = !this.editedNote.isPinned
            eventBus.$emit('updateNote', this.editedNote)
        },
        setBgColor(color) {
            this.editedNote.style.backgroundColor = color
        },
        sendNote() {
            eventBus.$emit('updateNote', this.editedNote)
            this.$router.push({ path: `/mail/compose?subject=${this.editedNote.info.title}` })
        },
    },

    components: {
        noteEditorEditBar,
        eventBus
    },
}