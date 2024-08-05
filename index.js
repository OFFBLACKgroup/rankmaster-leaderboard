import express from 'express'
import 'dotenv/config'
import Ably from 'ably'
import { createClient } from 'jsr:@supabase/supabase-js@2'


const express = require('express')
const app = express()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

const ably = new Ably.Realtime(process.env.ABLY_ADMIN_KEY)
const leaderboard = ably.channels.get('leaderboard')

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
  console.log(`Example app listening on port ${port}`)
})
