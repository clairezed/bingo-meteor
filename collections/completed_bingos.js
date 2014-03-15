CompletedBingos = new Meteor.Collection('completed_bingos');

Meteor.methods({
  checkBingo: function(foundContents){
    console.log("Check BINGOS");
    // console.log(foundContents.founds);

    var playerFoundCases = foundContents.founds;

    var bingo = _.find(winCombinations, function(combi){
          return (_.intersection(combi, playerFoundCases).length == 5); 
      });

    if (bingo != undefined) {
      console.log("BIIIIINGO");
    }else{
      console.log("not yet");
    }

    // winCombinations.forEach(function(combi){
    //   // console.log("resultst containsAll:")
    //   // console.log(containsAll(combi, playerFoundCases));
    //   if(containsAll(combi, playerFoundCases)){
    //     console.log("Bingo !"); 
    //   }else{
    //     console.log("not yet");
    //   }
    // })

   //  function containsAll(combi, playerCases){ 
   //    _.each(combi, function(number, index, list){
   //      console.log(list);
   //        if(!_.contains(playerCases, combi[index])){
   //            return false;
   //          }
   //         return true;
   //    })
   // };

 //   function containsAll(combi, playerCases){ 
 //    for(var i = 0 , len = combi.length; i < len; i++){
 //     if($.inArray(combi[i], playerCases) == -1) return false;
 //   }
 //   return true;
 // }

 }
})

winCombinations = [
[1, 2, 3, 4, 5],          [6, 7, 8, 9, 10], 
[11, 12, 13, 14, 15], [16, 17, 18, 19, 20], 
[21, 22, 23, 24, 25], [1, 6, 11, 16, 21], 
[2, 7, 12, 17, 22],     [3, 8, 13, 18, 23],
[4, 9, 14, 19, 24],     [5, 10, 15, 20, 25], 
[1, 7, 13, 19, 25],     [5, 9, 13, 17, 21]
]
