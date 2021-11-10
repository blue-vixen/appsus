export default {
    name: 'mail-filter',
    template: `
        <section class="mail-filter">
            <label>
                Search:
                <input @input="filter" v-model="filterBy.txt" type="search" placeholder="Search mail"/>
                <select @change="filter" v-model="filterBy.msgStatus">
                    <option>All</option>
                    <option>Read</option>
                    <option>Unread</option>
                </select>
            </label>
        </section>
`,
    data() {
        return {
            filterBy: {
                txt: '',
                msgStatus: 'All'
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
        }
    }
}