export function isSuperuser(request, reply, done) {
    if (request.user.role !== 'SUPERUSER') {
      return reply.code(403).send({ error: 'Forbidden: superuser only' })
    }
    done()
  }
  
  export function isAdmin(request, reply, done) {
    // Admins or Superusers allowed
    if (request.user.role !== 'ADMIN' && request.user.role !== 'SUPERUSER') {
      return reply.code(403).send({ error: 'Forbidden: admin only' })
    }
    done()
  }
  