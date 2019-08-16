const app = new Vue({
  el: "#app",  //mount to id = app in index.html
  data: {
    bobby: {
      name: "Bobby Boone",
      age: 25
    },
    john: {
      name: "John Boby",
      age: 15
    }
  },
  //must return only 1 top level element which is why the h2 is wrapped inside a div
  //es6 template string allows multiline here
  template: `
    <div>
      <h2>Name: {{bobby.name}}</h2>
      <h2>Age: {{bobby.age}}</h2>
    </div>
  `
})
