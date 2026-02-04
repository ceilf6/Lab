function Father(prop) {
    this.prop = prop;
}

function Child(prop, extProp) {
    Father.call(this, prop)
    this.extProp = extProp
}