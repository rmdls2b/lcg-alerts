import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const users = await prisma.user.findMany({
    include: {
      addresses: {
        include: { alerts: { orderBy: { createdAt: 'desc' }, take: 10 } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
  const totalAlerts = await prisma.alert.count()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Utilisateurs</div>
          <div className="text-2xl font-bold text-[#00d4aa]">{users.length}</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Adresses surveillees</div>
          <div className="text-2xl font-bold text-[#00d4aa]">{users.reduce((a, u) => a + u.addresses.length, 0)}</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Alertes envoyees</div>
          <div className="text-2xl font-bold text-[#00d4aa]">{totalAlerts}</div>
        </div>
      </div>
      {users.map(user => (
        <div key={user.id} className="mb-6 bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">{user.pseudonym}</h2>
            <span className="text-gray-500 text-sm">{user.email}</span>
          </div>
          {user.addresses.map(addr => (
            <div key={addr.id} className="ml-4 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#00d4aa]">*</span>
                <span className="font-mono text-sm">{addr.address.slice(0, 10)}...{addr.address.slice(-8)}</span>
                {addr.label && <span className="text-gray-500">({addr.label})</span>}
              </div>
              {addr.alerts.length > 0 ? (
                <div className="ml-6 space-y-1">
                  {addr.alerts.map(alert => (
                    <div key={alert.id} className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="text-red-400">!</span>
                      <span>{alert.amount} {alert.asset}</span>
                      <span>vers {alert.toAddr.slice(0, 8)}...</span>
                      <a href={'https://etherscan.io/tx/' + alert.txHash} target="_blank" className="text-[#00d4aa] hover:underline">tx</a>
                      <span className="text-gray-600">{new Date(alert.createdAt).toLocaleString('fr-FR')}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="ml-6 text-sm text-gray-600">Aucune alerte</p>
              )}
            </div>
          ))}
        </div>
      ))}
      {users.length === 0 && <p className="text-gray-500 text-center mt-10">Aucun utilisateur inscrit</p>}
    </div>
  )
}
