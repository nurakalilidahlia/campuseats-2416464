import { collection, doc, onSnapshot, writeBatch, query, where } from 'firebase/firestore'
import { db } from '../firebase.js'

export function subscribeToVendors(onData, onError) {
  return onSnapshot(
    collection(db, 'vendors'),
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError,
  )
}

export function subscribeToVendor(vendorId, onData, onError) {
  return onSnapshot(
    doc(db, 'vendors', vendorId),
    (snap) => onData(snap.exists() ? { id: snap.id, ...snap.data() } : null),
    onError,
  )
}

// We keep this for the initial load (no filter)
export function subscribeToMenu(vendorId, onData, onError) {
  return onSnapshot(
    collection(db, 'vendors', vendorId, 'menu'),
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, vendorId, ...d.data() }))),
    onError,
  )
}

// NEW: The Firestore Query for your Digit 4 feature
export function subscribeToMenuFiltered(vendorId, maxSpice, onData, onError) {
  const menuRef = collection(db, 'vendors', vendorId, 'menu')
  // CHANGED to 'spiceLevel' here:
  const q = query(menuRef, where('spiceLevel', '<=', maxSpice))
  
  return onSnapshot(
    q,
    (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, vendorId, ...d.data() }))),
    onError,
  )
}

export async function seedDemoData(vendors) {
  const batch = writeBatch(db)
  for (const { menu, id, ...vendor } of vendors) {
    batch.set(doc(db, 'vendors', id), vendor)
    for (const { id: itemId, ...item } of menu) {
      batch.set(doc(db, 'vendors', id, 'menu', itemId), item)
    }
  }
  await batch.commit()
}