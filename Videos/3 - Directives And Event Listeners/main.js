const app = new Vue({
  el: "#app",  //mount to id = app in index.html
  data: {
    friends: [
      {
        first: "Bobby",
        last: "Boone",
        age: 27,
      },
      {
        first: "John",
        last: "Boby",
        age: 15,
      },
    ],
  },
  //like a function
  filters: {
    inverseName(value) {
        return `${value.last}, ${value.first}`
    }
  },
  methods: {
    toggleAge(friend,sign) {
      if (sign == '+') {
        friend.age += 1;
      } else {
        friend.age -= 1;
      }
    }
  },
  template: `
    <div>
      <div v-for="friend in friends">
        <h4>First: {{friend.first}}</h4>
        <h4>{{friend | inverseName}}</h4>
        <h4>Age: {{friend.age}}</h4>
        <input v-model="friend.first"/>
        <!-- this is bad since its logic in a method (in-lining) -->
        <button v-on:click="friend.age = friend.age + 1">+</button>
        <button v-on:click="friend.age = friend.age - 1">-</button>

        <button v-on:click="toggleAge(friend,'+')">ADD</button>
        <button v-on:click="toggleAge(friend,'-')">MINUS</button>
        <hr/>
      </div>
    </div>
  `
})
