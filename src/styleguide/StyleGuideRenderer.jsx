import React, { Fragment } from 'react';
import StyleGuide from 'react-styleguidist/lib/client/rsg-components/StyleGuide/StyleGuideRenderer';
import FontStager from '../components/FontStager';

function StyleGuideRenderer(props) {
  return (
    <Fragment>
      <FontStager />
      <StyleGuide {...props} />
    </Fragment>
  );
}

export default StyleGuideRenderer;
