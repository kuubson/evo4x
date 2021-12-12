type Role = 'admin' | 'user' | 'guest'

type NavbarLink = {
    link: string
    pathname?: string
    counter?: number
    onClick?: () => void
}

type User = {
    id: string
    profile?: {
        name: string
        avatar: string
    }
}

type MessageTypes = 'MESSAGE' | 'IMAGE' | 'VIDEO' | 'FILE'

type Message = {
    id: number
    type: Messagetypes
    content: string
    createdAt: Date
    user: User
}

type Analysis = {
    id: number
    type: Messagetypes
    content: string
    createdAt: Date
    views: number
}
