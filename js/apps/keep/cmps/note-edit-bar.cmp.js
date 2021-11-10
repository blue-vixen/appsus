

export default {
    props: ['note'],
    template: `
        <div class="note-edit-bar">
            <button class="edit-pin edit-btns"></button>
            <div class="edit-color-section">
                <button class="edit-color edit-btns"></button>
                <div class="color-plette">
                    <div class="color-select color-red" @click="changeColor('#f28b82')"></div>
                    <div class="color-select color-orange"></div>
                    <div class="color-select"></div>
                    <div class="color-select"></div>
                    <div class="color-select"></div>
                </div>
            </div>
            <button class="edit-send edit-btns"></button>
            <button class="edit-edit edit-btns"></button>
            <button class="edit-delete edit-btns" @click="remove(note.id)"></button>

        </div>
    `,

    methods:{
        remove(noteId){
            this.$emit('remove', noteId)
        },

        changeColor(color){
console.log(color);
        }
    },

    



}