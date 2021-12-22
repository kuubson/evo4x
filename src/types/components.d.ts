type NavbarLink = {
    link: string
    pathname?: string
    counter?: number
    onClick?: () => void
}

type Issue = 'email' | 'link' | 'password' | 'changePassword' | ''
