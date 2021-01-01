import './Users.css';
import CardsArea from '../CardsArea/CardsArea'
import UsersHeader from './UsersHeader/UsersHeader'

function Users() {
    const cards = []
    for(var i = 0; i < 37; i++) {
        cards.push({id : i}) 
    }

  return (
    <div className="flex-container-col">
        <UsersHeader />
        <CardsArea custom_cards={cards} cardIdentifier="user"/> 
    </div>
    
  );

}

export default Users;