import { ParsedQuery } from 'query-string'

type QueryParamsHandler = {
    params: ParsedQuery<string>
    setIssue: ReactDispatch<Issue>
    toggleSidebar: () => void
    showLoginModal: () => void
}

export const handleQueryParams = ({
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
