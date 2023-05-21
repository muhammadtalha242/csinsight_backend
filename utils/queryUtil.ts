import { Op } from 'sequelize';
import { QueryFilters } from '../interfaces/types';


export function buildMatchObject(query: QueryFilters): any {
    const matchObject: any = {};
    if (query.yearStart) {
        matchObject.yearPublished = {
            [Op.gte]: parseInt(query.yearStart),
        };
    }
    if (query.yearEnd) {
        matchObject.yearPublished = {
            ...matchObject.yearPublished,
            [Op.lte]: parseInt(query.yearEnd),
        };
    }
    if (query.authorIds) {
        matchObject.authorIds = {
            [Op.contains]: JSON.parse(query.authorIds),
        };
    }
    if (query.venueIds) {
        matchObject.venueId = {
            [Op.in]: JSON.parse(query.venueIds),
        };
    }
    if (query.openAccess) {
        matchObject.openAccess = query.openAccess === 'true';
    }
    if (query.typesOfPaper) {
        matchObject.typeOfPaper = {
            [Op.in]: JSON.parse(query.typesOfPaper),
        };
    }
    if (query.fieldsOfStudy) {
        matchObject.fieldsOfStudy = {
            [Op.contains]: JSON.parse(query.fieldsOfStudy),
        };
    }
    if (query.publishers) {
        matchObject.publisher = {
            [Op.in]: JSON.parse(query.publishers),
        };
    }
    if (query.citationsMin) {
        matchObject.inCitationsCounts = {
            ...matchObject.inCitationsCounts,
            [Op.gte]: parseInt(query.citationsMin),
        };
    }
    if (query.citationsMax) {

        matchObject.inCitationsCounts = {
            ...matchObject.inCitationsCounts,
            [Op.lte]: parseInt(query.citationsMax),
        };
    }
    return matchObject;
}

export function buildSortObject(sortField: string, sortDirection: string) {
    if (!sortField || !sortDirection) {
        return {
            offset: 0
        };
    } else {
        let order: any;
        if (sortDirection === 'asc') {
            order = [[sortField, 'ASC']];
        } else {
            order = [[sortField, 'DESC']];
        }
        return {
            order
        };
    }
}

export function quartilePosition(rowCount: number, multiplier: number): number {
    if (multiplier === 1.0) {
      return rowCount - 1;
    }
    if (multiplier === 0.0) {
      return 0;
    }
    const rounded = Math.round(rowCount * multiplier);
    if (rounded >= rowCount) {
      return rowCount - 1;
    } else {
      return rounded;
    }
  }