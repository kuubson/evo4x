type Role = 'admin' | 'user' | 'guest'

type User = {
    id: string
    profile?: {
        name: string
        avatar: string
    }
}

type Profile = {
    name: string
    nameError: string
    story: string
    storyError: string
}
