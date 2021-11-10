import { mailService } from "../services/mail.service.js";
import mailList from "../cmps/mail-list.cmp.js";

export default {

    template: `
        <section class="mail-app app-main">
            <button>Compose</button>
            <ul class="clean-list"></ul>
            <h3>Welcome to your mail</h3>
            <mail-list :emails="emails"/>
        </section>
    
    `,
    data() {
        return {
            emails: null
        }
    },
    created() {
        mailService.query()
            .then(emails => {
                console.log(emails)
                this.emails = emails
            })

    },
    computed: {
        emailsToShow() {
            return this.emails
        }
    },
    components: {
        mailList
    }
}