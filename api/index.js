import express from 'express'
import 'dotenv/config'
import Ably from 'ably'
import { createClient } from '@supabase/supabase-js'

const app = express()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

const client = new Ably.Realtime(process.env.ABLY_ADMIN_KEY)
const leaderboard = client.channels.get('leaderboard')

app.get("/", (req, res) => res.send("RankMaster Leaderboard Updater"));

supabase
  .channel('public:leaderboard')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'leaderboard' }, async (payload) => {
    try {
      await leaderboard.publish('admin', JSON.stringify(payload));
      console.log('Published update to Ably:', payload);
    } catch (error) {
      console.error('Error publishing to Ably:', error);
    }
  })
  .subscribe()

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})

export default app