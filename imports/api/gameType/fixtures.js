var gameType = [{
    "name" : "Tiro Rápido",
    "maxPlayers" : 1,
    "time" : 20000,
    "maxTargets" : 5,
    "individual" : true,
    "rules" : {
        "stopWhenHitted" : false
    }
  }
];


export default function generateFixtures(){
  this.insert({
    name: 'Tiro Rápido',
    maxPlayers: 1,
    time: 200,
    maxTargets: 5,
    rules:{
        stopWhenHitted: false
    }
  },{
    name: 'IPSC',
    maxPlayers: 1,
    maxTargets: 5,
    rules:{
      stopWhenHitted: true
    }
  }
)



}
