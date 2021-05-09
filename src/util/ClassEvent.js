export class ClassEvent {
    constructor(){
        this._events = {};
    }

    on(name, fn) {
        if (!this._events[name]) this._events[name] = new Array();

        this._events[name].push(fn);
    }

    trigger() {
        let args = [...arguments];
        //shift exibe e remove item da lista na seq
        let eventName = args.shift();
        args.push(new Event(eventName));

        if (this._events[eventName] instanceof Array) {
            this._events[eventName].forEach(fn => {
                //apply executa um código
                fn.apply(null, args, {
                    type: eventName,
                    timeStamp: new Date().getTime()
                });
            });
        }
    }

}