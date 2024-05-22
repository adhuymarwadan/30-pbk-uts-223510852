<template>
    <div class="profile">
      <h1>Postingan Pengguna</h1>
      <div class="pengguna">
        <label for="users">Pilih Pengguna:</label>
        <select id="users" v-model="selectedUserId" @change="loadUserPosts">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="user-posts">
        <div v-if="loading">Loading...</div>
        <div v-else>
          <div v-for="post in userPosts" :key="post.id">
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    props: {
      users: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        selectedUserId: null,
        userPosts: [],
        loading: false
      }
    },
    methods: {
      loadUserPosts() {
        if (!this.selectedUserId) return
        this.loading = true
        axios
          .get(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`)
          .then((response) => {
            this.userPosts = response.data
            this.loading = false
          })
          .catch((error) => {
            console.error('Error fetching user posts:', error)
            this.loading = false
          })
      }
    }
  }
  </script>
  
  <style>
  .profile {
    background-color: rgba(225, 225, 225, 0.4);
    padding: 20px;
    border-radius: 25px;
    box-shadow: 10px 10px 20px black;
  }
  
  .pengguna {
    margin-bottom: 20px;
  }
  
  .user-posts {
    margin-top: 20px;
  }
  
  .user-posts h2 {
    margin: 0;
    font-size: 1.5em;
  }
  
  .user-posts p {
    font-size: 1em;
    color: #666;
  }
  </style>
  