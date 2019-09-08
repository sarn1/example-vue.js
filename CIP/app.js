new Vue({
  el: '#app',
  data: {
    uri : window.location.search.includes("type=PAYMENT"),
    packages: Packages,
    menu_section_options: -1,
    cart: Cart,
    package: undefined,
    show_form: false,
    show_errors : false,
    timeslots: TimeSlots,
    errors: [],
    show_paypal: false,
    results_error_msg : "",
    show_menu_section : true,
    debug : false,
  },
  mounted: function(e) {
    // if triggered payment
    if (this.uri) {

      // simulates - e.target.options.selectedIndex = 5;
      let fake_e = {
        target : {
          options : {
            selectedIndex : 5
          }
        }
      };

       this.menu_section_options = 5;
       this.vMenuSelection(fake_e);
    }
  },
  computed: {
    c_paypal_item_name: function () {
      return "Chapel In The Pines Payment Order #" + this.cart.order_num;
    },
    c_paypal_custom: function ()  {
      return "http://www.chapelinthepines.com/r.php?o=" + this.cart.order_num;
    }
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
     }

   },
   vCustomAmount : function (e) {

     var payment = 0;
     var label = "";

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
   vUpdateExtras : function (e) {
     if (e.target.checked) {
       this.cart.AddExtras(e.target.attributes["data-label"].value, e.target.value);
     } else {
       this.cart.RemoveExtras(e.target.attributes["data-label"].value, e.target.value);
     }

   },
   vUpdateBricks : function (e) {
     // controls when to show bricks - option 3 included plus option 1 as an extra
     if (e.target.checked) {
       this.package.show_bricks = true;
       this.cart.AddExtras(e.target.attributes["data-label"].value, e.target.value);
     } else {
       this.cart.RemoveExtras(e.target.attributes["data-label"].value, e.target.value);
       this.cart.UpdateBrickRows("", false);
       this.package.show_bricks = false;
       this.cart.entries.brick_1 = "";
       this.cart.entries.brick_2 = "";
       this.cart.entries.brick_3 = "";
     }
   },
   vUpdateBrickRows : function (e) {
     var tmp = "Brick Info:<br> - Row 1: "+this.cart.entries.brick_1+"<br> - Row 2: " + this.cart.entries.brick_2 + "<br> - Row 3: " + this.cart.entries.brick_3;
     this.cart.UpdateBrickRows(tmp, true);
   },
   vSubmit : function (e) {
     // validate form
     this.errors = [];

     // check mandatory fields
     if (this.cart.entries.tier == "" && this.cart.selection != 5) {
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

     if (!document.getElementById("acknowledge").checked) {
        this.errors.push("You must agree to the terms before proceeding.");
     }

     if (this.cart.entries.bumper.toUpperCase() != "SPRINGFIELD") {
       this.errors.push("The anti-spam answer is incorrect, please try again.");
     }

     if (this.cart.entries.groom_email != "") {
        if (!this._vValidateEmail(this.cart.entries.groom_email)) {
          this.errors.push("The groom email you entered is not a valid email.");
        }
     }

     if (this.cart.entries.bride_email != "") {
       if (!this._vValidateEmail(this.cart.entries.bride_email)) {
         this.errors.push("The bride email you entered is not a valid email.");
       }
     }

     // must have a payment and check for custom amount if selected as-if
     if (document.getElementById("custom_or_full_amt_rdr").checked && this.cart.payment <= 0) {
       this.errors.push("You selected full or custom payment but did not fill-in the amount.");
     } else if (this.cart.payment <= 0) {
       this.errors.push("You must select a payment.");
     }

     // validate brick
     if (this.package.show_bricks) {
       var maxlength = 14;
       // option 3 includes bricks, but its not madatory if they want to fill it in.
       // option 1 and at least 1 needs to be filled in.
       if (this.cart.selection != 3 && this.cart.entries.brick_1.length == 0 && this.cart.entries.brick_2.length == 0 && this.cart.entries.brick_3.length == 0) {
         this.errors.push("You have selected Buy A Brick, but did not enter any custom line(s).");
       }

       if (this.cart.entries.brick_1.length > maxlength) {
         this.errors.push("Brick Row #1 is greater than " + maxlength + " in character.");
       }

       if (this.cart.entries.brick_2.length > maxlength) {
         this.errors.push("Brick Row #2 is greater than " + maxlength + " in character.");
       }

       if (this.cart.entries.brick_3.length > maxlength) {
         this.errors.push("Brick Row #3 is greater than " + maxlength + " in character.");
       }

     }

     // if no errors, process!
     if (! this.errors.length) {
       this.show_form = false;
       this.show_menu_section = false;
       this.show_paypal = true;

       if (!this.debug) {
         axios.post('process.php', {
              cart: this.cart,
          })
          .then(function (r) {
             if (r.data.success) {
               // success goes here.

             } else {
               this.results_error_msg = "There was an error processing your payment/reservation.  Please contact us.";
             }
          })
          .catch(function (error) {
               this.results_error_msg = "Form error.  Please contact us to process your payment/reservation.  Error Code: 1001";
          });
       }

     }
   },

   // private
   _vValidateEmail : function (email) {
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
       return true;
     } else {
       return false;
     }
   },



 },

});
