type LoginModalForAdminHandler = {
    setRole: React.Dispatch<React.SetStateAction<Role>>
    setShowLoginModal: DispatchBoolean
}

const showLoginModalForAdmin = ({ setRole, setShowLoginModal }: LoginModalForAdminHandler) => {
    setRole('admin')
    setShowLoginModal(true)
}

export default showLoginModalForAdmin
