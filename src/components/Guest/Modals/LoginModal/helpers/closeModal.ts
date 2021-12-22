type ModalCloser = {
    setRole: React.Dispatch<React.SetStateAction<Role>>
    toggleModal: () => void
}

const closeModal = ({ setRole, toggleModal }: ModalCloser) => {
    setRole('user')
    toggleModal()
}

export default closeModal
