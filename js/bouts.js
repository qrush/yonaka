// Bout card, tournament records, up next, leaders, and keyboard controls.
//
// Keyboard (in OBS: right-click the source > Interact):
//   E / W        call the winner (east / west)
//   → or N       next bout (picks a random winner if none has been called)
//   R            reset to the start of the day
//   L            toggle the LIVE / REPLAY badge
//
// URL hash options:
//   #obs         transparent background for the OBS browser source
//   #replay      start with the REPLAY badge

(function () {
  const { japaneseNames, wrestlers, bouts } = window.MidnightSumo;

  const startingRecords = {};
  for (const name in wrestlers) {
    startingRecords[name] = wrestlers[name].rec;
  }

  const TOTAL_BOUTS = 21;
  const FIRST_BOUT_NUMBER = TOTAL_BOUTS - bouts.length + 1;
  const RECORD_DAYS = 15;
  const TODAY_INDEX = 13; // day 14, zero-indexed

  const RANK_ABBREVIATIONS = {
    Yokozuna: "Y",
    Ozeki: "O",
    Sekiwake: "S",
    Komusubi: "K",
  };

  let currentBout = 0;
  let winner = null;
  let replay = false;

  if (location.hash.includes("obs")) {
    document.body.classList.add("obs");
  }

  const $ = (id) => document.getElementById(id);

  const countOf = (name, letter) => wrestlers[name].rec.split(letter).length - 1;
  const wins = (name) => countOf(name, "W");
  const losses = (name) => countOf(name, "L");
  const record = (name) => `${wins(name)}-${losses(name)}`;

  const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  const escapeHtml = (value) => String(value).replace(/[&<>"]/g, (char) => ESCAPES[char]);

  // "Maegashira 3" -> "M3", "Ozeki" -> "O"
  function rankTag(name) {
    const [title, number = ""] = wrestlers[name].rank.split(" ");
    return RANK_ABBREVIATIONS[title] || `M${number}`;
  }

  function renderFighter(element, name, side) {
    const japanese = japaneseNames[name] || "";
    const { rank, stable } = wrestlers[name];

    let state = "";
    if (winner) state = winner === name ? "won" : "lost";

    const kachiKoshi =
      winner === name && wins(name) === 8 ? `<div class="badge">Kachi-koshi</div>` : "";

    element.className = `f ${side} ${state}`;
    element.innerHTML = `
      <div class="rank">${side === "east" ? "East" : "West"} · ${escapeHtml(rank)}</div>
      <div class="jp${japanese.length > 3 ? " long" : ""}" lang="ja">${escapeHtml(japanese)}</div>
      <div class="name${name.length > 10 ? " long" : ""}">${escapeHtml(name)}</div>
      <div class="stable">${escapeHtml(stable)}</div>
      ${kachiKoshi}
    `;
  }

  function recordRow(name) {
    const dots = wrestlers[name].rec
      .padEnd(RECORD_DAYS, "-")
      .split("")
      .map((day) => {
        if (day === "W") return `<div class="dot w"></div>`;
        if (day === "L") return `<div class="dot l"></div>`;
        return `<div class="dot"></div>`;
      })
      .join("");

    return `
      <div class="rrow">
        <div class="top">
          <span class="nm">
            ${escapeHtml(name)}<span class="jpn" lang="ja">${escapeHtml(japaneseNames[name] || "")}</span>
          </span>
          <span class="rec">${record(name)}</span>
        </div>
        <div class="dots">${dots}</div>
      </div>
    `;
  }

  function renderUpNext() {
    const nextBout = bouts[currentBout + 1];

    if (!nextBout) {
      $("nextMeta").textContent = "Makuuchi";
      $("cards").innerHTML = `<div class="nextline empty">Last bout of the day</div>`;
      return;
    }

    const [east, west] = nextBout;
    $("nextMeta").textContent = `Makuuchi · Bout ${FIRST_BOUT_NUMBER + currentBout + 1}`;
    $("cards").innerHTML = `
      <div class="nextline">
        <span>${escapeHtml(east)}</span><span class="nr">${record(east)}</span>
        <span class="nvs">vs</span>
        <span>${escapeHtml(west)}</span><span class="nr">${record(west)}</span>
      </div>
    `;
  }

  function renderLeaders() {
    const leaders = Object.keys(wrestlers)
      .sort((a, b) => wins(b) - wins(a) || losses(a) - losses(b))
      .slice(0, 4);

    $("leaders").innerHTML = leaders
      .map(
        (name) => `
        <div class="lrow">
          <span>${escapeHtml(name)} (${rankTag(name)})</span>
          <b>${record(name)}</b>
        </div>
      `,
      )
      .join("");
  }

  function render() {
    const [east, west] = bouts[currentBout];

    $("boutNo").textContent = `Bout ${FIRST_BOUT_NUMBER + currentBout} of ${TOTAL_BOUTS}`;
    renderFighter($("fEast"), east, "east");
    renderFighter($("fWest"), west, "west");

    $("records").innerHTML = recordRow(east) + recordRow(west);
    $("result").textContent = winner ? `${winner} wins` : "";

    renderUpNext();
    renderLeaders();
  }

  function callWinner(side) {
    if (winner) return;

    const [east, west] = bouts[currentBout];
    winner = side === "east" ? east : west;
    const loser = side === "east" ? west : east;

    wrestlers[winner].rec += "W";
    wrestlers[loser].rec += "L";
    render();

    document.querySelectorAll(".dots").forEach((dots) => {
      const today = dots.children[TODAY_INDEX];
      if (today) today.classList.add("new");
    });
  }

  function nextBout() {
    if (!winner) {
      callWinner(Math.random() < 0.5 ? "east" : "west");
      return;
    }

    const panel = $("boutPanel");
    panel.classList.add("swap");

    setTimeout(() => {
      if (currentBout === bouts.length - 1) {
        reset();
      } else {
        currentBout++;
        winner = null;
        render();
      }
      requestAnimationFrame(() => panel.classList.remove("swap"));
    }, 350);
  }

  function reset() {
    for (const name in startingRecords) {
      wrestlers[name].rec = startingRecords[name];
    }
    currentBout = 0;
    winner = null;
    render();
  }

  const liveBadge = $("liveBadge");

  function setReplayMode(value) {
    replay = value;
    liveBadge.textContent = replay ? "REPLAY" : "LIVE";
  }

  setReplayMode(location.hash.includes("replay"));

  // Fit the 1920x1080 stage to the window (exactly 1:1 in a 1920x1080 OBS browser source)
  const stage = $("stage");

  function fitStage() {
    const scale = Math.min(innerWidth / 1920, innerHeight / 1080);
    const offsetX = (innerWidth - 1920 * scale) / 2;
    const offsetY = (innerHeight - 1080 * scale) / 2;
    stage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  }

  window.addEventListener("resize", fitStage);
  fitStage();

  document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
      case "e":
        callWinner("east");
        break;
      case "w":
        callWinner("west");
        break;
      case "arrowright":
      case "n":
        nextBout();
        break;
      case "r":
        reset();
        break;
      case "l":
        setReplayMode(!replay);
        break;
    }
  });

  render();
})();
