import React from 'react'

const issues = (issue: string, setIssue: React.Dispatch<React.SetStateAction<Issue>>) => [
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

export default issues
