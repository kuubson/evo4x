type Message = {
   id: number
   type: MessageTypes
   content: string
   filename?: string
   createdAt: Date
   user: User
}

type MessageTypes = 'MESSAGE' | 'IMAGE' | 'VIDEO' | 'FILE'
