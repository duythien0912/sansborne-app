import React from 'react';
import PropTypes from 'prop-types';

import Register from '../containers/Register';
import { withTranslation } from 'utils/with-i18next';

export class RegisterPage extends React.PureComponent {
  render() {
    const { t } = this.props;

    return <Register t={t} />;
  }
}

RegisterPage.propTypes = {
  t: PropTypes.func,
};

RegisterPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'banner', 'features'],
});

export default withTranslation('common')(RegisterPage);
