export default {
    name: 'mail-preview',
    props: ['email'],
    template: `
        <ul class="mail-preview flex clean-list">
            <li class="grow1">{{email.to || email.from}}</li>
            <li class="grow2">{{email.subject}}</li>
            <li class="grow2">{{email.body}}</li>
            <div class="actions">
                <button title="delete">✖</button>
                <button title="expand" class="btn-expand">📝</button>
                <button title="save to note">💌</button>
            </div>         
        </ul>
    `
}