import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserAPI from '../../API/user-api';
import { MainState } from '../../proptypes';
import { UserActionCreators } from '../../state/action-creators';

/**
 * Hook for adding 'user shows' to the database, and updating state.
 */

const useAddShows = () => {
  const dispatch = useDispatch();
  const user = useSelector<MainState>((state) => state.user.user) as User;
  const [addedShows, setAddedShows] = useState<Array<string>>([]);
  const { addUserShowAction } = bindActionCreators(
    UserActionCreators,
    dispatch
  );

  const addNewShow = async (value: string) => {
    const newShow = await UserAPI.addShow(user._id, parseInt(value));
    if (newShow === undefined) {
      console.log('unable to add');
      return;
    }

    addUserShowAction(newShow);
    setAddedShows([...addedShows, value]);
  };

  return { addedShows, addNewShow, setAddedShows, user };
};

export default useAddShows;
