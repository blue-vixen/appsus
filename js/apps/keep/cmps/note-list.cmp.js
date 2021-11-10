import notePreview from './note-preview.cmp.js';


export default {
    props: ['noets'],
    template: `
        <ul class="note-list">
            <li v-for="note in notes" :key="note.id" class="note-list-container">
                <note-preview :note="note"/>
                <!-- <div class="actions">
                    <router-link :to="'/book/'+book.id">Details</router-link>
                </div> -->
            </li>
        </ul>

    `,
    methods: {
        // log() {
        //     console.log('Logging.....');
        // }
    },
    components: {
        notePreview
    },

}