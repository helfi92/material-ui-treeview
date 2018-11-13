import React, { Fragment, Component } from 'react';
import StyleGuide from 'react-styleguidist/lib/rsg-components/StyleGuide/StyleGuideRenderer';
import FontStager from '../components/FontStager';

export default class StyleGuideRenderer extends Component {
  render() {
    return (
      <Fragment>
        <FontStager />
        <StyleGuide {...this.props} />
      </Fragment>
    );
  }
}
