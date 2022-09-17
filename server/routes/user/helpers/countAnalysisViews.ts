import type { Analysis } from 'database/models/Analysis'

export const countAnalysisViews = (analysis: Analysis) =>
   analysis.readBy.split(',').filter(v => v).length
