

export default {
    template: `
        <div class="note-add-bar">
            <input class="txt-input" type="text" placeholder="What's on your mind..." v-model="inputVal" @keyup.enter="createNewNote">
            <div class="note-type-btns">
                <button class="add-txt" @click="changeType('noteText')"></button>
                <button class="add-img" @click="changeType('noteImg')"></button>
                <button class="add-youtube" @click="changeType('noteYoutube')"></button>
                <button class="add-todos" @click="changeType('noteTodos')"></button>
            </div>
        </div>
    `,
    data(){
        return{
        inputVal: null
        }
    },



    methods: {
        createNewNote() {
            
        },
        changeType(type){
            
        }
    }
}