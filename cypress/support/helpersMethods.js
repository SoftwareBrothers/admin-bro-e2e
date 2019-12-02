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

