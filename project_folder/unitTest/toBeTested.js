//This store the function that needed to be unit tested


//this returns 4/24 into 0/24, aka strinping numerator while preserving denominator
function stripScore(inputText)
{
  var outOf=inputText.split('/')[1];
  return `0/${outOf}`;
}


exports.stripScore=stripScore;
