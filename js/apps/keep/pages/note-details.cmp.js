import { noteService } from "../services/note.service.js";

export default {

    template: `
        <section class="">
            <h2>Keep your KEEP Keeped</h2>
            <form v-if="noteToEdit" @submit.prevent="save" >
                <input v-model="noteToEdit.title" type="text" placeholder="place your title here...">
                <input v-model="noteToEdit.txt" type="text" placeholder="place your text here...">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
        noteToEdit: null
        }
    },
    created() {
        const { noteId } = this.$route.params;
        if (noteId) {
            noteService.getById(noteId)
                .then(note => this.noteToEdit = note);
        } else {
            this.noteToEdit = noteService.getEmptyNote();
        }
    },
    methods: {

    },
    computed: {

    },
    watch: {

    },
    components: {
        noteService
    }
}