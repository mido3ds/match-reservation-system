import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import { NotificationManager } from 'react-notifications';
import CardsArea from '../CardsArea/CardsArea';
import StadiumHeader from './StadiumHeader/StadiumHeader';
import StadiumForm from './StadiumForm/StadiumForm';
import { authToken } from '../../Auth';

const api = new DefaultApi();

function Stadiums() {
  const [hasNext, setHasNext] = useState(false);
  const [stadiums, setStadiums] = useState([]);
  const [page, setPage] = useState(1);

  let removeStadium = (id) => {
    setStadiums(stadiums => {
      return stadiums.filter(stadium => { return stadium.id !== id })
    });
  }

  useEffect(async () => {
    try {
      const resp = await api.getStadiums(page);
      setHasNext(resp.data.has_next);
      setStadiums(resp.data.stadiums.map((stadium, i) => {
        stadium.id = i;
        stadium.removeCard = () => { removeStadium(i); };
        return stadium;
      }));
    } catch (err) {
      NotificationManager.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }, [page, stadiums]);

  async function submitStadium(stadium) {
    try {
      await api.submitStadium(authToken(), stadium);
      NotificationManager.success('Stadium added successfully');
      window.$("#StadiumFormModal").modal('hide')
      setStadiums([])
    } catch (err) {
      NotificationManager.error(err.message);
      if (err.response?.data?.err) {
        NotificationManager.error(err.response.data.err);
      }
    }
  }


  return (
    <div className="flex-container-column-vcenter-hcenter">
      <StadiumForm onSubmit = {submitStadium} />
      <StadiumHeader />
      <CardsArea cards={stadiums} hasNext={hasNext} cardIdentifier="stadium" onSetPage={setPage} />
    </div>
  );
}

export default Stadiums;