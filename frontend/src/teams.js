const teams = [
    {
        id: 1,
        name: "Al-Ahly"
    },
    {
        id: 2,
        name: "C. Cleopatra"
    },
    {
        id: 3,
        name: "El-Bank El-Ahly"
    },
    {
        id: 4,
        name: "El-Masry"
    },
    {
        id: 5,
        name: "El-Mokawloon El-Arab"
    },
    {
        id: 6,
        name: "Aswan"
    },
    {
        id: 7,
        name: "El-Zamalek",

    },
    {
        id: 8,
        name: "Pyramids"
    },
    {
        id: 9,
        name: "Smouha"
    },
    {
        id: 10,
        name: "Enppi"
    },
    {
        id: 11,
        name: "El-Esmailly"
    },
    {
        id: 12,
        name: "El-Gouna"
    },
    {
        id: 13,
        name: "El-Entag El-harby"
    },
    {
        id: 14,
        name: "Masr El-Makassa"
    },
    {
        id: 15,
        name: "Wadi Degla",
    },
    {
        id: 16,
        name: "El-Ettahad El-Sakandry",
    },
    {
        id: 17,
        name: "Tala'ea El-Gaish",
    },
    {
        id: 18,
        name: "Ghazl El-Mahla",
    },
];

function teamsLogos(r) {
    let logos = []
    let logosImages = r.keys().map(r)
    teams.forEach(team => { 
      logos[team.name] = logosImages[team.id - 1].default 
    })
    return logos;
}

const logos_30x30 = teamsLogos(require.context('./images/teams_logos_30x30/', false, /\.(png)$/));
const logos_60x60 = teamsLogos(require.context('./images/teams_logos_60x60/', false, /\.(png)$/));
const logos_120x120 = teamsLogos(require.context('./images/teams_logos_120x120/', false, /\.(png)$/));
export {teams, logos_30x30, logos_60x60, logos_120x120}