<template>
  <div>
    <nav class="navbar">
      <ul class="navbarhome">
        <li @click="page = 'home'">Home</li>
      </ul>
      <ul class="navbarpost">
        <li @click="page = 'post'">Post</li>
      </ul>
      <ul class="navbargaleri">
        <li @click="page = 'gallery'">Gallery</li>
      </ul>
    </nav>

    <div class="background-photo">
      <h1>Welcome</h1>
      <p>This is a simple project that I made, please guide😊</p>
    </div>

    <div v-if="page === 'home'">
      <div class="user-crud">
        <h2>User List</h2>
        <ul class="user-list">
          <li v-for="(user, index) in users" :key="index" class="user-item">
            <div class="user-info">
              <input type="checkbox" v-model="user.selected" class="edit-checkbox" />
              <span class="user-name">{{ user.name }}</span> -
              <span class="user-email">{{ user.email }}</span>
            </div>
            <div class="user-actions">
              <button @click="editUser(index)" class="action-btn">Edit</button>
              <button @click="deleteUser(index)" class="action-btnn">Delete</button>
            </div>
          </li>
        </ul>

        <h2>{{ editing ? 'Edit User' : 'Add User' }}</h2>
        <div class="form">
          <input type="text" v-model="user.name" placeholder="Name" class="input-field" />
          <input type="email" v-model="user.email" placeholder="Email" class="input-field" />
          <button
            @click="editing ? saveUser() : addUser()"
            :disabled="!isInputValid"
            class="action-btn"
          >
            {{ editing ? 'Save User' : 'Add User' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="page === 'post'">
      <UserPosts :users="users" />
    </div>

    <div v-else-if="page === 'gallery'">
      <div>
        <h2>Gallery</h2>
        <div class="gallery">
          <div v-for="photo in photos" :key="photo.id" class="gallery-item">
            <img :src="photo.thumbnailUrl" :alt="photo.title" @click="showPhoto(photo.url)" />
            <p>{{ photo.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserPosts from './components/UserPosts.vue'
import { useGalleryStore } from './stores/counter.ts'

export default {
  components: {
    UserPosts
  },
  data() {
    return {
      page: 'home',
      users: [],
      user: { id: null, name: '', email: '' },
      editing: false,
      selectedUserId: null,
      userPosts: [],
      loading: false,
      photos: []
    }
  },
  computed: {
    isInputValid() {
      return this.user.name.trim() !== '' && this.user.email.trim() !== ''
    }
  },
  methods: {
    addUser() {
      if (this.isInputValid) {
        this.user.id = this.users.length + 1
        this.users.push({ ...this.user })
        this.clearForm()
      }
    },
    editUser(index) {
      this.user = { ...this.users[index] }
      this.editing = true
    },
    saveUser() {
      const index = this.users.findIndex((u) => u.id === this.user.id)
      this.$set(this.users, index, { ...this.user })
      this.clearForm()
    },
    deleteUser(index) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.users.splice(index, 1)
      }
    },
    clearForm() {
      this.user = { id: null, name: '', email: '' }
      this.editing = false
    },
    fetchUsers() {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          this.users = response.data
        })
        .catch((error) => {
          console.error('Error fetching users:', error)
        })
    },
    showPhoto(url) {
      window.open(url, '_blank')
    }
  },
  mounted() {
    this.fetchUsers()
    const galleryStore = useGalleryStore()
    galleryStore.fetchPhotos().then(() => {
      this.photos = galleryStore.photos
    })
  }
}
</script>

<style>
.user-crud {
  background-color: rgba(225, 225, 225, 0.4);
  box-shadow: 10px 10px 20px black;
  border-color: grey;
  border-radius: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-list {
  list-style-type: none;
  padding: 0;
}

.user-item {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  flex-grow: 1;
}

.user-name {
  font-weight: bold;
  color: #333;
}

.user-email {
  color: #666;
}

.user-actions {
  flex-shrink: 0;
}

.action-btn {
  border: none;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.action-btnn {
  border: none;
  background: red;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #0056b3;
}

.form {
  margin-top: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.navbarhome,
.navbarpost,
.navbargaleri {
  background-color: rgba(225, 225, 225, 0.4);
  padding: 20px;
  margin: 20px;
  display: flex;
  border-radius: 20px;
  list-style-type: none;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s;
}

.navbarhome:hover,
.navbarpost:hover,
.navbargaleri:hover {
  background-color: #666;
  border-radius: 20px;
  transition-duration: 1.5s;
  transform: translate(-3%, -3%) scale(1.2);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.gallery-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.gallery-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.gallery-item p {
  font-size: 16px;
  margin-top: 10px;
}
</style>
