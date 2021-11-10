import notePreview from './note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
        <ul class="note-list clean-list">
            <li v-for="note in notes" :key="note.id" class="note-list-container">
                <note-preview :note="note" @remove="remove"/>
            </li>
        </ul>
    `,

    methods: {
        remove(noteId) {
            this.$emit('remove', noteId);
        },
        log() {
            console.log('Logging.....');
        }
    },
    components: {
        notePreview,
    },
}