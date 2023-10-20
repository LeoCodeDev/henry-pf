import { Request, Response } from "express";
const { Report } = require('../../db_connection')

const newReport = async (req: Request, res: Response) => {
  try {
    const {reason, reportedId, reporterId, type} = req.body

    interface Object {[key: string]: string}

    const typeOfReport: Object = {}

    switch (type) {
        case "User":
            typeOfReport.reportedIdUser = reportedId
            break;
        case "Product":
            typeOfReport.reportedIdProduct = reportedId
            break;
        case "Comment":
            typeOfReport.reportedIdComment = reportedId
            break;
        default:
            break;
    }

    const createdReport = await Report.create({
    reason,
    typeOfReport,
    reportType: type
    });

    switch (type) {
        case "User":
            await createdReport.setReportedUser(reportedId)
            break;
        case "Product":
            await createdReport.setReportedProduct(reportedId)
            break;
        case "Comment":
            await createdReport.setReportedComment(reportedId)
            break;
        default:
            break;
    }
    
    await createdReport.setReporterUser(reporterId)

    return res.status(200).json(createdReport);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = newReport;