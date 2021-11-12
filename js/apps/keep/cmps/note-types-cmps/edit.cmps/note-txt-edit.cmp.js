import noteEditorEditBar from '../../../cmps/note-editor-edit-bar.cmp.js';

export default {
    props: ['note'],
    template: `
        <section class="note-editor" :style="{ 'background-color': getColor}">
            <div class="editor-header">
                <input class="txt-input" type="text" :placeholder="titlePlaceholder" v-model="editedNote.info.title" @keyup.enter="createNewNote">
                <button class="edit-pin edit-btns" @click="pinNote(note.id)" :style="{ color: pinnedNoteStyle}">pin</button>
            </div>
            <div class="editor-main">
                <textarea  cols="30" rows="10" v-model="editedNote.info.txt"></textarea>
            </div>
            <div class="editor-footer">
                <note-editor-edit-bar :note="note"/>
                <button class="close-editor-btn">X</button>
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
        }
    },

    components: {
        noteEditorEditBar
    },
}