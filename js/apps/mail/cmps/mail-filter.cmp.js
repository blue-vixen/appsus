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
                    <!-- <option>Starred</option> -->
                </select>
                
            </label>
            <label>Sort by:
            <select @change="sort" v-model="sortBy">
                <option>Date</option>
                <option>Sender</option>
                <option>Subject</option>
            </select>
            </label>
        </section>
`,
    data() {
        return {
            filterBy: {
                txt: '',
                msgStatus: 'All'
            },
            sortBy: 'Date'
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
        },
        sort() {
            this.$emit('sorted', this.sortBy)
        }
    }
}