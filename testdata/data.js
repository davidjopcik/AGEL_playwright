const path = require('path');

export const data = {
    zz: "N53 NKR - Nemocnica AGEL Krompachy s.r.o.",
    stredisko: "090201, Odbor technicko-investičný",
    skupinaMajetkuDesc: "SHV",
    skupinaMajetku: "SHV - zdravodná technika nad EUR 1.700",
    nazovMajetku: "Testovací majetok",
    dovodVyradeniaMajetku: "Poškodenie",
    vstupnaCena: "5486",
    zodpovednaOsoba: "Izidor Zodpovený",
    datumVystaveniaNavrhu: "9.11.2023",
    inventarneCIsloMajetku: "1598456",
    zostatkovaCena: "4500",
    sposobVyradenia: "Likvidácia",
    schvalenie: "Schvaľujem",
    priradenie: "DOKONČIŤ",
    cisloDokladuVESO9: "135425648",
    inventarneCisloVESO9: ""
}

const relativeFilePath = path.join(__dirname, 'files', 'testFile.jpg');

export const imgFolder = {
    relativeFilePath,
};

