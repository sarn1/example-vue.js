let Entries = {
  date: "",
  start_time: "",
  bride_name: "",
  groom_name: "",
  bride_phone: "",
  groom_phone: "",
  bride_email: "",
  groom_email: "",
  bride_addr: "",
  groom_addr: "",
  custom_or_full_amt: "",
  comments: "",
  brick_1: "",
  brick_2: "",
  brick_3: "",
  Init: function () {
    this.date = "";
    this.start_time = "";
    this.bride_name = "";
    this.groom_name = "";
    this.bride_phone = "";
    this.groom_phone = "";
    this.bride_email = "";
    this.room_email = "";
    this.bride_addr = "";
    this.groom_addr = "";
    this.custom_or_full_amt = "";
    this.comments = "";
    this.brick_1 = "";
    this.brick_2 = "";
    this.brick_3 = "";
  },
  validate: function () {
    // return true if all fields validate
  }
}

let Cart = {
  summaries: [],
  total: 0,
  deposit: 0,
  selection: -1,
  entries: Entries,
  Init: function () {
    this.selection = -1;
    this.summaries = [];
    this.total = 0;
    this.deposit = 0;
    this.entries.Init();
  },
  AddSelection: function (e) {
    this.selection = e.target.options.selectedIndex;
    this.summaries.push("Selection: " + Packages[e.target.options.selectedIndex-1].menu_label);
  }

}

new Vue({
  el: '#app',
  data: {
    packages: Packages,
    cart: Cart,
    package: undefined,
    show_form: false,
    timeslots: TimeSlots,
  },
   methods: {
     init: function() {
       this.package= undefined;
       this.show_form = false;
       this.cart.Init();
     },
     menu_selection: function(e) {
       this.init();

       if (e.target.options.selectedIndex-1 >= 0) {
         this.cart.AddSelection(e);
         this.package = Packages[e.target.options.selectedIndex-1].obj
         this.show_form = true;

         // console debugs
         console.log("Menu Selected Index: " + e.target.options.selectedIndex);
         console.log(this.package);
         console.log(this.package.show_bricks);
       }
     }
   }
});

// Vue.component('timeslots', {
//   data: function () {
//     return {
//       count: 0
//     }
//   },
//   template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
// });
// new Vue({ el: '#wedding_time' });



  //   increment: function(post){
  //     post.votes += 1;
  //   },
  //   decrement: function(post){
  //     post.votes -= 1;
  //   },
  //   createNew: function(){
  //     this.posts.push({
  //       title: this.title,
  //       summary: this.summary,
  //       votes: 0,
  //       thumbnail: 'https://placeimg.com/75/75/any'
  //     });
  //     this.title = '';
  //     this.summary = '';
  //   }
  //},
  // computed: {
  //   orderedList: function(){
  //     return this.posts.sort((currentPost,nextPost) =>{
  //       return nextPost.votes - currentPost.votes;
  //     });
  //   }
  // }

  // Define a new component called button-counter



/*
  // TODO:
  - form creation
  - style summary
  - inject - https://www.chapelinthepines.com/wedding_chapel_gazebo_banquet_hall_rental/?type=PAYMENT
*/
