type Role = 'admin' | 'user' | 'guest'

type User = {
    id: string
    profile?: {
        name: string
        avatar: string
    }
}
