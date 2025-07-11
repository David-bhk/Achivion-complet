export default async function (app) {
    app.get('/protected', { preValidation: [app.authenticate] }, async (request, reply) => {
      // You can access decoded JWT payload via request.user
      return { message: `Hello ${request.user.name}, you accessed a protected route!` }
    })
  }
  