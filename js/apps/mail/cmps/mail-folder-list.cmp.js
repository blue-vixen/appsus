import { eventBus } from '../../../services/event-bus-service.js'

export default {
    name: 'folder-list',
    template: `
        <ul class="folders clean-list">
            <li class="inbox-folder" @click="setFolder('inbox')">Inbox<span> {{unreadCount}}</span></li>
            <li class="sent-folder" @click="setFolder('sent')">Sent</li>
            <li class="draft-folder" @click="setFolder('drafts')">Drafts</li>
            <li class="trash-folder" @click="setFolder('trash')">Trash</li>
        </ul>
`,
    data() {
        return {
            unreadCount: 0
        }
    },
    created() {
        eventBus.$on('updateCount', this.updateCount)
    },
    methods: {
        setFolder(folder) {
            this.$emit('filtered', folder)
        },
        updateCount(unreadCount) {
            this.unreadCount = unreadCount
        }
    },

}