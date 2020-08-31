// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../lib/db')
const escape = require('sql-template-strings')

export default  async (req, res) => {
  const testimonials = await db.query(escape`
    select * from testimonials
  `)

  // res.statusCode = 200
  res.json({ testimonials: testimonials})
}
