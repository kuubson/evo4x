type MessageTypes = 'MESSAGE' | 'IMAGE' | 'VIDEO' | 'FILE'

type Message = {
    id: number
    type: MessageTypes
    content: string
    createdAt: Date
    user: User
}
