import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class DatabasePostgres {
    #videos = new Map()

    async list(search) {
        let videos

        if (search) { // if have query parammeter like search=anyword then:
            videos = await sql`SELECT * FROM videos WHERE title ILIKE ${'%' + search + '%'}`
        } else {
            videos = await sql`SELECT * FROM videos`
        }

        return videos
    }

    async create(video) {
        const videoId = randomUUID()
        const { title, description, duration } = video

        await sql`INSERT INTO videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    async update(id, video) {
        const { title, description, duration } = video

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`delete from videos where id = ${id}`
    }
}