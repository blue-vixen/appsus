import { eventBus } from "../../../services/event-bus-service.js";
import { mailService } from "../services/mail.service.js";

export default {
    name: 'mail-edit',
    template: `
        <section class="mail-edit app-main">
            <h3>New message</h3>
            <form @submit.prevent="save">
                <input v-model="emailToEdit.to" type="email" placeholder="To:" autofocus required>
                <input v-model="emailToEdit.subject" type="text" placeholder="Subject:" required>
                <textarea v-model="emailToEdit.body"></textarea>
                <div class="form-btns flex space-between">
                    <button class="send-btn" type="submit" title="Send"></button>
                    <button class="cancel-btn" title="Cancel" @click="cancel"></button>
                </div>
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
        },
        cancel() {
            this.$router.push({ path: '/apps/mail' })
        }
    },
    watch: {
        '$route': {
            handler() {
                this.emailToEdit.subject = this.$route.query.subject
                this.emailToEdit.body = this.$route.query.body
            },
            immediate: true
        }

    }


}
