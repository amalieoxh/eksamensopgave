// opretter en klasse for mulige matches 

class Match {
    constructor(matchId, matchName, matchDescription, matchImage) {

        this._matchId = matchId;
        this._matchName = matchName;
        this._matchDescription = matchDescription;
        this._matchImage = matchImage;
    
    }

}

// Her oprettes mulige matches, som efterfølgende hentes i HTML 

var match1 = new Match (1, "Donald", "20 år - glad for hockey",
    "../images/match1.png");

var match2 = new Match(2, "Lars", "30 år - elsker en god LAN-party og er fan er Justin Bieber", "../images/match2.png");

var match3 = new Match(3, "Boris", "25 år - glad for alt med gulerødder", "../images/match3.png");


var match4 = new Match(4, "Frederik", "40 år - kan godt lide at flyve", "../images/match4.png");



//  laver et array for de mulige matches, så de kan benyttets i et loop 
var matches = [match1, match2, match3, match4];