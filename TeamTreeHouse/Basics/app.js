// new vue instance with a constructor called vue and the instance is saved to a variable helloWorld
// the vue instance takes in an object, and the object takes in some properties
const helloWorld = new Vue ({
    el: '#helloVue', //short for element that you tell vue what html element to attach the vue instance to
    data: {
        title: "Hello, world!", // data-binding
        message: "This is a my message."
    }
});

// now 2 instances of vue.  each components has its own scope - Vue.js components
const example = new Vue ({
    el: '#example', //short for element that you tell vue what html element to attach the vue instance to
    data: {
        title: "Hello", // data-binding
        message: "This is message..",
        name: "Chewie",
        img : { //v-bind
            src: "https://vuejs.org/images/logo.png",
            alt: "alt description ehre",
            width: "100"
        }
    }
});

// vue directives
