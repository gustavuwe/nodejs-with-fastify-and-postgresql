import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.values())
        .map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

            return {
                id,
                ...data,
            }
        })
        // QUERY PARAMMETERS
        .filter(video => { // para cada video
            if (search) { // faço uma busca
                return video.title.includes(search) // que retorna apenas os videos com a palavra da variavel search
            }

            return true // se não tiver uma busca, retorna todos os videos
        })
    }

    create(video) {
        const videoId = randomUUID()
        
        this.#videos.set(videoId, video)
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }
}