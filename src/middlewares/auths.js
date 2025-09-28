const adminAuth = (req, res, next) => {
    const token = "abc"
    if (token === 'abc') {
        console.log('autharized user')
        next()
    } else {
        res.status(401).send('unautharized user')
    }
}

module.exports = { adminAuth }