/**
* Code: Divya Mohan 
* Date: 28-4-2022 
* Following is an implmentation for Rest Api which generate 
* valid new words from string provided.
**/

const express = require('express');
let json = require(process.cwd() + '/dict.json');
var mcache = require('memory-cache');
const router = express.Router();

/**
* Function to cache the response for input <duration> in seconds. 
* Key is url 
* Value is response
**/
var cache = (duration) => {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url
      let cachedBody = mcache.get(key)
      if (cachedBody) {
        res.send(cachedBody)
        return
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          mcache.put(key, body, duration * 1000);
          res.sendResponse(body)
        }
        next()
      }
    }
  }


/**
* Function to return a list of all substrings for the given string.
**/  
function getAllSubstrings(str) {
    var i, j, result = [];
  
    for (i = 0; i < str.length; i++) {
        for (j = i + 1; j < str.length + 1; j++) {
            result.push(str.slice(i, j));
        }
    }
    return result;
}


/**
* Route returns a list of all possible combination of words formed
* from the given 2 words in request params
**/
router.get('/:word1/:word2',cache(60),(req, res, next)=>{
    word1 = req.params.word1;
    word2 = req.params.word2;
    const word1_substrings = getAllSubstrings(word1);
    const word2_substrings = getAllSubstrings(word2);
    let text = Array();
    for (i = 0; i < word1_substrings.length; i++) {
        for (j = 0; j < word2_substrings.length; j++) {
            new_word = word1_substrings[i] + word2_substrings[j];
            if (json[new_word]==1){
                text.push(new_word);
            }
        }
    }
    const output_json = {'words':text};
    if (text.length==0){
        res.status(404).send('no words found');
    }
    else{
        res.status(200).json(output_json);
    }
});

module.exports = router;