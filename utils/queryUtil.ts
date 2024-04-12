import { Op } from "sequelize";
import { DatapointsOverTime, QueryFilters } from "../interfaces/types";
import { NA } from "../constants";

export function buildMatchObject(query: QueryFilters): any {
  const matchObject: any = {};
  if (query.yearStart) {
    matchObject.year = {
      [Op.gte]: Number(query.yearStart),
    };
  }
  if (query.yearEnd) {
    matchObject.year = {
      ...matchObject.year,
      [Op.lte]: Number(query.yearEnd),
    };
  }
  // if (query.authorIds && query.authorIds.length > 0) {
  //   matchObject.authors = {
  //     [Op.in]: query.authorIds,
  //   };
  // }
  if (query.venueIds && query.venueIds.length > 0) {
    matchObject.venueId = {
      [Op.in]: query.venueIds,
    };
  }
  if (query.openAccess) {
    matchObject.openAccess = query.openAccess === "true";
  }
  if (query.typesOfPaper && query.typesOfPaper.length > 0) {
    matchObject.typeOfPaper = {
      [Op.in]: query.typesOfPaper,
    };
  }
  if (query.fieldsOfStudy && query.fieldsOfStudy.length > 0) {
    matchObject.fieldsOfStudy = {
      [Op.contains]: query.fieldsOfStudy,
    };
  }
  if (query.publishers && query.publishers.length > 0) {
    matchObject.publisher = {
      [Op.in]: query.publishers,
    };
  }
  if (query.citationsMin) {
    matchObject.citationcount = {
      ...matchObject.citationcount,
      [Op.gte]: Number(query.citationsMin),
    };
  }
  if (query.citationsMax) {
    matchObject.citationcount = {
      ...matchObject.citationcount,
      [Op.lte]: Number(query.citationsMax),
    };
  }
  return matchObject;
}

export function buildSortObject(sortField: string, sortDirection: string) {
  if (!sortField || !sortDirection) {
    return {
      offset: 0,
    };
  } else {
    let order: any;
    if (sortDirection === "asc") {
      order = [sortField, "ASC"];
    } else {
      order = [sortField, "DESC"];
    }
    return {
      order,
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

export function fixYearData(
  data: DatapointsOverTime,
  filterYearStart: string | undefined,
  filterYearEnd: string | undefined
) {
  // fill missing years with 0s and remove years that are incorrect in the data
  const min = 1936;
  const max = 2022;
  const start =
    filterYearStart && Number(filterYearStart) >= min
      ? Number(filterYearStart)
      : min;
  const end =
    filterYearEnd && Number(filterYearEnd) <= max ? Number(filterYearEnd) : max;
  const entries = end - start;

  let naValue = 0;
  let offset = 0;
  for (const i in data.years) {
    const year: any = data.years[i];
    if (!year || year < min) {
      offset += 1;
      naValue += data.counts[i];
    } else {
      break;
    }
  }
  data.years.splice(0, offset);
  data.counts.splice(0, offset);

  for (let i = 0; i <= entries; i++) {
    const year = start + i;
    if (data.years[i] !== year) {
      data.years.splice(i, 0, year);
      data.counts.splice(i, 0, 0);
    }
  }
  if (offset > 0) {
    data.years.splice(0, 0, NA);
    data.counts.splice(0, 0, naValue);
  }
  return data;
}
