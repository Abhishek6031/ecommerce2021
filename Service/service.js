const db = require('../db')
const format = require('pg-format')


exports.gettemplateSchedue = async () => {
  const query = {
    text:
      'select * from "templateShedules" '
  }

  const res = await db.query(query)

  return res.rows
}

exports.templateShedules = async (value) => {
  const sql = format(
    `INSERT INTO public."templateShedules"
    (date,"employeeId","name","workingType","start","end","storeId","storeName") 
    VALUES %L`,
    value
  )

  const res = await db.query(sql)
  if (res && res.rowCount) {
    return res
  }
  return []
}

exports.Reimbursements = async (value) => {
 
    const sql = `
    INSERT INTO "Reimbursements" (type,"dateFrom","dateTo",purpose,mode,km,"invNo",amt,"hotelName")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`
    const query = {
      text: sql,
      values: [
        value.type, 
        value.dateFrom, 
        value.dateTo, 
        value.purpose,
        value.mode,
        value.km,
        value.invNo,
        value.amt,
        value.hotelName
      ]
    }
  
    const res = await db.query(query)
    if (res && res.rowCount) {
      return true
    } else {
      return false
    }
  
}

exports.retriveAll = async () => {
  const query = {
    text:
      'select * from "Reimbursements" order by "createdAt" desc '
  }

  const res = await db.query(query)

  return res.rows
}

exports.retriveOneEntry = async () => {
  const query = {
    text:
      'select * from "Reimbursements" order by "createdAt" desc limit 1'
  }

  const res = await db.query(query)

  return res.rows
}