new Vue({
  el: '#app',
  data: {
    packages: Packages,
    selection: -1,
    summaries: [],
    total: 0,
    deposit: 0,
    package: undefined,
    show_form: false,
    timeslots: TimeSlots,
  },
   methods: {
     init: function() {
       this.selection= -1,
       this.summaries= [],
       this.total= 0,
       this.deposit= 0,
       this.package= undefined,
       this.show_form = false
     },
     menu_selection: function(e) {
       this.init();

       if (e.target.options.selectedIndex-1 >= 0) {
         this.selection = e.target.options.selectedIndex;

         this.summaries.push("Selection: " + Packages[e.target.options.selectedIndex-1].menu_label);
         console.log("Menu Selected Index: " + e.target.options.selectedIndex);
         this.package = Packages[e.target.options.selectedIndex-1].obj
         this.show_form = true;
         console.log(this.package);
         console.log(this.timeslots);
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
