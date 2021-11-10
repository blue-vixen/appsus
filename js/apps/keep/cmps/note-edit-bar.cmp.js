

export default {
    props: ['note'],
    template: `
        <div class="note-edit-bar">
            <button class="edit-pin edit-btns"></button>
            <button class="edit-color edit-btns"></button>
            <button class="edit-send edit-btns"></button>
            <button class="edit-edit edit-btns"></button>
            <button class="edit-delete edit-btns" @click="remove(note.id)"></button>

        </div>
    `,

    methods:{
        remove(noteId){
            this.$emit('remove', noteId)
        }
    },

    



}