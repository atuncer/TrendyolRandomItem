const app = Vue.createApp({
    data() {
      return {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        gender: 'male',
        picture: 'https://randomuser.me/api/portraits/men/10.jpg',
        items: [
        ],
        selectedIndex: 0
      }
    },
    methods: {
      async getUser() {
        const res2 = await fetch(`http://127.0.0.1:3000/category/${this.selectedIndex}`);
        const results = await res2.json()
  
        console.log(res2.status)
  
        this.firstName = results.name
        this.lastName = results.price
        this.email = results.url
        this.picture = results.img
      },
      switchView(event, selectedIndex) {
        console.log(event, selectedIndex);      
        this.selectedIndex = selectedIndex;
      }
    },
    async beforeMount() {
      const res2 = await fetch(`http://127.0.0.1:3000/categories.json`);
      const results = await res2.json()
      this.items = results
    },
  })
  
  app.mount('#app')
  