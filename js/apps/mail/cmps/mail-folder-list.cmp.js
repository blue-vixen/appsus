import { eventBus } from '../../../services/event-bus-service.js'

export default {
    name: 'folder-list',
    template: `
    <section :class="">
        <button class="btn-menu" @click="isMenuOpen = !isMenuOpen"></button>
        <ul class="folders clean-list" :class="{menuopen: isMenuOpen}">
            <button class="close-btn" @click="isMenuOpen = !isMenuOpen"></button>
            <li class="inbox-folder" @click="setFolder('inbox')">Inbox<span> {{unreadCount}}</span></li>
            <!-- <li class="starred-folder" @click="setFolder('starred')">Starred</li> -->
            <li class="sent-folder" @click="setFolder('sent')">Sent</li>
            <li class="draft-folder" @click="setFolder('drafts')">Drafts</li>
            <li class="trash-folder" @click="setFolder('trash')">Trash</li>
        </ul>
    </section>
`,
    data() {
        return {
            unreadCount: null,
            isMenuOpen: false
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