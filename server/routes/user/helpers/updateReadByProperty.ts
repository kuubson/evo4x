import { Message as MessageClass } from 'database/models/Message'
import { Analysis } from 'database/models/Analysis'

type Items = MessageClass[] | Analysis[]

type ReadByPropertyUpdater = (userId: number, items: Items) => Promise<Items>

const updateReadByProperty: ReadByPropertyUpdater = async (userId, items) => {
    return await Promise.all(
        items.map(async item => {
            const readByIds = item.readBy.split(',').filter(v => v)
            const ID = userId.toString()
            if (!readByIds.includes(ID)) {
                readByIds.push(ID)
            }
            await item.update({
                readBy: readByIds.join(',')
            })
            return item
        })
    )
}

export default updateReadByProperty
