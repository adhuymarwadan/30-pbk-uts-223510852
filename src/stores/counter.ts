import { defineStore } from 'pinia'
import axios from 'axios'

export const useGalleryStore = defineStore('gallery', {
  state: () => ({
    photos: [] as Array<{ id: number; thumbnailUrl: string; url: string }>
  }),
  actions: {
    async fetchPhotos() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos')
        this.photos = response.data
      } catch (error) {
        console.error('Error fetching photos:', error)
      }
    }
  }
})
