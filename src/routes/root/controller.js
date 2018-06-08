const App = (ctx, next) => {
  ctx.body = { app: 'app' }
  return (next ? next() : ctx)
}

const Bpp = (ctx, next) => {
  ctx.body = { ...ctx.body, bpp: 'bpp' }
  return (next ? next() : ctx)
}

export default { App, Bpp }
