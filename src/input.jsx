// @flow

import * as React from 'react';

// fixme: Does this even work?
type Props = React.ElementConfig<'input'>

export default (props: Props) => <input {...props} />;
