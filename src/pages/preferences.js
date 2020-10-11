import React from 'react';

// components

// layout for page

import Admin from 'layouts/Admin.js';
import CardSettingsMembership from 'components/Cards/CardSettingsMembership.js';

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        {/* rule for upgrade */}
        {/* rule for keep premium account */}
        <div className="w-full lg:w-12/12 px-4">
          <CardSettingsMembership />
        </div>
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </>
  );
}

Settings.layout = Admin;
