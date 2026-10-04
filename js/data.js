// Today's card: wrestler records and bout order.
//
// Records are one letter per day so far: W = win, L = loss.

window.MidnightSumo = {
  // Japanese names, shown under the English name on the bout card
  japaneseNames: {
    Oho: "王鵬",
    Takerufuji: "尊富士",
    Wakatakakage: "若隆景",
    Kirishima: "霧島",
    Kotozakura: "琴櫻",
    Onosato: "大の里",
    Hoshoryu: "豊昇龍",
    Ura: "宇良",
  },

  // prettier-ignore
  wrestlers: {
    Oho:          { rank: "Maegashira 3", stable: "Otake",       rec: "WLWWLLWWLWWLW" },
    Takerufuji:   { rank: "Maegashira 2", stable: "Isegahama",   rec: "LWWLWLWWLLWWL" },
    Wakatakakage: { rank: "Sekiwake",     stable: "Arashio",     rec: "WWLWLWWLWLWLW" },
    Kirishima:    { rank: "Komusubi",     stable: "Otowayama",   rec: "LWWLWLWLWWLLW" },
    Kotozakura:   { rank: "Ozeki",        stable: "Sadogatake",  rec: "WLWWLWWLWWLWW" },
    Onosato:      { rank: "Yokozuna",     stable: "Nishonoseki", rec: "WWLWWWWLWWWWW" },
    Hoshoryu:     { rank: "Yokozuna",     stable: "Tatsunami",   rec: "WWWLWWLWWWLWW" },
    Ura:          { rank: "Komusubi",     stable: "Kise",        rec: "WLWWWLWLWWWLW" },
  },

  // Bouts in order, as [east, west]
  bouts: [
    ["Oho", "Takerufuji"],
    ["Wakatakakage", "Kirishima"],
    ["Kotozakura", "Onosato"],
    ["Hoshoryu", "Ura"],
  ],
};
