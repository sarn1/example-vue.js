new Vue ({
    el: '#book', //short for element that you tell vue what html element to attach the vue instance to
    data: {
        title: "This is the title", // data-binding
        author: "This is message..",
        summary: "Chewie",
        showDetail: false,
        },
    methods: {
        sayHello: function() {
            alert(this.title)
        },
        toggleDetails : function() {
            this.showDetail = !this.showDetail;
        }
    }
});

const colorsArr = ["red","blue","black","green"];
new Vue ({
    el: '#colors', //short for element that you tell vue what html element to attach the vue instance to
    data: {
        colors: colorsArr
    },
});

