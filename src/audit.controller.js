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
    const audits = await Audit.find()
    return res.status(200).json(audits)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
