export async function isSuperuser(request, reply) {
  if (request.user.role !== 'SUPERUSER') {
    return reply.code(403).send({ error: 'Forbidden: superuser only' })
  }
}

export async function isAdmin(request, reply) {
  // Admins or Superusers allowed
  if (request.user.role !== 'ADMIN' && request.user.role !== 'SUPERUSER') {
    return reply.code(403).send({ error: 'Forbidden: admin only' })
  }
}

// Add this helper if you haven’t already
export async function isAdminOrSuperuser(request, reply) {
  const role = request.user.role
  if (role !== 'ADMIN' && role !== 'SUPERUSER') {
    return reply.code(403).send({ error: 'Forbidden: insufficient privileges' })
  }
}
