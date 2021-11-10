import { mailService } from "../services/mail.service.js";
import mailList from "../cmps/mail-list.cmp.js";
import mailFolderList from "../cmps/mail-folder-list.cmp.js";
import mailFilter from "../cmps/mail-filter.cmp.js";

export default {

    template: `
       <section class="mail-app app-main">
            <div class="side-bar">
                <h3>Welcome to your mail</h3>
                <button>Compose</button>
                <mail-folder-list @filtered="setDisplay"/>
            </div>
            <div class="flex main-mail-display">
                <mail-filter @filtered/>
               <mail-list :emails="emails"/>
            </div>
        </section>
    
    `,
    data() {
        return {
            emails: null,
            criteria: {
                display: null,
                isRead: null,
                isStared: null
            }
        }
    },
    created() {
        mailService.query(this.criteria)
            .then(emails => {
                console.log(emails)
                this.emails = emails
            })

    },
    methods: {
        setDisplay(folder) {
            this.criteria.display = folder;
            console.log(this.criteria)
        }
    },
    computed: {
        emailsToShow() {
            return this.emails
        }
    },
    components: {
        mailList,
        mailFolderList,
        mailFilter
    }
}