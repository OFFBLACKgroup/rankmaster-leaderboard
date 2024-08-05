import express from 'express'
import 'dotenv/config'


const express = require('express')
const app = express()

  // const subscription = supabase
  //   .channel('public:leaderboard')
  //   .on('postgres_changes', { event: '*', schema: 'public', table: 'leaderboard' }, (payload) => {
  //     session.push(JSON.stringify(payload))
  //   })
  //   .subscribe();

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})
