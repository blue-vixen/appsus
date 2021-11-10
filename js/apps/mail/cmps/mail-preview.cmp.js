export default {
    name: 'mail-preview',
    props: ['email'],
    template: `
        <ul class="mail-preview clean-list" :class="markRead">
            <li class="star"></li>
            <li class="bold">{{email.to || email.from}}</li>
            <li><span class="bold">{{email.subject}} -</span> {{email.body}}</li>
            <div class="actions">
                <button title="delete" class="btn-delete"></button>
                <button title="expand" class="btn-expand"></button>
                <button title="save to note" class="btn-note"></button>
            </div>         
        </ul>
    `,
    computed: {
        markRead() {
            const { isRead } = this.email
            if (isRead) return 'read'
            else return 'unread'
        }
    }
}