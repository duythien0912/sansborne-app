import React, { useState, useEffect } from 'react';
// import { PostData } from '../../lib/api';

// import PageChange from '../PageChange/PageChange';
import SideBarLoading from '../Sidebar/Loading';
import { FetchData } from '../../lib/api';

// components

export default function CardSettingsMembership() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeBackUp, setTimeBackUp] = useState(5);
  const [timeMemberShip, setTimeMemberShip] = useState(5);
  const [activeBackup, setActiveBackup] = useState(true);
  const [activeMemberShip, setActiveMemberShip] = useState(true);

  const onClickSave = async () => {
    try {
      await FetchData(`/v1/cron/membership?time=${timeMemberShip}&stop=${!activeMemberShip}`);
      await FetchData(`/v1/cron/sapo?time=${timeBackUp}&stop=${!activeBackup}`);
      alert('Save Success');
    } catch (e) {
      alert(`Failed: ${e}`);
    }
  };

  useEffect(() => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function fetchData() {
      var cronRes = await FetchData(`/v1/cron`);
      if (cronRes.status == 'ok') {
        setActiveBackup(cronRes.data.backup);
        setTimeBackUp(cronRes.data.backup_time);
        setActiveMemberShip(cronRes.data.membership);
        setTimeMemberShip(cronRes.data.membership_time);
      }

      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) return SideBarLoading();

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-8 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              <i className="fas fa-money-check mr-2"></i>Cron Setting
            </h6>
            <button
              className="bg-yellow-500 active:bg-gray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => onClickSave()}>
              Save
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-6 py-0 pt-0">
          <form>
            <h6 className="text-gray-500 text-sm mb-3 mt-6 font-bold uppercase px-4">Backup Data Setting</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-3/12 px-4 mb-3" onClick={() => setActiveBackup(!activeBackup)}>
                <label className="block uppercase text-gray-700 text-xs mb-2" htmlFor="grid-password">
                  Enable or disable cron:
                </label>
                <div
                  className={
                    'w-16 h-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ' +
                    (activeBackup ? 'bg-green-400' : '')
                  }>
                  <div
                    className={
                      'bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out ' +
                      (activeBackup ? 'translate-x-6' : '')
                    }></div>
                </div>
              </div>{' '}
              <div className="w-full lg:w-9/12 px-4">
                <div className="relative mb-3">
                  <label className="block uppercase text-gray-700 text-xs mb-2" htmlFor="grid-password">
                    Run backup sapo data every:
                  </label>
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-clock"></i>
                  </span>
                  <input
                    type="number"
                    name="moneyUpgrade"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 pl-10"
                    defaultValue={timeBackUp}
                    onChange={e => setTimeBackUp(e.target.value)}
                  />
                  <span className="mr-6 z-10 h-full leading-snug font-normal absolute text-right text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-16 right-0 pr-3 py-3">
                    Minutes
                  </span>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />
          </form>
        </div>
        <div className="flex-auto px-4 lg:px-6 py-10 pt-0">
          <form>
            <h6 className="text-gray-500 text-sm mb-3 mt-6 font-bold uppercase px-4">MemberShip Setting</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-3/12 px-4 mb-3" onClick={() => setActiveMemberShip(!activeMemberShip)}>
                <label className="block uppercase text-gray-700 text-xs mb-2" htmlFor="grid-password">
                  Enable or disable cron:
                </label>
                <div
                  className={
                    'w-16 h-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ' +
                    (activeMemberShip ? 'bg-green-400' : '')
                  }>
                  <div
                    className={
                      'bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out ' +
                      (activeMemberShip ? 'translate-x-6' : '')
                    }></div>
                </div>
              </div>{' '}
              <div className="w-full lg:w-9/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-xs mb-2" htmlFor="grid-password">
                    Check all customer membership every:
                  </label>
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-clock"></i>
                  </span>
                  <input
                    type="number"
                    name="moneyUpgrade"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 pl-10"
                    defaultValue={timeMemberShip}
                    onChange={e => setTimeMemberShip(e.target.value)}
                  />
                  <span className="mr-6 z-10 h-full leading-snug font-normal absolute text-right text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-16 right-0 pr-3 py-3">
                    Minutes
                  </span>
                </div>
              </div>
            </div>

            {/* Rule achieved customer’s membership */}
          </form>
        </div>
      </div>
    </>
  );
}
