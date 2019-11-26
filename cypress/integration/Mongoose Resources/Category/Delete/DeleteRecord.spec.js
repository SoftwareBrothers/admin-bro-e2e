import {
  mongoose,
  leftNavbar
} from '../../../../support/cssCommonSelectors'
import {
  common,
  navbarTexts
} from '../../../../support/texts'
import { clearScreenDown } from 'readline'

const { boardView, buttons} = mongoose
const{buttons: buttonsTexts} = common


describe('Delete record',function(){
  it('By going in, click on title, and click on remove button',function(){
    cy.loginSuccess() 
    .get(leftNavbar.mongoose.category).contains(navbarTexts.mongoose.category).click()
    .get(boardView.table).then(($table)=>{
      const id = $table.find(boardView.tableTds).eq(1);
      cy.wrap(id).as('numberId')
    })
    cy.get(boardView.tableTds).first().find('a').click()
    .get(buttons.remove).click()
    .get(boardView.table).then(($table)=>{ 
      const id2 = $table.find(boardView.tableTds).eq(1).text();
      expect(this.numberId.text()).not.to.equal(id2);
    })
  })
}) 