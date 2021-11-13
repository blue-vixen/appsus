import { eventBus } from '../../../services/event-bus-service.js'


export default {
    props: ['note'],
    template: `
        <div class="note-edit-bar">
            <div class="edit-color-section">
                <button class="edit-color edit-btns"></button>
                <div class="color-palette">
                    <div class="color-select color-white" @click="changeColor('#f5f5f5')" title="White"></div>
                    <div class="color-select color-red" @click="changeColor('#f28b82')" title="Red"></div>
                    <div class="color-select color-orange" @click="changeColor('#ffa07a')" title="Orange"></div>
                    <div class="color-select color-yellow" @click="changeColor('#fff475')" title="Yellow"></div>
                    <div class="color-select color-green" @click="changeColor('#ccff90')" title="Green"></div>
                    <div class="color-select color-skyblue" @click="changeColor('#cbf0f8')" title="Skyblue"></div>
                    <div class="color-select color-blue" @click="changeColor('#aecbfa')" title="Blue"></div>
                    <div class="color-select color-purple" @click="changeColor('#d7aefb')" title="Purple"></div>
                </div>
            </div>
            <button class="edit-send edit-btns" @click="send"></button>
            <button class="edit-archive edit-btns" @click="setArchive(note)"></button>
            <button class="edit-delete edit-btns" @click="remove(note.id)"></button>
        </div>
    `,
    methods: {
        remove(noteId) {
            eventBus.$emit('remove', noteId)
        },

        changeColor(color) {
            eventBus.$emit('changeBgColor', color)
        },

        send() {
            eventBus.$emit('sendNote')
        },

        setArchive(note){
            eventBus.$emit('updateArchive', note)
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