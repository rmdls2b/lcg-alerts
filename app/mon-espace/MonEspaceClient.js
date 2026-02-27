"use client"
import { useState, useEffect } from "react"

const BOT_USERNAME = "walleRt_guard_bot"

export default function MonEspaceClient() {
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [instructions, setInstructions] = useState("")
  const [instructionsSaved, setInstructionsSaved] = useState(false)
  const [recurringAlerts, setRecurringAlerts] = useState(false)
  const [pseudonym, setPseudonym] = useState("")
  const [pseudonymSaved, setPseudonymSaved] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmDeleteAddr, setConfirmDeleteAddr] = useState(null)
  const [confirmDeleteChannel, setConfirmDeleteChannel] = useState(null)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [newAddr, setNewAddr] = useState({ address: "", label: "" })
  const [addingAddr, setAddingAddr] = useState(false)
  const [showAddEmail, setShowAddEmail] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [newEmailLabel, setNewEmailLabel] = useState("")
  const [showAddTelegram, setShowAddTelegram] = useState(false)
  const [newTelegramLabel, setNewTelegramLabel] = useState("")
  const [copied, setCopied] = useState(null)

  useEffect(function() {
    const stored = localStorage.getItem("lcg_user")
    if (!stored) { window.location.href = "/login"; return }
    const u = JSON.parse(stored)
    setUser(u)
    loadData(u.userId)
  }, [])

  async function loadData(userId) {
    const res = await fetch("/api/mon-espace?userId=" + userId)
    if (res.ok) {
      const json = await res.json()
      setData(json)
      setInstructions(json.user ? json.user.instructions : "")
      setRecurringAlerts(json.user ? json.user.recurringAlerts : false)
      setPseudonym(json.user ? json.user.pseudonym || "" : "")
    }
    setLoading(false)
  }

  async function saveInstructions() {
    await fetch("/api/user/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId, instructions }) })
    setInstructionsSaved(true)
    setTimeout(function() { setInstructionsSaved(false) }, 2000)
  }

  async function savePseudonym() {
    await fetch("/api/user/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId, pseudonym }) })
    setPseudonymSaved(true)
    setTimeout(function() { setPseudonymSaved(false) }, 2000)
  }

  async function addEmailChannel() {
    if (!newEmail) return
    await fetch("/api/channels", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId, type: "email", value: newEmail, label: newEmailLabel }) })
    setNewEmail("")
    setNewEmailLabel("")
    setShowAddEmail(false)
    loadData(user.userId)
  }

  async function addTelegramChannel() {
    const res = await fetch("/api/channels", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId, type: "telegram", value: "", label: newTelegramLabel }) })
    if (res.ok) {
      const json = await res.json()
      const link = "https://t.me/" + BOT_USERNAME + "?start=" + json.channel.id
      navigator.clipboard.writeText(link)
      setCopied(json.channel.id)
      setTimeout(function() { setCopied(null) }, 3000)
    }
    setNewTelegramLabel("")
    setShowAddTelegram(false)
    loadData(user.userId)
  }

  async function toggleChannel(id, active) {
    await fetch("/api/channels", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, isActive: active }) })
    loadData(user.userId)
  }

  async function removeChannel(id) {
    await fetch("/api/channels?id=" + id, { method: "DELETE" })
    setConfirmDeleteChannel(null)
    loadData(user.userId)
  }

  async function toggleRecurring() {
    const newVal = !recurringAlerts
    setRecurringAlerts(newVal)
    await fetch("/api/user/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId, recurringAlerts: newVal }) })
  }

  async function toggleAddress(id) {
    await fetch("/api/addresses/toggle", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    loadData(user.userId)
  }

  async function deleteAddress(id) {
    await fetch("/api/addresses?id=" + id, { method: "DELETE" })
    setConfirmDeleteAddr(null)
    loadData(user.userId)
  }

  async function addAddress(e) {
    e.preventDefault()
    setAddingAddr(true)
    const res = await fetch("/api/addresses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId, address: newAddr.address, label: newAddr.label }) })
    if (res.ok) { setNewAddr({ address: "", label: "" }); setShowAddAddress(false); loadData(user.userId) }
    setAddingAddr(false)
  }

  async function deleteAccount() {
    await fetch("/api/delete-account", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId }) })
    localStorage.removeItem("lcg_user")
    window.location.href = "/"
  }

  function logout() {
    localStorage.removeItem("lcg_user")
    window.location.href = "/login"
  }

  function copyTelegramLink(channelId) {
    const link = "https://t.me/" + BOT_USERNAME + "?start=" + channelId
    navigator.clipboard.writeText(link)
    setCopied(channelId)
    setTimeout(function() { setCopied(null) }, 3000)
  }

  if (loading) return <p className="text-center mt-10 text-gray-500">Chargement...</p>
  if (!user || !data) return null

  return (
    <div className="max-w-[700px] mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-lg font-bold text-white">Gestion des alertes</h1>
        <button onClick={logout} className="px-4 py-2 text-xs text-gray-500 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors">Deconnexion</button>
      </div>

      {/* Wallets surveilles */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-4">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Wallets surveilles</p>
        {data.addresses.length === 0 && <p className="text-gray-600 text-sm mb-3">Aucun wallet surveille.</p>}
        {data.addresses.map(function(addr) {
          return (
            <div key={addr.id} className="flex items-center gap-3 py-3 border-b border-gray-800/50 last:border-0">
              <span className={addr.isActive ? "text-[#00d4aa] text-sm" : "text-gray-600 text-sm"}>{addr.isActive ? "●" : "○"}</span>
              <div className="flex-1 min-w-0">
                <span className="font-mono text-xs text-gray-300">{addr.address.slice(0, 14)}...{addr.address.slice(-8)}</span>
                {addr.label && <span className="text-gray-600 text-xs ml-2">({addr.label})</span>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={function() { toggleAddress(addr.id) }} className={"px-3 py-1 text-xs rounded-lg border transition-colors " + (addr.isActive ? "border-yellow-500/30 text-yellow-500 hover:border-yellow-500/50" : "border-[#00d4aa]/30 text-[#00d4aa] hover:border-[#00d4aa]/50")}>
                  {addr.isActive ? "Desactiver" : "Activer"}
                </button>
                {confirmDeleteAddr === addr.id ? (
                  <div className="flex gap-1">
                    <button onClick={function() { deleteAddress(addr.id) }} className="px-3 py-1 text-xs rounded-lg bg-red-500 text-white">Confirmer</button>
                    <button onClick={function() { setConfirmDeleteAddr(null) }} className="px-3 py-1 text-xs rounded-lg border border-gray-800 text-gray-400">Annuler</button>
                  </div>
                ) : (
                  <button onClick={function() { setConfirmDeleteAddr(addr.id) }} className="px-3 py-1 text-xs rounded-lg border border-red-500/30 text-red-400 hover:border-red-500/50 transition-colors">Supprimer</button>
                )}
              </div>
            </div>
          )
        })}
        {!showAddAddress ? (
          <button onClick={function() { setShowAddAddress(true) }} className="mt-4 px-4 py-2 text-sm border border-[#00d4aa] text-[#00d4aa] rounded-lg hover:bg-[#00d4aa]/5 transition-colors">+ Ajouter un wallet</button>
        ) : (
          <form onSubmit={addAddress} className="mt-4 pt-4 border-t border-gray-800">
            <input type="text" required value={newAddr.address} onChange={function(e) { setNewAddr({ ...newAddr, address: e.target.value }) }} placeholder="0x..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 font-mono mb-2" />
            <input type="text" value={newAddr.label} onChange={function(e) { setNewAddr({ ...newAddr, label: e.target.value }) }} placeholder="Nom du wallet (optionnel)" className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 mb-3" />
            <div className="flex gap-2">
              <button type="submit" disabled={addingAddr} className="px-4 py-2 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors disabled:opacity-50">{addingAddr ? "Ajout..." : "Ajouter"}</button>
              <button type="button" onClick={function() { setShowAddAddress(false) }} className="px-4 py-2 text-sm border border-gray-800 text-gray-400 rounded-lg hover:border-gray-600 transition-colors">Annuler</button>
            </div>
          </form>
        )}
      </div>

      {/* Canaux d alerte */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-4">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">{"Canaux d'alerte"}</p>
        <div className="flex items-center gap-2 py-3 border-b border-gray-800/50">
          <span className="text-sm">📧</span>
          <span className="text-sm text-gray-300 flex-1">{user.email} (principal)</span>
          <span className="text-xs text-[#00d4aa]">● Toujours actif</span>
        </div>
        {data.channels.map(function(ch) {
          const icon = ch.type === "email" ? "📧" : "💬"
          const displayValue = ch.type === "email" ? ch.value : (ch.value ? "Telegram" : "Telegram (en attente)")
          return (
            <div key={ch.id} className="flex items-center gap-2 py-3 border-b border-gray-800/50 last:border-0">
              <span className="text-sm">{icon}</span>
              <span className={"text-sm flex-1 " + (ch.isActive ? "text-gray-300" : "text-gray-600")}>
                {displayValue}
                {ch.label && <span className="text-gray-500 ml-1">— {ch.label}</span>}
              </span>
              {ch.type === "telegram" && !ch.value && (
                <button onClick={function() { copyTelegramLink(ch.id) }} className="px-2 py-1 text-xs rounded-lg border border-blue-500/30 text-blue-400 hover:border-blue-500/50 transition-colors">
                  {copied === ch.id ? "Lien copie !" : "Copier le lien"}
                </button>
              )}
              <button onClick={function() { toggleChannel(ch.id, !ch.isActive) }} className={"px-3 py-1 text-xs rounded-lg border transition-colors " + (ch.isActive ? "border-yellow-500/30 text-yellow-500 hover:border-yellow-500/50" : "border-[#00d4aa]/30 text-[#00d4aa] hover:border-[#00d4aa]/50")}>
                {ch.isActive ? "Desactiver" : "Activer"}
              </button>
              {confirmDeleteChannel === ch.id ? (
                <div className="flex gap-1">
                  <button onClick={function() { removeChannel(ch.id) }} className="px-3 py-1 text-xs rounded-lg bg-red-500 text-white">Confirmer</button>
                  <button onClick={function() { setConfirmDeleteChannel(null) }} className="px-3 py-1 text-xs rounded-lg border border-gray-800 text-gray-400">Annuler</button>
                </div>
              ) : (
                <button onClick={function() { setConfirmDeleteChannel(ch.id) }} className="px-3 py-1 text-xs rounded-lg border border-red-500/30 text-red-400 hover:border-red-500/50 transition-colors">Supprimer</button>
              )}
            </div>
          )
        })}

        {/* Toggle rappels */}
        <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-3">
          <button onClick={toggleRecurring} className={"w-10 h-[22px] rounded-full border-none cursor-pointer relative transition-colors " + (recurringAlerts ? "bg-[#00d4aa]" : "bg-gray-700")}>
            <span className={"absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white transition-all " + (recurringAlerts ? "left-5" : "left-[2px]")}></span>
          </button>
          <div>
            <span className="text-sm text-gray-300">Rappels recurrents</span>
            <p className="text-xs text-gray-600 mt-0.5">{"Renvoie l'alerte toutes les 5 min jusqu'a confirmation d'un destinataire"}</p>
          </div>
        </div>

        {/* Ajout canaux */}
        {showAddEmail ? (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex gap-2 mb-2">
              <input type="email" required placeholder="Email..." value={newEmail} onChange={function(e) { setNewEmail(e.target.value) }} className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600" />
              <input type="text" placeholder="Label (optionnel)" value={newEmailLabel} onChange={function(e) { setNewEmailLabel(e.target.value) }} className="max-w-[160px] px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600" />
            </div>
            <div className="flex gap-2">
              <button onClick={addEmailChannel} className="px-4 py-2 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors">Ajouter</button>
              <button onClick={function() { setShowAddEmail(false); setNewEmail(""); setNewEmailLabel("") }} className="px-4 py-2 text-sm border border-gray-800 text-gray-400 rounded-lg hover:border-gray-600 transition-colors">Annuler</button>
            </div>
          </div>
        ) : showAddTelegram ? (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <input type="text" placeholder="Label (ex: frere, avocat, groupe famille...)" value={newTelegramLabel} onChange={function(e) { setNewTelegramLabel(e.target.value) }} className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 mb-3" />
            <div className="flex gap-2">
              <button onClick={addTelegramChannel} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors">Creer et copier le lien</button>
              <button onClick={function() { setShowAddTelegram(false); setNewTelegramLabel("") }} className="px-4 py-2 text-sm border border-gray-800 text-gray-400 rounded-lg hover:border-gray-600 transition-colors">Annuler</button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 mt-4">
            <button onClick={function() { setShowAddEmail(true) }} className="px-4 py-2 text-sm border border-[#00d4aa] text-[#00d4aa] rounded-lg hover:bg-[#00d4aa]/5 transition-colors">+ Email</button>
            <button onClick={function() { setShowAddTelegram(true) }} className="px-4 py-2 text-sm border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/5 transition-colors">+ Telegram</button>
          </div>
        )}
      </div>

      {/* Nom d identification */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-4">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">{"Nom d'identification"}</p>
        <p className="text-gray-500 text-sm mb-3">{"Ce nom apparaitra dans les alertes envoyees a vos contacts pour qu'ils sachent de qui il s'agit."}</p>
        <input type="text" value={pseudonym} onChange={function(e) { setPseudonym(e.target.value) }} placeholder="Ex: Rem, Papa, etc." className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 mb-3" />
        <button onClick={savePseudonym} className="px-4 py-2 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors">
          {pseudonymSaved ? "Sauvegarde !" : "Sauvegarder"}
        </button>
      </div>

      {/* Instructions d urgence */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-4">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">{"Instructions d'urgence"}</p>
        <textarea rows={4} value={instructions} onChange={function(e) { setInstructions(e.target.value) }} placeholder="Ex: Appeler le 06... Contacter la police..." className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-600 resize-y" />
        <button onClick={saveInstructions} className="mt-3 px-4 py-2 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors">
          {instructionsSaved ? "Sauvegarde !" : "Sauvegarder"}
        </button>
      </div>

      {/* Tester l alerte */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-4">
        <p className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Tester mon alerte</p>
        <p className="text-gray-500 text-sm mb-4">{"Envoyez une fausse alerte pour verifier que vos contacts recoivent bien les notifications."}</p>
        <button onClick={async function() { await fetch("/api/test-alert", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.userId }) }); alert("Alerte test envoyee !") }} className="px-4 py-2 text-sm border border-yellow-500/30 text-yellow-500 rounded-lg hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-colors">
          Envoyer une alerte test
        </button>
      </div>

      {/* Supprimer le compte */}
      <div className="mt-8 pt-8 border-t border-gray-800">
        {!confirmDelete ? (
          <button onClick={function() { setConfirmDelete(true) }} className="px-5 py-2.5 text-sm border border-red-500/30 text-red-400 rounded-lg hover:border-red-500/50 hover:bg-red-500/5 transition-colors">Supprimer mon compte</button>
        ) : (
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
            <p className="text-red-300 text-sm mb-4">{"Etes-vous sur ? Cette action est irreversible."}</p>
            <div className="flex gap-2">
              <button onClick={deleteAccount} className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold text-sm">Oui, supprimer</button>
              <button onClick={function() { setConfirmDelete(false) }} className="px-4 py-2 text-sm border border-gray-800 text-gray-400 rounded-lg hover:border-gray-600 transition-colors">Annuler</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
