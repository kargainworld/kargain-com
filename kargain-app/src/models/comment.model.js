import User from './user.model'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import differenceInDays from 'date-fns/differenceInDays'

export default class Comment {
    constructor (comment) {
        this.raw = comment ?? {}
    }
    
    get getRaw () {
        return this.raw
    }
    
    get getID () {
        return this.raw?.id
    }
    
    get getAuthor () {
        const user = this.raw?.user
        return new User(user)
    }
    
    get getPostDays () {
        if (!this.raw?.createdAt) return null
        const date = parseISO(this.raw?.createdAt)
        return differenceInDays(date, new Date())
    }
    
    get getDate(){
        if (!this.raw?.createdAt) return null
        const date = parseISO(this.raw?.createdAt)
        return format(date, 'Pp', {code: 'fr'})
    }
    
    get getMessage () {
        return this.raw?.message
    }
    
    get getIsEnabled () {
        return Boolean(this.raw?.enabled)
    }
    
    toggleIsEnabled () {
        const enabled = this.getIsEnabled
        this.raw.enabled = !enabled
    }
}
