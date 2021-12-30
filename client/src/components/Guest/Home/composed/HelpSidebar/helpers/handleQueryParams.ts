import { ParsedQuery } from 'query-string'

type QueryParamsHandler = {
    params: ParsedQuery<string>
    setIssue: React.Dispatch<React.SetStateAction<Issue>>
    toggleSidebar: () => void
    showLoginModal: () => void
}

const handleQueryParams = ({
    params,
    setIssue,
    toggleSidebar,
    showLoginModal
}: QueryParamsHandler) => {
    const { failedAuthentication, passwordToken } = params
    if (failedAuthentication) {
        showLoginModal()
    }
    if (passwordToken) {
        setIssue('changePassword')
        toggleSidebar()
    }
}

export default handleQueryParams
