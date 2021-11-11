import { eventBus } from "../../../services/event-bus-service.js";
import { mailService } from "../services/mail.service.js";

export default {
    name: 'mail-edit',
    template: `
        <section class="mail-edit app-main">
            <form @submit.prevent="save">
                <input v-model="emailToEdit.to" type="email" placeholder="To:" autofocus required>
                <input v-model="emailToEdit.subject" type="text" placeholder="Subject:" required>
                <textarea v-model="emailToEdit.body" rows="4" cols="50"></textarea>
                <button>Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            emailToEdit: {
                id: null,
                status: 'sent',
                subject: null,
                to: null,
                body: null,
                sentAt: null,
                isRead: true,
                isStarred: false
            }
        }
    },
    methods: {
        save() {
            mailService.save(this.emailToEdit)
                .then(email => {
                    console.log('email after save', email)
                    eventBus.$emit('updated', email)
                    this.$router.push({ path: '/apps/mail' })
                })
        }
    },
    watch: {

    }


}
