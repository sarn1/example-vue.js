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
  order_num: "11555511",
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
    this.entries.tier = label;
    this._RemoveFromCart("TIER");
    this._AddToCart("Tier: " + label, value, "TIER");
  },
  AddPayment: function (label, value) {
    this._RemoveFromCart("PAYMENT");

    if (label == "") {
      this._AddToCart("Payment: Custom or Full Amount: $" + value, 0, "PAYMENT");
    } else {
      this._AddToCart("Payment: " + label, 0, "PAYMENT");
    }

    this.payment = value;
  },
  AddExtras: function (label, value) {
    this._AddToCart("Extra: " + label + " ($" + value + ")", value, "EXTRA-"+label.toUpperCase());
  },
  RemoveExtras: function (label, value) {
    this._RemoveFromCart("EXTRA-"+label.toUpperCase());
  },
  UpdateBrickRows : function (label, isChecked) {
    this._RemoveFromCart("BRICK_INFO");

    if (isChecked && label != "") {
      this._AddToCart(label, 0, "BRICK_INFO");
    }

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


let Package1 = {
    url : "/elopement-small-wedding/",
    summary: "Arrive 15 minutes before ceremony start time. Bridal dressing room is not available in this package. Includes chapel, gazebo, grounds, officiant services and gazebo chairs. A guest is considered anyone, regardless of age, including the bridal party, who attends the wedding that is not a vendor, such as a photographer.",
    tier : [
      {
        label: "0-2 Guests",
        options: [
          {
            label: "Friday-Sunday",
            cost: 350
          },
          {
            label: "Monday-Thursday",
            cost: 250
          }
        ]
      },
      {
        label: "3-12 Guests",
        options: [
          {
            label: "Friday-Sunday",
            cost: 500
          },
          {
            label: "Monday-Thursday",
            cost: 400
          }
        ]
      },
      {
        label: "13-25 Guests",
        options: [
          {
            label: "Friday-Sunday",
            cost: 700
          },
          {
            label: "Monday-Thursday",
            cost: 550
          }
        ]
      },
    ],
    extras : [
      {
        label: "Ceremony Music - Elopement or Small Private Wedding only",
        cost: 75
      },
      {
        label: "Bridal Cottage - Bride only can change on premises, available 30 minutes before ceremony.",
        cost: 75
      },
      {
        label: "Aisle Runner In Chapel",
        cost: 40
      },
      {
        label: "Personalized Brick",
        cost: 75
      },
      {
        label: "Candelabras In Chapel",
        cost: 40
      }
    ],
    payments: {
      summary: "For other deposit amount agreed upon, remaining balance, or payment towards package. Please note in comments box.  Remaining balance due 30 days before wedding.",
      options: [
        {
          label: "Pay package deposit of $500",
          amount: 500
        }
      ]
    },
    terms: true,
    terms_pdf: false,
    show_bricks: false
}

let Package2 = {
    url : "/wedding-ceremony-only/",
    summary: "<em><strong>Gold Package</strong></em> includes Includes chapel, gazebo, grounds, bridal dressing room, officiant services, ceremony music, gazebo chairs, wedding ceremony staff, rehearsal time, and personalized brick to be placed within the path leading to the chapel.  <em><strong>Silver Package</strong><em> includes chapel, gazebo, grounds, bridal dressing room, officiant services, ceremony music, and gazebo chairs. <br><br>Wedding ceremonies are performed from 9:00 a.m. to 8:00 p.m. , every day of the year, including holidays.",
    tier : [
      {
        label: "Full Wedding Ceremony Gold Package",
        options: [
          {
            label: "Friday-Sunday",
            cost: 1200
          },
          {
            label: "Monday-Thursday",
            cost: 900
          }
        ]
      },
      {
        label: "Full Wedding Ceremony Silver Package",
        options: [
          {
            label: "Friday-Sunday",
            cost: 1000
          },
          {
            label: "Monday-Thursday",
            cost: 700
          }
        ]
      },
    ],
    extras : [
      {
        label: "Aisle Runner In Chapel",
        cost: 40
      },
      {
        label: "Candelabras In Chapel",
        cost: 40
      }
    ],
    payments: {
      summary: "If fee is less than $500, the full amount of the package is due at time of reservation.  Remaining balance due 30 days before wedding.",
      options: [
        {
          label: "Pay package deposit of $500",
          amount: 500
        }
      ]
    },
    terms: true,
    terms_pdf: false,
    show_bricks: false
}

let Package3 = {
    url : "/wedding-ceremony-and-reception/",
    summary: "<em><strong>Pearl Wedding Package</strong><em><p><em>Wedding</em>: Grounds & Gardens, White Chapel, Garden Gazebo, Professional Wedding Officiant (you may bring your own officiant), Rehearsal (guaranteed the night before), Ceremony Music (indoor and outdoor), White Gazebo Chairs, Personalized Wedding Brick in Bridal Path, Bridal Cottage Dressing Room, Wedding Ceremony Coordinators, Final Cleanup, and use of the grounds for Engagement Pictures.</p><p><em>Reception</em>: Venue Setup and Cleanup, Table Linens (white or black), Chair Covers (white or black) & Sashes (many colors), Table Runners, Skirted Tables, Permanent Bridal Party Stage, Stage Up-Lighting, Head Table Spot Lighting, Twin 39” Monitors, Media Projector, Large Permanent Dance Floor, Cake Display Counter, Intimate Lighting Enhancements, Fire Pit, Reception Coordinators, Wedding and Reception Planning, All Buildings Climate Controlled, Paved Lighted Parking, In-house Catering, Quality Disposable Utensils, and Final Cleanup.</p><p>Basic open bar package, and a meal with three entrées and two sides for the first 50 guests.</p>",
    tier : [
      {
        label: "In Season",
        options: [
          {
            label: "Sunday",
            cost: 8900
          },
          {
            label: "Friday & Sunday",
            cost: 7400
          },
          {
            label: "Monday-Thursday",
            cost: 5700
          }
        ]
      },
      {
        label: "Off Season (November 15th thru April 15th)",
        options: [
          {
            label: "Sunday",
            cost: 7400
          },
          {
            label: "Friday & Sunday",
            cost: 6400
          },
          {
            label: "Monday-Thursday",
            cost: 5700
          }
        ]
      },
    ],
    extras : [
      {
        label: "Aisle Runner In Chapel",
        cost: 40
      },
      {
        label: "Photobooth",
        cost: 750
      },
      {
        label: "Candelabras In Chapel",
        cost: 40
      },
      {
        label: "Personalized Brick (included)",
        cost: 0
      }
    ],
    payments: {
      summary: "For other deposit amount agreed upon, remaining balance, or payment towards package. Please note in comments box.",
      options: [
        {
          label: "Pay package deposit amount of $1,500 when more than one year from wedding date.",
          amount: 1500
        },
        {
          label: "Pay package deposit amount of $3,000 when more than six months and nine months from wedding date.",
          amount: 3000
        },
        {
          label: "Pay package deposit amount of $4,500 when more then three months and six months from wedding date.",
          amount: 4500
        }
      ]
    },
    terms: true,
    terms_pdf: true,
    show_bricks: true
}

let Package4 = {
    url : "/wedding-hall-only/",
    summary: "<p><em>Reception</em>: Venue Setup and Cleanup, Table Linens (white or black), Chair Covers (white or black) & Sashes (many colors), Table Runners, Skirted Tables, Permanent Bridal Party Stage, Stage Up-Lighting, Head Table Spot Lighting, Twin 39” Monitors, Media Projector, Large Permanent Dance Floor, Cake Display Counter, Intimate Lighting Enhancements, Fire Pit, Reception Coordinators, Wedding and Reception Planning, All Buildings Climate Controlled, Paved Lighted Parking, In-house Catering, Quality Disposable Utensils, and Final Cleanup.</p><p>Basic open bar package, and a meal with three entrées and two sides for the first 50 guests.</p><p>If a Monday through Thursday wedding is on a holiday, pricing is the same as Sunday. If a Sunday wedding is on Memorial Day or Labor Day weekend, pricing is the same as a Saturday.</p>",
    tier : [
      {
        label: "In Season",
        options: [
          {
            label: "Sunday",
            cost: 8500
          },
          {
            label: "Friday & Sunday",
            cost: 7000
          },
          {
            label: "Monday-Thursday",
            cost: 5300
          }
        ]
      },
      {
        label: "Off Season (November 15th thru April 15th)",
        options: [
          {
            label: "Sunday",
            cost: 7000
          },
          {
            label: "Friday & Sunday",
            cost: 6000
          },
          {
            label: "Monday-Thursday",
            cost: 5300
          }
        ]
      },
    ],
    extras : [
      {
        label: "Personalized Brick",
        cost: 75
      },
      {
        label: "Photobooth",
        cost: 750
      },
    ],
    payments: {
      summary: "For other deposit amount agreed upon, remaining balance, or payment towards package. Please note in comments box.",
      options: [
        {
          label: "Pay package deposit amount of $1,500 when more than one year from wedding date.",
          amount: 1500
        },
        {
          label: "Pay package deposit amount of $3,000 when more than six months and nine months from wedding date.",
          amount: 3000
        },
        {
          label: "Pay package deposit amount of $4,500 when more then three months and six months from wedding date.",
          amount: 4500
        }
      ]
    },
    terms: true,
    terms_pdf: true,
    show_bricks: false
}

let Package5 = {
    url : "/#",
    summary: "",
    tier : [],
    extras : [],
    payments: {
      summary: "For other deposit amount agreed upon, remaining balance, or payment towards package. Please note in comments box.",
      options: []
    },
    terms: false,
    terms_pdf: false,
    show_bricks: false
}



const Packages = [
  {
    id: 1,
    menu_label: "OPTION 1: Elopements / Small Private Wedding (Up to 25 Guests)",
    obj: Package1
  },
  {
    id: 2,
    menu_label: "OPTION 2: Wedding Ceremony Only, (Up to 150 Guests)",
    obj: Package2
  },
  {
    id: 3,
    menu_label: "OPTION 3: Pearl Wedding Ceremony & Reception Package (Up to 150 Guests)",
    obj: Package3
  },
  {
    id: 4,
    menu_label: "OPTION 4: Ruby Wedding Reception Only (Up to 150 Guests)",
    obj: Package4
  },
  {
    id: 5,
    menu_label: "OPTION 5: Make A Payment",
    obj: Package5
  }
];

const TimeSlots = ["9:15AM","9:30AM","9:45AM","10:00AM","10:15AM","10:30AM","10:45AM","11:00AM","11:15AM","11:30AM","11:45AM","12:00PM","12:15PM","12:30PM","12:45PM","1:00PM","1:15PM","1:30PM","1:45PM","2:00PM","2:15PM","2:30PM","2:45PM","3:00PM","3:15PM","3:30PM","3:45PM","4:00PM","4:15PM","4:30PM","4:45PM","5:00PM","5:15PM","5:30PM","5:45PM","6:00PM","6:15PM","6:30PM","6:45PM","7:00PM","7:15PM","7:30PM","7:45PM","8:00PM"];
