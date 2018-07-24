class EventEmitter {
  constructor() {
    this.events = {};
  }

  emit(eventName) {
    var event = this.events[eventName];
    var args = [];
    if (arguments.length > 1) {
      args = Array.from(arguments).slice(1);
    }
    if (event) {
      event.forEach(fn => {
        fn.apply(null, args);
      });
    }
  }

  subscribe(eventName, fn) {
    if(!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] =
        this.events[eventName].filter(eventFn => fn !== eventFn);
    }
  }
}