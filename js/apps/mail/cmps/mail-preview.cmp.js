export default {
    name: 'mail-preview',
    props: ['email'],
    template: `
        <div class="mail-preview flex unread">
            <p class="grow1">{{email.from}}</p>
            <p class="grow2">{{email.subject}}</p>
        </div>
    `
}