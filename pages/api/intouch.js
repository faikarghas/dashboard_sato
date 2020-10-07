// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../lib/db')
const escape = require('sql-template-strings')

export default  async (req, res) => {
  const intouch = await db.query(escape`
    select * from intouch
  `)

  const intouch_slider = await db.query(escape`
    select * from intouch_slider
  `)

  // res.statusCode = 200
  res.json({ intouch: intouch,intouch_slider:intouch_slider})
}
