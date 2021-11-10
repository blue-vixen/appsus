import { mailService } from "../services/mail.service.js";
import mailList from "../cmps/mail-list.cmp.js";

export default {

    template: `
        <section class="mail-app app-main">
            <mail-list :emails="emailToShow"/>
        </section>
    
    `,
    data() {
        return {
            emails: null
        }
    },
    created() {
        mailService.query()
            .then(emails => this.emails = emails)
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