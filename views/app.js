const url1 = "https://trendyolrastgele.social/"
const url = "http://127.0.0.1:3000/"

const app = Vue.createApp({
    data() {
      return {
        itemName: '',
        price: '0.00',
        linkToItem: '#',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png',  // not the best default
        items: [],
        rating: '1',
        ratingCount: '',
        selectedIndex: 0
      }
    },
    methods: {
      async getUser() {
        const res = await fetch(`${url}category/${this.selectedIndex}`);
        console.log(res);
        const results = await res.json()
        if (!res.ok) return;
        
        this.itemName = results.name
        this.price = results.price.toFixed(2)
        this.linkToItem = results.url
        this.picture = results.img
        this.rating = results.rating === -1 ? "" : results.rating.toFixed(1) + "/5.0"
        this.ratingCount = results.ratingCount === -1 ? "0" : results.ratingCount
        this.ratingCount += " ratings"
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
      const res = await fetch(`${url}categories.json`);
      const results = await res.json()
      this.items = results
      this.items.unshift('Rastgele')
    },
  })
  
  app.mount('#app')
  