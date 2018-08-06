import * as React from 'react';

import * as moment from 'moment';

export const Disclaimer: React.StatelessComponent = () => {
    return (
        <div id="disclaimer">
            <div className="content">@ C A 7 O, {moment().format('YYYY')}. All Rights Reserved.</div>
        </div>
    );
}