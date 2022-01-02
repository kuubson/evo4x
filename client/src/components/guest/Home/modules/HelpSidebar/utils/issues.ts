export const issues = (issue: Issue, setIssue: ReactDispatch<Issue>) => [
    {
        issue: 'Have not you received any e-mail?',
        active: issue === 'email',
        handleOnClick: () => setIssue('email')
    },
    {
        issue: 'Has the link to authenticate your email address expired?',
        active: issue === 'link',
        handleOnClick: () => setIssue('link')
    },
    {
        issue: 'Did you forget the password?',
        active: issue === 'password',
        handleOnClick: () => setIssue('password')
    }
]
