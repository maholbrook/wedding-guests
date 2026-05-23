'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await supabase.from('guests').insert([
      { full_name: fullName, email: email, phone: phone, address: address }
    ])
    if (!error) setSubmitted(true)
    else alert('Something went wrong, please try again!')
  }

  if (submitted) return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-pink-500 mb-4">Thank you! 💕</h1>
        <p className="text-gray-500">Your info has been received!</p>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-pink-500 mb-2">
          You're Invited! 💍
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Please share your contact info so we can stay in touch!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Your Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          <input type="text" placeholder="Mailing Address" value={address} onChange={e => setAddress(e.target.value)} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          <button type="submit" className="bg-pink-500 text-white rounded-lg p-3 font-semibold hover:bg-pink-600 transition">
            Submit
          </button>
        </form>
      </div>
    </main>
  )
}