import React from 'react';

import { NinjaSkeletonTheme, NinjaSkeleton } from '../../../external/components/skeleton/skeleton.comp';

import './contextMenuLoader.scss';

export const ContextMenuLoader = () => {
  return (
    <div className="context-menu-loader">
      <NinjaSkeletonTheme leadColor="#242529">
        <div style={{ marginBottom: '20px' }}><NinjaSkeleton height={40} /></div>
        {
          Array.from(new Array(4)).map((y, i) => (
            <div key={`panel_loader_${i}`} style={{ marginBottom: '5px', width: '100%' }}><NinjaSkeleton height={16} /></div>
          ))
        }
        <div style={{ marginBottom: '5px', width: '70%' }}><NinjaSkeleton height={16} /></div>
        <div style={{ marginBottom: '5px', width: '50%' }}><NinjaSkeleton height={16} /></div>
      </NinjaSkeletonTheme>
    </div>
  );
};