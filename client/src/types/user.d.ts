type AllRoles = 'guest' | 'user' | 'admin'

type UserRoles = 'user' | 'admin'

type User = {
    id: string
    profile?: {
        name: string
        avatar: string
    }
}
