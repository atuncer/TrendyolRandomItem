const url = "https://trendyolrastgele.social/"

const app = Vue.createApp({
    data() {
      return {
        itemName: '',
        price: '0.00',
        linkToItem: '#',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png',  // not the best default
        items: ["1","2"],
        selectedIndex: 0
      }
    },
    methods: {
      async getUser() {
        const res = await fetch(`${url}category${this.selectedIndex}`);
        const results = await res.json()
        if (!res.ok) return;
        
        this.itemName = results.name
        this.price = results.price.toFixed(2)
        this.linkToItem = results.url
        this.picture = results.img
      },
      switchView(event, selectedIndex) {
        console.log(event, selectedIndex);      
        this.selectedIndex = selectedIndex;
      },
      setImgBlank() {
        this.picture = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png'
      }
    },
    async beforeMount() {
      const res = await fetch(`${url}/categories.json`);
      const results = await res.json()
      this.items = results
      this.items.unshift('Rastgele')
    },
  })
  
  app.mount('#app')
  