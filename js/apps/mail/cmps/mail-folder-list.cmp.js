export default {
    name: 'folder-list',
    template: `
        <ul class="folders clean-list">
            <li @click="setFolder('inbox')">Inbox</li>
            <li @click="setFolder('sent')"> Sent</li>
            <li @click="setFolder('drafts')">Drafts</li>
            <li @click="setFolder('trash')">Trash</li>
        </ul>
`,
    data() {
        return {
        }
    },
    methods: {
        setFolder(folder) {
            this.$emit('filtered', folder)
        }
    }
}