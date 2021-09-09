import { createBrowserHistory } from 'history'

const redirectTo = pathname => createBrowserHistory().push(pathname)

export default redirectTo
