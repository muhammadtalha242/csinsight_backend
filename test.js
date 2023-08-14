const fs = require('fs');
const readline = require('readline');

// // Specify the path to your JSONL file
const filePathPapersAuthor = '/Users/abbasm1/Documents/Study/semester1/DS-Seminar/cs-insight-poc-ts/result.json';
const filePathPapers = '/Users/abbasm1/samples/papers/papers-sample.jsonl';
const filePathAuthors = '/Users/abbasm1/Documents/Study/semester1/DS-Seminar/cs-insight-poc-ts/jsonResultAuthor.json';
const models = require('./db/models');
const { paper: paperModel, authorTable: authorModel, PaperAuthor } = models;
// console.log("Models: ", PaperAuthor);

// // Create a readline interface
// const rlAuthor = readline.createInterface({
//   input: fs.createReadStream(filePathAuthors),
//   crlfDelay: Infinity
// });

// // Create a readline interface
// const rlPaper = readline.createInterface({
//   input: fs.createReadStream(filePathPapers),
//   crlfDelay: Infinity
// });

// const authors = [];
// const papers = [];
// const PaperAuthor = [];
// // Read the JSONL file line by line
// // rlAuthor.on('line', async (line) => {
// //   try {
// //     // Parse each line as JSON
// //     const jsonObject = JSON.parse(line);
// //     authors.push(jsonObject)
// //     // await Author.create({...jsonObject})

// //   } catch (error) {
// //     console.error('Error parsing Author JSON:', error);
// //     rlAuthor.close()
// //   }
// // });

// // // Read the JSONL file line by line
// // rlPaper.on('line', async (line) => {
// //   try {
// //     // Parse each line as JSON
// //     const jsonObject = JSON.parse(line);
// //     papers.push(jsonObject)
// //     // await Paper.create({...jsonObject})
// //     PaperAuthor.push({ authorId: authors[index].authorid, paperId: paper.corpusid })

// //   } catch (error) {
// //     console.error('Error parsing Paper JSON:', error);
// //     rlPaper.close()
// //   }
// // });
// // //  papers.forEach((paper, index)=>{
// // //   authors[index].authorid = paper.authors[0].authorId || authors[index].authorid
// // //   PaperAuthor.push({authorId: authors[index].authorid, paperId: paper.corpusid})
// // //  })

// main=async()=>{
// const test = await readFile (filePathPapers)
// console.log("test", test);
// }
// main()

const papers = [
  { "corpusid": 224735017, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "952784131", "CorpusId": "224735017", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/97abd35eb7d004e70a58652f2fa762620ad0ea73", "title": "当“商业模式”嫁接“职业规划”", "authors": [{ "authorId": "82841146", "name": "杨吉" }], "venue": "", "publicationvenueid": null, "year": 2012, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "96-96", "volume": "" }, "updated": "2022-01-27T01:47:09.787Z" }
  , { "corpusid": 116229089, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2737512523", "CorpusId": "116229089", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/de7a1175ba90872b74b965711352eff79300b351", "title": "The Accuracy Comparison of Oscilloscope and Voltmeter Utilizated in Getting Dielectric Constant Values", "authors": [{ "authorId": "73567229", "name": "B. E. Cahyono" }, { "authorId": "2093449508", "name": "M. Misto" }, { "authorId": "2101498512", "name": "Rofiatun Rofiatun" }], "venue": "", "publicationvenueid": null, "year": 2017, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Education", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": null, "publicationdate": "2017-07-25", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-01-27T03:09:05.837Z" }
  , { "corpusid": 148420979, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2347481954", "CorpusId": "148420979", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/cffe003276e6a6679b2a218c254e605441dc5eab", "title": "Current situation and influencing factors of low motor constitution among primary and secondary school students,Guangzhou", "authors": [{ "authorId": "82323325", "name": "Xiong Li-hu" }], "venue": "", "publicationvenueid": null, "year": 2015, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Education", "source": "s2-fos-model" }, { "category": "Psychology", "source": "external" }], "publicationtypes": ["Review"], "publicationdate": null, "journal": { "name": "South China Journal of Preventive Medicine", "pages": null, "volume": "" }, "updated": "2022-01-27T03:38:56.309Z" }
  , { "corpusid": 201728798, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": null, "CorpusId": "201728798", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/c176776f557a82f81c5aca038ec8561cd3e9674d", "title": "Primary Extracranial Meningioma of Middle Ear", "authors": [{ "authorId": "2057580993", "name": "W. Chien" }, { "authorId": "48327127", "name": "J. Saleh" }], "venue": "", "publicationvenueid": null, "year": 2016, "referencecount": 5, "citationcount": 1, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-01-27T03:42:35.349Z" }
  , { "corpusid": 211943053, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2981503095", "CorpusId": "211943053", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/fd9e9771c7ba3b13195c21fd5029e852039db936", "title": "REVISÃO BIBLIOGRÁFICA DE ESTUDOS REFERENTES A EFICÁCIA DOS MEDICAMENTOS GENÉRICOS E DE REFERÊNCIA UTILIZADOS NO TRATAMENTO ODONTOLÓGICO", "authors": [{ "authorId": "2101071480", "name": "Victor Zanetti Drumond" }, { "authorId": "1387824282", "name": "F. L. Silva" }, { "authorId": "2056425339", "name": "Marcelo de Souza Fragoso Sant’Ana" }, { "authorId": "1663562389", "name": "Marcelo Souza de Moraes Filho" }, { "authorId": "2067585798", "name": "Michel Campos Ribeiro" }], "venue": "", "publicationvenueid": null, "year": 2019, "referencecount": 23, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2019-09-26", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-01-27T05:15:10.436Z" }
  , { "corpusid": 187981005, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2907851085", "CorpusId": "187981005", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/459af85694c113514a2f3f2f934480edb4a830b3", "title": "Rodas de conversa com agentes comunitários de saúde: uma vivência terapêutica a partir da extensão universitária", "authors": [{ "authorId": "148215366", "name": "Taíza Queiroz Lima" }, { "authorId": "80903791", "name": "K. Nunes" }, { "authorId": "143624532", "name": "Manoel Junior" }, { "authorId": "146292856", "name": "Bárbara Faria Pereira" }], "venue": "", "publicationvenueid": null, "year": 2018, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2018-12-18", "journal": { "name": "", "pages": "135-139", "volume": "7" }, "updated": "2022-01-23T02:58:57.599Z" }
  , { "corpusid": 222982347, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "430554515", "CorpusId": "222982347", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/79715d133cfa6d9f0a2a0b1417cf6174786f9439", "title": "ショーペンハウアーにおける「意志」と身体の同一性について", "authors": [{ "authorId": "1998355317", "name": "西山 友子" }], "venue": "", "publicationvenueid": null, "year": 2011, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2011-11-01", "journal": { "name": "", "pages": "98-110", "volume": "" }, "updated": "2022-01-23T03:35:09.564Z" }
  , { "corpusid": 173617068, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "158226012", "CorpusId": "173617068", "PubMed": null, "DOI": "10.14863/GEOSOCABST.2006.0_59_1", "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/c1e6a1c6d51662ae641cb7e6935b4bbeaf7b0d67", "title": "O-31 鹿児島県北薩地域に分布する後期新生代の湖成層に関する層位学的研究(4.地域地質・地域層序,口頭およびポスター発表,一般講演)", "authors": [{ "authorId": "135385315", "name": "内村 公大" }, { "authorId": "88409143", "name": "大木 公彦" }, { "authorId": "91244816", "name": "古澤 明" }], "venue": "", "publicationvenueid": null, "year": 2006, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2006-09-08", "journal": { "name": "", "pages": "59", "volume": "113" }, "updated": "2022-01-23T04:32:04.112Z" }
  , { "corpusid": 178772006, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1559297061", "CorpusId": "178772006", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/e15329154de4b99e6c023bfdb116350e888cc621", "title": "BREVIARIO: JORNADAS DE ORIENTACIÓN VOCACIONAL EN CUAUTITLÁN", "authors": [{ "authorId": "92484094", "name": "F. Cuautitlán" }], "venue": "", "publicationvenueid": null, "year": 2002, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2002-07-18", "journal": { "name": "", "pages": "6", "volume": "" }, "updated": "2022-01-23T03:56:03.739Z" }
  , { "corpusid": 175930642, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "438084002", "CorpusId": "175930642", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/de34dd8e0f5e9c89f5e561626e4d0bbb4c871e02", "title": "ものづくり力と人財活性化 (特集 研究開発戦略--創り出す力)", "authors": [{ "authorId": "117958316", "name": "倉元 信行" }, { "authorId": "91231589", "name": "谷口 人文" }], "venue": "", "publicationvenueid": null, "year": 2009, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2009-02-01", "journal": { "name": "", "pages": "68-72", "volume": "56" }, "updated": "2022-01-24T18:09:40.008Z" }
  , { "corpusid": 200179912, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2928612913", "CorpusId": "200179912", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/726ffc5e2fb0c8f2749a02b998d4f1680055283c", "title": "이미지 안정화 디지털 이미지화", "authors": [{ "authorId": "2077746459", "name": "마르코 에로매키" }], "venue": "", "publicationvenueid": null, "year": 2006, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2006-10-20", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-01-24T17:38:20.758Z" }
  , { "corpusid": 189500280, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2906856303", "CorpusId": "189500280", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/aa2ed453ea356ed7553d2a62ef1103985751ee7d", "title": "Objeto Malasartes e a mudança de foco no perfil de professor de Artes Visuais", "authors": [{ "authorId": "147719127", "name": "Neusa Loreni Vinhas" }], "venue": "", "publicationvenueid": null, "year": 2013, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2013-07-01", "journal": { "name": "", "pages": "70-79", "volume": "" }, "updated": "2022-01-24T18:37:59.596Z" }
  , { "corpusid": 211583590, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2772322532", "CorpusId": "211583590", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/356f7554bff1819c28c25ca36e92a802eb980c05", "title": "Library Letters, April 2009 (newsletter)", "authors": [{ "authorId": "81394933", "name": "Washington." }], "venue": "", "publicationvenueid": null, "year": 2008, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Education", "source": "s2-fos-model" }, { "category": "Physics", "source": "s2-fos-model" }, { "category": "History", "source": "external" }], "publicationtypes": null, "publicationdate": "2008-04-01", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-01-27T06:12:12.841Z" }
  , { "corpusid": 172114748, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2907460577", "CorpusId": "172114748", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/12666ce2b75a5a3d25ea4abf982ec079c708462e", "title": "La poesía de Vicente Gaos", "authors": [{ "authorId": "133634179", "name": "Amelia Vercher Moreno" }], "venue": "", "publicationvenueid": null, "year": 1996, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-01-27T06:42:40.901Z" }
  , { "corpusid": 231547257, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": null, "CorpusId": "231547257", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/79fc99dae1ed4ba907477243efc76882e30ea54f", "title": "NON-OZONE DEPLETING CO-SOLVENT COMPOSITIONS", "authors": [], "venue": "", "publicationvenueid": null, "year": 2017, "referencecount": 6, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-01-27T08:04:41.250Z" }
  , { "corpusid": 245767741, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "3211988432", "CorpusId": "245767741", "PubMed": null, "DOI": "10.14361/9783839443781-007", "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/3f0d4c2b9e77c827111ffe4e770914b24ed0a145", "title": "5 Vermittlungsgrundlagen von Radiokunst im musealen Kontext", "authors": [{ "authorId": "2128233357", "name": "Sarah Schönewald" }], "venue": "", "publicationvenueid": null, "year": 2021, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2021-03-18", "journal": { "name": "", "pages": "121-166", "volume": "" }, "updated": "2022-01-27T08:54:27.804Z" }
  , { "corpusid": 184221890, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2412247150", "CorpusId": "184221890", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/0c7250043d884585e4d1172830a4612655f0521b", "title": "Медикаментозное лечение при детском аутизме", "authors": [{ "authorId": "116102782", "name": "А Ф Шапошникова" }], "venue": "", "publicationvenueid": null, "year": 2008, "referencecount": 0, "citationcount": 1, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-01-27T09:13:32.768Z" }
  , { "corpusid": 100354367, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2393988211", "CorpusId": "100354367", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/1dc8c5fb9897e7da6316e81279f8f7899163c1a3", "title": "Effect of Bio-organic Fertilizer and Compound Microbial Inoculants on the Yield and Quality of Potato", "authors": [{ "authorId": "152367071", "name": "Liu Wei-don" }], "venue": "", "publicationvenueid": null, "year": 2013, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Agricultural And Food Sciences", "source": "s2-fos-model" }, { "category": "Chemistry", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-01-27T09:29:23.526Z" }
  , { "corpusid": 239463238, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": null, "CorpusId": "239463238", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/85740073088a21a7926d8673ba0fced4b80032bd", "title": "THE INFLUENCE OF BRAND TYPES ON THE CHOICE AND PRICE OF A T-SHIRT", "authors": [{ "authorId": "2076640673", "name": "M. A. Gouvêa" }, { "authorId": "2055134627", "name": "Luiz Alberto Marcondes Homen de Mello e Castro" }, { "authorId": "2068546985", "name": "Noel Alves Vicente" }], "venue": "", "publicationvenueid": null, "year": null, "referencecount": 44, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-01-27T12:35:37.978Z" }
  , { "corpusid": 223455905, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1254698047", "CorpusId": "223455905", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/069d8065d15f7097f59f3d805b6d9286f38893bb", "title": "未来手机三“芯”二意", "authors": [{ "authorId": "119670674", "name": "车库里" }], "venue": "", "publicationvenueid": null, "year": 2005, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "67-67", "volume": "" }, "updated": "2022-01-27T13:57:03.388Z" }
  , { "corpusid": 221003259, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "3015862603", "CorpusId": "221003259", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/0e97274579596d0d53d4d8cb7927b9875d839256", "title": "Una mezcla y un método para el control de insectos acrobasis nuxvorella en plantas de carya illinoiensis", "authors": [{ "authorId": "88432670", "name": "I. V. Arispuro" }, { "authorId": "34622645", "name": "M. A. M. Téllez" }, { "authorId": "1858696358", "name": "María Alba Guadalupe Corella" }], "venue": "", "publicationvenueid": null, "year": 2008, "referencecount": 1, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2008-11-03", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-01-27T13:44:35.169Z" }
  , { "corpusid": 207833264, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": null, "CorpusId": "207833264", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/d720d25ef7923ebd722e8cd07221bf20097743eb", "title": "The effects of too much choice and information in online dating website designs", "authors": [{ "authorId": "38713355", "name": "Sikke R. Jansma" }], "venue": "", "publicationvenueid": null, "year": 2017, "referencecount": 29, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-01-27T10:56:02.930Z" }
  , { "corpusid": 130487157, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2277008918", "CorpusId": "130487157", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/866e95c2ae64feedf2d4e48102f29813be94bf28", "title": "Člověk a vesmír : historie a současnost.", "authors": [{ "authorId": "2102406528", "name": "Mark Traa" }], "venue": "", "publicationvenueid": null, "year": 2006, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-01-27T11:12:35.905Z" }
  , { "corpusid": 229919433, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1146385696", "CorpusId": "229919433", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/bc51cedd93dd911379ec4326005dd71b8700001d", "title": "汽车是如何工作的？（六）——车身与底盘", "authors": [{ "authorId": "1521025403", "name": "克玛" }], "venue": "", "publicationvenueid": null, "year": 2005, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "97-103", "volume": "" }, "updated": "2022-01-27T13:50:48.790Z" }
  , { "corpusid": 229974473, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "3010645994", "CorpusId": "229974473", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/b8c6ab73c03d6fc16d89dc87df3aec05cb69dde4", "title": "ТИАЗИДНЫЕ ДИУРЕТИКИ: 50 ЛЕТ ИСТОРИИ ИЛИ ВЗГЛЯД В БУДУЩЕЕ", "authors": [{ "authorId": "145468176", "name": "Иван Владленович Фомин" }], "venue": "", "publicationvenueid": null, "year": 2010, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "9" }, "updated": "2022-01-27T20:49:45.362Z" }
  , { "corpusid": 232872676, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "3020881054", "CorpusId": "232872676", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/5bff8b1e5be633b5b54fade416d5b49f7b324a5a", "title": "Osebne vesti: in memoriam fanika žgank-križan", "authors": [{ "authorId": "2063382994", "name": "Jožica Tomšič" }], "venue": "", "publicationvenueid": null, "year": 2000, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2000-03-01", "journal": { "name": "", "pages": "89-89", "volume": "34" }, "updated": "2022-01-27T17:59:21.957Z" }
  , { "corpusid": 166795343, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "886426542", "CorpusId": "166795343", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/85b9b2897f2ca6da014376e3649685c95ea8e076", "title": "Czynniki wpływające na wybór form oszczędzania w celu zabezpieczenia emerytalnego (na przykładzie studentów wybranych łódzkich uczelni)", "authors": [{ "authorId": "2053929500", "name": "Petre Iltchev" }, { "authorId": "46177621", "name": "D. Cichońska" }], "venue": "", "publicationvenueid": null, "year": 2011, "referencecount": 4, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "5-7", "volume": "" }, "updated": "2022-01-27T17:52:46.384Z" }
  , { "corpusid": 209108941, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "815666602", "CorpusId": "209108941", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/b6e61ccd8b7c0545bcc7bd899f1a79427220df98", "title": "供体或（和）受体存在慢性乙肝病毒感染肾移植的安全性", "authors": [{ "authorId": "135815555", "name": "廖贵益" }, { "authorId": "2098677294", "name": "于德新" }, { "authorId": "73177914", "name": "方卫华" }, { "authorId": "135895762", "name": "施浩强" }, { "authorId": "82616154", "name": "江山" }, { "authorId": "90705244", "name": "唐亮" }, { "authorId": "2073611165", "name": "赵磊" }, { "authorId": "135987548", "name": "杜俊华" }], "venue": "", "publicationvenueid": null, "year": 2010, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Medicine", "source": "s2-fos-model" }, { "category": "Biology", "source": "s2-fos-model" }, { "category": "Medicine", "source": "external" }], "publicationtypes": ["Review"], "publicationdate": "2010-11-20", "journal": { "name": "", "pages": "1311-1312", "volume": "31" }, "updated": "2022-01-27T18:35:26.774Z" }
  , { "corpusid": 213338766, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2992574965", "CorpusId": "213338766", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/897efa32d1634f64cd8dbfca39faa571b6e322d4", "title": "تاثیر شناخت درمانی مبتنی بر ذهنآگاهی بر امیدواری، نگرشهای ناکارآمد و فرانگرانی در زنان نابارور", "authors": [{ "authorId": "135089960", "name": "سیما ابراهیمی" }, { "authorId": "116980932", "name": "محمد کاظم فخری" }, { "authorId": "114945349", "name": "رمضان حسنزاده" }], "venue": "", "publicationvenueid": null, "year": 2019, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Business", "source": "s2-fos-model" }, { "category": "Medicine", "source": "external" }], "publicationtypes": null, "publicationdate": "2019-09-23", "journal": { "name": "", "pages": "32-40", "volume": "7" }, "updated": "2022-01-27T19:36:14.411Z" }
  , { "corpusid": 113436696, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2497878638", "CorpusId": "113436696", "PubMed": null, "DOI": "10.1016/S1754-4548(09)70008-7", "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/39e285242c4db5f8135f1ec47c62271c1055de15", "title": "Insight: A newsworthy year", "authors": [{ "authorId": "2037991", "name": "S. Gold" }], "venue": "", "publicationvenueid": null, "year": 2009, "referencecount": 0, "citationcount": 2, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Computer Science", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": ["Review"], "publicationdate": null, "journal": { "name": "Infosecurity", "pages": "24-28", "volume": "6" }, "updated": "2022-02-01T07:01:39.836Z" }
  , { "corpusid": 126395704, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2783995196", "CorpusId": "126395704", "PubMed": null, "DOI": "10.1016/S0252-9602(18)30192-9", "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/13d9a0ec3460c33f9d314473bd7512887b2b4370", "title": "EIGENFUNCTIONS OF THE NONLINEAR ELLIPTIC EQUATION WITH CRITICAL EXPONENT IN R 2", "authors": [{ "authorId": "123610125", "name": "Daomin Gao" }, { "authorId": "2048590660", "name": "Zhengjie Zhang" }], "venue": "", "publicationvenueid": null, "year": 1993, "referencecount": 4, "citationcount": 2, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Mathematics", "source": "s2-fos-model" }, { "category": "Physics", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "Acta Mathematica Scientia", "pages": "74-88", "volume": "13" }, "updated": "2022-02-01T10:41:20.343Z" }
  , { "corpusid": 223624270, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "807396553", "CorpusId": "223624270", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/d7d61658cbb3cc786f274208f634deec9be2b4bd", "title": "Gr-π-凝聚环上f．g．分次半自反模的分次维数", "authors": [{ "authorId": "1998462236", "name": "黄留佳" }], "venue": "", "publicationvenueid": null, "year": 2004, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "51-54", "volume": "10" }, "updated": "2022-02-08T00:35:20.167Z" }
  , { "corpusid": 221209842, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": null, "CorpusId": "221209842", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/d5be1a02fa89099194494fcd43aaf44b33729c85", "title": "Unsheathing the Vibrational Dynamics of Swords", "authors": [{ "authorId": "11464021", "name": "K. Marut" }, { "authorId": "29848817", "name": "T. Michael" }], "venue": "", "publicationvenueid": null, "year": 2013, "referencecount": 3, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": ["Review"], "publicationdate": null, "journal": null, "updated": "2022-02-08T01:13:50.227Z" }
  , { "corpusid": 193484979, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "984776624", "CorpusId": "193484979", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/16559dd94e869372aa2410152c20647b1029bcb0", "title": "Perlindungan Konsumen terhadap Pengguna Produk Kartu", "authors": [{ "authorId": "147306377", "name": "lilik Nor Ferdiyanti" }], "venue": "", "publicationvenueid": null, "year": 2012, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2012-07-23", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-08T08:21:42.564Z" }
  , { "corpusid": 191307331, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1941672507", "CorpusId": "191307331", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/46977d27a371c6d1f3eccc293fa0e8554d869f9d", "title": "〈돌아오지 않는 해병〉스토리텔링의 이중적 구조에 대한 연구", "authors": [{ "authorId": "79962915", "name": "박지홍" }], "venue": "", "publicationvenueid": null, "year": 2013, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Art", "source": "s2-fos-model" }, { "category": "Art", "source": "external" }], "publicationtypes": null, "publicationdate": "2013-12-01", "journal": { "name": "", "pages": "207-230", "volume": "" }, "updated": "2022-02-08T09:06:53.109Z" }
  , { "corpusid": 190070331, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "233528308", "CorpusId": "190070331", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/81663c7190fe1f87933e7ca029750d4a97dd809d", "title": "Jack Butler : Fate Maps", "authors": [{ "authorId": "49296307", "name": "Jack Butler" }, { "authorId": "34895220", "name": "Elizabeth D. Harvey" }, { "authorId": "147814896", "name": "Patrick Mahon" }], "venue": "", "publicationvenueid": null, "year": 1998, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Art", "source": "s2-fos-model" }, { "category": "Art", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-02-08T09:35:00.158Z" }
  , { "corpusid": 199929648, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "248776391", "CorpusId": "199929648", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/c05a127f4a33bb938c594188c1df0da753c502d7", "title": "死者のはたらきと江戸時代 : 遺訓・家訓・辞世", "authors": [{ "authorId": "120760335", "name": "深谷 克己" }], "venue": "", "publicationvenueid": null, "year": 2014, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-02-08T05:28:02.326Z" }
  , { "corpusid": 190481913, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "107116014", "CorpusId": "190481913", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/36b9469c98ef99a97b59362d645c5c792210865e", "title": "М. А. Осоргин – иностранный корреспондент «Русских ведомостей»", "authors": [{ "authorId": "2090980595", "name": "Елена Михайловна Богданова" }], "venue": "", "publicationvenueid": null, "year": 2012, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Art", "source": "s2-fos-model" }, { "category": "Art", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-08T09:22:01.275Z" }
  , { "corpusid": 234288557, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "3143547441", "CorpusId": "234288557", "PubMed": null, "DOI": "10.47845/TURKISHSTUDIES.48153", "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/aaa7dd392d66e6232944ccbb622ad411d8025734", "title": "Ahmet Şevki’ nin Leyla ile Mecnun Adlı Tiyatrosunda Diyaloğa Dayalı Sezdirimler, Edimbilim Çalışması", "authors": [{ "authorId": "2090718499", "name": "İhab Said İbrahim Ibrahim" }], "venue": "", "publicationvenueid": null, "year": 2021, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "Turkish Studies", "pages": "335-355", "volume": "" }, "updated": "2022-02-07T21:37:52.747Z" }
  , { "corpusid": 230379802, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1758167212", "CorpusId": "230379802", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/9c2de8f52852a8b661d950d00e800e1cdcb0458f", "title": "LibGuides: Curriculum Builder: For Instructors", "authors": [{ "authorId": "52128312", "name": "Eric Frierson" }], "venue": "", "publicationvenueid": null, "year": 2015, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Education", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": ["Review"], "publicationdate": "2015-08-25", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-07T22:43:45.001Z" }
  , { "corpusid": 227739834, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "3031465447", "CorpusId": "227739834", "PubMed": null, "DOI": "10.3760/CMA.J.ISSN.1008-1801.2007.02.013", "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/ddb1313247efbf26695716c0db8d8e5d62164e04", "title": "Study of accommodative function in patients with central serous chorioretinopathy", "authors": [{ "authorId": "65960744", "name": "唐萍" }, { "authorId": "69410235", "name": "刘晓玲" }], "venue": "", "publicationvenueid": null, "year": 2007, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Biology", "source": "s2-fos-model" }, { "category": "Medicine", "source": "external" }], "publicationtypes": null, "publicationdate": "2007-03-25", "journal": { "name": "Chinese Journal of Optometry & Ophthalmology", "pages": "115-117", "volume": "9" }, "updated": "2022-02-07T23:22:16.693Z" }
  , { "corpusid": 213893678, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2978260916", "CorpusId": "213893678", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/b49296eff13583642ee0b95353661cea77b0a9a8", "title": "DEPORTE Y CICLOS DE VIDA", "authors": [{ "authorId": "134527868", "name": "N. Puig" }], "venue": "", "publicationvenueid": null, "year": 2019, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2019-09-30", "journal": { "name": "", "pages": "17-29", "volume": "" }, "updated": "2022-02-08T02:38:21.077Z" }
  , { "corpusid": 197635874, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": null, "CorpusId": "197635874", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/f8278fc4e84a74550196b0a65401364f91097d62", "title": "Exposé zur Bachelorarbeit: Aufwandsschätzungen von Softwareprojekten durch Random Forest", "authors": [{ "authorId": "2104578001", "name": "Verwandte Arbeiten" }], "venue": "", "publicationvenueid": null, "year": 2018, "referencecount": 18, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-02-08T06:31:55.052Z" }
  , { "corpusid": 189632833, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2788502059", "CorpusId": "189632833", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/81fa02a8bf9b36150486268a1461b3759018bc32", "title": "Recensione: Ž.,Muljačic', Das Dalmatische. Studien zu einer untergegangenen Sprache.(Quellen und Beiträge zur kroatischen Kulturgeschichte. Herausgegeben von Elisabeth von Erdmann- Pandžić. Band 10).Pp.434 ; Inhalt ( pp.5-6); Elisabeth von Erdmann-Pandžić, Vorwort (pp. 7-8);Einleitung (pp.9-11). Bro", "authors": [{ "authorId": "2071686665", "name": "Addolorata Landi" }], "venue": "", "publicationvenueid": null, "year": 2001, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "414-417", "volume": "2" }, "updated": "2022-02-08T09:46:58.468Z" }
  , { "corpusid": 187913032, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2797009464", "CorpusId": "187913032", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/73ab9535cb5e9519ddff24854c9d370487cf4534", "title": "Note sur l'article de Cyril Hegnauer paru à la REC 1999 p. 205 sq. (REC 2000 p. 21-23).", "authors": [{ "authorId": "121697589", "name": "S. Sandoz" }], "venue": "", "publicationvenueid": null, "year": 2000, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "24-26", "volume": "" }, "updated": "2022-02-08T10:29:03.685Z" }
  , { "corpusid": 179649345, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "968104675", "CorpusId": "179649345", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/d0e28a6ba22e3ecd5e48c533bad3902e6f85e97f", "title": "Xteam Lindows 3.0", "authors": [{ "authorId": "2094841276", "name": "小萌" }], "venue": "", "publicationvenueid": null, "year": 2000, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "17-17", "volume": "" }, "updated": "2022-02-08T13:53:50.811Z" }
  , { "corpusid": 176487983, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "640304951", "CorpusId": "176487983", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/4dface8986c1b1a686e25b0218975d8944e1bbe7", "title": "ここまでやるかい! いや、やるべきだ! 責任感と緊張感を生むための喝", "authors": [{ "authorId": "136560417", "name": "跡部 恒之" }], "venue": "", "publicationvenueid": null, "year": 2002, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-02-08T15:24:47.600Z" }
  , { "corpusid": 211827828, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2189330236", "CorpusId": "211827828", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/4b023d916545271d783c2b54ce50f82bf31a9942", "title": "CORAM: HON'BLE THE CHIEF JUSTICE HON'BLE MRS. JUSTICE JAYA ROY", "authors": [{ "authorId": "2072059651", "name": "S. Pathak" }, { "authorId": "98192803", "name": "S. Srivastava" }], "venue": "", "publicationvenueid": null, "year": 2013, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-08T03:08:42.996Z" }
  , { "corpusid": 204405528, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2368403385", "CorpusId": "204405528", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/cd0afb310bae6f9c7cd6b17cfdcad21c3e9959f2", "title": "Enhance Bank-Insurance Cooperation to Meet the Challenge of WTO", "authors": [{ "authorId": "48954198", "name": "W. Zhaohui" }], "venue": "", "publicationvenueid": null, "year": 2002, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Economics", "source": "s2-fos-model" }, { "category": "Business", "source": "s2-fos-model" }, { "category": "Economics", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "Journal of Shanxi Finace and Economics University", "pages": null, "volume": "" }, "updated": "2022-02-08T04:20:36.773Z" }
  , { "corpusid": 195625316, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "155984514", "CorpusId": "195625316", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/5038ad522d218c312abce15968398362acbdb69c", "title": "研究速報 : 3次元Video画像解析によるリハビリテーション医学への応用(2)", "authors": [{ "authorId": "69533156", "name": "政子 鶴岡" }, { "authorId": "69473899", "name": "英二 森" }, { "authorId": "103359088", "name": "亮介 柴崎" }, { "authorId": "69033078", "name": "俊治 村井" }], "venue": "", "publicationvenueid": null, "year": 2012, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2012-11-09", "journal": { "name": "", "pages": "62-65", "volume": "47" }, "updated": "2022-02-08T07:47:41.099Z" }
  , { "corpusid": 170674382, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1813802436", "CorpusId": "170674382", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/2becbc69d6e7f7a733d7d3f73d1e8c07284f8837", "title": "Själens uttåg ur Egypten", "authors": [{ "authorId": "2097073081", "name": "Ola Wikander" }], "venue": "", "publicationvenueid": null, "year": 2010, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Linguistics", "source": "s2-fos-model" }, { "category": "Philosophy", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-02-08T17:13:07.788Z" }
  , { "corpusid": 169842917, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "109871669", "CorpusId": "169842917", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/a39910df94112ac7abf8ea91ae115a62597a7668", "title": "Buchbesprechungen - 'Dass nicht der Nutzen des Staats Euch als Gerechtigkeit erscheine'. Schiller und das Recht", "authors": [{ "authorId": "119367071", "name": "C. Roxin" }], "venue": "", "publicationvenueid": null, "year": 2006, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "587", "volume": "59" }, "updated": "2022-02-08T17:37:53.097Z" }
  , { "corpusid": 167631039, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2376682863", "CorpusId": "167631039", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/6f2061632f00321087885186d43f2f851c110cc4", "title": "Innovation strategy with HuNan provincial tourist industry rapid healthy and continuous develop", "authors": [{ "authorId": "1448576084", "name": "Yin Hua-guang" }], "venue": "", "publicationvenueid": null, "year": 2005, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Business", "source": "s2-fos-model" }, { "category": "Business", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "The Border Economy and Culture", "pages": null, "volume": "" }, "updated": "2022-02-08T18:53:32.788Z" }
  , { "corpusid": 166333729, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1489812424", "CorpusId": "166333729", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/5bfd93e518222d775e4bdb7c4ff1d1b7e987c0ca", "title": "The Relationship between CSR Participation and Financial Performance: Case of Indonesia Company", "authors": [{ "authorId": "120300862", "name": "Nathania Helmina" }], "venue": "", "publicationvenueid": null, "year": 2015, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Business", "source": "s2-fos-model" }, { "category": "Economics", "source": "s2-fos-model" }, { "category": "Business", "source": "external" }], "publicationtypes": null, "publicationdate": "2015-07-31", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-08T19:32:16.086Z" }
  , { "corpusid": 188300267, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2912054065", "CorpusId": "188300267", "PubMed": null, "DOI": "10.15122/ISBN.978-2-8124-3002-2.P.0335", "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/a2078c422f7b87764b69f253c5f0b04199eb2770", "title": "Alexandre Dumas, fabrique d’immortalité - Index des noms de personnes", "authors": [{ "authorId": "81018134", "name": "D. Desormeaux" }], "venue": "", "publicationvenueid": null, "year": 2014, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "335-343", "volume": "" }, "updated": "2022-02-08T10:22:14.013Z" }
  , { "corpusid": 186146525, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2599120106", "CorpusId": "186146525", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/0bb6b0135892defadeb5a545d31075d5f52046ee", "title": "리바이어던을 찾아서: 성서 욥기의 모티프에 따른 『모비딕』의 분석", "authors": [{ "authorId": "152513612", "name": "김진경" }], "venue": "", "publicationvenueid": null, "year": 2000, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-02-08T11:12:19.090Z" }
  , { "corpusid": 183720853, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2341194771", "CorpusId": "183720853", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/2f27f1e96e36bf41ad8b3d3ef860e18a940e8fab", "title": "FACOLTA' DI SCIENZE MATEMATICHE FISICHE E NATURALI CORSO DI LAUREA IN FISICA", "authors": [{ "authorId": "2004643", "name": "A. Maggio" }], "venue": "", "publicationvenueid": null, "year": 2006, "referencecount": 15, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-08T12:12:45.336Z" }
  , { "corpusid": 183063078, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2332590755", "CorpusId": "183063078", "PubMed": null, "DOI": "10.17121/ressjournal.305", "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/ae6e1c3b95d6da395b009deded50ee6ab9ebde85", "title": "MİHRİ MÜŞFİK İLE HALE ASAF BEDELİ ÖDENMİŞ BOHEM SANAT YAŞAMLARI", "authors": [{ "authorId": "1938364882", "name": "A. Bal" }], "venue": "", "publicationvenueid": null, "year": 2015, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "Route Educational and Social Science Journal", "pages": "378-378", "volume": "2" }, "updated": "2022-02-08T12:34:03.426Z" }
  , { "corpusid": 177041830, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "778699215", "CorpusId": "177041830", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/009ae49eb8ccbfac1366bcd0338a9f640454c5f2", "title": "Jerzy Nierojewski Kapitan Żeglugi Wielkiej / Henryk Krzyczkowski.", "authors": [{ "authorId": "123935727", "name": "Henryk Krzyczkowski" }], "venue": "", "publicationvenueid": null, "year": 2002, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "24-43", "volume": "" }, "updated": "2022-02-08T15:08:27.460Z" }
  , { "corpusid": 175240477, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "414107827", "CorpusId": "175240477", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/df5998b4f12607ea981922984f188125ac9dceb2", "title": "農業集落排水事業に寄与するタクマの商品群 (特集2:農業集落排水処理及び汚泥処理技術)", "authors": [{ "authorId": "135196725", "name": "タクマ" }], "venue": "", "publicationvenueid": null, "year": 2000, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-02-08T15:36:38.179Z" }
  , { "corpusid": 175010110, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "428894159", "CorpusId": "175010110", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/cf9ccee83afed044e38b608051214bbfab86b686", "title": "報告 アイヌ学校で学んで--二風谷尋常小学校の回想 (アイヌ教育史--教育史学会コロキウム「アイヌ教育史」の記録)", "authors": [{ "authorId": "136541633", "name": "貝沢 正" }], "venue": "", "publicationvenueid": null, "year": 1988, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "113-119", "volume": "" }, "updated": "2022-02-08T15:37:32.147Z" }
  , { "corpusid": 164633532, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2578690839", "CorpusId": "164633532", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/8a8642f7f8a40e94e59d456a793fc1b8fbbac7a2", "title": "Odcizení vrcholových hráčů v konzumní společnosti", "authors": [{ "authorId": "121789643", "name": "Šárka Dehnerová" }], "venue": "", "publicationvenueid": null, "year": 2012, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-08T20:21:07.894Z" }
  , { "corpusid": 159394527, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2916748103", "CorpusId": "159394527", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/ab38826fe3c87918ea089d3582a67dee47d51b63", "title": "Évaluation des dents piliers en prothèse", "authors": [{ "authorId": "1506115748", "name": "Cassandre Hanczyk-Panel" }], "venue": "", "publicationvenueid": null, "year": 2018, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2018-07-13", "journal": { "name": "", "pages": "79", "volume": "" }, "updated": "2022-02-08T23:16:24.077Z" }
  , { "corpusid": 159379291, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2911713107", "CorpusId": "159379291", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/ecaf881d2fe51d2e2e411746be090911a4853d27", "title": "Are There the Preconditions for the Revolution of Gender Politics", "authors": [{ "authorId": "77908756", "name": "Dalija Snieškienė" }], "venue": "", "publicationvenueid": null, "year": 2004, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Economics", "source": "s2-fos-model" }, { "category": "Political Science", "source": "external" }], "publicationtypes": ["Review"], "publicationdate": "2004-10-05", "journal": null, "updated": "2022-02-08T23:16:30.137Z" }
  , { "corpusid": 156425544, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2405976059", "CorpusId": "156425544", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/58181e70060905177db48b6f85b2faf14fff2097", "title": "the process by which functions, actors and activities are brought together to assure that a society's needs and goals are well served and the integrity and performance of the university are maintained and advanced.", "authors": [{ "authorId": "73484970", "name": "D. Sloper" }], "venue": "", "publicationvenueid": null, "year": 2016, "referencecount": 9, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Education", "source": "s2-fos-model" }, { "category": "Political Science", "source": "external" }], "publicationtypes": ["Review"], "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-09T00:47:38.628Z" }
  , { "corpusid": 155430874, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2267419816", "CorpusId": "155430874", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/0549f73077c334d5cb013581ee84b1fd8e2c3093", "title": "Правовой статус судебных приставов мировых судов Вятской губернии в пореформенный период", "authors": [{ "authorId": "123615680", "name": "Туйчиев Валижан Маматрахимович" }], "venue": "", "publicationvenueid": null, "year": 2012, "referencecount": 0, "citationcount": 1, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Law", "source": "s2-fos-model" }, { "category": "Political Science", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "18" }, "updated": "2022-02-09T01:19:49.143Z" }
  , { "corpusid": 155431776, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2274698583", "CorpusId": "155431776", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/2ebffe140d4053bb1166896cab3de28bb452e902", "title": "[Considering the uncertainty with regard to the future development of the population and the rates of old-age pension contributions in the Federal Republic of Germany]", "authors": [{ "authorId": "2439455", "name": "P. Pflaumer" }], "venue": "", "publicationvenueid": null, "year": 1984, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Economics", "source": "s2-fos-model" }, { "category": "Economics", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "10" }, "updated": "2022-02-09T01:19:28.397Z" }
  , { "corpusid": 152548559, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "755006797", "CorpusId": "152548559", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/62a24f05d99b00192d59e3136609a2ce9f4db224", "title": "Gorsze niż piorun", "authors": [{ "authorId": "50526110", "name": "A. Czarnecki" }], "venue": "", "publicationvenueid": null, "year": 1994, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-02-09T02:48:44.523Z" }
  , { "corpusid": 160225614, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "123946512", "CorpusId": "160225614", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/8f37e07c8c301249a8b716880ceaa5897eac9a29", "title": "La Sociedad Española de Excuersiones en Acción.", "authors": [{ "authorId": "119567216", "name": "A. Pantoja" }], "venue": "", "publicationvenueid": null, "year": null, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "194-203", "volume": "32" }, "updated": "2022-02-08T22:51:25.156Z" }
  , { "corpusid": 161723494, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1521240623", "CorpusId": "161723494", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/8c5236a2f65610d83691b8986abf0c3a0f06b889", "title": "Kane and Abel", "authors": [{ "authorId": "90261379", "name": "J. Archer" }], "venue": "", "publicationvenueid": null, "year": 1979, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "History", "source": "s2-fos-model" }, { "category": "History", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-08T22:05:45.105Z" }
  , { "corpusid": 160615127, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "113178550", "CorpusId": "160615127", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/1e78d3fd7f64a1fd0d9757da17264a9217948b93", "title": "Peranan Akuntansi Sebagai Alat Bantu Manajemen Dalam Pengambilan Keputusan Pada PT.Asuransi Parolamas Cabang Medan", "authors": [{ "authorId": "1506654413", "name": "Astrid H.Tambunan" }], "venue": "", "publicationvenueid": null, "year": 2008, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2008-04-19", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-08T22:40:27.353Z" }
  , { "corpusid": 159768405, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2610606337", "CorpusId": "159768405", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/23bb2dea637f5e6ebd22c6c718111fc846d33b43", "title": "Grounds and preparations for the main thesis of \"Veritatis Splendor\"", "authors": [{ "authorId": "51387182", "name": "J. Finnis" }], "venue": "", "publicationvenueid": null, "year": 2017, "referencecount": 0, "citationcount": 2, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Philosophy", "source": "s2-fos-model" }, { "category": "Philosophy", "source": "external" }], "publicationtypes": null, "publicationdate": "2017-03-11", "journal": { "name": "", "pages": "7-26", "volume": "51" }, "updated": "2022-02-08T23:06:04.174Z" }
  , { "corpusid": 164269070, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2531337474", "CorpusId": "164269070", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/83259c2867bcb7c0c461dfaf82bbba67daf1c40c", "title": "Sobre el emblema y el escudo de Madrid", "authors": [{ "authorId": "50262826", "name": "E. Castro" }], "venue": "", "publicationvenueid": null, "year": 2007, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "70-73", "volume": "" }, "updated": "2022-02-08T20:32:02.276Z" }
  , { "corpusid": 151623366, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2576169917", "CorpusId": "151623366", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/bb9e508a08ec4f300212169d32c24500d96584f2", "title": "KEWAJIBAN PERUSAHAAN DAERAH AIR MINUM DELTA TIRTA SIDOARJO DITINJAU DARI PASAL 7 UNDANG - UNDANG NOMOR 8 TAHUN 1999", "authors": [{ "authorId": "118601041", "name": "Dyanti Arin Dita" }], "venue": "", "publicationvenueid": null, "year": 2016, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "2" }, "updated": "2022-02-09T03:17:33.933Z" }
  , { "corpusid": 148852232, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2735701857", "CorpusId": "148852232", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/a029b3df39d755ed35dcf620afd07a2c72f7a2b4", "title": "Congres 85 : La 1/2 journée pédagogique", "authors": [{ "authorId": "115663753", "name": "Roberta Goodden" }, { "authorId": "144671048", "name": "Jean-Louis Grenier" }], "venue": "", "publicationvenueid": null, "year": 1985, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "Cahiers de l'APLIUT", "pages": "14-17", "volume": "5" }, "updated": "2022-02-09T04:40:27.599Z" }
  , { "corpusid": 146137898, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2936334831", "CorpusId": "146137898", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/71b0b60d206df5dee54c89a07709fd28fb68b7aa", "title": "Electronic component cutting and stripping machine and method thereof", "authors": [{ "authorId": "117031495", "name": "邱文国" }], "venue": "", "publicationvenueid": null, "year": 2009, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Engineering", "source": "s2-fos-model" }, { "category": "Materials Science", "source": "external" }], "publicationtypes": null, "publicationdate": "2009-05-27", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-09T06:05:04.421Z" }
  , { "corpusid": 142729306, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1532685742", "CorpusId": "142729306", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/2678290aadf218d8f79fac43cce443e09b5b81c8", "title": "『오셀로』에 나타난 모성 환상과 데스데모나에 대한 억압", "authors": [{ "authorId": "52473898", "name": "조재희" }], "venue": "", "publicationvenueid": null, "year": 2003, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Linguistics", "source": "s2-fos-model" }, { "category": "Psychology", "source": "external" }], "publicationtypes": null, "publicationdate": "2003-12-01", "journal": { "name": "Shakespeare Review", "pages": "873-900", "volume": "39" }, "updated": "2022-02-09T07:51:54.124Z" }
  , { "corpusid": 134275910, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "3023736992", "CorpusId": "134275910", "PubMed": null, "DOI": "10.1016/B978-0-12-397007-7.00002-1", "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/bcaaa680e6abc6b100c80f234fbcf9f12be2ddd3", "title": "Myth No. 1 (Fuel): Dust Does Not Explode", "authors": [{ "authorId": "3010093", "name": "P. Amyotte" }], "venue": "", "publicationvenueid": null, "year": 2013, "referencecount": 10, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Geology", "source": "s2-fos-model" }, { "category": "Environmental Science", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "9-16", "volume": "" }, "updated": "2022-02-09T12:13:23.270Z" }
  , { "corpusid": 128509371, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1544710147", "CorpusId": "128509371", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/2df3aacca7403f039243abb3c72cea5434d83459", "title": "Wykorzystanie modelu dynamicznego przekładni zębatej w układzie napędowym w diagnostyce konstrukcyjnej", "authors": [{ "authorId": "52042498", "name": "H. Madej" }, { "authorId": "51964408", "name": "B. Łazarz" }], "venue": "", "publicationvenueid": null, "year": 2004, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "11-14", "volume": "" }, "updated": "2022-02-09T15:36:40.894Z" }
  , { "corpusid": 128154703, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "589095591", "CorpusId": "128154703", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/59f63b682743ebd701becfea0b4cb5bc7a2d047a", "title": "'TRADITIONAL SITE' LABEL DELAYS GEORGIA FREEWAY", "authors": [{ "authorId": "144520723", "name": "S. Edwards" }], "venue": "", "publicationvenueid": null, "year": 1997, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Environmental Science", "source": "s2-fos-model" }, { "category": "Geography", "source": "external" }], "publicationtypes": null, "publicationdate": "1997-11-01", "journal": { "name": "", "pages": null, "volume": "63" }, "updated": "2022-02-09T15:43:26.137Z" }
  , { "corpusid": 127748211, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "83843605", "CorpusId": "127748211", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/798bd962f8757aa69ea01a01fe807b4947afe34b", "title": "Untersuchungen zur Bodenerosion im Etoscha-Nationalpark, Namibia", "authors": [{ "authorId": "104536565", "name": "H. Beugler" }], "venue": "", "publicationvenueid": null, "year": 1991, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-09T15:47:51.590Z" }
  , { "corpusid": 124437071, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2255896167", "CorpusId": "124437071", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/2bd22e75d71acfce9d243c7cacbcb9a0ad6d08ef", "title": "Studying the intermittent stable theorem and the synchronization of a delayed fractional nonlinear system", "authors": [{ "authorId": "2096721831", "name": "胡建兵" }, { "authorId": "102621187", "name": "赵灵冬" }, { "authorId": "71892359", "name": "谢正光" }], "venue": "", "publicationvenueid": null, "year": 2013, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Mathematics", "source": "s2-fos-model" }, { "category": "Mathematics", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": null, "updated": "2022-02-09T18:28:40.399Z" }
  , { "corpusid": 124288658, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2467989164", "CorpusId": "124288658", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/d744430899284f52774f70a4ebf168d0907541b0", "title": "On the nullity ofline graphs oftrees", "authors": [{ "authorId": "144228103", "name": "I. Gutman" }, { "authorId": "3042866", "name": "Irene Sciriha" }], "venue": "", "publicationvenueid": null, "year": 2001, "referencecount": 6, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Mathematics", "source": "s2-fos-model" }, { "category": "Physics", "source": "s2-fos-model" }, { "category": "Mathematics", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-09T18:29:41.449Z" }
  , { "corpusid": 124292625, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2372672406", "CorpusId": "124292625", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/20dcf9e0e9f58ac9084505824339ad5b44177b88", "title": "ω-paracompactness in L-order-preserving Operator Spaces", "authors": [{ "authorId": "102542124", "name": "Meng Guang-wu" }], "venue": "", "publicationvenueid": null, "year": 2007, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Mathematics", "source": "s2-fos-model" }, { "category": "Mathematics", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "Fuzzy systems and mathematics", "pages": null, "volume": "" }, "updated": "2022-02-09T18:30:10.147Z" }
  , { "corpusid": 119525194, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1974696519", "CorpusId": "119525194", "PubMed": null, "DOI": "10.1016/S0262-4079(09)62926-2", "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/f5afdda8b2d62042f431b13e571997030ce3ba93", "title": "Spy-in-the-cab could improve teenage driving", "authors": [{ "authorId": "144326969", "name": "P. Marks" }], "venue": "", "publicationvenueid": null, "year": 2009, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Medicine", "source": "s2-fos-model" }, { "category": "Physics", "source": "external" }], "publicationtypes": null, "publicationdate": "2009-11-04", "journal": { "name": "New Scientist", "pages": "29", "volume": "204" }, "updated": "2022-02-09T22:37:42.116Z" }
  , { "corpusid": 113477693, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2389844361", "CorpusId": "113477693", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/1cb280f964ee1a1ad1a4bb4245cc1ca4fd5e0dac", "title": "Application of 6S Concept in Practice Teaching in Vocation and Technical College", "authors": [{ "authorId": "65848783", "name": "Yang Jin-mei" }], "venue": "", "publicationvenueid": null, "year": 2010, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Business", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "Journal of Xingtai Polytechnic College", "pages": null, "volume": "" }, "updated": "2022-02-10T02:23:40.586Z" }
  , { "corpusid": 112838191, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2347989932", "CorpusId": "112838191", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/a82ead620269351439ab9973a845a2b97978e128", "title": "A Three-dimension Positioning System Using Ultrasonic", "authors": [{ "authorId": "30552807", "name": "Wu Bai-hai" }], "venue": "", "publicationvenueid": null, "year": 2008, "referencecount": 0, "citationcount": 1, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Materials Science", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "Machine Tool & Hydraulics", "pages": null, "volume": "" }, "updated": "2022-02-10T02:56:47.894Z" }
  , { "corpusid": 108731123, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1584612561", "CorpusId": "108731123", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/16985c9916b68f7979619d0f0d13a858a977ee60", "title": "Zwiększenie nośności łożysk wielkogabarytowych metodą korekcji bieżni", "authors": [{ "authorId": "70060372", "name": "T. Smolnicki" }, { "authorId": "3832185", "name": "G. Przybyłek" }, { "authorId": "69938477", "name": "M. Stańco" }], "venue": "", "publicationvenueid": null, "year": 2007, "referencecount": 4, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "551-557", "volume": "" }, "updated": "2022-02-10T06:52:51.865Z" }
  , { "corpusid": 108895592, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2924100378", "CorpusId": "108895592", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/638a1934bb43f7b9197d072643f34e40e9a23aab", "title": "Electro-synthese d'alcools et d'acides carboxyliques a partir des sels de metaux correspondants", "authors": [{ "authorId": "2060006973", "name": "Joseph E Toomey" }], "venue": "", "publicationvenueid": null, "year": 1991, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "1991-10-28", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-10T06:44:24.031Z" }
  , { "corpusid": 117183378, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2738415999", "CorpusId": "117183378", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/4d3e662cb6c2de8003233f7adc44ac3a6a1fe4fc", "title": "Configuración de una impresora compartida a través de una red LAN en un laboratorio de cómputo, bajo la plataforma Windows.", "authors": [{ "authorId": "31807348", "name": "C. Hidalgo" }, { "authorId": "102523914", "name": "Mónica Herminia" }], "venue": "", "publicationvenueid": null, "year": 2016, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Computer Science", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": ["Review"], "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-09T23:30:50.393Z" }
  , { "corpusid": 116781577, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2745791802", "CorpusId": "116781577", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/d31a0d416d7d016c0ee9cdb51ac653eb34e2a769", "title": "Dimmable electronic ballast", "authors": [{ "authorId": "52355382", "name": "周明杰" }, { "authorId": "52378850", "name": "李英伟" }], "venue": "", "publicationvenueid": null, "year": 2010, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Engineering", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": null, "publicationdate": "2010-02-08", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-09T23:45:52.602Z" }
  , { "corpusid": 114732234, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2602782827", "CorpusId": "114732234", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/3ff2c950fe47b71204eea8a6bdab23a79dedd65b", "title": "Experimental evaluation of static stiffness of cylindrical type of squeeze film damper rings", "authors": [{ "authorId": "2119303277", "name": "Arun Kumar" }, { "authorId": "2059279610", "name": "M. Antony" }, { "authorId": "101200856", "name": "U. P. Sankunni" }, { "authorId": "152976246", "name": "M. Ananda" }], "venue": "", "publicationvenueid": null, "year": 1993, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Engineering", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": null, "publicationdate": "1993-07-01", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-10T01:23:21.026Z" }
  , { "corpusid": 114113391, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2471799339", "CorpusId": "114113391", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/801d0c49b484798861c3a14a1d979cabca7be206", "title": "Ansys AQWA를 이용한 선체운동 해석에 관한 연구", "authors": [{ "authorId": "70536805", "name": "김귀남" }, { "authorId": "70864313", "name": "김보성" }, { "authorId": "96101484", "name": "박지훈" }, { "authorId": "80327759", "name": "김지혜" }, { "authorId": "83432724", "name": "정용길" }, { "authorId": "92838945", "name": "허선철" }], "venue": "", "publicationvenueid": null, "year": 2016, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2016-04-01", "journal": { "name": "", "pages": "161-162", "volume": "" }, "updated": "2022-02-10T01:53:44.293Z" }
  , { "corpusid": 114294878, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2396463058", "CorpusId": "114294878", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/d515ea8d1a8fa4d110ec9ba8b0bdfe6b2e25ab01", "title": "Performance of Luby transform coded frequency hopping systems in partial-band jamming", "authors": [{ "authorId": "52643557", "name": "卜祥元" }, { "authorId": "2098609145", "name": "邱源" }, { "authorId": "2091006061", "name": "杨行" }, { "authorId": "71649264", "name": "周荣花" }, { "authorId": "2074995045", "name": "马园园" }], "venue": "", "publicationvenueid": null, "year": 2013, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Computer Science", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": "367-373", "volume": "22" }, "updated": "2022-02-10T01:41:36.086Z" }
  , { "corpusid": 111583213, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2378501341", "CorpusId": "111583213", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/ac98a10936717d632533d6060445e75c1aa966c5", "title": "The Development of Light Industry in China's Western Areas", "authors": [{ "authorId": "48148314", "name": "Shengji Jin" }], "venue": "", "publicationvenueid": null, "year": 2001, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Economics", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "Journal of Dalian Nationalities University", "pages": null, "volume": "" }, "updated": "2022-02-10T04:09:05.666Z" }
  , { "corpusid": 110833111, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2183509225", "CorpusId": "110833111", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/9c28c8c283a8cde27ff21c1cfd3bb9e5ddbe6da4", "title": "MENTS WITHOUT PASS- AND INTEGRATION", "authors": [{ "authorId": "3242952", "name": "E. Carminati" }, { "authorId": "47424395", "name": "M. Lazzaroni" }], "venue": "", "publicationvenueid": null, "year": 1998, "referencecount": 4, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Physics", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-10T04:45:53.274Z" }
  , { "corpusid": 107549907, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "2766861802", "CorpusId": "107549907", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/65bae25edb241b76ce5eefe3c2975cb46720bea1", "title": "Performance-based assessment of daylight on tropical buildings- a case Study - eScholarship", "authors": [{ "authorId": "95219312", "name": "Chien Szu Cheng" }], "venue": "", "publicationvenueid": null, "year": 2013, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Engineering", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": null, "publicationdate": "2013-09-09", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-10T07:38:21.158Z" }
  , { "corpusid": 107034924, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1187723445", "CorpusId": "107034924", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/022ce28b2eeed06deb8aa3d4bd82a0cefa635d91", "title": "Pengaruh Pemberian Ekstrak Umbi Ubi Jalar Ungu (Ipomoea batatas L.) terhadap Aktivitas Glutation Peroksidase (Gpx) dan Histopatologi Hepar Mencit (Mus musculus L.) yang Diberi Perlakuan Latihan Fisik Maksimal", "authors": [{ "authorId": "2078614117", "name": "Ayu Elvana" }], "venue": "", "publicationvenueid": null, "year": 2015, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": "2015-06-25", "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-10T08:06:07.582Z" }
  , { "corpusid": 106844734, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "587165279", "CorpusId": "106844734", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/e905c48af350c69d8fa4c355cd4146774f831f76", "title": "Atmospheric Propulsion for High-Speed Inter-City Passenger Rail", "authors": [{ "authorId": "144871650", "name": "M. Schlienger" }, { "authorId": "14485343", "name": "J. Reardan" }], "venue": "", "publicationvenueid": null, "year": 2012, "referencecount": 0, "citationcount": 0, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": [{ "category": "Engineering", "source": "s2-fos-model" }, { "category": "Engineering", "source": "external" }], "publicationtypes": null, "publicationdate": null, "journal": { "name": "", "pages": null, "volume": "" }, "updated": "2022-02-10T08:15:50.613Z" }
  , { "corpusid": 106617631, "externalids": { "ACL": null, "DBLP": null, "ArXiv": null, "MAG": "1480532258", "CorpusId": "106617631", "PubMed": null, "DOI": null, "PubMedCentral": null }, "url": "https://www.semanticscholar.org/paper/d43efb2209afcbfca4b6a39d86f92b3206802a46", "title": "Badanie własności optycznych i spektroskopowych monokryształów wolframianów domieszkowanych jonami Er i Yb : nowych ośrodków aktywnych do mikrolaserów „bezpiecznych dla oka\"", "authors": [{ "authorId": "46883825", "name": "Z. Mierczyk" }, { "authorId": "152344321", "name": "J. Mlynczak" }, { "authorId": "52072412", "name": "K. Kopczyński" }, { "authorId": "2076470591", "name": "Andrzej Majchrowski" }], "venue": "", "publicationvenueid": null, "year": 2005, "referencecount": 0, "citationcount": 4, "influentialcitationcount": 0, "isopenaccess": false, "s2fieldsofstudy": null, "publicationtypes": null, "publicationdate": null, "journal": { "name": "Biuletyn Wojskowej Akademii Technicznej", "pages": "53-77", "volume": "54" }, "updated": "2022-02-10T08:24:19.442Z" }
]
const authors = [{ "authorid": "2075151485", "externalids": null, "url": "https://www.semanticscholar.org/author/2075151485", "name": "Zhou Qi-yan", "aliases": null, "affiliations": null, "homepage": null, "papercount": 5, "citationcount": 0, "hindex": 0, "updated": "2022-12-16T02:48:41.086Z" }
  , { "authorid": "116696852", "externalids": null, "url": "https://www.semanticscholar.org/author/116696852", "name": "Л. Г. Клюканова", "aliases": ["Лариса Геннадьевна Клюканова"], "affiliations": null, "homepage": null, "papercount": 3, "citationcount": 0, "hindex": 0, "updated": "2021-05-21T01:12:55.377Z" }
  , { "authorid": "120079528", "externalids": null, "url": "https://www.semanticscholar.org/author/120079528", "name": "윤화자", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-19T18:30:05.666Z" }
  , { "authorid": "2002532194", "externalids": null, "url": "https://www.semanticscholar.org/author/2002532194", "name": "鎌田 正之", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-23T20:28:45.357Z" }
  , { "authorid": "1453222180", "externalids": null, "url": "https://www.semanticscholar.org/author/1453222180", "name": "Dbn Mahatma", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-24T01:24:37.843Z" }
  , { "authorid": "1519690669", "externalids": null, "url": "https://www.semanticscholar.org/author/1519690669", "name": "白帆（组稿）", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-23T16:41:29.915Z" }
  , { "authorid": "82731333", "externalids": null, "url": "https://www.semanticscholar.org/author/82731333", "name": "Blanche Rr", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-06-20T20:39:23.689Z" }
  , { "authorid": "2100054536", "externalids": null, "url": "https://www.semanticscholar.org/author/2100054536", "name": "李義圭", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-21T13:13:43.679Z" }
  , { "authorid": "148557071", "externalids": null, "url": "https://www.semanticscholar.org/author/148557071", "name": "Леликов Сергей Владимирович", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-11T21:06:30.670Z" }
  , { "authorid": "48848121", "externalids": null, "url": "https://www.semanticscholar.org/author/48848121", "name": "S. Chen", "aliases": ["S Chen", "S. Chen", "Shengyun Chen"], "affiliations": null, "homepage": null, "papercount": 3, "citationcount": 238, "hindex": 2, "updated": "2022-02-08T11:13:34.939Z" }
  , { "authorid": "87338548", "externalids": null, "url": "https://www.semanticscholar.org/author/87338548", "name": "L. Wang", "aliases": ["L Wang", "Lin Yu Wang", "Lin Wang"], "affiliations": null, "homepage": null, "papercount": 12, "citationcount": 67, "hindex": 5, "updated": "2022-02-09T23:49:53.049Z" }
  , { "authorid": "2071064831", "externalids": null, "url": "https://www.semanticscholar.org/author/2071064831", "name": "石井 久史", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-11T17:37:39.053Z" }
  , { "authorid": "136592835", "externalids": null, "url": "https://www.semanticscholar.org/author/136592835", "name": "郭家祁", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-24T05:02:45.291Z" }
  , { "authorid": "117900277", "externalids": null, "url": "https://www.semanticscholar.org/author/117900277", "name": "W. Radecke", "aliases": ["W. Radecke", "Waldemar Radecke"], "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-20T11:52:24.546Z" }
  , { "authorid": "2174706672", "externalids": null, "url": "https://www.semanticscholar.org/author/2174706672", "name": "Nur Hafizah", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2022-07-04T17:43:10.210Z" }
  , { "authorid": "2096965162", "externalids": null, "url": "https://www.semanticscholar.org/author/2096965162", "name": "Maxime Déniel", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-20T00:16:40.883Z" }
  , { "authorid": "122313543", "externalids": null, "url": "https://www.semanticscholar.org/author/122313543", "name": "Aus Politik und Zeitgeschichte", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-21T13:05:22.776Z" }
  , { "authorid": "79434319", "externalids": null, "url": "https://www.semanticscholar.org/author/79434319", "name": "Gurevitch Aw", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-26T13:24:47.738Z" }
  , { "authorid": "2098348909", "externalids": null, "url": "https://www.semanticscholar.org/author/2098348909", "name": "Pusceddu", "aliases": null, "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 0, "hindex": 0, "updated": "2021-05-20T07:20:21.663Z" }
  , { "authorid": "1416077660", "externalids": null, "url": "https://www.semanticscholar.org/author/1416077660", "name": "Dan Mandle", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 2, "hindex": 1, "updated": "2022-08-15T05:54:09.545Z" }
  , { "authorid": "151338421", "externalids": null, "url": "https://www.semanticscholar.org/author/151338421", "name": "ジェニン スフールマン", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-19T18:08:07.128Z" }
  , { "authorid": "73120858", "externalids": null, "url": "https://www.semanticscholar.org/author/73120858", "name": "June Thomsen Jetter", "aliases": null, "affiliations": null, "homepage": null, "papercount": 4, "citationcount": 29, "hindex": 3, "updated": "2021-05-20T21:51:03.105Z" }
  , { "authorid": "1998640795", "externalids": null, "url": "https://www.semanticscholar.org/author/1998640795", "name": "苑麟勇", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-24T00:14:45.673Z" }
  , { "authorid": "135805464", "externalids": null, "url": "https://www.semanticscholar.org/author/135805464", "name": "幹夫 松浦", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-21T02:53:23.729Z" }
  , { "authorid": "2049761777", "externalids": null, "url": "https://www.semanticscholar.org/author/2049761777", "name": "Jens Limpert", "aliases": null, "affiliations": null, "homepage": null, "papercount": 5, "citationcount": 0, "hindex": 0, "updated": "2021-05-15T01:12:42.734Z" }
  , { "authorid": "2145464769", "externalids": null, "url": "https://www.semanticscholar.org/author/2145464769", "name": "Qing Wang", "aliases": ["Qing Ping Wang"], "affiliations": null, "homepage": null, "papercount": 3, "citationcount": 18, "hindex": 1, "updated": "2022-12-20T02:20:49.880Z" }
  , { "authorid": "2129694454", "externalids": null, "url": "https://www.semanticscholar.org/author/2129694454", "name": "Isdikah Nabila", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-11-14T18:55:33.859Z" }
  , { "authorid": "94227378", "externalids": null, "url": "https://www.semanticscholar.org/author/94227378", "name": "ofNine", "aliases": null, "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 0, "hindex": 0, "updated": "2023-02-04T09:41:38.368Z" }
  , { "authorid": "2078279621", "externalids": null, "url": "https://www.semanticscholar.org/author/2078279621", "name": "Alessio Bartolacelli", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-19T23:33:57.668Z" }
  , { "authorid": "2056143573", "externalids": null, "url": "https://www.semanticscholar.org/author/2056143573", "name": "Masahide Ogawa", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-03-22T05:58:18.822Z" }
  , { "authorid": "2008797362", "externalids": null, "url": "https://www.semanticscholar.org/author/2008797362", "name": "Hwang Yeon", "aliases": ["Hwang Dae Yeon"], "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 1, "hindex": 1, "updated": "2021-10-28T17:06:23.916Z" }
  , { "authorid": "2160993626", "externalids": null, "url": "https://www.semanticscholar.org/author/2160993626", "name": "Mallu Navaniswar Reddy", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2022-04-02T14:59:21.509Z" }
  , { "authorid": "2076213601", "externalids": null, "url": "https://www.semanticscholar.org/author/2076213601", "name": "J. Cathala", "aliases": ["J-m Cathala", "J M Cathala"], "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 4, "hindex": 1, "updated": "2022-12-21T09:20:28.146Z" }
  , { "authorid": "2056843107", "externalids": null, "url": "https://www.semanticscholar.org/author/2056843107", "name": "Eleanor B. Morris Wu", "aliases": null, "affiliations": null, "homepage": null, "papercount": 6, "citationcount": 3, "hindex": 1, "updated": "2021-12-13T23:03:41.602Z" }
  , { "authorid": "1435212350", "externalids": null, "url": "https://www.semanticscholar.org/author/1435212350", "name": "ツァオ、チュンリャン", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-19T19:21:46.978Z" }
  , { "authorid": "2042571872", "externalids": null, "url": "https://www.semanticscholar.org/author/2042571872", "name": "N. ShainaBeegam", "aliases": ["N Shainabeegam"], "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-08-21T20:32:50.204Z" }
  , { "authorid": "134491725", "externalids": null, "url": "https://www.semanticscholar.org/author/134491725", "name": "Merizalde Vizcaíno", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-21T17:58:00.247Z" }
  , { "authorid": "79921589", "externalids": null, "url": "https://www.semanticscholar.org/author/79921589", "name": "U. Wünschmann", "aliases": ["U Wünschmann"], "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-21T00:52:32.936Z" }
  , { "authorid": "83061594", "externalids": null, "url": "https://www.semanticscholar.org/author/83061594", "name": "矢野聖二", "aliases": null, "affiliations": null, "homepage": null, "papercount": 11, "citationcount": 1, "hindex": 1, "updated": "2021-05-20T20:13:56.195Z" }
  , { "authorid": "2027400133", "externalids": null, "url": "https://www.semanticscholar.org/author/2027400133", "name": "S. Swindler", "aliases": ["S. Swindler", "Shaun Swindler"], "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 0, "hindex": 0, "updated": "2021-05-19T19:48:33.411Z" }
  , { "authorid": "2113767975", "externalids": null, "url": "https://www.semanticscholar.org/author/2113767975", "name": "W. Su", "aliases": ["W Su", "Wang Su"], "affiliations": null, "homepage": null, "papercount": 3, "citationcount": 30, "hindex": 2, "updated": "2022-07-23T00:59:01.528Z" }
  , { "authorid": "90921078", "externalids": null, "url": "https://www.semanticscholar.org/author/90921078", "name": "З Б Киенко", "aliases": null, "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 0, "hindex": 0, "updated": "2023-02-04T20:45:55.903Z" }
  , { "authorid": "71550358", "externalids": null, "url": "https://www.semanticscholar.org/author/71550358", "name": "리우 웨이량", "aliases": null, "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 0, "hindex": 0, "updated": "2021-04-19T18:08:51.918Z" }
  , { "authorid": "134592859", "externalids": null, "url": "https://www.semanticscholar.org/author/134592859", "name": "Paloma da Silva Nitsche", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-20T00:55:23.337Z" }
  , { "authorid": "2094898817", "externalids": null, "url": "https://www.semanticscholar.org/author/2094898817", "name": "Ramos Verdi", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-10-09T14:25:41.431Z" }
  , { "authorid": "69522299", "externalids": null, "url": "https://www.semanticscholar.org/author/69522299", "name": "Rafi Nachimas", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 7, "hindex": 1, "updated": "2021-05-23T19:45:58.619Z" }
  , { "authorid": "94066269", "externalids": null, "url": "https://www.semanticscholar.org/author/94066269", "name": "B. Kampa", "aliases": ["Barbara Kampa", "Barbara Dipl Chem Kampa"], "affiliations": null, "homepage": null, "papercount": 4, "citationcount": 4, "hindex": 1, "updated": "2023-02-04T10:24:37.476Z" }
  , { "authorid": "1594547724", "externalids": null, "url": "https://www.semanticscholar.org/author/1594547724", "name": "Inostek", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-28T02:19:56.242Z" }
  , { "authorid": "98421158", "externalids": null, "url": "https://www.semanticscholar.org/author/98421158", "name": "A. V. Fominov", "aliases": null, "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 0, "hindex": 0, "updated": "2021-04-20T12:43:28.528Z" }
  , { "authorid": "2103381071", "externalids": null, "url": "https://www.semanticscholar.org/author/2103381071", "name": "Msc. Student Yaser M. Abdalateef", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-24T04:23:30.500Z" }
  , { "authorid": "13836438", "externalids": null, "url": "https://www.semanticscholar.org/author/13836438", "name": "Iu V Nemtsov", "aliases": null, "affiliations": null, "homepage": null, "papercount": 8, "citationcount": 6, "hindex": 2, "updated": "2021-06-16T16:21:01.768Z" }
  , { "authorid": "2097351586", "externalids": { "DBLP": ["Nan Lower"], "ORCID": null }, "url": "https://www.semanticscholar.org/author/2097351586", "name": "Nan Lower", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-07-13T20:15:29.812Z" }
  , { "authorid": "2055238735", "externalids": null, "url": "https://www.semanticscholar.org/author/2055238735", "name": "Safrina Amini", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-11-29T01:02:29.826Z" }
  , { "authorid": "1680804818", "externalids": null, "url": "https://www.semanticscholar.org/author/1680804818", "name": "Hu Jing-Song, Zheng Qilun, Penghong Pandan, Wu Jie", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-28T01:02:26.586Z" }
  , { "authorid": "2146434950", "externalids": null, "url": "https://www.semanticscholar.org/author/2146434950", "name": "Dr. Nazeer Ahmed Kudligi", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-12-21T21:12:43.546Z" }
  , { "authorid": "30967508", "externalids": null, "url": "https://www.semanticscholar.org/author/30967508", "name": "Merzon Liya", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-19T20:42:12.619Z" }
  , { "authorid": "121451550", "externalids": null, "url": "https://www.semanticscholar.org/author/121451550", "name": "Bambang Riyanto Dr. Sundarso", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-23T16:55:20.872Z" }
  , { "authorid": "15124931", "externalids": null, "url": "https://www.semanticscholar.org/author/15124931", "name": "Kabkaew Sukomtason", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 15, "hindex": 1, "updated": "2021-05-24T05:33:04.274Z" }
  , { "authorid": "2109258984", "externalids": null, "url": "https://www.semanticscholar.org/author/2109258984", "name": "Mohd. Vaseem Khan", "aliases": null, "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 0, "hindex": 0, "updated": "2022-03-07T16:33:16.800Z" }
  , { "authorid": "98440977", "externalids": null, "url": "https://www.semanticscholar.org/author/98440977", "name": "Poorpartovi Alanagh Mirtaher", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-23T23:52:50.057Z" }
  , { "authorid": "2114330644", "externalids": null, "url": "https://www.semanticscholar.org/author/2114330644", "name": "A. A. Lepeshkin", "aliases": ["A A Lepeshkin", "Artem Aleksandrovich Lepeshkin"], "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 0, "hindex": 0, "updated": "2021-11-08T04:35:45.536Z" }
  , { "authorid": "2141608343", "externalids": null, "url": "https://www.semanticscholar.org/author/2141608343", "name": "Hilda Mutiah", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-11-24T08:05:26.920Z" }
  , { "authorid": "96722192", "externalids": null, "url": "https://www.semanticscholar.org/author/96722192", "name": "梁亚娟", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-26T03:10:07.080Z" }
  , { "authorid": "1413088913", "externalids": null, "url": "https://www.semanticscholar.org/author/1413088913", "name": "Jian Yuan-cai", "aliases": null, "affiliations": null, "homepage": null, "papercount": 7, "citationcount": 4, "hindex": 1, "updated": "2021-05-21T00:10:14.697Z" }
  , { "authorid": "136586274", "externalids": null, "url": "https://www.semanticscholar.org/author/136586274", "name": "郄会卿", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-20T22:13:58.379Z" }
  , { "authorid": "2146184903", "externalids": null, "url": "https://www.semanticscholar.org/author/2146184903", "name": "Martin Steinbacher", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-12-19T19:48:48.474Z" }
  , { "authorid": "119901562", "externalids": null, "url": "https://www.semanticscholar.org/author/119901562", "name": "A. Wilso", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-21T12:41:16.139Z" }
  , { "authorid": "2159140846", "externalids": null, "url": "https://www.semanticscholar.org/author/2159140846", "name": "M.D.U. Sewwandi", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2022-03-18T17:53:24.421Z" }
  , { "authorid": "147307501", "externalids": null, "url": "https://www.semanticscholar.org/author/147307501", "name": "Liza Firmani", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-23T19:35:40.732Z" }
  , { "authorid": "135246023", "externalids": null, "url": "https://www.semanticscholar.org/author/135246023", "name": "上田 靜正", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-21T01:56:57.422Z" }
  , { "authorid": "121801669", "externalids": null, "url": "https://www.semanticscholar.org/author/121801669", "name": "I. Iskersky", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-28T01:49:34.239Z" }
  , { "authorid": "84515481", "externalids": null, "url": "https://www.semanticscholar.org/author/84515481", "name": "Lévêque Jm", "aliases": ["Levêque Jm"], "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 1, "hindex": 1, "updated": "2021-05-15T02:15:30.478Z" }
  , { "authorid": "120537835", "externalids": null, "url": "https://www.semanticscholar.org/author/120537835", "name": "T.-P. Hong", "aliases": ["Tp Hong"], "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-08T10:58:57.964Z" }
  , { "authorid": "2129496814", "externalids": null, "url": "https://www.semanticscholar.org/author/2129496814", "name": "Ellysa Mae P. Capinig", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-10-02T08:13:14.642Z" }
  , { "authorid": "116785790", "externalids": null, "url": "https://www.semanticscholar.org/author/116785790", "name": "오노 슈헤이", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-19T18:07:17.852Z" }
  , { "authorid": "2103195627", "externalids": null, "url": "https://www.semanticscholar.org/author/2103195627", "name": "Mohammed kheiry", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 1, "hindex": 1, "updated": "2021-05-23T23:43:35.137Z" }
  , { "authorid": "144613469", "externalids": null, "url": "https://www.semanticscholar.org/author/144613469", "name": "S. Sista", "aliases": ["S. Sista", "Subrahmanya Srivathsava Sista", "Subrahmanyam Sista"], "affiliations": null, "homepage": null, "papercount": 5, "citationcount": 6, "hindex": 1, "updated": "2022-12-14T21:52:11.251Z" }
  , { "authorid": "136452687", "externalids": null, "url": "https://www.semanticscholar.org/author/136452687", "name": "荒木 紀章", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-29T10:52:19.520Z" }
  , { "authorid": "2096534377", "externalids": null, "url": "https://www.semanticscholar.org/author/2096534377", "name": "Maurici Serrahima", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2022-03-04T00:18:30.952Z" }
  , { "authorid": "144279605", "externalids": null, "url": "https://www.semanticscholar.org/author/144279605", "name": "K. A. Aliyeva", "aliases": ["Konul Ahad Aliyeva"], "affiliations": null, "homepage": null, "papercount": 4, "citationcount": 1, "hindex": 1, "updated": "2021-11-20T17:14:43.653Z" }
  , { "authorid": "117787931", "externalids": null, "url": "https://www.semanticscholar.org/author/117787931", "name": "辛怡颖", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-19T20:03:32.673Z" }
  , { "authorid": "114366656", "externalids": null, "url": "https://www.semanticscholar.org/author/114366656", "name": "가라사와도시유끼", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-04-19T22:27:04.174Z" }
  , { "authorid": "2043337057", "externalids": null, "url": "https://www.semanticscholar.org/author/2043337057", "name": "中澤優美子", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-29T23:51:26.810Z" }
  , { "authorid": "2090265565", "externalids": null, "url": "https://www.semanticscholar.org/author/2090265565", "name": "Latife Yazig", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 2, "hindex": 1, "updated": "2022-12-09T08:04:28.230Z" }
  , { "authorid": "2071443344", "externalids": null, "url": "https://www.semanticscholar.org/author/2071443344", "name": "Lu", "aliases": ["Lu"], "affiliations": null, "homepage": null, "papercount": 4, "citationcount": 8, "hindex": 2, "updated": "2022-06-04T06:11:43.569Z" }
  , { "authorid": "2032889433", "externalids": null, "url": "https://www.semanticscholar.org/author/2032889433", "name": "吕敦泳", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-24T17:46:20.755Z" }
  , { "authorid": "2171763333", "externalids": null, "url": "https://www.semanticscholar.org/author/2171763333", "name": "Samira E. El-Shafie,", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2022-06-23T21:31:51.562Z" }
  , { "authorid": "149130682", "externalids": null, "url": "https://www.semanticscholar.org/author/149130682", "name": "景娜", "aliases": null, "affiliations": null, "homepage": null, "papercount": 3, "citationcount": 0, "hindex": 0, "updated": "2021-05-28T17:13:01.301Z" }
  , { "authorid": "1485921396", "externalids": null, "url": "https://www.semanticscholar.org/author/1485921396", "name": "Jar kawi", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 1, "hindex": 1, "updated": "2021-05-15T01:09:13.038Z" }
  , { "authorid": "2078440180", "externalids": null, "url": "https://www.semanticscholar.org/author/2078440180", "name": "A. L. Chimishkyan", "aliases": null, "affiliations": null, "homepage": null, "papercount": 6, "citationcount": 0, "hindex": 0, "updated": "2021-04-20T03:36:43.967Z" }
  , { "authorid": "84539304", "externalids": null, "url": "https://www.semanticscholar.org/author/84539304", "name": "Mitra Rr", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-06-21T22:07:27.985Z" }
  , { "authorid": "2145868167", "externalids": null, "url": "https://www.semanticscholar.org/author/2145868167", "name": "А. А. Медников", "aliases": null, "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 0, "hindex": 0, "updated": "2021-12-30T19:45:23.375Z" }
  , { "authorid": "2153613355", "externalids": null, "url": "https://www.semanticscholar.org/author/2153613355", "name": "He Li", "aliases": null, "affiliations": null, "homepage": null, "papercount": 6, "citationcount": 0, "hindex": 0, "updated": "2022-02-09T00:23:15.483Z" }
  , { "authorid": "147214504", "externalids": null, "url": "https://www.semanticscholar.org/author/147214504", "name": "Kim Cheol Hu", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-06-15T01:43:27.247Z" }
  , { "authorid": "108475661", "externalids": null, "url": "https://www.semanticscholar.org/author/108475661", "name": "Tanggol Wika", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-05-19T23:03:56.224Z" }
  , { "authorid": "105054386", "externalids": null, "url": "https://www.semanticscholar.org/author/105054386", "name": "元鍾寬", "aliases": null, "affiliations": null, "homepage": null, "papercount": 7, "citationcount": 3, "hindex": 1, "updated": "2021-05-19T21:06:38.661Z" }
  , { "authorid": "2061405855", "externalids": null, "url": "https://www.semanticscholar.org/author/2061405855", "name": "M. Maks", "aliases": ["M. Maks", "M. H. Maks"], "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 0, "hindex": 0, "updated": "2021-04-01T00:52:04.408Z" }
  , { "authorid": "87938579", "externalids": null, "url": "https://www.semanticscholar.org/author/87938579", "name": "S. Mehmet", "aliases": ["S. Mehmet", "Solakhan Mehmet"], "affiliations": null, "homepage": null, "papercount": 2, "citationcount": 6, "hindex": 1, "updated": "2021-05-24T18:14:31.926Z" }
  , { "authorid": "120444838", "externalids": null, "url": "https://www.semanticscholar.org/author/120444838", "name": "Pascual s. Xviii Cucó", "aliases": null, "affiliations": null, "homepage": null, "papercount": 13, "citationcount": 0, "hindex": 0, "updated": "2021-05-25T00:30:12.151Z" }
  , { "authorid": "90245367", "externalids": null, "url": "https://www.semanticscholar.org/author/90245367", "name": "Turnipseed Mr", "aliases": null, "affiliations": null, "homepage": null, "papercount": 1, "citationcount": 0, "hindex": 0, "updated": "2021-06-22T00:48:49.549Z" }
]
const newAuthor = [
  {
    "authorid": "82841146",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2075151485",
    "name": "Zhou Qi-yan",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 5,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2022-12-16T02:48:41.086Z"
  },
  {
    "authorid": "73567229",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/116696852",
    "name": "Л. Г. Клюканова",
    "aliases": [
      "Лариса Геннадьевна Клюканова"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 3,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-21T01:12:55.377Z"
  },
  {
    "authorid": "82323325",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/120079528",
    "name": "윤화자",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-19T18:30:05.666Z"
  },
  {
    "authorid": "2057580993",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2002532194",
    "name": "鎌田 正之",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-23T20:28:45.357Z"
  },
  {
    "authorid": "2101071480",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/1453222180",
    "name": "Dbn Mahatma",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-24T01:24:37.843Z"
  },
  {
    "authorid": "148215366",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/1519690669",
    "name": "白帆（组稿）",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-23T16:41:29.915Z"
  },
  {
    "authorid": "1998355317",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/82731333",
    "name": "Blanche Rr",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-06-20T20:39:23.689Z"
  },
  {
    "authorid": "135385315",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2100054536",
    "name": "李義圭",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-21T13:13:43.679Z"
  },
  {
    "authorid": "92484094",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/148557071",
    "name": "Леликов Сергей Владимирович",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-11T21:06:30.670Z"
  },
  {
    "authorid": "117958316",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/48848121",
    "name": "S. Chen",
    "aliases": [
      "S Chen",
      "S. Chen",
      "Shengyun Chen"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 3,
    "citationcount": 238,
    "hindex": 2,
    "updated": "2022-02-08T11:13:34.939Z"
  },
  {
    "authorid": "2077746459",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/87338548",
    "name": "L. Wang",
    "aliases": [
      "L Wang",
      "Lin Yu Wang",
      "Lin Wang"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 12,
    "citationcount": 67,
    "hindex": 5,
    "updated": "2022-02-09T23:49:53.049Z"
  },
  {
    "authorid": "147719127",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2071064831",
    "name": "石井 久史",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-11T17:37:39.053Z"
  },
  {
    "authorid": "81394933",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/136592835",
    "name": "郭家祁",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-24T05:02:45.291Z"
  },
  {
    "authorid": "133634179",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/117900277",
    "name": "W. Radecke",
    "aliases": [
      "W. Radecke",
      "Waldemar Radecke"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-20T11:52:24.546Z"
  },
  {
    "authorid": "2174706672",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2174706672",
    "name": "Nur Hafizah",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2022-07-04T17:43:10.210Z"
  },
  {
    "authorid": "2128233357",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2096965162",
    "name": "Maxime Déniel",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-20T00:16:40.883Z"
  },
  {
    "authorid": "116102782",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/122313543",
    "name": "Aus Politik und Zeitgeschichte",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-21T13:05:22.776Z"
  },
  {
    "authorid": "152367071",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/79434319",
    "name": "Gurevitch Aw",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-26T13:24:47.738Z"
  },
  {
    "authorid": "2076640673",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2098348909",
    "name": "Pusceddu",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-20T07:20:21.663Z"
  },
  {
    "authorid": "119670674",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/1416077660",
    "name": "Dan Mandle",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 2,
    "hindex": 1,
    "updated": "2022-08-15T05:54:09.545Z"
  },
  {
    "authorid": "88432670",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/151338421",
    "name": "ジェニン スフールマン",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-19T18:08:07.128Z"
  },
  {
    "authorid": "38713355",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/73120858",
    "name": "June Thomsen Jetter",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 4,
    "citationcount": 29,
    "hindex": 3,
    "updated": "2021-05-20T21:51:03.105Z"
  },
  {
    "authorid": "2102406528",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/1998640795",
    "name": "苑麟勇",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-24T00:14:45.673Z"
  },
  {
    "authorid": "1521025403",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/135805464",
    "name": "幹夫 松浦",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-21T02:53:23.729Z"
  },
  {
    "authorid": "145468176",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2049761777",
    "name": "Jens Limpert",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 5,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-15T01:12:42.734Z"
  },
  {
    "authorid": "2063382994",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2145464769",
    "name": "Qing Wang",
    "aliases": [
      "Qing Ping Wang"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 3,
    "citationcount": 18,
    "hindex": 1,
    "updated": "2022-12-20T02:20:49.880Z"
  },
  {
    "authorid": "2053929500",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2129694454",
    "name": "Isdikah Nabila",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-11-14T18:55:33.859Z"
  },
  {
    "authorid": "135815555",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/94227378",
    "name": "ofNine",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2023-02-04T09:41:38.368Z"
  },
  {
    "authorid": "135089960",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2078279621",
    "name": "Alessio Bartolacelli",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-19T23:33:57.668Z"
  },
  {
    "authorid": "2037991",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2056143573",
    "name": "Masahide Ogawa",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-03-22T05:58:18.822Z"
  },
  {
    "authorid": "123610125",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2008797362",
    "name": "Hwang Yeon",
    "aliases": [
      "Hwang Dae Yeon"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 1,
    "hindex": 1,
    "updated": "2021-10-28T17:06:23.916Z"
  },
  {
    "authorid": "1998462236",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2160993626",
    "name": "Mallu Navaniswar Reddy",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2022-04-02T14:59:21.509Z"
  },
  {
    "authorid": "11464021",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2076213601",
    "name": "J. Cathala",
    "aliases": [
      "J-m Cathala",
      "J M Cathala"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 4,
    "hindex": 1,
    "updated": "2022-12-21T09:20:28.146Z"
  },
  {
    "authorid": "147306377",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2056843107",
    "name": "Eleanor B. Morris Wu",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 6,
    "citationcount": 3,
    "hindex": 1,
    "updated": "2021-12-13T23:03:41.602Z"
  },
  {
    "authorid": "79962915",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/1435212350",
    "name": "ツァオ、チュンリャン",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-19T19:21:46.978Z"
  },
  {
    "authorid": "49296307",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2042571872",
    "name": "N. ShainaBeegam",
    "aliases": [
      "N Shainabeegam"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-08-21T20:32:50.204Z"
  },
  {
    "authorid": "120760335",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/134491725",
    "name": "Merizalde Vizcaíno",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-21T17:58:00.247Z"
  },
  {
    "authorid": "2090980595",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/79921589",
    "name": "U. Wünschmann",
    "aliases": [
      "U Wünschmann"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-21T00:52:32.936Z"
  },
  {
    "authorid": "2090718499",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/83061594",
    "name": "矢野聖二",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 11,
    "citationcount": 1,
    "hindex": 1,
    "updated": "2021-05-20T20:13:56.195Z"
  },
  {
    "authorid": "52128312",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2027400133",
    "name": "S. Swindler",
    "aliases": [
      "S. Swindler",
      "Shaun Swindler"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-19T19:48:33.411Z"
  },
  {
    "authorid": "65960744",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2113767975",
    "name": "W. Su",
    "aliases": [
      "W Su",
      "Wang Su"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 3,
    "citationcount": 30,
    "hindex": 2,
    "updated": "2022-07-23T00:59:01.528Z"
  },
  {
    "authorid": "134527868",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/90921078",
    "name": "З Б Киенко",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2023-02-04T20:45:55.903Z"
  },
  {
    "authorid": "2104578001",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/71550358",
    "name": "리우 웨이량",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-19T18:08:51.918Z"
  },
  {
    "authorid": "2071686665",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/134592859",
    "name": "Paloma da Silva Nitsche",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-20T00:55:23.337Z"
  },
  {
    "authorid": "121697589",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2094898817",
    "name": "Ramos Verdi",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-10-09T14:25:41.431Z"
  },
  {
    "authorid": "2094841276",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/69522299",
    "name": "Rafi Nachimas",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 7,
    "hindex": 1,
    "updated": "2021-05-23T19:45:58.619Z"
  },
  {
    "authorid": "136560417",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/94066269",
    "name": "B. Kampa",
    "aliases": [
      "Barbara Kampa",
      "Barbara Dipl Chem Kampa"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 4,
    "citationcount": 4,
    "hindex": 1,
    "updated": "2023-02-04T10:24:37.476Z"
  },
  {
    "authorid": "2072059651",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/1594547724",
    "name": "Inostek",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-28T02:19:56.242Z"
  },
  {
    "authorid": "48954198",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/98421158",
    "name": "A. V. Fominov",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-20T12:43:28.528Z"
  },
  {
    "authorid": "69533156",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2103381071",
    "name": "Msc. Student Yaser M. Abdalateef",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-24T04:23:30.500Z"
  },
  {
    "authorid": "2097073081",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/13836438",
    "name": "Iu V Nemtsov",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 8,
    "citationcount": 6,
    "hindex": 2,
    "updated": "2021-06-16T16:21:01.768Z"
  },
  {
    "authorid": "119367071",
    "externalids": {
      "DBLP": [
        "Nan Lower"
      ],
      "ORCID": null
    },
    "url": "https://www.semanticscholar.org/author/2097351586",
    "name": "Nan Lower",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-07-13T20:15:29.812Z"
  },
  {
    "authorid": "1448576084",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2055238735",
    "name": "Safrina Amini",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-11-29T01:02:29.826Z"
  },
  {
    "authorid": "120300862",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/1680804818",
    "name": "Hu Jing-Song, Zheng Qilun, Penghong Pandan, Wu Jie",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-28T01:02:26.586Z"
  },
  {
    "authorid": "81018134",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2146434950",
    "name": "Dr. Nazeer Ahmed Kudligi",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-12-21T21:12:43.546Z"
  },
  {
    "authorid": "152513612",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/30967508",
    "name": "Merzon Liya",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-19T20:42:12.619Z"
  },
  {
    "authorid": "2004643",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/121451550",
    "name": "Bambang Riyanto Dr. Sundarso",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-23T16:55:20.872Z"
  },
  {
    "authorid": "1938364882",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/15124931",
    "name": "Kabkaew Sukomtason",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 15,
    "hindex": 1,
    "updated": "2021-05-24T05:33:04.274Z"
  },
  {
    "authorid": "123935727",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2109258984",
    "name": "Mohd. Vaseem Khan",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2022-03-07T16:33:16.800Z"
  },
  {
    "authorid": "135196725",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/98440977",
    "name": "Poorpartovi Alanagh Mirtaher",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-23T23:52:50.057Z"
  },
  {
    "authorid": "136541633",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2114330644",
    "name": "A. A. Lepeshkin",
    "aliases": [
      "A A Lepeshkin",
      "Artem Aleksandrovich Lepeshkin"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-11-08T04:35:45.536Z"
  },
  {
    "authorid": "121789643",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2141608343",
    "name": "Hilda Mutiah",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-11-24T08:05:26.920Z"
  },
  {
    "authorid": "1506115748",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/96722192",
    "name": "梁亚娟",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-26T03:10:07.080Z"
  },
  {
    "authorid": "77908756",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/1413088913",
    "name": "Jian Yuan-cai",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 7,
    "citationcount": 4,
    "hindex": 1,
    "updated": "2021-05-21T00:10:14.697Z"
  },
  {
    "authorid": "73484970",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/136586274",
    "name": "郄会卿",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-20T22:13:58.379Z"
  },
  {
    "authorid": "123615680",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2146184903",
    "name": "Martin Steinbacher",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-12-19T19:48:48.474Z"
  },
  {
    "authorid": "2439455",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/119901562",
    "name": "A. Wilso",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-21T12:41:16.139Z"
  },
  {
    "authorid": "50526110",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2159140846",
    "name": "M.D.U. Sewwandi",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2022-03-18T17:53:24.421Z"
  },
  {
    "authorid": "119567216",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/147307501",
    "name": "Liza Firmani",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-23T19:35:40.732Z"
  },
  {
    "authorid": "90261379",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/135246023",
    "name": "上田 靜正",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-21T01:56:57.422Z"
  },
  {
    "authorid": "1506654413",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/121801669",
    "name": "I. Iskersky",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-28T01:49:34.239Z"
  },
  {
    "authorid": "51387182",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/84515481",
    "name": "Lévêque Jm",
    "aliases": [
      "Levêque Jm"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 1,
    "hindex": 1,
    "updated": "2021-05-15T02:15:30.478Z"
  },
  {
    "authorid": "50262826",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/120537835",
    "name": "T.-P. Hong",
    "aliases": [
      "Tp Hong"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-08T10:58:57.964Z"
  },
  {
    "authorid": "118601041",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2129496814",
    "name": "Ellysa Mae P. Capinig",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-10-02T08:13:14.642Z"
  },
  {
    "authorid": "115663753",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/116785790",
    "name": "오노 슈헤이",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-19T18:07:17.852Z"
  },
  {
    "authorid": "117031495",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2103195627",
    "name": "Mohammed kheiry",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 1,
    "hindex": 1,
    "updated": "2021-05-23T23:43:35.137Z"
  },
  {
    "authorid": "52473898",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/144613469",
    "name": "S. Sista",
    "aliases": [
      "S. Sista",
      "Subrahmanya Srivathsava Sista",
      "Subrahmanyam Sista"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 5,
    "citationcount": 6,
    "hindex": 1,
    "updated": "2022-12-14T21:52:11.251Z"
  },
  {
    "authorid": "3010093",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/136452687",
    "name": "荒木 紀章",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-29T10:52:19.520Z"
  },
  {
    "authorid": "52042498",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2096534377",
    "name": "Maurici Serrahima",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2022-03-04T00:18:30.952Z"
  },
  {
    "authorid": "144520723",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/144279605",
    "name": "K. A. Aliyeva",
    "aliases": [
      "Konul Ahad Aliyeva"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 4,
    "citationcount": 1,
    "hindex": 1,
    "updated": "2021-11-20T17:14:43.653Z"
  },
  {
    "authorid": "104536565",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/117787931",
    "name": "辛怡颖",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-19T20:03:32.673Z"
  },
  {
    "authorid": "2096721831",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/114366656",
    "name": "가라사와도시유끼",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-19T22:27:04.174Z"
  },
  {
    "authorid": "144228103",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2043337057",
    "name": "中澤優美子",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-29T23:51:26.810Z"
  },
  {
    "authorid": "102542124",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2090265565",
    "name": "Latife Yazig",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 2,
    "hindex": 1,
    "updated": "2022-12-09T08:04:28.230Z"
  },
  {
    "authorid": "144326969",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2071443344",
    "name": "Lu",
    "aliases": [
      "Lu"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 4,
    "citationcount": 8,
    "hindex": 2,
    "updated": "2022-06-04T06:11:43.569Z"
  },
  {
    "authorid": "65848783",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2032889433",
    "name": "吕敦泳",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-24T17:46:20.755Z"
  },
  {
    "authorid": "30552807",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2171763333",
    "name": "Samira E. El-Shafie,",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2022-06-23T21:31:51.562Z"
  },
  {
    "authorid": "70060372",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/149130682",
    "name": "景娜",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 3,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-28T17:13:01.301Z"
  },
  {
    "authorid": "2060006973",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/1485921396",
    "name": "Jar kawi",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 1,
    "hindex": 1,
    "updated": "2021-05-15T01:09:13.038Z"
  },
  {
    "authorid": "31807348",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2078440180",
    "name": "A. L. Chimishkyan",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 6,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-20T03:36:43.967Z"
  },
  {
    "authorid": "52355382",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/84539304",
    "name": "Mitra Rr",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-06-21T22:07:27.985Z"
  },
  {
    "authorid": "2119303277",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2145868167",
    "name": "А. А. Медников",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-12-30T19:45:23.375Z"
  },
  {
    "authorid": "70536805",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2153613355",
    "name": "He Li",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 6,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2022-02-09T00:23:15.483Z"
  },
  {
    "authorid": "52643557",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/147214504",
    "name": "Kim Cheol Hu",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-06-15T01:43:27.247Z"
  },
  {
    "authorid": "48148314",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/108475661",
    "name": "Tanggol Wika",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-19T23:03:56.224Z"
  },
  {
    "authorid": "3242952",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/105054386",
    "name": "元鍾寬",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 7,
    "citationcount": 3,
    "hindex": 1,
    "updated": "2021-05-19T21:06:38.661Z"
  },
  {
    "authorid": "95219312",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/2061405855",
    "name": "M. Maks",
    "aliases": [
      "M. Maks",
      "M. H. Maks"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-04-01T00:52:04.408Z"
  },
  {
    "authorid": "2078614117",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/87938579",
    "name": "S. Mehmet",
    "aliases": [
      "S. Mehmet",
      "Solakhan Mehmet"
    ],
    "affiliations": null,
    "homepage": null,
    "papercount": 2,
    "citationcount": 6,
    "hindex": 1,
    "updated": "2021-05-24T18:14:31.926Z"
  },
  {
    "authorid": "144871650",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/120444838",
    "name": "Pascual s. Xviii Cucó",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 13,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-05-25T00:30:12.151Z"
  },
  {
    "authorid": "46883825",
    "externalids": null,
    "url": "https://www.semanticscholar.org/author/90245367",
    "name": "Turnipseed Mr",
    "aliases": null,
    "affiliations": null,
    "homepage": null,
    "papercount": 1,
    "citationcount": 0,
    "hindex": 0,
    "updated": "2021-06-22T00:48:49.549Z"
  }
]

const PaperAuthors = [
  {
    "paperId": 224735017,
    "authorId": "82841146"
  },
  {
    "paperId": 116229089,
    "authorId": "73567229"
  },
  {
    "paperId": 148420979,
    "authorId": "82323325"
  },
  {
    "paperId": 201728798,
    "authorId": "2057580993"
  },
  {
    "paperId": 211943053,
    "authorId": "2101071480"
  },
  {
    "paperId": 187981005,
    "authorId": "148215366"
  },
  {
    "paperId": 222982347,
    "authorId": "1998355317"
  },
  {
    "paperId": 173617068,
    "authorId": "135385315"
  },
  {
    "paperId": 178772006,
    "authorId": "92484094"
  },
  {
    "paperId": 175930642,
    "authorId": "117958316"
  },
  {
    "paperId": 200179912,
    "authorId": "2077746459"
  },
  {
    "paperId": 189500280,
    "authorId": "147719127"
  },
  {
    "paperId": 211583590,
    "authorId": "81394933"
  },
  {
    "paperId": 172114748,
    "authorId": "133634179"
  },
  {
    "paperId": 231547257,
    "authorId": null
  },
  {
    "paperId": 245767741,
    "authorId": "2128233357"
  },
  {
    "paperId": 184221890,
    "authorId": "116102782"
  },
  {
    "paperId": 100354367,
    "authorId": "152367071"
  },
  {
    "paperId": 239463238,
    "authorId": "2076640673"
  },
  {
    "paperId": 223455905,
    "authorId": "119670674"
  },
  {
    "paperId": 221003259,
    "authorId": "88432670"
  },
  {
    "paperId": 207833264,
    "authorId": "38713355"
  },
  {
    "paperId": 130487157,
    "authorId": "2102406528"
  },
  {
    "paperId": 229919433,
    "authorId": "1521025403"
  },
  {
    "paperId": 229974473,
    "authorId": "145468176"
  },
  {
    "paperId": 232872676,
    "authorId": "2063382994"
  },
  {
    "paperId": 166795343,
    "authorId": "2053929500"
  },
  {
    "paperId": 209108941,
    "authorId": "135815555"
  },
  {
    "paperId": 213338766,
    "authorId": "135089960"
  },
  {
    "paperId": 113436696,
    "authorId": "2037991"
  },
  {
    "paperId": 126395704,
    "authorId": "123610125"
  },
  {
    "paperId": 223624270,
    "authorId": "1998462236"
  },
  {
    "paperId": 221209842,
    "authorId": "11464021"
  },
  {
    "paperId": 193484979,
    "authorId": "147306377"
  },
  {
    "paperId": 191307331,
    "authorId": "79962915"
  },
  {
    "paperId": 190070331,
    "authorId": "49296307"
  },
  {
    "paperId": 199929648,
    "authorId": "120760335"
  },
  {
    "paperId": 190481913,
    "authorId": "2090980595"
  },
  {
    "paperId": 234288557,
    "authorId": "2090718499"
  },
  {
    "paperId": 230379802,
    "authorId": "52128312"
  },
  {
    "paperId": 227739834,
    "authorId": "65960744"
  },
  {
    "paperId": 213893678,
    "authorId": "134527868"
  },
  {
    "paperId": 197635874,
    "authorId": "2104578001"
  },
  {
    "paperId": 189632833,
    "authorId": "2071686665"
  },
  {
    "paperId": 187913032,
    "authorId": "121697589"
  },
  {
    "paperId": 179649345,
    "authorId": "2094841276"
  },
  {
    "paperId": 176487983,
    "authorId": "136560417"
  },
  {
    "paperId": 211827828,
    "authorId": "2072059651"
  },
  {
    "paperId": 204405528,
    "authorId": "48954198"
  },
  {
    "paperId": 195625316,
    "authorId": "69533156"
  },
  {
    "paperId": 170674382,
    "authorId": "2097073081"
  },
  {
    "paperId": 169842917,
    "authorId": "119367071"
  },
  {
    "paperId": 167631039,
    "authorId": "1448576084"
  },
  {
    "paperId": 166333729,
    "authorId": "120300862"
  },
  {
    "paperId": 188300267,
    "authorId": "81018134"
  },
  {
    "paperId": 186146525,
    "authorId": "152513612"
  },
  {
    "paperId": 183720853,
    "authorId": "2004643"
  },
  {
    "paperId": 183063078,
    "authorId": "1938364882"
  },
  {
    "paperId": 177041830,
    "authorId": "123935727"
  },
  {
    "paperId": 175240477,
    "authorId": "135196725"
  },
  {
    "paperId": 175010110,
    "authorId": "136541633"
  },
  {
    "paperId": 164633532,
    "authorId": "121789643"
  },
  {
    "paperId": 159394527,
    "authorId": "1506115748"
  },
  {
    "paperId": 159379291,
    "authorId": "77908756"
  },
  {
    "paperId": 156425544,
    "authorId": "73484970"
  },
  {
    "paperId": 155430874,
    "authorId": "123615680"
  },
  {
    "paperId": 155431776,
    "authorId": "2439455"
  },
  {
    "paperId": 152548559,
    "authorId": "50526110"
  },
  {
    "paperId": 160225614,
    "authorId": "119567216"
  },
  {
    "paperId": 161723494,
    "authorId": "90261379"
  },
  {
    "paperId": 160615127,
    "authorId": "1506654413"
  },
  {
    "paperId": 159768405,
    "authorId": "51387182"
  },
  {
    "paperId": 164269070,
    "authorId": "50262826"
  },
  {
    "paperId": 151623366,
    "authorId": "118601041"
  },
  {
    "paperId": 148852232,
    "authorId": "115663753"
  },
  {
    "paperId": 146137898,
    "authorId": "117031495"
  },
  {
    "paperId": 142729306,
    "authorId": "52473898"
  },
  {
    "paperId": 134275910,
    "authorId": "3010093"
  },
  {
    "paperId": 128509371,
    "authorId": "52042498"
  },
  {
    "paperId": 128154703,
    "authorId": "144520723"
  },
  {
    "paperId": 127748211,
    "authorId": "104536565"
  },
  {
    "paperId": 124437071,
    "authorId": "2096721831"
  },
  {
    "paperId": 124288658,
    "authorId": "144228103"
  },
  {
    "paperId": 124292625,
    "authorId": "102542124"
  },
  {
    "paperId": 119525194,
    "authorId": "144326969"
  },
  {
    "paperId": 113477693,
    "authorId": "65848783"
  },
  {
    "paperId": 112838191,
    "authorId": "30552807"
  },
  {
    "paperId": 108731123,
    "authorId": "70060372"
  },
  {
    "paperId": 108895592,
    "authorId": "2060006973"
  },
  {
    "paperId": 117183378,
    "authorId": "31807348"
  },
  {
    "paperId": 116781577,
    "authorId": "52355382"
  },
  {
    "paperId": 114732234,
    "authorId": "2119303277"
  },
  {
    "paperId": 114113391,
    "authorId": "70536805"
  },
  {
    "paperId": 114294878,
    "authorId": "52643557"
  },
  {
    "paperId": 111583213,
    "authorId": "48148314"
  },
  {
    "paperId": 110833111,
    "authorId": "3242952"
  },
  {
    "paperId": 107549907,
    "authorId": "95219312"
  },
  {
    "paperId": 107034924,
    "authorId": "2078614117"
  },
  {
    "paperId": 106844734,
    "authorId": "144871650"
  },
  {
    "paperId": 106617631,
    "authorId": "46883825"
  }
]

// const paper_author = []
// papers.forEach((paper, index) => {
//   if (paper.authors.length > 0) {
//     // authors[index].authorid = paper.authors[0].authorId
//     paper_author.push({ paperId: paper.corpusid, authorId: paper.authors[0].authorId })

//     // paper.authors.forEach(PA => {
//     // })
//   } else {
//     paper_author.push({ paperId: paper.corpusid, authorId: null })
//   }
// })


// const jsonResult = JSON.stringify(paper_author, null, 2);
// fs.writeFile('result.json', jsonResult, (err) => {
//   if (err) {
//     console.error('Error writing JSON file:', err);
//   } else {
//     console.log('Result saved to result.json');
//   }
// });

// const jsonResultAuthor = JSON.stringify(authors, null, 2);
// fs.writeFile('jsonResultAuthor.json', jsonResultAuthor, (err) => {
//   if (err) {
//     console.error('Error writing JSON file:', err);
//   } else {
//     console.log('Result saved to jsonResultAuthor.json');
//   }
// });



// const readFile = (filePath, model) => {
//   // Create a readline interface
//   const arr = []
//   const rlPaper = readline.createInterface({
//     input: fs.createReadStream(filePath),
//     crlfDelay: Infinity
//   });
//   rlPaper.on('line', async (line) => {
//     try {
//       // Parse each line as JSON
//       const jsonObject = JSON.parse(line);
//       arr.push(jsonObject)
//       await model.create({ ...jsonObject })

//     } catch (error) {
//       console.error('Error parsing Paper JSON:', error);
//       rlPaper.close()
//     }
//   });
//   rlPaper.on('close', () => {
//     console.log(arr)
//     console.log('Finished reading the JSONL file.', arr);
//   });
//   return arr
// }
// readFile(filePathAuthors,Author)



// const upload = async (array, m) => {
//   try {
//     for (let index = 0; index < array.length; index++) {
//       const element = array[index];
//       console.log(element);
//       await m.create({ ...element })
//     }
//   } catch (error) {
//     console.log("Error: ", error)
//   }
// }
// upload(newAuthor, authorModel)
// upload(PaperAuthors, PaperAuthor)
// upload(papers, paperModel)

const axios = require('axios');
const path = require('path');
const zlib = require('zlib');

async function downloadFile(url, destination) {
  try {
    const response = await axios.get(url, { responseType: 'stream' });
    // const fileStream = fs.createWriteStream(destination);

    // response.data.pipe(fileStream);

    // return new Promise((resolve, reject) => {
    //   fileStream.on('finish', resolve);
    //   fileStream.on('error', reject);
    // });
  } catch (error) {
    console.error(`Error downloading file from ${url}:`, error.message);
    throw error;
  }
}

async function extractFile(gzipFilePath, destinationFolder) {
  try {
    const gzipFileStream = fs.createReadStream(gzipFilePath);
    const unzipStream = zlib.createGunzip();
    const destinationFileStream = fs.createWriteStream(destinationFolder);

    gzipFileStream.pipe(unzipStream).pipe(destinationFileStream);

    return new Promise((resolve, reject) => {
      destinationFileStream.on('finish', resolve);
      destinationFileStream.on('error', reject);
    });
  } catch (error) {
    console.error(`Error extracting file ${gzipFilePath}:`, error.message);
    throw error;
  }
}

async function downloadAndExtractFiles(links) {
  const downloadFolder = './dataset'; // Change the destination folder as needed

  if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder);
  }

  for (let i = 0; i < links.length; i++) {
    const url = links[i];
    const filename = `authors_${i}`;
    const gzipFilePath = path.join(downloadFolder, filename);

    await downloadFile(url, gzipFilePath);
    console.log(`File downloaded from ${url} to ${gzipFilePath}`);

    // const extractionFolder = path.join(downloadFolder, filename);
    // await extractFile(gzipFilePath, extractionFolder);
    // console.log(`File extracted to ${extractionFolder}`);
  }
}




// Usage example:
const links = []


downloadAndExtractFiles(links).catch((error) => {
  console.error('Error downloading and extracting files:', error);
});
