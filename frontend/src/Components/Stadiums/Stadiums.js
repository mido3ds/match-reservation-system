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

  const [stateCounter, setStateCount] = useState(0);
  let refresh = () => setStateCount(stateCounter + 1);

  let removeStadium = (id) => {
    setStadiums(stadiums => {
      return stadiums.filter(stadium => { return stadium.id !== id })
    });
  }

  let getStadiums = async () => {
    try {
      const resp = await api.getStadiums(page);
      setHasNext(resp.data.has_next);
      setStadiums(resp.data.stadiums.map((stadium, i) => {
        stadium.id = i;
        stadium.removeCard = () => { removeStadium(i); };
        return stadium;
      }));
    } catch (err) {
      console.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  useEffect(() => {
    getStadiums();
    // eslint-disable-next-line
  }, [page]);

  async function submitStadium(stadium) {
    try {
      await api.submitStadium(authToken(), stadium);
      NotificationManager.success('Stadium added successfully');
      window.$("#StadiumFormModal").modal('hide')
      refresh();
    } catch (err) {
      console.error(err.message);
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