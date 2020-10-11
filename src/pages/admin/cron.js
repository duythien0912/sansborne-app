import React from 'react';

// components

// import CardSettings from "components/Cards/CardSettings.js";
// import CardProfile from "components/Cards/CardProfile.js";

// layout for page

import Admin from 'layouts/Admin.js';
import CardSettingsCron from '../../components/Cards/CardSettingsCron';

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        {/* rule for upgrade */}
        {/* rule for keep premium account */}
        <div className="w-full lg:w-12/12 px-4">
          <CardSettingsCron />
        </div>
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </>
  );
}

Settings.layout = Admin;
