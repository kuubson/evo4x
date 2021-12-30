type Links = {
    handleToggler: (dispatch: DispatchBoolean) => void
    setShowLoginModal: DispatchBoolean
    setShowHelpSidebar: DispatchBoolean
}

const links = ({ handleToggler, setShowLoginModal, setShowHelpSidebar }: Links) => [
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

export default links
