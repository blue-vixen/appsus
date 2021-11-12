import { eventBus } from '../../../services/event-bus-service.js'


export default {
    name: 'mail-expand',
    props: ['email'],
    template: `
        <div class="mail-expand clean-list">
            <div class="expand-line flex space-between">
                <h3>{{email.from || email.to}}</h3>
                <div class="actions">
                    <button title="delete" class="btn-delete" @click="remove(email.id)"></button>
                    <button title="expand" class="btn-expand" @click="redirectToMail(email.id)"></button>
                    <button title="save to note" class="btn-note"></button>
                </div>
            </div>   
            <div class="expand-line flex space-between">
                <h4>{{email.subject}}</h4>
                <h4>{{renderDate}}</h4>
            </div>
            <p>{{email.body}}</p>
            
        </div>
    `,
    data() {
        return {

        }
    },
    created() {


    },
    methods: {
        remove(emailId) {
            eventBus.$emit('remove', emailId);
        },
        redirectToMail(emailId) {
            this.$router.push({ path: '/mail/' + emailId })
        }
    },
    computed: {

        renderDate() {
            let mailDate = new Date(this.email.sentAt)
            let currDate = new Date();
            if (currDate.getDate() === mailDate.getDate()
                && currDate.getMonth() === mailDate.getMonth()
                && currDate.getFullYear() === mailDate.getFullYear()) {
                return mailDate.getHours() + ':' + mailDate.getMinutes()
            } else {
                return (mailDate.getDate() + '/' + (mailDate.getMonth() + 1) + '/' + mailDate.getFullYear())
            }



        }
    }
}
