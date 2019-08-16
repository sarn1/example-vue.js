const app = new Vue({
  el: "#app",  //mount to id = app in index.html
  data: {
    bobby: {
      first: "Bobby",
      last: "Boone",
      age: 27,
    },
    john: {
      first: "John",
      last: "Boby",
      age: 15,
    }
  },
  computed: {
    bobbyFullName() {
      return `${this.bobby.first} ${this.bobby.last}`
    },
    bobbyRetireInYrs() {
      return 65-`${this.bobby.age}`
    }
  },
  //like a function
  filters: {
    inverseName(value) {
        return `${value.last}, ${value.first}`
    }
  },
  template: `
    <div>
      <h2>First: {{bobby.first}}</h2>
      <h2>Full: {{bobbyFullName}}</h2>
      <h2>Inverse: {{bobby | inverseName}}</h2>
      <h2>Age: {{bobby.age}}</h2>
      <h2>Retire: {{bobbyRetireInYrs}}</h2>
    </div>
  `
})
