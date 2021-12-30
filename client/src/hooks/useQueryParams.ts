import { useLocation } from 'react-router'
import queryString from 'query-string'

const useQueryParams = () => queryString.parse(useLocation().search)

export default useQueryParams
