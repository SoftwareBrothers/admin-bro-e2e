import {
  mongoose,
} from '../support/cssCommonSelectors';
const { boardView } = mongoose;

//On main page like Categories get values from td's 
export const getFormValues = function(tr, tdIndex) {
  const results = [];
  for (let i = 0; i < tdIndex.length; i += 1) {
    results.push(tr.find(boardView.tableTds).eq(tdIndex[i]).text());
  }
  return results;
};

// basic method to extract text from passed elements,
// did't delete getFormValues couse might conflict a lot with other testers
export const getTextFromChildElements= function(parent, child, index){
  const results = [];
  for (let i = 0; i < index.length; i += 1) {
    results.push(parent.find(child).eq(index[i]).text());
  } 
  return results;
};

