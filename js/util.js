const http = require('http')

// $1 = domain
// $2 = port
// $3 = path
const urlRegex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})((?::\d+)?)(.*)/

// Send a POST and return a Promise resolving the response
exports.asyncPost = (url, body) => new Promise((resolve, _) => {
    // TODO Send secure requests
    let matches = url.match(urlRegex)
    let host = matches[1]
    let port = matches[2]
    port = port.length > 1 ? port.substr(1) : '443'
    let path = matches[3]
    let req = http.request({
        agent: false,
        headers: {
            'Content-Type': 'application/json'
        },
        hostname: host,
        method: 'POST',
        path: path,
        port: port
    }, (res) => {
        res.on('end', () => {
            resolve(res)
        })
    })

    req.write(body)
    req.end()
})

exports.recipesEqual = (r1, r2) => {
    if (r1.title != r2.title) return false
    // TODO Check ingredients
    //else if (r1.ingredients != r2.ingredients) return false
}

exports.SearchOptions = function() {
    this.searchDirections = true
    this.searchIngredients = true
    this.searchTitle = true
}

exports.Recipe = function(title, ingredients, directions) {
    this.title = title
    this.ingredients = ingredients
    this.directions = directions
}

exports.Ingredient = function(name, amount, unit, preparation='', note='') {
    this.name = name
    this.amount = amount
    this.unit = unit
    this.preparation = preparation
    this.note = note
}
