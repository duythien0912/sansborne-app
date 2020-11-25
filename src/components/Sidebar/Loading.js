import React from 'react';

export default function SideBarLoading() {
  return (
    <>
      <div>
        <div
          className="bg-cover fixed z-40 w-full h-full top-0"
          style={{
            left: '16rem',
            backgroundImage: 'url(' + require('assets/img/register_bg_2.png') + ')',
            backgroundColor: 'rgba(26, 32, 44, var(--bg-opacity))',
          }}></div>
        <div className="my-32 mx-auto max-w-sm text-center relative z-50 top-0">
          <div className="block mb-4">
            <i className="fas fa-circle-notch animate-spin text-white mx-auto text-6xl"></i>
          </div>
          <h4 className="text-lg font-medium text-white">Loading</h4>
        </div>
      </div>
    </>
  );
}

export function Loading2() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div
          className="bg-cover fixed z-40 w-full h-full top-0"
          style={{
            left: '0',
            backgroundColor: '#2d3748',
          }}></div>
        <div className="my-32 mx-auto max-w-sm text-center relative z-50 top-0">
          <div className="block mb-4">
            <i className="fas fa-circle-notch animate-spin text-white mx-auto text-6xl"></i>
          </div>
          <h4 className="text-lg font-medium text-white">Loading</h4>
        </div>
      </div>
    </>
  );
}
