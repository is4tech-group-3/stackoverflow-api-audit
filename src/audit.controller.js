import Audit from './audit.model.js'

export const createAudit = async (req, res) => {
  try {
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
    const { startDate, endDate, limit = 10, page = 1, sortOrder = 'desc', entity, httpMethod } = req.query
    const limitNumber = parseInt(limit)
    const pageNumber = parseInt(page)
    const skips = limitNumber * (pageNumber - 1)

    const query = {}

    if (startDate && endDate) {
      query.date_operation = {
        $gte: new Date(startDate),
        $lt: new Date(endDate)
      }
    } else if (startDate) {
      query.date_operation = {
        $gte: new Date(startDate)
      }
    } else if (endDate) {
      query.date_operation = {
        $lt: new Date(endDate)
      }
    }

    if (entity) {
      query.entity = entity
    }

    if (httpMethod) {
      query.http_method = httpMethod
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
