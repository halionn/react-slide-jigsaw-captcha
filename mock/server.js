const Koa = require('koa')
const route = require('koa-route')
const koaBody = require('koa-body')
const app = new Koa()


const jigsaw = require('./jigsaw.js')

// 获取验证码图片
const jigsawImagesHandler = ctx => {
    ctx.response.body = jigsaw.generateJigsaw()
}

// 验证拼图坐标
const validateHandler = (ctx) => {
    let id = ctx.request.body.id
    let distance = ctx.request.body.distance
    //console.log(id, distance)
    ctx.response.body = jigsaw.validate(id, distance)
}


app.use(koaBody())
app.use(route.get('/api/jigsaw/get', jigsawImagesHandler))
app.use(route.post('/api/jigsaw/validate', validateHandler))
app.listen(3000)

