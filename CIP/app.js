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
  payment: 0,
  selection: -1,
  entries: Entries,
  Init: function () {
    this.selection = -1;
    this.summaries = [];
    this.total = 0;
    this.payment = 0;
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
  AddPayment: function (label, value) {
    this._RemoveFromCart("PAYMENT");

    if (label == "") {
      this._AddToCart("Payment: Custom or Full Amount: $" + value, value, "PAYMENT");
    } else {
      this._AddToCart("Payment: " + label, value, "PAYMENT");
    }

    this.payment = value;
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
   vCustomAmount : function (e) {

     var payment = 0;
     var label = "";

     console.log(e);
     // toggle to the appropriate radio button depending on input
     if (e.target.id == "custom_or_full_amt" || e.target.id == "custom_or_full_amt_rdr") {
       document.getElementById("custom_or_full_amt_rdr").checked = true;
       payment = parseFloat(this.cart.entries.custom_or_full_amt);
       console.log(payment);
       if (Number.isNaN(payment)) {
         payment = 0;
       }
     } else {
       document.getElementById("custom_or_full_amt_rdr").checked = false;
       this.cart.entries.custom_or_full_amt = "";
       payment = parseFloat(e.target.value);
       label = e.target.attributes["data-label"].value;
     }

     this.cart.AddPayment(label, payment);
   },
   vAddTier : function (e) {
     this.cart.AddTier(e.target.attributes["data-label"].value, e.target.attributes["data-value"].value);
   },
   vAddExtras : function (e) {
     // to do next
   },
   vSubmit : function (e) {

     // validate form
     this.errors = [];

     // check mandatory fields
     if (this.cart.entries.tier == "") {
       this.errors.push("Please select a package tier.");
     }

     if (this.cart.entries.bride_name == "") {
       this.errors.push("Bride first and last name is required.");
     }

     if (this.cart.entries.groom_name == "") {
       this.errors.push("Groom first and last name is required.");
     }

     if (this.cart.entries.bride_phone == "") {
       this.errors.push("Bride phone number is required.");
     }

     if (this.cart.entries.groom_phone == "") {
       this.errors.push("Groom phone name is required.");
     }

     if (!this.$refs.acknowledge.checked) {
       this.errors.push("You must agree to the terms before proceeding.");
     }

     if (this.cart.entries.bumper.toUpperCase() != "SPRINGFIELD") {
       this.errors.push("The anti-spam answer is incorrect, please try again.");
     }

     // must have a payment and check for custom amount if selected as-if
     if (document.getElementById("custom_or_full_amt_rdr").checked && this.cart.payment <= 0) {
       this.errors.push("You selected full or custom payment but did not fill-in the amount.");
     } else if (this.cart.payment <= 0) {
       this.errors.push("You must select a payment.");
     }

     if (! this.errors.length) {
       console.log(this.errors.length+"no errors");

       // ajax process
       // axios.post('http://localhost:8000/yourPostApi', {
       //      test: this.show_form
       //  })
       //  .then(function (response) {
       //      //currentObj.output = response.data;
       //  })
       //  .catch(function (error) {
       //      //currentObj.output = error;
       //  });

       //open payment page
     }

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
