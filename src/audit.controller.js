import Audit from './audit.model.js'

export const createAudit = async (req, res) => {
  try {
    console.log(req.body)
    const audit = new Audit(req.body)
    await audit.save()
    return res.status(201).json(audit)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

export const getAudits = async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    console.log(startDate, endDate)
    if (startDate && endDate) {
      const audits = await Audit.find({
        date_operation: {
          $gte: new Date(startDate),
          $lt: new Date(endDate)
        }
      })
      return res.status(200).json(audits)
    }
    if (startDate) {
      const audits = await Audit.find({
        date_operation: {
          $gte: new Date(startDate)
        }
      })
      return res.status(200).json(audits)
    }
    if (endDate) {
      const audits = await Audit.find({
        date_operation: {
          $lt: new Date(endDate)
        }
      })
      return res.status(200).json(audits)
    }
    const audits = await Audit.find()
    return res.status(200).json(audits)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
