import React, { useState } from 'react';
import { PostData } from '../../lib/api';

// components

export default function CardSettingsMembership() {
  const [moneyUpgrade, setMoneyUpgrade] = useState(3000000);
  const [DaysUpgrade, setDaysUpgrade] = useState(0);
  const [MonthsUpgrade, setMonthsUpgrade] = useState(3);
  const [YearsUpgrade, setYearsUpgrade] = useState(0);

  const [moneyAchieve, setMoneyAchieve] = useState(7000000);
  const [DaysAchieve, setDaysAchieve] = useState(0);
  const [MonthsAchieve, setMonthsAchieve] = useState(0);
  const [YearsAchieve, setYearsAchieve] = useState(1);

  const onClickSave = async () => {
    try {
      var res = await PostData(`/v1/membership`, {
        membership: {
          type: 'sapo',
          class: 'gold',
          moneyUpgrade,
          DaysUpgrade,
          MonthsUpgrade,
          YearsUpgrade,
          moneyAchieve,
          DaysAchieve,
          MonthsAchieve,
          YearsAchieve,
        },
      });
      if (res) {
        alert('Save Success');
      }
    } catch (e) {
      alert(`Failed: ${e}`);
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-8 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              <i className="fas fa-money-check mr-2"></i>Membership
            </h6>
            <button
              className="bg-yellow-500 active:bg-gray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => onClickSave()}>
              Save
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-6 py-10 pt-0">
          <form>
            <h6 className="text-gray-500 text-sm mb-3 mt-6 font-bold uppercase px-4">
              Rule upgrade customer’s membership
            </h6>
            <div className="flex flex-wrap">
              <label className="px-4 block text-gray-700 text-l font-bold mb-2" htmlFor="grid-password">
                Automatically upgrade customer’s membership to GOLD if they purchase{' '}
                <span className="mt-2 inline-block py-1 px-2 uppercase rounded-full text-white bg-red-600 uppercase">
                  {moneyUpgrade.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VND
                </span>{' '}
                within{' '}
                <span className="mt-2 inline-block py-1 px-2 uppercase rounded-full text-white bg-red-600 uppercase">
                  {YearsUpgrade ? `${YearsUpgrade} Years ` : ''} {MonthsUpgrade ? `${MonthsUpgrade} Months ` : ''}{' '}
                  {DaysUpgrade ? `${DaysUpgrade} Days ` : ''}
                </span>
              </label>
              <div className="w-full lg:w-full px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-xs mb-2" htmlFor="grid-password">
                    Total PURCHASE
                  </label>
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-coins"></i>
                  </span>
                  <input
                    type="number"
                    name="moneyUpgrade"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 pl-10"
                    defaultValue={moneyUpgrade}
                    onChange={e => setMoneyUpgrade(e.target.value)}
                  />
                  <span className="mr-6 z-10 h-full leading-snug font-normal absolute text-right text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-12 right-0 pr-3 py-3">
                    VND
                  </span>
                </div>
              </div>
              <div className="mb-2 relative w-full lg:w-12/12 px-4">
                <label className="block uppercase text-gray-700 text-xs" htmlFor="grid-password">
                  Time
                </label>
              </div>
              <div className="mb-2 relative w-full lg:w-4/12 px-4">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-calendar-alt"></i>
                </span>
                <input
                  type="number"
                  className="pl-10 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  defaultValue={YearsUpgrade}
                  onChange={e => setYearsUpgrade(e.target.value)}
                />
                <span className="mr-8 z-10 h-full leading-snug font-normal absolute text-right text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-16 right-0 pr-3 py-3">
                  Years
                </span>
              </div>
              <div className="mb-2 relative w-full lg:w-4/12 px-4">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-calendar"></i>
                </span>{' '}
                <input
                  type="number"
                  className="pl-10 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  defaultValue={MonthsUpgrade}
                  onChange={e => setMonthsUpgrade(e.target.value)}
                />
                <span className="mr-8 z-10 h-full leading-snug font-normal absolute text-right text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-16 right-0 pr-3 py-3">
                  Months
                </span>
              </div>
              <div className="mb-2 relative w-full lg:w-4/12 px-4">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-clock"></i>
                </span>{' '}
                <input
                  type="number"
                  className="pl-10 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  defaultValue={DaysUpgrade}
                  onChange={e => setDaysUpgrade(e.target.value)}
                />
                <span className="mr-8 z-10 h-full leading-snug font-normal absolute text-right text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-16 right-0 pr-3 py-3">
                  Days
                </span>
              </div>
            </div>

            {/* Rule achieved customer’s membership */}
            <hr className="mt-6 border-b-1 border-gray-400" />
            <h6 className="text-gray-500 text-sm mb-3 mt-6 font-bold uppercase px-4">
              Rule achieved customer’s membership
            </h6>
            <div className="flex flex-wrap">
              <label className="px-4 block text-gray-700 text-l font-bold mb-2" htmlFor="grid-password">
                After{' '}
                <span className="mt-2 inline-block py-1 px-2 uppercase rounded-full text-white bg-red-600 uppercase">
                  {YearsAchieve ? `${YearsAchieve} Years ` : ''} {MonthsAchieve ? `${MonthsAchieve} Months ` : ''}{' '}
                  {DaysAchieve ? `${DaysAchieve} Days ` : ''}
                </span>{' '}
                if that customer spends another{' '}
                <span className="mt-2 inline-block py-1 px-2 uppercase rounded-full text-white bg-red-600 uppercase">
                  {moneyAchieve.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VND
                </span>{' '}
                in total, they will remain GOLD tiers
              </label>
              <div className="mb-2 relative w-full lg:w-12/12 px-4">
                <label className="block uppercase text-gray-700 text-xs" htmlFor="grid-password">
                  Time
                </label>
              </div>
              <div className="mb-2 relative w-full lg:w-4/12 px-4">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-calendar-alt"></i>
                </span>
                <input
                  type="number"
                  className="pl-10 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  defaultValue={YearsAchieve}
                  onChange={e => setYearsAchieve(e.target.value)}
                />
                <span className="mr-8 z-10 h-full leading-snug font-normal absolute text-right text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-16 right-0 pr-3 py-3">
                  Years
                </span>
              </div>
              <div className="mb-2 relative w-full lg:w-4/12 px-4">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-calendar"></i>
                </span>
                <input
                  type="number"
                  className="pl-10 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  defaultValue={MonthsAchieve}
                  onChange={e => setMonthsAchieve(e.target.value)}
                />
                <span className="mr-8 z-10 h-full leading-snug font-normal absolute text-right text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-16 right-0 pr-3 py-3">
                  Months
                </span>
              </div>
              <div className="mb-2 relative w-full lg:w-4/12 px-4">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-clock"></i>
                </span>{' '}
                <input
                  type="number"
                  className="pl-10 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  defaultValue={DaysAchieve}
                  onChange={e => setDaysAchieve(e.target.value)}
                />
                <span className="mr-8 z-10 h-full leading-snug font-normal absolute text-right text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-16 right-0 pr-3 py-3">
                  Days
                </span>
              </div>
              <div className="w-full lg:w-full px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-xs mb-2" htmlFor="grid-password">
                    Total PURCHASE
                  </label>
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-coins"></i>
                  </span>
                  <input
                    type="number"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 pl-10"
                    defaultValue={moneyAchieve}
                    onChange={e => setMoneyAchieve(e.target.value)}
                  />
                  <span className="mt-2 mr-6 z-10 h-full leading-snug font-normal absolute text-right text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-12 right-0 pr-3 py-3">
                    VND
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
