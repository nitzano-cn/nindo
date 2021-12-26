import React from 'react';

import './analyticsEmbed.scss';

type AnalyticsEmbedProps = {
  componentId: string
}

const baseUrl = process.env.REACT_APP_USERS_SERVICE_URL || '';

export const AnalyticsEmbed = ({ componentId }: AnalyticsEmbedProps) => {
  return (
    <div className="analytics-embed">
      <iframe src={`${baseUrl}/embed/analytics/${componentId}`} frameBorder="0" />
    </div>
  );
};