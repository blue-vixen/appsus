import { noteService } from "../services/note.service.js";
import noteList from '../cmps/note-list.cmp.js';
// import noteDetails from './note-details.cmp.js';
// import noteFilter from '../cmps/note-filter.cmp.js';


export default {

    template: `
        <section class="note-app app-main">
            <h2>KEEP</h2>
            <!-- <note-filter /> -->
            <note-list :notes="notesToShow"  v-if="!selectedNote"/>
            <!-- <book-details v-if="selectedBook" :book="selectedBook" @close="closeDetails"/> -->
        </section>
    `,
    data() {
        return {
            notes: null,
            selectedNote: null,
            filterBy: null
        }
    },
    created() {
        this.notes = noteService.query()
        console.log(this.notes);
    },
    methods: {
        // selectBook(book) {
        //     this.selectedBook = book;
        // },
        // closeDetails() {
        //     this.selectedBook = null;
        // },
        // setFilter(filterBy) {
        //     this.filterBy = filterBy;
        // }
    },
    computed: {
       notesToShow() {
           return this.notes
            // if (!this.filterBy) return this.books;
            // const minPrice = +this.filterBy.fromPrice;
            // const maxPrice = +this.filterBy.toPrice;
            // const searchStr = this.filterBy.title.toLowerCase();
            // return this.books.filter(book => { return book.title.toLowerCase().includes(searchStr) })
            //     .filter(book => {
            //         if (minPrice === 0 && maxPrice === 0) return true
            //         return book.listPrice.amount > minPrice && book.listPrice.amount < maxPrice || !maxPrice
            //     })

        }
    },
    watch: {

    },
    components: {
        noteList,
        // noteFilter,
        // noteDetails
    }
}