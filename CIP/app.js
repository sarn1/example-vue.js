let Entries = {
  tier: "",
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
  bumper: "",
  Init: function () {
    this.tier = "";
    this.date = "";
    this.start_time = "";
    this.bride_name = "";
    this.groom_name = "";
    this.bride_phone = "";
    this.groom_phone = "";
    this.bride_email = "";
    this.groom_email = "";
    this.bride_addr = "";
    this.groom_addr = "";
    this.custom_or_full_amt = "";
    this.comments = "";
    this.brick_1 = "";
    this.brick_2 = "";
    this.brick_3 = "";
    this.bumper = "";
  },
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

  // public
  AddSelection: function (e) {
    this.selection = e.target.options.selectedIndex;
    this._AddToCart("Selection: " + Packages[e.target.options.selectedIndex-1].menu_label, 0, "SELECTION");
  },
  AddTier: function (label, value) {
    this._RemoveFromCart("TIER");
    this._AddToCart("Tier: " + label, value, "TIER");
  },


  // private
  _AddToCart (label, value, type) {
    this.total += parseFloat(value);
    this.summaries.push({
      "label" : label,
      "value" : parseFloat(value),
      "type" : type
    });
  },
  _RemoveFromCart(type) {
    for (var i = this.summaries.length - 1; i >= 0; i--) {
        if (this.summaries[i].type == type) {
            this.total -= this.summaries[i].value;
            this.summaries.splice(i, 1);
        }
    }
  },
}

new Vue({
  el: '#app',
  data: {
    packages: Packages,
    cart: Cart,
    package: undefined,
    show_form: false,
    show_errors : false,
    timeslots: TimeSlots,
    errors: [],
  },
  methods: {
   vInit: function() {
     this.package= undefined;
     this.show_form = false;
     this.errors = [];
     this.cart.Init();
   },
   vConcatTierLabel: function (a,b,c) {
     return c + ": " + a + " ($" + b + ")";
   },
   vMenuSelection: function(e) {
     this.vInit();

     if (e.target.options.selectedIndex-1 >= 0) {
       this.cart.AddSelection(e);
       this.package = Packages[e.target.options.selectedIndex-1].obj
       this.show_form = true;

      // if option 3 do buy a brick stuff


       // console debugs
       // console.log("Menu Selected Index: " + e.target.options.selectedIndex);
       // console.log(this.package);
       // console.log(this.package.show_bricks);
     }
   },
   vAddTier : function (e) {
     this.cart.AddTier(e.target.attributes["data-label"].value, e.target.attributes["data-value"].value);
   },
   vAddExtras : function (e) {

   },
   vSubmit : function (e) {
     // validate form

     // ajax process

     //open payment page
   },

   // private
   _vValidate : function (e) {

   },
 }
});

/*
  // TODO:
  - style summary
  - inject - https://www.chapelinthepines.com/wedding_chapel_gazebo_banquet_hall_rental/?type=PAYMENT
*/
