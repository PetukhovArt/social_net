import React from "react";
import {create} from 'react-test-renderer';
import {ProfileStatus} from 'components/Profile/ProfileInfo/ProfileStatus/ProfileStatus';
import {updateUserStatusTC} from 'redux/profile-reducer';

describe('ProfileStatus component', () => {

  test('status from props should be in the state', () => {
    const component = create(<ProfileStatus status={'Artem PAN'} updateStatusTC={updateUserStatusTC}/>);
    const instance = component.getInstance();
    expect(instance!.props.status).toBe('Artem PAN');
  });

});