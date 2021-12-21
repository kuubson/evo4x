import { Analysis } from 'database/models/Analysis'

const countViews = (analysis: Analysis) => analysis.readBy.split(',').filter(v => v).length

export default countViews
