// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../../lib/db')
const escape = require('sql-template-strings')

export default  async (req, res) => {

  let id = req.query.id
  const intouch = await db.query(escape`
    select * from intouch_slider where idintouchslider = ${id}
  `)

  // res.statusCode = 200
  res.json({ intouch: intouch})
}
