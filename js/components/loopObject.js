const loopObject = (object = {}, func) => {
    for (key in object) {
    	func(key, object[key]);
    }
}

module.exports = loopObject;