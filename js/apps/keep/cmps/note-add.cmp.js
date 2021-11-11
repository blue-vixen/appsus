

export default {
    template: `
        <div class="note-add-bar">
            <input class="txt-input" type="text" :placeholder="placeholder" v-model="inputVal" @keyup.enter="createNewNote">
            <div class="note-type-btns">
                <button class="add-txt" @click="changeType('noteText')"></button>
                <button class="add-img" @click="changeType('noteImg')"></button>
                <button class="add-youtube" @click="changeType('noteYoutube')"></button>
                <button class="add-todos" @click="changeType('noteTodos')"></button>
                <div class="separator"></div>
                <button class="add-keep-btn" @click="createNewNote"></button>
            </div>
        </div>
    `,
    data() {
        return {
            inputVal: null,
            noteType: 'noteText',
            placeholder: "What's on your mind..."
        }
    },
    computed: {



    },

    methods: {
        createNewNote() {
            let noteType = this.noteType
            switch (noteType) {
                case 'noteText':
                    console.log("txt");
                    break;
                case 'noteImg':
                    console.log("img");
                    break;
                case 'noteYoutube':
                    console.log("vid");
                    break;
                case 'noteTodos':
                    
                    break;
            }
            this.inputVal = null
        },
        changeType(type) {
            this.noteType = type
            switch (type) {
                case 'noteText':
                    this.placeholder = "What's on your mind..."
                    break;
                case 'noteImg':
                    this.placeholder = "Enter image URL..."
                    break;
                case 'noteYoutube':
                    this.placeholder = "Enter YouTube URL..."
                    break;
                case 'noteTodos':
                    this.placeholder = "Enter comma separated list..."
                    break;
            }
            console.log(this.noteType);
        },


    }
}