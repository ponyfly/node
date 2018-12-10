const fnSignin = async (ctx) => {
  const { username, password } = ctx.request.body
  if (username === 'koa' && password === '123') {
    ctx.response.body = {
      errCode: 0,
      errMessage: `welcome back ${username}`,
    }
  } else {
    ctx.response.body = {
      errCode: -1,
      errMessage: '登陆失败',
    }
  }
}

const movieShareDetail = (ctx) => {
  const { id } = ctx.request.body
  ctx.set({ 'Access-Control-Allow-Origin': '*' })
  console.log(id)
  ctx.response.body = {
    detail: {
      movie: {
        url: 'https://weappstatic1.j.cn/video/joke/180530/0204/b01b02fc636a11e8.mp4',
      },
      moviePic: 'https://weappstatic1.j.cn/img/joke/180527/0353/69b04f14611e11e8.jpg?imageslim',
    },
  }
}

module.exports = {
  'POST /signin': fnSignin,
  'POST /api/movieShareDetail': movieShareDetail,
}
