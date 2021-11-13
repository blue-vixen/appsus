import { eventBus } from '../../../services/event-bus-service.js'


export default {
    props: ['note'],
    template: `
        <div class="note-edit-bar">
            <div class="edit-color-section">
                <button class="edit-color edit-btns"></button>
                <div class="color-palette">
                    <div class="color-select color-white" @click="changeColor(note.id, '#f5f5f5')" title="White"></div>
                    <div class="color-select color-red" @click="changeColor(note.id, '#f28b82')" title="Red"></div>
                    <div class="color-select color-orange" @click="changeColor(note.id, '#ffa07a')" title="Orange"></div>
                    <div class="color-select color-yellow" @click="changeColor(note.id, '#fff475')" title="Yellow"></div>
                    <div class="color-select color-green" @click="changeColor(note.id, '#ccff90')" title="Green"></div>
                    <div class="color-select color-skyblue" @click="changeColor(note.id, '#cbf0f8')" title="Skyblue"></div>
                    <div class="color-select color-blue" @click="changeColor(note.id, '#aecbfa')" title="Blue"></div>
                    <div class="color-select color-purple" @click="changeColor(note.id, '#d7aefb')" title="Purple"></div>
                </div>
            </div>
            <button class="edit-send edit-btns" @click="send(note)"></button>
            <button class="edit-archive edit-btns"></button>
            <button class="edit-delete edit-btns" @click="remove(note.id)"></button>
        </div>
    `,

    methods: {
        remove(noteId) {
            eventBus.$emit('remove', noteId)
        },

        changeColor(noteId, color) {
            eventBus.$emit('colorChanged', noteId, color)
        },

        send(note) {
            console.log(note)
            this.$router.push({ path: `/mail/compose?subject=${note.info.title}` })
        }
    },

    computed: {
        pinnedNoteStyle() {
            if (this.note.isPinned)
                return '#ffa500'
        }
    },
    components: {
        eventBus,
    },





}