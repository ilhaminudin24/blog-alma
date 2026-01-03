import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'hh368yw9',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

const run = async () => {
    try {
        console.log('Patching category...')
        const patch = client.patch('uhI195ZWWSrEU1zA37Si43').set({ icon: 'sun' })
        const result = await patch.commit()
        console.log('Update successful:', result)
    } catch (err) {
        console.error('Update failed:', err)
    }
}

run()
