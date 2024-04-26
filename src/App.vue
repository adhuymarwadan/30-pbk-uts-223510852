<template>
  <div class="beground-foto">
    <h1>welcome</h1>
    <p>This is a simple project that I made, please guide😊</p>
  </div>
  <div class="user-crud">
    <h2>User List</h2>
    <ul class="user-list">
      <li v-for="(user, index) in users" :key="index" class="user-item">
        <div class="user-info">
          <span class="user-name">{{ user.name }}</span> -
          <span class="user-email">{{ user.email }}</span>
        </div>
        <div class="user-actions">
          <input type="checkbox" v-model="selectedUsers[index]" class="edit-checkbox" />
          <button @click="editUser(index)" class="action-btn">Edit</button>
          <button @click="deleteUser(index)" class="action-btnn">Delete</button>
        </div>
      </li>
    </ul>

    <h2>{{ editing ? 'Edit User' : 'Add User' }}</h2>
    <div class="form">
      <input type="text" v-model="user.name" placeholder="Name" class="input-field" />
      <input type="email" v-model="user.email" placeholder="Email" class="input-field" />
      <button @click="addUser()" :disabled="!isInputValid" class="action-btn">Add User</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: 'bagus', email: 'bagus123@gmail.com' },
        { id: 2, name: 'bayu', email: 'bayu456@gmail.com' }
      ],
      selectedUsers: [], // Array untuk menyimpan status seleksi pengguna
      user: { id: null, name: '', email: '' },
      editing: false
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
    }
  }
}
</script>

<style scoped>
.user-crud {
  background-color: rgba(225, 225, 225, 0.4);
  box-shadow: 10px 10px 20px bla;
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
</style>
