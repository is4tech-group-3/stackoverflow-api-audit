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
    const { startDate, endDate, limit = 10, page = 1, sortOrder = 'asc' } = req.query
    const limitNumber = parseInt(limit)
    const pageNumber = parseInt(page)
    const skips = limitNumber * (pageNumber - 1)

    let query = {}

    if (startDate && endDate) {
      query = {
        date_operation: {
          $gte: new Date(startDate),
          $lt: new Date(endDate)
        }
      }
    }

    if (startDate) {
      query = {
        date_operation: {
          $gte: new Date(startDate)
        }
      }
    }

    if (endDate) {
      query = {
        date_operation: {
          $lt: new Date(endDate)
        }
      }
    }

    const sort = { date_operation: sortOrder }

    const audits = await Audit.find(query).skip(skips).limit(limitNumber).sort(sort)

    const totalAudits = await Audit.countDocuments(query)
    const totalPages = Math.ceil(totalAudits / limitNumber)

    return res.status(200).json({
      audits,
      pagination: {
        totalAudits,
        totalPages,
        currentPage: pageNumber
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
