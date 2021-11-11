import noteDetails from './note-details.cmp.js';
import noteEditBar from './note-edit-bar.cmp.js';


export default {
    props: ['note'],
    template: `
        <div class="note-preview" :style="{ backgroundColor: noteBgColor }">
            <note-details :note="note"/>
            <note-edit-bar :note="note"/>
        </div>
    `,

methods:{

},
computed: {
    noteBgColor() {
        return this.note.style.backgroundColor
    }
},

components: {
    noteDetails,
    noteEditBar
},
}