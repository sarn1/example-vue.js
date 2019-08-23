
let Option1 = {
    package_summary: "",
    name : "Vivekananda School",
    location : "Delhi",
    established : "1971"
}


const Options = [
  {
    id: 1,
    menu_label: "OPTION 1: Elopements / Small Private Wedding (Up to 25 Guests)",
    obj: Option1
  },
  {
    id: 2,
    menu_label: "OPTION 2: Wedding Ceremony Only, (Up to 150 Guests)",
    //obj: option2
  },
  {
    id: 3,
    menu_label: "OPTION 3: Pearl Wedding Ceremony &amp; Reception Package (Up to 150 Guests)",
    //obj: option3
  },
  {
    id: 4,
    menu_label: "OPTION 4: Ruby Wedding Reception Only (Up to 150 Guests)",
    //obj: option4
  },
  {
    id: 5,
    menu_label: "OPTION 5: Make A Payment",
    //obj: option5
  }
];


//Vue.config.devtools = true;

new Vue({
  el: '#app',
  data: {
    options: Options,
    selection: -1,
    summaries: [],
    total: 0,
    deposit: 0,
    package: undefined
  },
   methods: {
     init: function() {
       this.selection= -1,
       this.summaries= [],
       this.total= 0,
       this.deposit= 0,
       this.package= undefined
     },
     menu_selection: function(e) {
       this.init();

       if (e.target.options.selectedIndex-1 >= 0) {
         this.selection = e.target.options.selectedIndex;

         this.summaries.push("Selection: " + Options[e.target.options.selectedIndex-1].menu_label);
         console.log("Menu Selected Index: " + e.target.options.selectedIndex);
       }

     }
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
   },
  // computed: {
  //   orderedList: function(){
  //     return this.posts.sort((currentPost,nextPost) =>{
  //       return nextPost.votes - currentPost.votes;
  //     });
  //   }
  // }
});

//window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
