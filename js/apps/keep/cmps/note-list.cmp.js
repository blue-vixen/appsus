import notePreview from './note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
        <ul class="note-list clean-list">
            <li v-for="note in notes" :key="note.id" class="note-list-container">
                <div class="note-card">
                <note-preview :note="note"/>
                </div>
            </li>
        </ul>
    `,

    methods: {
        log() {
            console.log('Logging.....');
        }
    },
    components: {
        notePreview,
    },
}