export type DatapointsOverTime = {
  years: (number | string | null)[];
  counts: number[];
};

export type PagedParameters = {
  page: string;
  pageSize: string;
  sortField: string;
  sortDirection: string;
};

export interface Pattern {
  column?: string;
  pattern?: string;
}

export type Metric = { metric: string };

export type TopKParameters = { k: string } & Metric;
export type AuthorFilter = {
  _id: string;
  fullname: string;
};

export type VenueFilter = {
  _id: string;
  names: string;
};
export type ModelId = { modelId: string };
export type Filter = {
  yearStart: string;
  yearEnd: string;
  citationsMin: string;
  citationsMax: string;
  authors: AuthorFilter[];
  venues: VenueFilter[];
  accessType: string | null;
  typesOfPaper: string[];
  fieldsOfStudy: string[];
  publishers: string[];
  metric: string;
};

export interface QueryFilters {
  yearStart?: string;
  yearEnd?: string;
  authorIds?: string[];
  venueIds?: string[];
  openAccess?: string;
  typesOfPaper?: string;
  fieldsOfStudy?: string;
  publishers?: string;
  citationsMin?: string;
  citationsMax?: string;
}
export interface FindAndCountOptions {
  where: {};
  order: any[];
  offset: number;
  limit: number;
}
// export interface FilterMongo {
//   yearPublished?: {
//     $gte?: number;
//     $lte?: number;
//   };
//   authorIds?: { $in: mongoose.Types.ObjectId[] };
//   venueId?: { $in: mongoose.Types.ObjectId[] } | { $ne: null };
//   openAccess?: boolean;
//   typeOfPaper?: { $in: string[] } | { $ne: null };
//   fieldsOfStudy?: { $in: string[] };
//   publisher?: { $in: string[] } | { $ne: null };
//   inCitationsCount?: {
//     $gte?: number;
//     $lte?: number;
//   };
// }

export interface IAuthor {
  authorid: string;
  externalids: any;
  url: string;
  name: string;
  aliases: any;
  affiliations: string[];
  homepage: any;
  papercount: number;
  citationcount: number;
  hindex: number;
  updated: string;
}

export interface IExternalids {
  ACL: any;
  DBLP: any;
  ArXiv: any;
  MAG: string;
  CorpusId: string;
  PubMed: any;
  DOI: any;
  PubMedCentral: any;
}

export interface IAuthorPaper {
  authorId: string;
  name: string;
}

export interface IJournal {
  name: string;
  pages: any;
  volume: string;
}

export interface IPaper {
  corpusid: number;
  externalids: IExternalids;
  url: string;
  title: string;
  authors: IAuthorPaper[];
  venue: string;
  publicationvenueid: any;
  year: number;
  referencecount: number;
  citationcount: number;
  influentialcitationcount: number;
  isopenaccess: boolean;
  s2fieldsofstudy: any;
  publicationtypes: any;
  publicationdate: string;
  journal: IJournal;
  updated: string;
}
