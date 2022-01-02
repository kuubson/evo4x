interface ILinks {
    handleToggler: (dispatch: ReactDispatch<boolean>) => void
    setShowLoginModal: ReactDispatch<boolean>
    setShowHelpSidebar: ReactDispatch<boolean>
}

export const links = ({ handleToggler, setShowLoginModal, setShowHelpSidebar }: ILinks) => [
    {
        link: 'Indicators'
    },
    {
        link: 'Login',
        onClick: () => handleToggler(setShowLoginModal)
    },
    {
        link: 'Help',
        onClick: () => handleToggler(setShowHelpSidebar)
    }
]
