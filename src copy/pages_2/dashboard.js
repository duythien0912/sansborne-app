import React from 'react';
import PropTypes from 'prop-types';

import Dashboard from '../containers/Dashboard';
import { withTranslation } from 'utils/with-i18next';

export class DashboardPage extends React.PureComponent {
  render() {
    const { t } = this.props;

    return <Dashboard t={t} />;
  }
}

DashboardPage.propTypes = {
  t: PropTypes.func,
};

DashboardPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'banner', 'features'],
});

export default withTranslation('common')(DashboardPage);
