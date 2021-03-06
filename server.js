const express = require('express')
const next = require('next')
// const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
    const server = express()

    server.get('/topic/:tag', (req, res) => {

        const actualPage = '/topic'
        const queryParams = { tag: req.params.tag } 
        app.render(req, res, actualPage, queryParams)
    })

    server.get('/topic/:tag/page/:page_no', (req, res) => {
        const actualPage = '/topic'
        const queryParams = { tag: req.params.tag, page_no: req.params.page_no } 
        app.render(req, res, actualPage, queryParams)
    })

    server.get('/latest-leaves/page/:page_no', (req, res) => {
        const actualPage = '/latest-leaves'
        const queryParams = { page_no: req.params.page_no } 
        app.render(req, res, actualPage, queryParams)
    })

    server.get('/leaves/:id', (req, res) => {
        const actualPage = '/leaves'
        const queryParams = { id: req.params.id } 
        app.render(req, res, actualPage, queryParams)
    })

    server.get('/bundle/:idsString', (req, res) => {
        const actualPage = '/bundle'
        const queryParams = { ids: req.params.idsString } 
        app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})
.catch((ex) => {
console.error(ex.stack)
process.exit(1)
})