import React from 'react';
import PropTypes from 'prop-types';

import Success from '../containers/Success';
import { withTranslation } from 'utils/with-i18next';

export class SuccessPage extends React.PureComponent {
  render() {
    const { t } = this.props;

    return <Success t={t} />;
  }
}

SuccessPage.propTypes = {
  t: PropTypes.func,
};

SuccessPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'banner', 'features'],
});

export default withTranslation('common')(SuccessPage);
