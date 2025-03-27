console.log("user file is running....")
const name = 'new'
const age = '12'

const fun = (data) => {
    console.log("from fun of user.js")
    console.log("data is ",data)
}

module.exports = {
    name,age,fun
}