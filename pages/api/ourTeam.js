// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../lib/db')
const escape = require('sql-template-strings')

export default  async (req, res) => {
  const ourTeam = await db.query(escape`
    select * from our_team
  `)

  // res.statusCode = 200
  res.json({ ourTeam: ourTeam})
}
