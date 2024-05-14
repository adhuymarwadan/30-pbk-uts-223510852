<template>
  <div class="profile">
    <h1>Postingan Pengguna</h1>
    <div>
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
export default {
  data() {
    return {
      users: [],
      selectedUserId: null,
      userPosts: [],
      loading: false
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
          this.users = data
        })
        .catch((error) => {
          console.error('Error fetching users:', error)
        })
    },
    loadUserPosts() {
      if (!this.selectedUserId) return
      this.loading = true
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`)
        .then((response) => response.json())
        .then((data) => {
          this.userPosts = data
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
  padding: 20px;
}

.user-posts {
  margin-top: 20px;
}

.user-posts h2 {
  margin: 0;
}

.user-posts p {
  margin: 0 0 20px 0;
}
</style>
