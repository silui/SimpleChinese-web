var assert = require("chai").assert;
var ss=require("./toBeTested.js");

stripScore=ss.stripScore;
describe("Testing quizselect function", function()
{
  it("should be 0/32", function(){
    assert.equal("0/32",stripScore("7/32"));
  })
});
