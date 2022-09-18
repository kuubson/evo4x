import type { Analysis } from 'database/models/Analysis'
import type { Message } from 'database/models/Message'

type ReadByPropertyUpdater = (userId: number, items: Items) => Promise<Items>

type Items = Message[] | Analysis[]

export const updateReadByProperty: ReadByPropertyUpdater = async (userId, items) =>
   Promise.all(
      items.map(async item => {
         const readByIds = item.readBy.split(',').filter(v => v)
         const ID = userId.toString()
         if (!readByIds.includes(ID)) {
            readByIds.push(ID)
         }
         await item.update({ readBy: readByIds.join(',') })
         return item
      })
   )
